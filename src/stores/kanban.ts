import { defineStore } from "pinia";
import type { Board } from "@/types";

export const useKanbanStore = defineStore("kanban", {
	state: () => ({
		boards: [] as Board[],
		currentBoard: null as Board | null,
	}),
	actions: {
		setBoards(boards: Board[]) {
			this.boards = boards;
		},
		setCurrentBoard(board: Board) {
			this.currentBoard = board;
		},
	},
});
