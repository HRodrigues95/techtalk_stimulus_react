import React from 'react'

// Styles
import styles from './style.module.css'

const TodoRow = ({ todo }) => {

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
      </div>
    </div>
  )
}

export default TodoRow
