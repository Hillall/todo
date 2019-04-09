<template>
  <div id="app">
    <the-header></the-header>
    <v-container row wrap>
      <v-layout xs12 sm6 md3>
        <todo></todo>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Todo from './components/Todo.vue'
import TheHeader from './components/TheHeader.vue'
import TaskDo from './components/TaskDo.vue'
import Home from './views/Home.vue'
export default {
  name: 'app',
  components: {
    Todo,
    TheHeader,
    TaskDo,
    Home
  }
}
</script>

<style>

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'),
    local('MaterialIcons-Regular')
}

#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0959aa5b;
}

.list {
  padding: 0 8px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-leave-to {
  display: none;
}

</style>
