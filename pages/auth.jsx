import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
import {Box, createStyles, Loader, Tabs} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useStyles = createStyles(() => ({
  container: {
    width: 400,
  },
  placeholder: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Auth = () => {
  const {classes} = useStyles()
  const router = useRouter()
  const [allow, setAllow] = useState(false)
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      setAllow(false)
      router.push('/')
    } else {
      setAllow(true)
      router.push('/auth')
    }
  }, [])

  if (allow) {
    return (
      <Box className={classes.container} pt={150} mx="auto">
        <Tabs keepMounted={false} color="yellow" variant="pills" defaultValue="signin">
          <Tabs.List grow>
            <Tabs.Tab value="signin" fw="bold">SIGNIN</Tabs.Tab>
            <Tabs.Tab value="signup" fw="bold">SIGNUP</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="signin" pt="xl">
            <Signin />
          </Tabs.Panel>
          <Tabs.Panel value="signup" pt="xl">
            <Signup />
          </Tabs.Panel>
        </Tabs>
      </Box>
    )
  } else {
    return (
      <Box className={classes.placeholder}>
        <Loader color="yellow" />
      </Box>
    )
  }
}

export default Auth