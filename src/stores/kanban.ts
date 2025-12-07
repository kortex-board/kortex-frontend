import { defineStore } from "pinia";
import type { Board, List, Task } from "@/types";

export const useKanbanStore = defineStore("kanban", {
	state: () => ({
		boards: [] as Board[],
		currentBoard: null as Board | null,
		lists: [] as List[],
		currentList: null as List | null,
		tasks: [] as Task[],
		currentTask: null as Task | null,
	}),
	actions: {
		setBoards(boards: Board[]) {
			this.boards = boards;
		},
		setCurrentBoard(board: Board) {
			this.currentBoard = board;
		},
		setLists(lists: List[]) {
			this.lists = lists;
		},
		setCurrentList(list: List) {
			this.currentList = list;
		},
		setTasks(tasks: Task[]) {
			this.tasks = tasks;
		},
		setCurrentTask(task: Task) {
			this.currentTask = task;
		},
	},
});
