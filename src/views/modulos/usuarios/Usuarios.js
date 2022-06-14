import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Usuarios() {
  const [users, setUsers] = useState([])

  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const firstPage = 1
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    getUsers()
  }, [limit, offset])

  const getUsers = async () => {
    const auth = window.localStorage.getItem('token').replace(/['"]+/g, '')
    console.log(auth)
    try {
      const url = `http://127.0.0.1:8000/api/users/`
      const response = await axios({
        method: 'GET',
        url: url,
        params: {
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      setUsers(response.data.users)
      setLastPage(Math.ceil(response.data.all / limit))
      //   setUsers(response.data.users)
      //   setUsersCount(response.data.all)
    } catch (error) {}
  }
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
    <>
      <CPagination align="end" aria-label="Page navigation">
        {offset > 3 ? (
          <>
            <CPaginationItem aria-label="Previous" onClick={previousPage}>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem onClick={selectPage}>{firstPage}</CPaginationItem>
            <CPaginationItem disabled>...</CPaginationItem>
            {offset === lastPage ? (
              <CPaginationItem onClick={selectPage}>{offset - 2}</CPaginationItem>
            ) : (
              ''
            )}
            <CPaginationItem onClick={selectPage}>{offset - 1}</CPaginationItem>
            <CPaginationItem active>{offset}</CPaginationItem>
            {offset >= lastPage - 1 ? (
              <>
                {offset === lastPage ? (
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
            <CPaginationItem aria-label="Previous" onClick={previousPage} disabled={offset === 1}>
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
      <CTable color="primary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Creado</CTableHeaderCell>
            <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.created_at}</CTableDataCell>
              <CTableDataCell>
                <Link to={`/modulos/soporte/usuarios/roles/${user.id}`} className="btn btn-warning">
                  Roles
                </Link>
                <button className="btn btn-danger">Eliminar</button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
