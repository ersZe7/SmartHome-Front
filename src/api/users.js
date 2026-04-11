import api from "./axios";

export const updateTelegramId = (telegram_user_id) => {
    return api.patch('/users/me/telegram-id', { telegram_user_id })
}

export const getTelegramId = () => {
    return api.get('/users/me/telegram-id')
}

export const getOrangePiId = () => {
    return api.get('/users/me/orange-pi-id')
}

export const updateOrangePiId = (orange_pi_id) => {
    return api.patch('users/me/orange-pi-id', { orange_pi_id })
}