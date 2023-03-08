import axios from "axios"
import { QueryFilter } from "./type"

// Endpoints
const remoteSpaceDetailsUrl: string = 'https://api.spacexdata.com/v4/company'

const capsulesEndPoints = (page: number | string, query: QueryFilter) => ({
    method: 'POST',
    url: 'https://api.spacexdata.com/v4/capsules/query',
    data: {
        options: {
            pagination: true,
            limit: 6,
            offset: page,
        },
        query: (query.status || query.date || query.type) ? filterQuery(query) : {}
    },
})

const filterQuery: (q: QueryFilter) => any = ({ status, date, type }) => {

    let query: any = {};

    if (status) {
        query.status = { $eq: status };
    }
    if (date) {
        query.original_launch = { $eq: date };
    }
    if (type) {
        query.type = { $eq: type };
    }
    const q = {
        $and: [
            query
        ]
    }
    return q
}

export const getSpaceDetails: () => Promise<any> = async () => {
    const response = await fetch(remoteSpaceDetailsUrl)
        .then(res => ({ data: res.text() }))
    return response.data
}


export const getCapsules: (page: number | string, query: QueryFilter) => Promise<any> = async (page, query) => {
    const respo = await axios(capsulesEndPoints(page, query))
    return respo.data
}
