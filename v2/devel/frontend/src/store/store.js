import { createStore } from 'easy-peasy'
import timerMiddleware from 'redux-timer-middleware'
//import createSocketIoMiddleware from 'redux-socket.io'
//import io from 'socket.io-client'

import model from './model'

//const socket_url = process.env.REACT_APP_SOCKETIO_URL
//const socket = io(window.location.origin,{'path':socket_url})
//const socketIoMiddleware = createSocketIoMiddleware(socket,'server/')

const middleware = [
    //socketIoMiddleware,
    timerMiddleware
]

export const store = createStore(model, { middleware })

