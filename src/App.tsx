import './App.css'
import {RouterProvider} from "react-router";
import {router} from "./router/Router.tsx";
import {useWebSocket} from "./services/websocketService.ts";

function App (){
    useWebSocket();
    return <RouterProvider router={router}/>
}

export default App
