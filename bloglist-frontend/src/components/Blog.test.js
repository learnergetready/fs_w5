import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'The Ultimate Blog',
    author: 'The Superman',
    url: 'http://localhost:3001',
    likes: 15
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} username='mac' removeBlog={mockHandler} />)

  const p = container.querySelector('.blog')
  screen.debug()
  expect(p).toHaveTextContent(blog.title)
  expect(p).toHaveTextContent(blog.author)
  expect(p).not.toHaveTextContent(blog.url)
  expect(p).not.toHaveTextContent(blog.likes)

})