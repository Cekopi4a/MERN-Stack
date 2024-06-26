import { useContext, useEffect } from "react";

import * as authService from '../service/authService';
import { useNavigate } from "react-router-dom";
import Path from "../path";
import {AuthContext} from '../context/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const {logoutHandler}=useContext(authContext);

    useEffect(() => {
    authService.logout()
    .then(() => {logoutHandler();
        navigate(Path.Home);
    })
    .catch( () => {
        logoutHandler(); 
        navigate('/login')});
    
},[]);

return null;

}