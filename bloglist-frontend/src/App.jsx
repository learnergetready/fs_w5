import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({ username, password })
      setUser(userLoggingIn)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (

    <div>
      {errorMessage ? <Notification message={errorMessage} color='red'/> : null}
      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> }
      {user && <p>{user.name} logged in</p> }
      {user && <Blogs blogs={blogs}/> }
    </div>

  )
}

export default App