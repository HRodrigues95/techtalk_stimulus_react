import React, { useCallback, useState } from 'react'

// Components
import CategorySelectRow from './Row'

// Utils
import { TodoUrl, CategoriesUrl } from '../../utils/urls'

// hooks
import useCSRFToken from '../../hooks/useCSRFToken'

// Styles
import styles from './style.module.css'

const CategorySelect = ({ todo_id, current_categories }) => {
  const csrfToken = useCSRFToken()
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentCategories, setCurrentCategories] = useState(JSON.parse(current_categories))

  const updateTodo = useCallback(async (desiredCategories) => {
    try {
      const formData = new FormData()
      if (desiredCategories.length > 0) {
        desiredCategories.forEach(category => {
          formData.append('todo[category_ids][]', category)
        })
      } else {
        formData.append('todo[category_ids][]', '')
      }

      const options = {
        method: 'PATCH',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'application/json'
        },
        body: formData
      }
      const response = await fetch(TodoUrl(todo_id), options)
      if (response.ok) {
        const data = await response.json()
        setCurrentCategories(data.categories)
      }
    } catch (error) {
      console.error(error)
    }
  }, [csrfToken, todo_id])

  const handleRemoveCategory = useCallback(async (id) => {
    const filteredCategories = currentCategories?.filter(category => category.id !== id) || []
    await updateTodo(filteredCategories.map(category => category.id))
  }, [currentCategories, updateTodo])

  const handleChange = useCallback(async (event) => {
    console.log('handleChange', event.target.value)
    const categoryId = Number(event.target.value)
    const mappedCategories = currentCategories?.map(category => category.id) || []
    if (!mappedCategories.includes(categoryId)) updateTodo([...mappedCategories, categoryId])
  }, [currentCategories, updateTodo])

  // This can be refactored to use a useEffect to fetch the categories when the component mounts
  // and have an event to trigger a refetch of the categories when the categories are updated
  // For now, this is fine since the categories are not updated frequently and this is a test app
  const handleFocus = useCallback(async () => {
    setSelectedCategory('')
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'application/json'
        }
      }

      const response = await fetch(CategoriesUrl(), options)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="category-select">
      <select value={selectedCategory} onChange={handleChange} onFocus={handleFocus}>
        <option disabled selected value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <div className={styles.categoryItems}>
        {currentCategories?.map((category) => (
          <CategorySelectRow key={category.id} category={category} onRemove={handleRemoveCategory} />
        ))}
      </div>
    </div>
  )
}

export default CategorySelect
