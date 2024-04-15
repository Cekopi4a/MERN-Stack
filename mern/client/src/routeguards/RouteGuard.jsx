import { useContext } from "react"
import { Navigate,Outlet } from "react-router-dom";
import {AuthContext} from '../context/AuthContext';

export default function RuuteGuard(props) {
    const {user} = useContext(AuthContext);

    if(!user) {
        return <Navigate to='/login' />
    }


    return(
         <>
         <Outlet />
         </>
    )
}