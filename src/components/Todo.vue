<template>
	<v-container>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm8 md6>
				<v-card>
					<v-card-title>
						<v-text-field label="To do" v-model="newTasks" @keyup.enter="addTodo" required>
						</v-text-field>
					</v-card-title>
						<task-do @removeTodo="removeTodo"	:task="filteredTodos">
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
      newTasks: '',
      todos: [],
      visibility: 'all'
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        save(todos)
      },
      deep: true
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
      var value = this.newTasks && this.newTasks.trim()
      if (!value) {
        return
      }
      this.todos.push({
        // id: todoStorage.uid++,
        description: value,
        complited: true
      })
      this.newTasks = ''
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    }
  }
}
</script>

<style>
.actBtn {
width: 100%
}
</style>
