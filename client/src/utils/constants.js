export const facebookAppID = "1561062554263407";
export const sportsDataIOAPIKey = "357fa5f8551c41cea6afc56a1345c611";
//ScheduleBasic
export const scheduleAPI = "https://api.sportsdata.io/v3/nba/scores/json/SchedulesBasic/"
//https://api.sportsdata.io/v3/nba/scores/json/SchedulesBasic/2023post?key=357fa5f8551c41cea6afc56a1345c611

// The whole post season https://api.sportsdata.io/v3/nba/scores/json/Games/2023post?key=357fa5f8551c41cea6afc56a1345c611
export const postSeasonAPI = "//https://api.sportsdata.io/v3/nba/scores/json/Games/"

//From ScoreBasic
export const scoreByDateAPI = "https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/2023-04-12?key=357fa5f8551c41cea6afc56a1345c611"

//Series by date https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/2023-04-16?key=357fa5f8551c41cea6afc56a1345c611 
export const serieByDateAPI = "https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/"

//https://sportsdata.io/developers/api-documentation/nba#/endpoint/teams-all


//STATUS = Final, InProgress, Scheduled, F/OT
//npm run dev -- --https
//npm i vite-plugin-mkcert -D
/*
GraphRequest request = GraphRequest.newGraphPathRequest(
    accessToken,
    "/680010455356375",
    new GraphRequest.Callback() {
      @Override
      public void onCompleted(GraphResponse response) {
        // Insert your code here
      }
  });
  
  request.executeAsync();

  FB.api(
    '/680010455356375',
    'POST',
    {"message":"Hello World!"},
    function(response) {
        // Insert your code here
    }
  );
*/