import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'
import Pagination from 'src/components/dataTable/Pagination'
import { Link } from 'react-router-dom'

export default function MisTickets() {
  const [users, setUsers] = useState([])

  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

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

  return (
    <>
      <Pagination offSet={offset} lastPage={lastPage} />
      {offset}
      <CTable color="primary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Creado</CTableHeaderCell>
            <CTableHeaderCell scope="col">Botones</CTableHeaderCell>
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
                <Link
                  to={`/modulos/soporte/mis-tickets/roles/${user.id}`}
                  className="btn btn-warning"
                >
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
