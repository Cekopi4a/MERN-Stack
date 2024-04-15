import * as request from '../request/request';

const baseUrl = 'http://localhost:5050/api/auth';

{/*export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

const token = localStorage.getItem('token');

*/}
export const login = async (email,password) =>{
    const response = await fetch(`${baseUrl}/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(email,password),
    })   

    const result = await response.json();
         

    if(response.ok){
        localStorage.setItem('user',JSON.stringify(result))
    }
    console.log(email);
    console.log(typeof(result));

    {/* if(response.status === 201){
        message.success(data.message);
        login(result.token,result.user);
     }else if (response.status === 4000) {
        setError(result.message);
     }else{
        message.error('R')
     }
     */}
    return result;
}

export const register = (email, password) => request.post(`${baseUrl}/signup`, {
    email,
    password,
});

export const logout = () => request.get(`${baseUrl}/logout`);