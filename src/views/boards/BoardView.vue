<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { onMounted } from "vue";
	import { useRoute } from "vue-router";
	import List from "@/components/kanban/List.vue";
	import { getBoard } from "@/services/boardService";
	import { useKanbanStore } from "@/stores/kanban";
	import type { List as ListType } from "@/types";

	const route = useRoute();
	const store = useKanbanStore();
	const { currentBoard: board } = storeToRefs(store);

	onMounted(async () => {
		const boardId = route.params.id as string;
		await getBoard(boardId);
	});

	const createNewList = () => {
		const listName = prompt("Enter the name of the new list:");
		if (listName && board.value) {
			board.value?.lists.push({
				id: Date.now().toString(),
				title: listName,
				tasks: [],
			});
		}
	};

	const updateList = (listIndex: number, newList: ListType) => {
		if (board.value) {
			board.value.lists[listIndex] = newList;
		}
	};

	const deleteList = (listId: string) => {
		if (board.value) {
			board.value.lists = board.value.lists.filter(
				(list) => list.id !== listId,
			);
		}
	};

	const editTask = (listIndex: number, taskIndex: number) => {
		if (
			board.value?.lists[listIndex]?.tasks[taskIndex]
		) {
			const newTitlePrompt = prompt(
				"Enter the new task title:",
				board.value.lists[listIndex].tasks[taskIndex].title,
			);
			if (newTitlePrompt) {
				board.value.lists[listIndex].tasks[taskIndex].title = newTitlePrompt;
			}
		}
	};

	const deleteTask = (listIndex: number, taskIndex: number) => {
		if (board.value?.lists[listIndex]) {
			board.value.lists[listIndex].tasks.splice(taskIndex, 1);
		}
	};

	const handleDragStart = (
		event: DragEvent,
		item: { fromList: number; fromTask: number },
	) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData("text/plain", JSON.stringify(item));
		}
	};

	const handleDrop = (event: DragEvent, toList: number) => {
		if (event.dataTransfer && board.value) {
			const item = JSON.parse(event.dataTransfer.getData("text/plain"));
			const fromList = board.value.lists[item.fromList];
			const toListRef = board.value.lists[toList];
			if (fromList && toListRef) {
				const task = fromList.tasks.splice(item.fromTask, 1)[0];
				if (task) {
					toListRef.tasks.push(task);
				}
			}
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
			<List
				v-for="(list, listIndex) in board.lists"
				:key="list.id"
				:list="list"
				@update:list="updateList(listIndex, $event)"
				@delete:list="deleteList($event)"
				@dragover.prevent
				@drop="handleDrop($event, listIndex)"
			>
				<template #tasks>
					<div
						v-for="(task, taskIndex) in list.tasks"
						:key="task.id"
						class="task-card"
						draggable="true"
						@dragstart="handleDragStart($event, { fromList: listIndex, fromTask: taskIndex })"
					>
						<span>{{ task.title }}</span>
						<div>
							<button @click="editTask(listIndex, taskIndex)">Edit</button>
							<button @click="deleteTask(listIndex, taskIndex)">×</button>
						</div>
					</div>
				</template>
			</List>
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
		min-height: 100vh;
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
