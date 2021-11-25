import Application from "./Components/Application";
import Chat from "./Components/Chat";
import Login from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import Signin from "./Components/Signin"

export const routerMap = [
    {path:"/signin",name:"signin",component:Signin},
    {path:"/login",name:"login",component:Login},
    {path:"/dashboard",name:"dashboard",component:Dashboard,auth:true},
    {path:"/channel:id",name:"channel",component:Chat,auth:true},
]