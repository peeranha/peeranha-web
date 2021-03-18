export function loadSdkAsynchronously(language = 'en_US') {
  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/${language}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

export function initializeAppInFB() {
  window.FB.init({
    appId: process.env.FACEBOOK_APP_ID,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v10.0',
  });
}

export const logInUserOnFacebook = autoLoginWithFacebookDispatch => {
  window.FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      // display user data

      const { userID, accessToken } = response.authResponse;
      autoLoginWithFacebookDispatch({ userID, accessToken });
    } else {
      window.FB.login(
        loginResponse => {
          // handle the loginResponse

          const { userID, accessToken } = loginResponse.authResponse;
          autoLoginWithFacebookDispatch({ userID, accessToken });
          fbGraph();
        },
        {
          scope: 'email',
          fields: 'name,email,picture',
        },
      );
    }
  });
};

function fbGraph() {
  window.FB.api('/me', 'GET', { fields: 'id,name,email,picture' }, response => {
    // Insert your code here
  });
}

export function onFacebookSdkInit(autoLoginWithFacebookDispatch) {
  if (window.FB) {
    initializeAppInFB();

    logInUserOnFacebook(autoLoginWithFacebookDispatch);
  } else {
    // load facebook sdk
    loadSdkAsynchronously();
    window.fbAsyncInit = () => {
      initializeAppInFB();

      logInUserOnFacebook(autoLoginWithFacebookDispatch);
    };
  }
}
