import React, { useCallback } from 'react'

// Styles
import styles from './style.module.css'

const CategorySelectRow = ({ category, onRemove }) => {
  const handleRemove = useCallback(async () => {
    if (!category.id) return

    onRemove(category.id)
  }, [onRemove])

  return (
    <div key={category.id} className={styles.categoryRow}>
      <p>{category.name}</p>

      <button onClick={() => handleRemove()}>Remove</button>
    </div>
  )
}

export default CategorySelectRow
