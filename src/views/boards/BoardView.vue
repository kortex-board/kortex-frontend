<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { onMounted } from "vue";
	import { useRoute } from "vue-router";
	import ListComponent from "@/components/kanban/List.vue";
	import { getBoard } from "@/services/boardService";
	import {
		createList,
		deleteList,
		getLists,
		updateList,
	} from "@/services/listService";
	import { createTask, deleteTask, updateTask } from "@/services/taskService";
	import { useKanbanStore } from "@/stores/kanban";
	import type { List, Task } from "@/types";

	const route = useRoute();
	const store = useKanbanStore();
	const { currentBoard: board, lists } = storeToRefs(store);

	onMounted(async () => {
		const boardId = route.params.id as string;
		await getBoard(boardId);
		await getLists(boardId);
	});

	const createNewList = async () => {
		const listName = prompt("Enter the name of the new list:");
		if (listName && board.value) {
			await createList(listName, board.value.id);
		}
	};

	const handleUpdateList = async (list: List) => {
		const newTitle = prompt("Enter the new list title:", list.title);
		if (newTitle) {
			await updateList(list.id, newTitle);
		}
	};

	const handleDeleteList = async (listId: string) => {
		if (confirm("Are you sure you want to delete this list?")) {
			await deleteList(listId);
		}
	};

	const createNewTask = async (listId: string) => {
		const taskName = prompt("Enter the name of the new task:");
		if (taskName) {
			await createTask(taskName, listId);
		}
	};

	const handleUpdateTask = async (task: Task) => {
		const newTitle = prompt("Enter the new task title:", task.title);
		if (newTitle) {
			await updateTask(task.id, { title: newTitle });
		}
	};

	const handleDeleteTask = async (taskId: string) => {
		if (confirm("Are you sure you want to delete this task?")) {
			await deleteTask(taskId);
		}
	};
</script>

<template>
	<div
		v-if="board"
		class="board-view"
	>
		<h1>{{ board.title }}</h1>
		<div class="lists-container">
			<ListComponent
				v-for="(list, listIndex) in lists"
				:key="list.id"
				:list="list"
				@update:list="handleUpdateList(list)"
				@delete:list="handleDeleteList(list.id)"
				@create:task="createNewTask(list.id)"
			>
				<template #tasks>
					<div
						v-for="task in list.tasks"
						:key="task.id"
						class="task-card"
					>
						<span @click="handleUpdateTask(task)">{{ task.title }}</span>
						<button @click="handleDeleteTask(task.id)">×</button>
					</div>
				</template>
			</ListComponent>
			<div
				class="new-list-card"
				@click="createNewList"
			>
				+ Add another list
			</div>
		</div>
	</div>
	<div v-else>
		<p>Loading board...</p>
	</div>
</template>

<style scoped>
	.board-view {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 60vh; 
		padding: 2rem;
	}

	.lists-container {
		display: flex;
		flex-grow: 1;
		gap: 1rem;
		align-items: flex-start;
		padding-bottom: 1rem;
		overflow-x: auto;
	}

	.task-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		margin-bottom: 0.5rem;
		cursor: grab;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.task-card span {
		flex-grow: 1;
		color: #333;
		cursor: pointer;
	}
	.task-card button {
		font-size: 1.2rem;
		color: #888;
		cursor: pointer;
		background: none;
		border: none;
	}

	.new-list-card {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		min-width: 280px;
		max-width: 300px;
		height: fit-content;
		padding: 1rem;
		color: #888;
		cursor: pointer;
		background-color: #f4f4f4;
		border-radius: 8px;
	}

	@media (max-width: 600px) {
		.board-view {
			padding: 1rem;
		}
	}
</style>
