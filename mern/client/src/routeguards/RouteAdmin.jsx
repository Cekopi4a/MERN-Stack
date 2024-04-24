import { useContext } from "react"
import { Navigate,Outlet } from "react-router-dom";
import {AuthContext} from '../context/AuthContext';

export default function RouteAdmin(props) {
    const {user} = useContext(AuthContext);

    if(user.role == "admin") {
        return <Navigate to='/login' />
    }


    return(
         <>
         <Outlet />
         </>
    )
}