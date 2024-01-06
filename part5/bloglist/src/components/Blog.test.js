import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  const blog = {
    title: 'Blog Test',
    author: 'Test Tester',
    url: 'Test.com',
    likes: 0,
    user: {
      username: 'Test',
      name: 'Tester'
    }
  }
  beforeEach(() => {
    container = render(
      <Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} />
    ).container
  })

  test('title and author rendered', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Blog Test Test Tester')

    const togglableContentDiv = container.querySelector('.togglableContent')
    expect(togglableContentDiv).toHaveStyle('display: none')
  })

  test('toggleable content is shown', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#toggle-button')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Test.com0')

  })

  test('like button clicked twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#author-input')
    await user.click(button)

    const likeButton = container.querySelector('#like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})