<template>
	<v-container>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm8 md6>
				<v-card>
					<v-card-title>
						<v-text-field label="To do" v-model="newTask.description" @keyup.enter="addTodo" required>
						</v-text-field>
					</v-card-title>
						<task-do @removeTodo="removeTodo"	:task="filteredTodos" @changeTodo="changeTodo">
						</task-do>
					<v-card-actions>
						<v-layout row wrap align-center justify-center>
							<v-flex xs12 md4 sm4>
								<v-btn	color="teal" flat @click="visibility = 'all'" class="actBtn">
									<span>all</span>
									<v-icon>check_circle</v-icon>
								</v-btn>
							</v-flex>
							<v-flex xs12 md4 sm4>
								<v-btn color="teal" flat @click="visibility = 'active'" class="actBtn" >
									<span>active</span>
									<v-icon>check_circle</v-icon>
								</v-btn>
							</v-flex>
							<v-flex xs12 md4 sm4>
								<div>
									<v-btn color="teal" flat @click="visibility ='complited'" class="actBtn">
										<span>complited</span>
										<v-icon>check_circle</v-icon>
									</v-btn>
								</div>
							</v-flex>
						</v-layout>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import TaskDo from './TaskDo.vue'
import { save, getTodo } from '@/model/storage'
import axios from 'axios'
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.complited
    })
  },
  complited: function (todos) {
    return todos.filter(function (todo) {
      return todo.complited
    })
  }
}
export default {
  components: {
    'TaskDo': TaskDo
  },
  name: 'Todo',
  data: () => {
    return {
      newTask: {
        description: '',
        complited: false,
        userId: 1,
        user: null,
        timestamp: ''
      },
      todos: {},
      visibility: 'all'
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        save(todos)
      }
    }
  },
  created () {
    getTodo().then(data => {
      this.todos = data
    })
      .catch(er => {
        alert(er)
      })
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    }
  },
  methods: {
    addTodo: function () {
      axios.post('https://localhost:44329/api/todo', {
        complited: this.newTask.complited,
        description: this.newTask.description,
        userId: 1
      })
        .then(response => {
          this.todos.push(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    removeTodo: function (id) {
      axios.delete('https://localhost:44329/api/todo/' + id)
        .then(response => {
          this.todos.splice(this.todos.id, 1)
        })
        .catch(e => {
          console.log(e)
        })
    },
    changeTodo: function (id, task) {
      axios.put('/api/todo/' + id, {
        description: task.description,
        complited: task.complited,
        id: task.id,
        userId: task.userId,
        user: task.user,
        timestamp: task.timestamp
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
.actBtn {
width: 100%
}
</style>
