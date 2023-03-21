import { MainState } from "@/contexts/Main"
import { ActionIcon, Card, createStyles, Indicator, Menu, Text } from "@mantine/core"
import { IconBell } from "@tabler/icons"
import { useEffect } from "react"

const useStyles = createStyles(() => ({
  navbar: {
    height: 60,
    borderBottom: '1px solid #444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Navbar = () => {
  const {classes} = useStyles()

  const {notifications, setNotifications} = MainState()

  navigator.serviceWorker.addEventListener('message', event => {
    setNotifications([event.data, ...notifications])
  })

  return (
    <Card className={classes.navbar} radius={0}>
      <Menu withinPortal={true}>
        <Menu.Target>
          <Indicator label={notifications.length} color="red" size={16}>
            <ActionIcon>
              <IconBell />
            </ActionIcon>
          </Indicator>
        </Menu.Target>
        <Menu.Dropdown>
          {notifications.map((notification, i) => (
            <Menu.Item key={i} sx={{width: 250}}>
              <Text fz="md" weight="bold">{notification.title}</Text>
              <Text color="dimmed" fz="sm">{notification.body}</Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Card>
  )
}

export default Navbar