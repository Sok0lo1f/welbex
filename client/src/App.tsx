import React, { useEffect, useState } from 'react'
import { TravelService, GetTravelsFilterParams } from './api/TravelService'
import './App.scss'
import { Filter } from './components/filter/Filter'
import { Pagination } from './components/pagination/Pagination'
import { Table } from './components/table/Table'
import { ITravel } from './interfaces/Travel'

const App = () => {
    const [travels, setTravels] = useState<ITravel[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [filterParams, setFilterParams] = useState<GetTravelsFilterParams>()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMount = true
        const getTravels = async () => {
            try {
                setLoading(true)
                const api = new TravelService()
                const res = await api.getTravels(currentPage, filterParams)
                if (isMount) {
                    setTravels(res.data)
                    setPages(res.pages)
                }
            } catch (e: any) {
                console.log(e)
                alert(e.message)
            } finally {
                setLoading(false)
            }
        }

        getTravels()
        return () => {
            isMount = false
        }
    }, [currentPage, filterParams])

    return (
        <div className='app'>
            <h1>Тестовое задание</h1>
            <Filter
                onClick={(type, column, value) => {
                    setCurrentPage(1)
                    setFilterParams({
                        [column]: value,
                        type,
                    })
                }}
            />
            <Pagination
                currentPage={currentPage}
                changeCurrentPage={setCurrentPage}
                pages={pages}
            />
            <Table loading={loading} travels={travels} />
        </div>
    )
}

export default App
