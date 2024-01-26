// https://tkdodo.eu/blog/effective-react-query-keys
//
const userKeys = {
    all:        ['users'],
    list :      () => [...userKeys.all, 'list'],
    details:    () => [...userKeys.all, 'detail'],
    detail:     (id) => [...userKeys.details(), id]
}

export { userKeys }
