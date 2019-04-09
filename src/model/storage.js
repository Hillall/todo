import axios from 'axios'
const STORAGE_KEY = 'todoStore'

export function fetch () {
  var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

  todos.forEach(function (todo, index) {
    todo.id = index
  })
  // todoStorage.uid = todos.length
  return todos
}

export function save (todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function getTodo () {
  return axios.get('https://localhost:44329/api/todo')
    .then(response => {
      return response.data
    })
}
