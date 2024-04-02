import * as request from '../request/request';

const baseUrl = 'http://localhost:5050/api/auth';

{/*export const login = async (email, password,role) => {
    const result = await request.get(`${baseUrl}/login`, {
        email,
        password,
        role,
    });

    return result;
};
*/}
const token = localStorage.getItem('accessToken');

export const login = async (email,password) =>{
    const response = await fetch(`${baseUrl}/login`,{
        method: 'POST',
        headers:{
            accept: 'application/json',
          },
        body: JSON.stringify(email,password)
    });

    const result = await response.json();

    return result;
}

export const register = (email, password) => request.post(`${baseUrl}/signup`, {
    email,
    password,
});

export const logout = () => request.get(`${baseUrl}/logout`);