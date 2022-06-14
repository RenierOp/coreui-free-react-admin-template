import React, { useState } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

export default function Pagination(props) {
  console.log(props)
  const [offset, setOffset] = useState(1)
  const lastPage = 600
  const firstPage = 1

  const previousPage = (e) => {
    if (offset > 1) {
      setOffset(offset - 1)
    }
  }

  const nextPage = (e) => {
    setOffset(offset + 1)
  }

  const selectPage = (e) => {
    const val = parseInt(e.target.innerText)
    setOffset(val)
  }
  return (
    <CPagination align="end" aria-label="Page navigation">
      {offset > 3 ? (
        <>
          <CPaginationItem aria-label="Previous" onClick={previousPage}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          <CPaginationItem onClick={selectPage}>{firstPage}</CPaginationItem>
          <CPaginationItem disabled>...</CPaginationItem>
          {offset == lastPage ? (
            <CPaginationItem onClick={selectPage}>{offset - 2}</CPaginationItem>
          ) : (
            ''
          )}
          <CPaginationItem onClick={selectPage}>{offset - 1}</CPaginationItem>
          <CPaginationItem active>{offset}</CPaginationItem>
          {offset >= lastPage - 1 ? (
            <>
              {offset == lastPage ? (
                <CPaginationItem aria-label="Next" onClick={nextPage} disabled>
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              ) : (
                <>
                  <CPaginationItem onClick={selectPage}>{offset + 1}</CPaginationItem>
                  <CPaginationItem aria-label="Next" onClick={nextPage}>
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </>
              )}
            </>
          ) : (
            <>
              <CPaginationItem onClick={selectPage}>{offset + 1}</CPaginationItem>
              <CPaginationItem disabled>...</CPaginationItem>
              <CPaginationItem onClick={selectPage}>{lastPage}</CPaginationItem>
              <CPaginationItem aria-label="Next" onClick={nextPage}>
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </>
          )}
        </>
      ) : (
        <>
          <CPaginationItem aria-label="Previous" onClick={previousPage} disabled={offset == 1}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {offset > 2 ? <CPaginationItem onClick={selectPage}>{offset - 2}</CPaginationItem> : ''}
          {offset > 1 ? <CPaginationItem onClick={selectPage}>{offset - 1}</CPaginationItem> : ''}
          <CPaginationItem active>{offset}</CPaginationItem>
          <CPaginationItem onClick={selectPage}>{offset + 1}</CPaginationItem>
          {offset > 2 ? '' : <CPaginationItem onClick={selectPage}>{offset + 2}</CPaginationItem>}
          {offset > 1 ? '' : <CPaginationItem onClick={selectPage}>{offset + 3}</CPaginationItem>}
          <CPaginationItem disabled>...</CPaginationItem>
          <CPaginationItem onClick={selectPage}>{lastPage}</CPaginationItem>
          <CPaginationItem aria-label="Next" onClick={nextPage}>
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </>
      )}
    </CPagination>
  )
}
