import { Button, PasswordInput, TextInput } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconInfoCircle, IconKey, IconMail, IconPencil } from '@tabler/icons'
import { useRouter } from 'next/router'
import { signup } from "@/utils/user"
import { useState } from 'react'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    validate: {
      name: isNotEmpty('Name Required!'),
      email: isEmail('Invalid Email!'),
      password: isNotEmpty('Password Required!')
    }
  })
  const submitted = async values => {
    const request = {
      name: values.name,
      email: values.email, 
      password: values.password
    }
    setLoading(true)
    signup({request}).then(data => {
      setLoading(false)
      form.reset()
      showNotification({
        id: 'signup-user',
        color: 'tail',
        title: 'Success!',
        message: `${data}`,
        icon: <IconCheck size={16} />,
        autoClose: 3000
      })
    }).catch(e => {
      setLoading(false)
      showNotification({
        id: 'signup-user',
        color: 'red',
        title: 'Failed!',
        message: `${e.message}`,
        icon: <IconInfoCircle size={16} />,
        autoClose: 3000
      })
    })
  }

  return (
    <form onSubmit={form.onSubmit(values => submitted(values))}>
      <TextInput
        mb="sm"
        disabled={loading}
        autoComplete="off"
        variant="filled"
        withAsterisk
        icon={<IconPencil stroke={1.4} size={20} />}
        label="Name"
        placeholder="your name"
        {...form.getInputProps('name')}
      />
      <TextInput
        mb="sm"
        disabled={loading}
        autoComplete="off"
        variant="filled"
        icon={<IconMail stroke={1.4} size={20} />}
        withAsterisk
        label="E-mail"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mb="lg"
        disabled={loading}
        withAsterisk
        autoComplete="off"
        variant="filled"
        icon={<IconKey stroke={1.4} size={20} />}
        label="Password"
        placeholder="password"
        {...form.getInputProps('password')}
      />
      <Button 
        type="submit" 
        color="green"
        variant="light" 
        loading={loading}
        fullWidth
      >
        SIGNUP
      </Button>
    </form>
  )
}

export default Signup