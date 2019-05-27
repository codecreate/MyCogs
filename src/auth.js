import history from './history';

export default class Auth {

    login = () => {
        console.log('Auth login');
        fetch("http://localhost:9000/cogsAPI/authorise", {
            // credentials: "same-origin", //include, same-origin
            // headers: {Accept: 'text/html', 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            // mode: 'no-cors'
        })
            .then(res=> {
                return res.text();
            })
            .then(data => {
                console.log(data);
                window.location.href = data;
            })
            .catch(err => {
                console.log("Booo "+err);
        });
    }

    // parses the result after authentication from URL hash
    handleAuthentication = () => {
        console.log('Auth handleAuthentication');
        // gotta grab the url here and get it into the cogsAPI callback to authorise since we only see it on the front end
        console.log('get the query string somehow ',window.location.search);
        fetch("http://localhost:9000/cogsAPI/callback?"+window.location.search, {
            // credentials: "same-origin", //include, same-origin
            // headers: {Accept: 'text/html', 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            // mode: 'no-cors'
        })
            .then(res=>{
                return res.json();
            })
            .then(authResult => {
                console.log('authResult is ', authResult);
                if (authResult && authResult.token && authResult.tokenSecret) {
                    console.log('Yeah got authResult so set session');
                        this.setSession(authResult);
                        // history.replace('/home');
                    } else {
                    history.replace('/home');
                    console.log('handleAuthentication failure');
                }
            })
            .catch(err => {
                console.log("Booo "+err);
        });
    }

    // Sets user details in localStorage
    setSession = (authResult) => {
        console.log('Auth setSession');
        // Set the time that the access token will expire at
        // let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('mycogsToken', authResult.token);
        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/home');
    }

    // removes user details from localStorage
    logout = () => {
        // Clear access token
        localStorage.removeItem('mycogsToken');
        // navigate to the home route
        history.replace('/home');
    }

    // checks if the user is authenticated
    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        // let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // return new Date().getTime() < expiresAt;
        // check if an access token exists
        if (localStorage.getItem('mycogsToken')){
            return true;
        }
        return false;
    }
}