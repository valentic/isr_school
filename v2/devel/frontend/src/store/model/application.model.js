import { action, thunk } from 'easy-peasy'
import { apiService } from 'services'

const initialState = {
    application: undefined,
    applicationState: undefined,
}

const success = action((state,payload) => {
    state.application = payload.application
})

const failure = action((state,payload) => {
    state.application = undefined
})

const setApplicationState = action((state,payload) => {
    state.applicationState = payload
})

const submit = thunk(async (actions,payload) => {
    
    try {
        await apiService.submitApplication(payload)
        actions.setApplicationState(true)
    } catch(err) {
        actions.setApplicationState(false)
    }

    return {}

})

const actions = {
    success,
    failure,
    submit,
    setApplicationState,
}

const model = { ...initialState, ...actions }


export default model

