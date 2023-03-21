const uri = 'https://simple-push-production.up.railway.app/api/users'

const signin = async ({request}) => {
  try {
    const res = await fetch(`${uri}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    const data = await res.json()
    if (data.message === 'not found!')
      throw new Error('Account not found!')
    
    if (res.status === 200) 
      return data
    else
      throw new Error('Failed please try again later.')
  } catch (e) {
    throw new Error(e.message)
  }
}

const signup = async ({request}) => {
  try {
    const res = await fetch(`${uri}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    const data = await res.json()

    if (data.message === 'user exists!')
      throw new Error('Please choose another email.')
    
    if (data.message === 'created successfully') 
      return data.message
    else
      throw new Error('Failed please try again later.')
  } catch (e) {
    throw new Error(e.message)
  }
}

export {signin, signup}