import { API_URLS } from "../api/api-constants"

export const useGetAllAssets = async () => {
    try {
        const resp = await fetch(`${API_URLS.binance}bapi/composite/v1/public/marketing/symbol/list`)
        const data = await resp.json()
        return data?.data
    } catch (error) {
        throw error
    }
}