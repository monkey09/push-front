import { Button, PasswordInput, TextInput } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconInfoCircle, IconKey, IconMail } from '@tabler/icons'
import { useRouter } from 'next/router'
import { signin } from "@/utils/user"
import { useState } from 'react'
import { MainState } from "@/contexts/Main"

const Signin = () => {
  const {setUser} = MainState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: isEmail('Invalid Email!'),
      password: isNotEmpty('Password Required!')
    }
  })
  const submitted = async values => {
    const request = {
      email: values.email, 
      password: values.password
    }
    setLoading(true)
    signin({request}).then(data => {
      setUser(data)
      const userInfo = JSON.stringify(data)
      localStorage.setItem('userInfo', userInfo)
      setLoading(false)
      form.reset()
      router.push('/')
    }).catch(e => {
      setLoading(false)
      showNotification({
        id: 'signin-user',
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
        icon={<IconKey stroke={1.4} size={20} />}
        variant="filled"
        label="Password"
        placeholder="password"
        {...form.getInputProps('password')}
      />
      <Button 
        type="submit" 
        variant="light" 
        loading={loading}
        fullWidth
      >
        SIGNIN
      </Button>
    </form>
  )
}

export default Signin