import Todos from '@/components/todos/Todos'
import {Box, createStyles, Loader} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useStyles = createStyles(theme => ({
  placeholder: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Home = () => {
  const {classes} = useStyles()
  const router = useRouter()
  const [allow, setAllow] = useState(false)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      setAllow(true)
      router.push('/')
    } else {
      setAllow(false)
      router.push('/auth')
    }
  }, [])

  if (allow) {
    return (
      <Todos />
    )
  } else {
    return (
      <Box className={classes.placeholder}>
        <Loader color="yellow" />
      </Box>
    )
  }
}

export default Home