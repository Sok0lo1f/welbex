import React, { FC, useMemo } from 'react'
import './Pagination.scss'

interface PaginationProps {
    currentPage: number
    pages: number
    changeCurrentPage: (newPage: number) => void
}
export const Pagination: FC<PaginationProps> = ({
    currentPage,
    pages,
    changeCurrentPage,
}) => {
    const pageNumbers = useMemo(() => {
        const numbers = []

        for (let i = 0; i < pages; i++) {
            numbers.push(i + 1)
        }
        return numbers
    }, [pages])
    if (pages < 2) return null
    return (
        <div className='pagination'>
            <div
                className='pagination__item'
                onClick={() => changeCurrentPage(1)}>
                {'<'}
            </div>
            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={`pagination__item${
                        pageNumber === currentPage ? ' --active' : ''
                    }`}
                    onClick={() => changeCurrentPage(pageNumber)}>
                    {pageNumber}
                </div>
            ))}
            <div
                className='pagination__item'
                onClick={() => changeCurrentPage(pages)}>
                {'>'}
            </div>
        </div>
    )
}
