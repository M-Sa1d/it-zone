import React from 'react'

export default function CheckRole({userRole,roles,children}) {
  return roles.some(item=>item===userRole)?<>{children}</>:"Not found"
}
