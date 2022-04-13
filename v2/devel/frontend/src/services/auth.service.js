import { authHeader } from 'support/helpers'

const BASEURL = window.location.origin+process.env.REACT_APP_AUTH_URL

export const authService = {
    login,
    logout,
    signup,
    forgotUsername,
    forgotPassword,
    resetPassword,
    getProfile
}

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username,password})
    }

    return fetchWrapper('/login',requestOptions)
        .then(user => {
            localStorage.setItem('user',JSON.stringify(user))
            return user
            }
        )
}

function getProfile() {

    const requestOptions = {
        method: 'GET',
        headers: {  
            ...{ 'Content-Type': 'application/json' },
            ...authHeader()
            }
    }

    return fetchWrapper('/profile',requestOptions)
}

function signup(payload) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetchWrapper('/signup',requestOptions)
}

function forgotUsername(email) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    }

    return fetchWrapper('/forgot_username',requestOptions)
}

function forgotPassword(username) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username})
    }

    return fetchWrapper('/forgot_password',requestOptions)
}

function resetPassword(password,token) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({password,token})
    }

    return fetchWrapper('/reset_password',requestOptions)
}


function logout() {
    localStorage.clear()
}

async function fetchWrapper(url,options) {
    const response = await fetch(`${BASEURL}`+url,options)
    const json = await response.json()
    //console.log('auth fetchWrapper:',response.status,json)
    return response.ok ? json : Promise.reject(json)
}

