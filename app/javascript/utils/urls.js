export const TodosUrl = (completed = false) => {
  return `/todos${completed ? "?completed=true" : ""}`
}

export const TodoUrl = (id) => `/todos/${id}`
