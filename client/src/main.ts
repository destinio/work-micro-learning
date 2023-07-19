import './style.css'

const root = document.getElementById('app')!

root.textContent = 'test'

async function getPostComments(id: string) {
  const res = await fetch(`http://localhost:4001/posts/${id}/comments`)
  const json = await res.json()

  const postElement = document.getElementById(id)!

  const comments = document.createElement('div')

  json.map((comment: any) => {
    const div = document.createElement('div')
    const id = document.createElement('h4')
    const body = document.createElement('p')

    id.textContent = comment.id
    body.textContent = comment.content

    div.appendChild(id)
    div.appendChild(body)

    comments.appendChild(div)
  })

  postElement.appendChild(comments)
}

async function getPosts() {
  const res = await fetch('http://localhost:4000/posts') 
  const json = await res.json()

  json.map((post: any) => {
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const body = document.createElement('p')
    const comments = document.createElement('button')

    div.className = 'p-2 border border-gray-400 rounded-md shadow-md'
    div.id = post.id

    comments.addEventListener('click', () => getPostComments(post.id))

    title.textContent = post.title
    body.textContent = post.content
    comments.textContent = 'View Comments'

    div.appendChild(title)
    div.appendChild(body)
    div.appendChild(comments)

    root.appendChild(div)
  })
}

getPosts()