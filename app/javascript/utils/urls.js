export const TodosUrl = (completed = false) => {
  return `/todos${completed ? "?completed=true" : ""}`
}
