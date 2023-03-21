import { MainState } from '@/contexts/Main'
import { init, subscribeButtonHandler } from '@/utils/push'
import { getTodos } from '@/utils/todo'
import { Container } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconInfoCircle } from '@tabler/icons'
import { useEffect } from 'react'
import Navbar from '../layout/Navbar'
import TodosPlaceholder from '../placeholders/TodosPlaceholder'
import TodosSkeleton from '../skeletons/TodosSkeleton'
import TodosAdd from './TodosAdd'
import TodosList from './TodosList'

const Todos = () => {
  const {todos, setTodos, user} = MainState()

  const notificationHandler = () => {
    init().then(data => {
      if (data === 'denied') {
        showNotification({
          id: 'notification-handler',
          color: 'red',
          title: 'You are not subscribed',
          message: 'Click me to allow notifications',
          icon: <IconInfoCircle size={16} />,
          autoClose: false,
          onClick: () => subscribeButtonHandler(user.token)
        })
      }
    })
  }
  useEffect(() => {
    if (user) {
      notificationHandler()
      getTodos({token: user.token}).then(data => {
        setTodos(data)
      })
    }
  }, [user])

  return (
    <>
      <Navbar />
      <Container size="xs" pt={50}>
        <TodosAdd />
        {!todos &&
          <TodosSkeleton />
        }
        {todos && todos.length > 0 &&
          <TodosList todos={todos} />
        }
        {todos && todos.length == 0 &&
          <TodosPlaceholder />
        }
      </Container>
    </>
  )
}

export default Todos