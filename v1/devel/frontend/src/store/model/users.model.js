import { action } from 'easy-peasy'

const request = action((state,payload) => {
    return { loading: true } 
})

const success = action((state,payload) => {
    return { items: payload.users }
})

const error = action((state,payload) => {
    return { error: payload.error } 
})

const model = {
    request,
    success,
    error
}

export default model
