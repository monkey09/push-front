import TodosListItem from "./TodosListItem"

const TodosList = ({todos}) =>
 todos.map(todo => (<TodosListItem key={todo._id} todo={todo} />))

export default TodosList