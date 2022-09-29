import React, { FC, useRef } from 'react'
import './Filter.scss'
const columnOptions = [
    {
        id: 'name',
        name: 'Название',
    },
    {
        id: 'amount',
        name: 'Количество',
    },
    {
        id: 'distance',
        name: 'Расстояние',
    },
    {
        id: 'date',
        name: 'Дата',
    },
]
const typeOptions = [
    {
        id: 'equal',
        name: 'Равен',
    },
    {
        id: 'has',
        name: 'Содержит',
    },
    {
        id: 'more',
        name: 'Больше',
    },
    {
        id: 'less',
        name: 'Меньше',
    },
]

interface FilterProps {
    onClick: (
        type: 'equal' | 'has' | 'more' | 'less',
        column: 'name' | 'amount' | 'distance' | 'date',
        value: string | number
    ) => void
}

export const Filter: FC<FilterProps> = ({ onClick }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const columnRef = useRef<HTMLSelectElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const onSubmit = () => {
        let column = columnOptions[0].id
        let type = typeOptions[0].id
        let value = ''
        if (columnRef.current) {
            column = columnOptions.find(
                (c) => c.name === columnRef.current!.value
            )!.id
        }
        if (typeRef.current) {
            type = typeOptions.find(
                (c) => c.name === typeRef.current!.value
            )!.id
        }
        if (inputRef.current) {
            value = inputRef.current.value
        }

        onClick(
            type as 'equal' | 'has' | 'more' | 'less',
            column as 'name' | 'amount' | 'distance' | 'date',
            value.trim()
        )

        inputRef.current!.value = ''
    }
    return (
        <div className='filter'>
            <p>Фильтр:</p>
            <select ref={columnRef}>
                {columnOptions.map((opt) => (
                    <option key={opt.id}>{opt.name}</option>
                ))}
            </select>
            <select ref={typeRef}>
                {typeOptions.map((opt) => (
                    <option key={opt.id}>{opt.name}</option>
                ))}
            </select>
            <input ref={inputRef} />
            <button onClick={onSubmit}>Отфильтровать</button>
        </div>
    )
}
