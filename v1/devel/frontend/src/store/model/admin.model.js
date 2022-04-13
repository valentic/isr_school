import { action, thunk } from 'easy-peasy'
import { adminService } from 'services'

const initialState = {
    users: {},
    applications: [],
    history: {}
}

const setUsers = action((state,payload) => {
    state.users = payload
})

const setHistory = action((state,payload) => {
    state.history = payload
})

const setApplications = action((state,payload) => {
    state.applications = payload
})

const getUsers = thunk(async (actions,payload,{dispatch}) => {
    adminService.getUsers()
        .then(results => actions.setUsers(results.users))
        .catch(err => {
            actions.setUsers({})
            dispatch.auth.logout()
        })
})

const getHistory = thunk(async (actions,payload,{dispatch}) => {
    adminService.getHistory()
        .then(results => actions.setHistory(results.history))
        .catch(err => {
            actions.setHistory({})
            dispatch.auth.logout()
        })
})

const getApplications = thunk(async (actions,payload,{dispatch}) => {
    adminService.getApplications()
        .then(results => actions.setApplications(results.applications))
        .catch(err => {
            actions.setApplications([])
            dispatch.auth.logout()
        })
})

const approveUser = thunk(async (actions,username,{dispatch}) => {
    adminService.approveUser(username)
        .then(results => actions.setUsers(results.users))
        .catch(err => {
            actions.setUsers({})
            dispatch.auth.logout()
        })
})

const denyUser = thunk(async (actions,username,{dispatch}) => {
    adminService.denyUser(username)
        .then(results => actions.setUsers(results.users))
        .catch(err => {
            actions.setUsers({})
            dispatch.auth.logout()
        })
})


const actions = {
    setUsers,
    getUsers,
    setHistory,
    getHistory,
    setApplications,
    getApplications,
    approveUser,
    denyUser,
}

const model = { ...initialState, ...actions }


export default model

