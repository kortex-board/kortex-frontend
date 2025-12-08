<script setup lang="ts">
	import { type PropType, ref } from "vue";
	import type { List } from "@/types";

	defineProps({
		list: {
			type: Object as PropType<List>,
			required: true,
		},
	});

	const emit = defineEmits(["update:list", "delete:list", "create:task"]);
</script>

<template>
	<div class="list">
		<div class="list-header">
			<h3 @click="emit('update:list', list)">{{ list.title }}</h3>
			<button
				class="delete-list-btn"
				@click="emit('delete:list', list.id)"
			>
				×
			</button>
		</div>
		<div class="tasks">
			<slot name="tasks" />
		</div>
		<div class="add-task">
			<button @click="emit('create:task')">+ Add a task</button>
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
		word-break: break-word;
		overflow: hidden;
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
	.add-task button {
		width: 100%;
		padding: 0.5rem;
		color: #888;
		text-align: left;
		cursor: pointer;
		background-color: transparent;
		border: none;
		border-radius: 4px;
	}
</style>
