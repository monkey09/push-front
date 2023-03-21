const uri = 'https://simple-push-production.up.railway.app/api/todos'

const getTodos = async ({token}) => {
  try {
    const res = await fetch(uri, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}

const addTodo = async ({request, token}) => {
  try {
    const res = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    })
    const data = await res.json()

    if (res.status === 200)
      return data
    else 
      throw new Error('Failed please try again later.')
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateTodo = async ({request, token}) => {
  try {
    const res = await fetch(`${uri}/${request._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    })
    const data = await res.json()

    if (res.status === 200)
      return data
    else 
      throw new Error('Failed please try again later.')
  } catch (e) {
    throw new Error(e.message)
  }
}

const deleteTodo = async ({request, token}) => {
  try {
    const res = await fetch(`${uri}/${request._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
    const data = await res.json()

    if (res.status === 200)
      return data
    else 
      throw new Error('Failed please try again later.')
  } catch (e) {
    throw new Error(e.message)
  }
}

export {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}