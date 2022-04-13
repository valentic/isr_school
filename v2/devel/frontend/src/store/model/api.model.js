import { thunk } from 'easy-peasy'
import { apiService } from 'services'

const launchJupyter = thunk(async (actions,payload) => {
    await apiService.launchJupyter()
    return {}
})

const initialState = {
}

const actions = {
    launchJupyter
}

const model = { ...initialState, ...actions }


export default model

