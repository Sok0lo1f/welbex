import React, { FC, useEffect, useState } from 'react'
import { ITravel } from '../../interfaces/Travel'
import './Table.scss'
interface TableProps {
    travels: ITravel[]
    loading: boolean
}
export const Table: FC<TableProps> = ({ travels, loading }) => {
    const [tableTravels, setTableTravels] = useState(travels)

    useEffect(() => {
        setTableTravels(travels)
    }, [travels])

    const sortTable = (
        col: 'name' | 'amount' | 'distance',
        type: 'desc' | 'asc'
    ) => {
        const sorted = [...tableTravels].sort((a, b) => {
            if (type === 'desc') {
                return compare(a, b, col)
            }
            return compare(b, a, col)
        })

        setTableTravels(sorted)
    }

    const compare = (
        a: ITravel,
        b: ITravel,
        col: 'name' | 'amount' | 'distance'
    ) => {
        if (a[col] > b[col]) return -1
        if (a[col] < b[col]) return 1
        return 0
    }

    const cellClickHandler = (
        e: React.MouseEvent<HTMLTableCellElement>,
        col: 'name' | 'amount' | 'distance'
    ) => {
        const elem = e.target as HTMLElement

        sortTable(col, elem.dataset.type as 'desc' | 'asc')
        elem.dataset.type === 'asc'
            ? (elem.dataset.type = 'desc')
            : (elem.dataset.type = 'asc')
    }

    return (
        <table className='table'>
            <thead>
                <tr className='table__header'>
                    <th
                        className='table__header--item'
                        data-type='desc'
                        onClick={(e) => cellClickHandler(e, 'name')}>
                        Название
                    </th>
                    <th
                        data-type='desc'
                        className='table__header--item'
                        onClick={(e) => cellClickHandler(e, 'amount')}>
                        Количество
                    </th>
                    <th
                        data-type='desc'
                        className='table__header--item'
                        onClick={(e) => cellClickHandler(e, 'distance')}>
                        Расстояние
                    </th>
                    <th className='table__header--item'>Дата</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td>Loading</td>
                    </tr>
                ) : (
                    tableTravels.map((travel) => (
                        <tr key={travel._id} className='table__row'>
                            <td className='table__row--item --name'>
                                {travel.name}
                            </td>
                            <td className='table__row--item --amount'>
                                {travel.amount}
                            </td>
                            <td className='table__row--item --distance'>
                                {travel.distance}
                            </td>
                            <td className='table__row--item --date'>
                                {new Date(travel.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}
