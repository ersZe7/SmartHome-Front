import api from "./axios";

export const updateTelegramId = (telegram_user_id) => {
    return api.patch('/users/me/telegram-id', { telegram_user_id })

}