import { useQuery } from "@tanstack/react-query"


export const useActivityDashboard = ({userId}:{userId:number}) => {
    return useQuery({
        queryKey:["dashboard", userId],
        queryFn: async () => {
            const response = await fetch(`/api/activities/dashboard?userId=${userId}`)
            const data  = await response.json()

            return data.data
        }
    })
}