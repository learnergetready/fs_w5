import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ sendBlog, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visiblePost, setVisiblePost] = useState(false)

  const showWhenVisible = { display: visiblePost ? '' : 'none' }
  const hideWhenVisible = { display: visiblePost ? 'none' : '' }

  const addBlog = async (event) => {
    event.preventDefault()
    try{
      await sendBlog( { title:title, author:author, url:url } )
      showNotification(`a new blog ${title} by author ${author} was added`, 'green')
      setVisiblePost(false)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch { (exception) => {
      showNotification('error in posting blog! fix error handling', 'red')
    }
    }
  }

  return(
    <>
      <button style={hideWhenVisible} onClick={() => setVisiblePost(true)} data-cy='new blog'>new blog</button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>

        <form onSubmit={addBlog}>
          <div>
              title
            <input
              id='blog-title'
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
              data-cy='blog-title'
            />
          </div>
          <div>
              author
            <input
              id='blog-author'
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
              data-cy='blog-author'
            />
          </div>
          <div>
              url
            <input
              id='blog-url'
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
              data-cy='blog-url'
            />
          </div>
          <button type='submit' data-cy='submit-blog'>post</button>
        </form>
        <button onClick={() => setVisiblePost(false)}>cancel</button>
      </div>
    </>
  )
}

BlogForm.propTypes = {
  sendBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
}

export default BlogForm