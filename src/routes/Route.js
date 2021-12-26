import PostDetail from "../pages/PostDetail";
import UserDetail from "../pages/UserDetail";
import HomePage from "../pages/HomePage";

export const routes =[
    {
        "path":"/",
        "component":HomePage,
        "exact":true,
    },
    {
        "path":"/user/detail/:id",
        "component":UserDetail,
        "exact":true
    },
    {
        "path":"/user/detail/:id/:userId",
        "component":PostDetail,
        "exact":true
    }
]