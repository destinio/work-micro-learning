import './style.css'

const root = document.getElementById('posts')!

async function getPostComments(id: string) {
  const res = await fetch(`http://localhost:4002/posts/${id}/comments`)
  const json = await res.json()

  const postElement = document.getElementById(id)!

  const comments = document.createElement('div')

  comments.className = 'flex flex-col gap-2'

  json.map((comment: any) => {
    const div = document.createElement('div')
    const id = document.createElement('h4')
    const body = document.createElement('p')

    div.className = 'p-2 border border-gray-400 rounded-md shadow-md'

    id.textContent = comment.id
    body.textContent = comment.content

    div.appendChild(id)
    div.appendChild(body)

    comments.appendChild(div)
  })

  postElement.appendChild(comments)
}

async function getPosts() {
  // Hit the query service to get all posts
  try {
    const res = await fetch('http://localhost:4002/posts') 
    
    const data = await res.json()

    console.log(data)

    data.map((post: any) => {
      const div = document.createElement('div')
      const title = document.createElement('h3')
      const body = document.createElement('p')
      const comments = document.createElement('button')

      div.className = 'p-2 border border-gray-400 rounded-md shadow-md'
      div.id = post.id
      title.className = 'text-xl font-bold mb-2'
      body.className = 'mb-4 border p-2 rounded-md'
      comments.className = 'bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded'

      comments.addEventListener('click', () => getPostComments(post.id))

      title.textContent = post.title
      body.textContent = post.content
      comments.textContent = 'View Comments'

      div.appendChild(title)
      div.appendChild(body)
      div.appendChild(comments)

      root.appendChild(div)
    })
    
  } catch (error) {
    console.log(error)
  }
}

getPosts()