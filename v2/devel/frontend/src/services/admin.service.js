import { authHeader } from 'support/helpers'

const BASEURL = window.location.origin+process.env.REACT_APP_ADMIN_URL

export const adminService = {
    getUsers,
    getPending,
    getHistory,
    getApplications,
    approveUser,
    denyUser
}

function callAPI(uri) {

    const requestOptions = {
        method: 'GET',
        headers: {  
            ...{ 'Content-Type': 'application/json' },
            ...authHeader()
            }
    }

    return fetchWrapper(uri,requestOptions)
}

function getUsers() {
    return callAPI('/users')
}

function getPending() {
    return callAPI('/pending')
}

function getHistory() {
    return callAPI('/history')
}

function getApplications() {
    return callAPI('/applications')
}

function approveUser(username) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...{ 'Content-Type': 'application/json' },
            ...authHeader()
            },
        body: JSON.stringify({username})
    }

    return fetchWrapper('/approve',requestOptions).then(getUsers)
}

function denyUser(username) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...{ 'Content-Type': 'application/json' },
            ...authHeader()
            },
        body: JSON.stringify({username})
    }

    return fetchWrapper('/deny',requestOptions).then(getUsers)
}

async function fetchWrapper(url,options) {
    const response = await fetch(`${BASEURL}`+url,options)
    const json = await response.json()
    //console.log('admin fetchWrapper:',response.status,response.ok,json)
    return response.ok ? json : Promise.reject(json)
}

