<template>
		<v-container>
			<v-list>
				<template v-for="(item, index) in task">
					<v-list-tile :key="index">
						<v-list-tile-action>
							<v-checkbox v-model="item.complited"  @change="changeTodo(item.id, item)"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{item.description}}</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<v-btn flat icon color="red lighten-1" @click="removeTodo(item.id)">
								<v-icon >delete</v-icon>
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</template>
			</v-list>
		</v-container>
</template>

<script>
export default {
  name: 'TaskDo',
  props: {
    task: {}
  },
  methods: {
    removeTodo (id) {
      this.$emit('removeTodo', id)
    },
    changeTodo (id, task) {
      this.$emit('changeTodo', id, task)
    }
  }
}
</script>

<style>

</style>
