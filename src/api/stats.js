import api from './axios.js'

export const getTrafficTimeseries = (groupBy = 'day') => {
    return api.get(`/stats/traffic/timeseries?group_by=${groupBy}`)
}