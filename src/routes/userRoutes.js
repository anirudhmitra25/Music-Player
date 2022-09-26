import Login from '../Containers/Login'
import Artist from '../Containers/Artist'
import Dashboard from '../Containers/Dashboard'
import Search from '../Containers/Search'

const userRoutes=[
    {
        path: "./login",
        exact: true,
        component: Login,
        isProtected: true,
    },
    {
        path: "./dashboard",
        exact: true,
        component: Dashboard,
        isProtected: false,
    },
    {
        path: "./artist",
        exact: true,
        component: Artist,
        isProtected: false,
    },
    {
        path: "./search",
        exact: true,
        component: Search,
        isProtected: false,
    }
]

export default userRoutes;