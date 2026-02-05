import { AdminHome } from './AdminHome'
import { ApplicationList } from './ApplicationList'
import { ApplicationDetail } from './ApplicationDetail'
import { ApplicationDownloadPDF } from './ApplicationDownloadPDF'
import { UserList } from './UserList'
import { UserView } from './UserView'
import { UserCreate } from './UserCreate'
import { UserUpdate } from './UserUpdate'
import { UserDelete } from './UserDelete'
import { RoleList } from './RoleList'

const Admin = {
    Home:  AdminHome,

    Applications: {
        Active: {
            List:   ApplicationList.Active, 
            Detail: ApplicationDetail.Active,
            PDF:    ApplicationDownloadPDF
        },
        Trash: {
            List:   ApplicationList.Trash, 
            Detail: ApplicationDetail.Trash
        }
    },

    Users: {
        List:   UserList,
        View:   UserView,
        Create: UserCreate,
        Update: UserUpdate,
        Delete: UserDelete
    },

    Roles: {
        List:   RoleList
    }
}

export { Admin }

