import React, { useCallback, useState } from 'react'

// Styles
import styles from './style.module.css'

// utils
import { TodoUrl } from '../../utils/urls'

// hooks
import useCSRFToken from '../../hooks/useCSRFToken'

const TodoRow = ({ todo }) => {
  const [loading, setLoading] = useState(false)
  const csrfToken = useCSRFToken()

  const handleDestroy = useCallback(async (id) => {
    setLoading(true)
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'text/vnd.turbo-stream.html'
        }
      }

      const response = await fetch(TodoUrl(id), options)

      if (response.ok) {
        const turboStreamContent = await response.text()
        // Process the turbo-stream response
        if (turboStreamContent) {
          const parser = new DOMParser()
          const doc = parser.parseFromString(turboStreamContent, 'text/html')
          const turboStreamElements = doc.querySelectorAll('turbo-stream')

          turboStreamElements.forEach(element => {
            // Dispatch the turbo-stream element to be processed by Turbo
            document.documentElement.appendChild(element)
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }, [csrfToken])

  if (!todo) return null
  const { id, name, description, priority, created_at, updated_at } = todo

  return (
    <div
      key={id}
      className={styles.container}
      data-controller="expand"
      data-expand-id-value={id}
      data-expand-context-value="todo_completed"
    >
      {loading && <div className={styles.loading}>Loading...</div>}

      <div
        className={styles.header}
        data-action="click->expand#expand"
      >
        <h4>{name}</h4>
      </div>

      <div
        className={styles.info}
        data-expand-target="content"
      >
        <p>{description}</p>
        <p>{priority}</p>
        <p>{created_at}</p>
        <p>{updated_at}</p>

        <button onClick={() => handleDestroy(id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoRow
