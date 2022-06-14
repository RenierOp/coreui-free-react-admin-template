import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserRoles() {
  const { id } = useParams()
  return <div>UserRoles {id}</div>
}
