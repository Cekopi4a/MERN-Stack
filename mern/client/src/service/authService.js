import * as request from '../request/request';

const baseUrl = 'http://localhost:5050/users';

export const login = async (email, password,table) => {
    const result = await request.get(`${baseUrl}`, {
        email,
        password,
       table
    });

    return result;
};

export const register = (email, password,firstName) => request.post(`${baseUrl}/register`, {
    email,
    password,
    firstName,
});

export const logout = () => request.get(`${baseUrl}/logout`);