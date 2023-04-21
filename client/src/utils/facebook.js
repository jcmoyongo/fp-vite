
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});


/*{https://developers.facebook.com/apps/1202990393661179/fb-login/quickstart/
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }

    <fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
}*/