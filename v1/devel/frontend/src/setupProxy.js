const proxy = require('http-proxy-middleware');

const port = process.env.REACT_APP_API_PORT 
const api = process.env.REACT_APP_API_URL 
const auth = process.env.REACT_APP_AUTH_URL
const admin = process.env.REACT_APP_ADMIN_URL
const socketio = process.env.REACT_APP_SOCKETIO_URL
const jupyter = process.env.REACT_APP_JUPYTER_URL
const url = 'http://localhost:'+port.toString()

module.exports = function(app) {
    app.use(proxy(socketio, { 'target': url, 'ws': true }));
    app.use(proxy(api,      { 'target': url })); 
    app.use(proxy(auth,     { 'target': url })); 
    app.use(proxy(admin,    { 'target': url })); 
};

