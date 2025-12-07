<script setup lang="ts">
	import { type PropType, ref } from "vue";
	import type { List } from "@/types";

	const props = defineProps({
		list: {
			type: Object as PropType<List>,
			required: true,
		},
	});

	const emit = defineEmits(["update:list", "delete:list"]);

	const newTaskTitle = ref("");

	const addTask = () => {
		if (newTaskTitle.value.trim()) {
			const newList = { ...props.list };
			newList.tasks.push({
				id: Date.now().toString(),
				title: newTaskTitle.value.trim(),
			});
			emit("update:list", newList);
			newTaskTitle.value = "";
		}
	};

	const editListName = () => {
		const newName = prompt("Enter the new list name:", props.list.name);
		if (newName && newName.trim() !== props.list.name) {
			const newList = { ...props.list, name: newName.trim() };
			emit("update:list", newList);
		}
	};

	const deleteList = () => {
		if (confirm("Are you sure you want to delete this list?")) {
			emit("delete:list", props.list.id);
		}
	};
</script>

<template>
	<div class="list">
		<div class="list-header">
			<h3 @click="editListName">{{ list.title }}</h3>
			<button
				class="delete-list-btn"
				@click="deleteList"
			>
				×
			</button>
		</div>
		<div class="tasks">
			<slot name="tasks" />
		</div>
		<div class="add-task-form">
			<form @submit.prevent="addTask">
				<input
					v-model="newTaskTitle"
					type="text"
					placeholder="Add a new task..."
				/>
				<button type="submit">+</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
	.list {
		display: flex;
		flex: 0 0 auto;
		flex-direction: column;
		min-width: 280px;
		max-width: 300px;
		height: fit-content;
		padding: 1rem;
		background-color: #f4f4f4;
		border-radius: 8px;
	}
	.list-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list-header h3 {
		color: #333;
		cursor: pointer;
	}
	.delete-list-btn {
		font-size: 1.5rem;
		color: #888;
		cursor: pointer;
		background: none;
		border: none;
	}
	.tasks {
		flex-grow: 1;
		min-height: 50px;
		margin-top: 1rem;
	}
	.add-task-form form {
		display: flex;
		margin-top: 1rem;
	}
	.add-task-form input {
		flex-grow: 1;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px 0 0 4px;
	}
	.add-task-form button {
		padding: 0.5rem 1rem;
		color: white;
		cursor: pointer;
		background-color: #007bff;
		border: none;
		border-radius: 0 4px 4px 0;
	}
</style>
