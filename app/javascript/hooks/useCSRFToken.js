import React, { useState, useEffect } from 'react'

const useCSRFToken = () => {
  const [csrfToken, setCSRFToken] = useState(null)

  useEffect(() => {
    setCSRFToken(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
  }, [])

  return csrfToken
}

export default useCSRFToken
