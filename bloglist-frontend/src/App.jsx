import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('red')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem( 'loggedBloglistUser' )
    if(loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const showNotification = (notificationText, color) => {
    setNotification(notificationText)
    setNotificationColor(color)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blog) => {
    const newBlog = await blogService.create( blog )
    newBlog.user = { ...user }
    setBlogs(blogs.concat(newBlog))
  }

  const handleLogout = (event) => window.localStorage.removeItem('loggedBloglistUser')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBloglistUser', JSON.stringify(userLoggingIn) )
      setUser(userLoggingIn)
      blogService.setToken(userLoggingIn.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials', 'red')
    }
  }

  return (

    <div>
      {notification && <Notification message={notification} color={notificationColor}/> }
      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> }
      {user && <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p> }
      {user && <BlogForm sendBlog={addBlog} showNotification={showNotification} />}
      <div>
        {user && blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
      </div>
    </div>

  )
}

export default App