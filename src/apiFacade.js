import URL from "./settings.js";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function apiFacade() {
    /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password, setLoggedIn, setErrorMessage) =>
    {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res =>
            {
                setToken(res.token)
                setLoggedIn(true);
                setErrorMessage('Logged in');
            })
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }

    const createUser = (userName, userPass) =>
    {
        const options = makeOptions("POST", true, {userName: userName, userPass: userPass})
        return fetch(URL + "/api/info", options)
            .then(handleHttpErrors)
            .catch(() => { console.log('promis rejected'); })
    }

    const fetchData = (endpoint, updateAction, SetErrorMessage) =>
    {
        const options = makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    const postData = (endpoint, updateAction, SetErrorMessage, jsonBody) =>
    {
        const options = makeOptions("POST", true, jsonBody); //True adds the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    const putData = (endpoint, updateAction, SetErrorMessage, jsonBody) =>
    {
        const options = makeOptions("PUT", true, jsonBody); //True adds the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    const deleteData = (endpoint, updateAction, SetErrorMessage) =>
    {
        const options = makeOptions("DELETE", true); //True adds the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    const fetchJoke = () => {const options = makeOptions("GET",true); //True add's the token
        return fetch(URL + "/api/joke/haha", options).then(handleHttpErrors);
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const getUserName = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const username = decodedClaims.username
            return username
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        // console.log(roles);
        // console.log((loggedIn && roles.includes(neededRole)));
        return loggedIn && roles.includes(neededRole)
    }

    const makeOptions= (method,addToken,body) =>{
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        fetchJoke,
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        createUser,
        fetchData,
        postData,
        putData,
        deleteData,
        hasUserAccess,
        getUserRoles,
        getUserName
    }
}
const facade = apiFacade();
export default facade;
