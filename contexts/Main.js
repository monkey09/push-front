import { createContext, useContext, useEffect, useState } from "react"

const MainContext = createContext()

const MainProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState(null)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)
  }, [])

  return (
    <MainContext.Provider 
      value={{
        user, 
        setUser,
        todos,
        setTodos,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

const MainState = () => {
  return useContext(MainContext)
}

export { MainState }
export default MainProvider