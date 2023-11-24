import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handlePost = async (event) => {
    const sendThisBlog = { title:title, author:author, url:url }
    const newBlog = await blogService.create( sendThisBlog )
    setBlogs(blogs.concat(newBlog))
  }

  return(
    <div>
      <h2>Log in to application</h2>

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
    </div>
  )
}

export default BlogForm