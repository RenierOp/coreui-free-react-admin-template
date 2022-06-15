import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import axios from 'axios'

export default function UserRoles() {
  const auth = window.localStorage.getItem('token').replace(/['"]+/g, '')
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    getUserById()
    getAllRoles()
  }, [])

  const getUserById = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/user/${id}`
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      console.log(response.data)
      setUser(response.data)
    } catch (error) {}
  }
  const getAllRoles = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/users/roles`
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      console.log(response.data)
      setRoles(response.data)
    } catch (error) {}
  }
  return (
    <CCard>
      <CCardBody>
        <CCardTitle>Nombre:</CCardTitle>
        <p className="form-control">{user.name}</p>
        <CCardText>Listado de roles</CCardText>
        {roles.map((role) => (
          <CFormCheck key={role.id} id="flexCheckDefault" label={role.name} defaultChecked />
        ))}

        <CButton>Enviar</CButton>
      </CCardBody>
    </CCard>
  )
}
