import {db} from './db.js';
import jwt from 'jsonwebtoken';
import  {secret} from './config/auth-config.js';
import bcrypt from 'bcryptjs';

export const verifyToken  = (request, response, next) => {
    const token = request.headers["x-access-token"];

    if (!token) {
      return response.status(403).send({ message: "Aucun jeton fourni!" });
    }

    jwt.verify(token,
              secret,
              (err, decoded) => {
                if (err) {
                  return response.status(401).send({
                    message: "Non autorisé!",
                  });
                }
                request.userId = decoded.id;
                next();
              });
};

export const userBoard = (request, response) => {
  response.status(200).send("User Content.");
};

export const verifySignUp = (request, response, next) => {
    const { name, email } = request.body;
    db.query('SELECT * FROM user WHERE name = ? OR email = ? LIMIT 1', [name, email], (error, results) => {
      if (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        return;
      }
  
      if (results.length > 0) {
        response.status(400).send({ message: results[0].name == name? "Le nom d'utilisateur n'est pas disponible!":"L'email n'est pas disponible!" });
        return;
      } else {
        next();
      }
    });
};

export const signUp = (request, response) => {
    const { name, email, password, admin } = request.body;
    const passwordHash = bcrypt.hashSync(request.body.password, 8)
    db.query('INSERT INTO user (name, email, password, admin) VALUES (?, ?, ?, ?)', 
    [name, email, passwordHash, admin], (error) => {
      if (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        return;
      }
  
      response.status(200).send({ message: "L'usager a été engeristré avec succès!" });
    });
};

export const signIn = (request, response) => {
    const { name, email, password } = request.body;
    // db.query('SELECT * FROM user WHERE name = ? OR email = ? AND password = ? LIMIT 1', 
    db.query('SELECT * FROM user WHERE name = ? OR email = ? LIMIT 1', 
    [name, email, password], (error, results) => {
      if (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        return;
      }
  
      if (results.length > 0) {
          const user = results[0];
          console.log(user);
          console.log(bcrypt.hashSync(request.body.password, 8));

          const passwordIsValid = bcrypt.compareSync(
            request.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return response.status(401).send({
              accessToken: null,
              message: "Le mot de passe est incorrect!"
            });
          }

          const token = jwt.sign({ id: user.id },
            secret,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

          response.status(200).send({...user, accessToken: token});
          return;

      } else if (results.length == 0){
        response.status(400).send({ message: "L'usager n'existe pas!" });
      }
    });
};