import axios from 'axios'
import { IApi } from '../interfaces/Api'
import { ITravel } from '../interfaces/Travel'
import { Api } from './Api'

export class TravelService extends Api {
    constructor() {
        super()
    }

    getTravels = async(page: number, filterParams?: GetTravelsFilterParams) => {
        try {
            const travels = await axios.get<IApi<ITravel>>(`${this.API}/travels`, {
                params: {
                    ...filterParams,
                    page
                }
            })
            return travels.data
        } catch (e: any) {
            throw new Error(e.message)
        }
    }
}

export interface GetTravelsFilterParams {
    name?: string
    amount?: number
    date?: string
    distance?: number
    type: 'equal' | 'has' | 'more' | 'less'
}