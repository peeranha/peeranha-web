import { WebIntegrationError } from './errors';

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

export const logInUserOnFacebook = (
  autoLoginWithFacebookDispatch,
  getCurrentAccountDispatch,
  addFacebookErrorDispatch,
  fbConnectErrMsg,
) => {
  window.FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      fbGraph(autoLoginWithFacebookDispatch, response.authResponse);
    } else {
      window.FB.login(
        loginResponse => {
          if (loginResponse.status === 'connected') {
            fbGraph(autoLoginWithFacebookDispatch, loginResponse.authResponse);
          } else {
            addFacebookErrorDispatch(new WebIntegrationError(fbConnectErrMsg));
            getCurrentAccountDispatch();
          }
        },
        {
          scope: 'email',
          fields: 'name,email,picture',
        },
      );
    }
  });
};

function fbGraph(autoLoginWithFacebookDispatch, authResponse) {
  window.FB.api(
    '/me',
    'GET',
    { fields: 'id,name,email,picture' },
    fbGraphResponse => {
      autoLoginWithFacebookDispatch({ ...authResponse, ...fbGraphResponse });
    },
  );
}

export function onFacebookSdkInit(
  autoLoginWithFacebookDispatch,
  getCurrentAccountDispatch,
  addFacebookErrorDispatch,
  fbConnectErrMsg,
) {
  if (window.FB) {
    initializeAppInFB();

    logInUserOnFacebook(
      autoLoginWithFacebookDispatch,
      getCurrentAccountDispatch,
      addFacebookErrorDispatch,
      fbConnectErrMsg,
    );
  } else {
    // load facebook sdk
    loadSdkAsynchronously();
    window.fbAsyncInit = () => {
      initializeAppInFB();

      logInUserOnFacebook(
        autoLoginWithFacebookDispatch,
        getCurrentAccountDispatch,
        addFacebookErrorDispatch,
        fbConnectErrMsg,
      );
    };
  }
}
