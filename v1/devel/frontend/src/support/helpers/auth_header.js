export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.access_token) {
        return { 'Authorization': 'bearer ' + user.access_token, 
                 'myAuthorization': 'bearer ' + user.access_token }
    } else {
        return {} 
    }
}

