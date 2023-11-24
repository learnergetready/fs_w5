import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visiblePost, setVisiblePost] = useState(false)

  const showWhenVisible = { display: visiblePost ? '' : 'none' }
  const hideWhenVisible = { display: visiblePost ? 'none' : '' }

  const handlePost = async (event) => {
    event.preventDefault()
    const sendThisBlog = { title:title, author:author, url:url }
    try{
      const newBlog = await blogService.create( sendThisBlog )
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${title} by author ${author} added`, 'green')
      setVisiblePost(false)
    } catch { (exception) => {
      showNotification('error in posting blog! fix error handling', 'red')
    }
    }
  }

  return(
    <>
      <button style={hideWhenVisible} onClick={() => setVisiblePost(true)}>new blog</button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>

        <form onSubmit={handlePost}>
          <div>
              title
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
              author
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
              url
            <input
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>post</button>
        </form>
        <button onClick={() => setVisiblePost(false)}>cancel</button>
      </div>
    </>
  )
}

export default BlogForm