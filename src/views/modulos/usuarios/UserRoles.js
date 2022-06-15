import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import axios from 'axios'

export default function UserRoles() {
  const auth = window.localStorage.getItem('token').replace(/['"]+/g, '')
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [roles, setRoles] = useState([])

  const [userRoles, setUserRoles] = useState([])
  const [formularioEnviado, setFormularioEnviado] = useState('')
  const [asyncLoad, setAsyncLoad] = useState(false)

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
      setUser(response.data)
      //console.log(response.data.roles)
      var tmp = new Array()
      //tmp.push('Admin')
      response.data.roles.map(
        (role) =>
          //console.log("Despues:")
          tmp.push(role.name),
        //setUserRoles()
      )

      //console.log(tmp)
      setUserRoles(tmp)
      setAsyncLoad(true)
      //console.log(response.data)
    } catch (error) {}
  }
  const getAllRoles = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/users/roles`
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      //console.log(response.data)
      setRoles(response.data)
    } catch (error) {}
  }
  return (
    <>
      {asyncLoad ? (
        <CCard>
          <CCardBody>
            <CCardTitle>Nombre:</CCardTitle>
            <p className="form-control">{user.name}</p>
            <Formik
              initialValues={{
                roles: userRoles,
              }}
              validate={(valores) => {
                let errores = {}

                return errores
              }}
              onSubmit={async (valores, { resetForm }) => {
                try {
                  const url = `http://127.0.0.1:8000/api/users/roles`
                  //resetForm()
                  //console.log(valores.roles)
                  const response = await axios({
                    method: 'POST',
                    url: url,
                    data: {
                      id: id,
                      roles: valores.roles,
                    },
                    headers: { Authorization: `Bearer ${auth}` },
                  })
                  setFormularioEnviado(response.data.message)
                  //console.log(response.data)
                } catch (error) {}
              }}
            >
              {({ errors }) => (
                <Form>
                  <div>
                    {roles.map((role) => (
                      <div key={role.id}>
                        <label>
                          <Field type="checkbox" name="roles" value={role.name} /> {role.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                  {formularioEnviado && <p className="alert alert-success">{formularioEnviado}</p>}
                </Form>
              )}
            </Formik>
          </CCardBody>
        </CCard>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  )
}
