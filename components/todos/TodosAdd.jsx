import { MainState } from "@/contexts/Main"
import { addTodo } from "@/utils/todo"
import { Box, Button, TextInput } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { isNotEmpty, useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { IconClock, IconInfoCircle, IconMessage, IconPencil, IconPlus } from "@tabler/icons"
import { useState } from "react"

const TodosAdd = () => {
  const [loading, setLoading] = useState(false)
  const {user, todos, setTodos} = MainState()
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
      schedule: ''
    },

    validate: {
      title: isNotEmpty('Title Required!'),
      body: isNotEmpty('Body Required!'),
      schedule: isNotEmpty('Schedule Required!'),
    }
  })
  const submitted = async values => {
    const request = {
      title: values.title, 
      body: values.body,
      schedule: values.schedule,
    }
    setLoading(true)
    addTodo({request, token: user.token}).then(data => {
      setTodos([data, ...todos])
      setLoading(false)
      form.reset()
    }).catch(e => {
      setLoading(false)
      showNotification({
        id: 'add-todo',
        color: 'red',
        title: 'Failed!',
        message: `${e.message}`,
        icon: <IconInfoCircle size={16} />,
        autoClose: 3000
      })
    })
  }

  return (
    <Box mb="lg">
      <form onSubmit={form.onSubmit(values => submitted(values))}>
        <TextInput
          mb="sm"
          disabled={loading}
          autoComplete="off"
          variant="filled"
          icon={<IconPencil stroke={1.4} size={20} />}
          withAsterisk
          label="Title"
          placeholder="your title"
          {...form.getInputProps('title')}
        />
        <TextInput
          mb="sm"
          disabled={loading}
          autoComplete="off"
          variant="filled"
          icon={<IconMessage stroke={1.4} size={20} />}
          withAsterisk
          label="Content"
          placeholder="your content"
          {...form.getInputProps('body')}
        />
        <DateTimePicker
          mb="md"
          disabled={loading}
          placeholder="your schedule"
          autoComplete="off"
          variant="filled"
          icon={<IconClock stroke={1.4} size={20} />}
          withAsterisk
          label="Schedule"
          {...form.getInputProps('schedule')}
        />
        <Button
          type="submit" 
          variant="light" 
          loading={loading}
          leftIcon={<IconPlus stroke={1.4} size={20} />}
          fullWidth
        >
          ADD
        </Button>
      </form>
    </Box>
  )
}

export default TodosAdd