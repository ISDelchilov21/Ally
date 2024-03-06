import React from "react"
import "./app.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Home from "./routes/Home"
import SignIn from "./routes/SignIn"
import SignUp from "./routes/SignUp"
import Loby from "./routes/Loby"
import Bulgarian from "./routes/Bulgarian"
import Math from "./routes/Math"
import English from "./routes/English"
import Account from "./routes/Account"
export default function App(){
    const BrowserRouter = createBrowserRouter([
        {path:"/", element:<Home/>},
        {path:"/user-account/signup", element:<SignUp/>},
        {path:"/user-account/signin", element:<SignIn/>},
        {path:"/loby-classrooms", element:<Loby/>},
        {path:"/loby-clasrooms/bulgariian", element:<Bulgarian/>},
        {path:"/loby-clasrooms/math", element:<Math/>},
        {path:"/loby-clasrooms/english", element:<English/>},
        {path:"/user-account", element:<Account/>}
        
    ])
    return(
        <RouterProvider router={BrowserRouter}/>
    )
} 



