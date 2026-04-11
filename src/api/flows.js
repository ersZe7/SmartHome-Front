import api from './axios.js'

export const getNetworkDevices = () => {
    return api.get('/network/devices')
}

export const getResults = () => {
    return api.get('/flows/results')
}

export const analyzeWindow = (flows) => {
    return api.post('/flows/analyze-window', flows)
}