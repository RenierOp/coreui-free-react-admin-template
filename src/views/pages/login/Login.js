import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [validated, setValidated] = useState(false)
  const [userName, setUserName] = useState('')
  const [axiosError, setAxiosError] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      try {
        const login_url = 'http://127.0.0.1:8000/api/login'
        const response = await axios.post(
          login_url,
          JSON.stringify({
            email: userName,
            password: pwd,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        console.log(JSON.stringify(response?.data))
        window.localStorage.setItem('token', JSON.stringify(response?.data?.accessToken))
        navigate('/', { replace: true })
      } catch (err) {
        if (!err?.response) {
          setAxiosError('No Server Response')
        } else if (err.response?.status === 400) {
          setAxiosError('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setAxiosError('Tu usuario o contraseña no fue encontrado')
        } else {
          setAxiosError('Login Failed')
        }
        alert(err)
      }
    }
    setValidated(true)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        feedbackInvalid="Introduce un nombre de usuario"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        feedbackInvalid="Introduce una contraseña"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    {axiosError ? <CAlert color="danger">{axiosError}</CAlert> : ''}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
