//importar los layouts
import LayoutAdmin from "../layouts/LayoutAdmin";

//improtar pages
import AdminHome from "../pages/Admin";
import AdminSingin from "../pages/Admin/SignIn/Singin";

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSingin,
                exact: true
            }
        ]
    }
]

export default routes;