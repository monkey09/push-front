import { MainState } from "@/contexts/Main"
import { deleteTodo, updateTodo } from "@/utils/todo"
import { ActionIcon, Card, createStyles, LoadingOverlay, Text, Title, Transition } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconChecks, IconInfoCircle, IconTrash } from "@tabler/icons"
import moment from "moment"
import { useState } from "react"

const useStyles = createStyles(() => ({
  action1: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  action2: {
    position: 'absolute',
    top: 10,
    right: 50
  },
}))

const TodosListItem = ({todo}) => {
  const {classes} = useStyles()
  const {user, todos, setTodos} = MainState()
  const [visible, setVisible] = useState(false)

  const deleteHandler = () => {
    const request = {
      _id:todo._id
    }
    setVisible(true)
    deleteTodo({request, token: user.token}).then(data => {
      const newTodos = todos.filter(td => td._id !== data._id)
      setVisible(false)
      setTodos(newTodos)
    }).catch(e => {
      setVisible(false)
      showNotification({
        id: 'delete-todo',
        color: 'red',
        title: 'Failed!',
        message: `${e.message}`,
        icon: <IconInfoCircle size={16} />,
        autoClose: 3000
      })
    })
  }

  const updateHandler = () => {
    const request = {
      _id:todo._id,
      completed: !todo.completed
    }
    setVisible(true)
    updateTodo({request, token: user.token}).then(data => {
      const newTodos = todos.map(td => {
        if (td._id === data._id) 
          td.completed = data.completed
        return td
      })
      setVisible(false)
      setTodos(newTodos)
    }).catch(e => {
      setVisible(false)
      showNotification({
        id: 'update-todo',
        color: 'red',
        title: 'Failed!',
        message: `${e.message}`,
        icon: <IconInfoCircle size={16} />,
        autoClose: 3000
      })
    })
  }

  return (
    <Transition mounted={true} transition="fade" duration={400} timingFunction="ease">
      {(styles) => <div style={styles}>
        <Card withBorder mb="xs" pos="relative">
          <LoadingOverlay visible={visible} overlayBlur={2} />
          <ActionIcon className={classes.action1} onClick={deleteHandler}>
            <IconTrash color="red" stroke={1} />
          </ActionIcon>
          <ActionIcon className={classes.action2} onClick={updateHandler}>
            {todo.completed ? (
              <IconChecks color="green" stroke={1.4} />
            ) : (
              <IconCheck color="green" stroke={1.4} />
            )}
          </ActionIcon>
          <Title>{todo.title}</Title>
          <Text size="sm" italic color="dimmed">
            { moment(todo.schedule).format('D MMM h:mm A')}
          </Text>
          <Text>{todo.body}</Text>
        </Card>
      </div>}
    </Transition>
  )
}

export default TodosListItem