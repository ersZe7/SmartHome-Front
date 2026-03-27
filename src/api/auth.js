import api from "./axios";

export const sendCode = (email) => {
    return api.post('/auth/register/send-code', { email })
}

export const register = (email, code, password) => {
    return api.post('/auth/register', { email, code, password })
}

export const login = (email, password) => {
    return api.post('/auth/login', { email, password })
}