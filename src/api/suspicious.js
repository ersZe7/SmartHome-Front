import api from "./axios";

export const getSuspiciousPackets = (params = {}) => {
    return api.get('suspicious/packets,', { params })
}

export const updatePacketLabel = (packetId, label) => {
    return api.patch('suspicious/packets/${packetId}/label', { label })
}


