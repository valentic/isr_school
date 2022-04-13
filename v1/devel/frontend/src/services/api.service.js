
const BASEURL = window.location.origin+process.env.REACT_APP_API_URL

export const apiService = {
    submitApplication 
}

function submitApplication(payload) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetchWrapper('/applications/submit',requestOptions)
}

async function fetchWrapper(url,options) {
    const response = await fetch(`${BASEURL}`+url,options)
    const json = await response.json()
    console.log(response)
    return response.ok ? json : Promise.reject(json)
}

