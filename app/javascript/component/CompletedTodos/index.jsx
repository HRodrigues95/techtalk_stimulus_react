import React, { useCallback, useEffect, useMemo, useState } from 'react'

// Components
import TodoRow from '../TodoRow'

// Styles
import styles from './style.module.css'

// Utils
import { TodosUrl } from '../../utils/urls'

const CompletedTodos = () => {
  // State
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  // Functions
  const getTodos = useCallback(async () => {
    setLoading(true)
    try {
      const options = {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      }

      const response = await fetch(TodosUrl(true), options)
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }, [])

  const handleCompletedEvent = useCallback((event) => {
    if (event.detail.component === 'CompletedTodos') getTodos()
  }, [])

  // Effects
  useEffect(() => {
    getTodos()

    document.addEventListener('event.todo_completed', handleCompletedEvent)

    return () => {
      document.removeEventListener('event.todo_completed', handleCompletedEvent)
    }
  }, [])

  // Render
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Completed Todos</h3>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.todos}>
          {todos.map((todo) => <TodoRow key={todo.id} todo={todo} />)}
        </div>
      )}
    </div>
  )
}

export default CompletedTodos
