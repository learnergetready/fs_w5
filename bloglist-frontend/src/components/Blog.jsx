import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showMuch, setShowMuch] = useState(false)
  const bigBlogStyle = {
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '2px',
  }
  const smallBlogStyle = {
    borderStyle: 'solid',
    borderRadius: '1px',
    padding: '3px',
    marginBottom: '2px',
  }

  const buttonStyle = { marginLeft: '6px' }

  if(showMuch) {
    return(
      <div style={bigBlogStyle}>
        title: {blog.title}
        <button style={buttonStyle} onClick={() => setShowMuch(false)}>hide</button><br/>
        author: {blog.author}<br/>
        url: {blog.url}<br/>
        likes: {blog.likes}<br/>
        added by: {blog.user.name}
      </div>
    )
  }

  return(
    <div style={smallBlogStyle}>
      {blog.title} {blog.author}
      <button style={buttonStyle} onClick={() => setShowMuch(true)}>view</button>
    </div>
  )}

export default Blog