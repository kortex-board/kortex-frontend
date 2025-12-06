import { useKanbanStore } from "@/stores/kanban";

export const getBoards = async () => {
	const store = useKanbanStore();
	const boards = [
		{ id: 1, name: "My First Board" },
		{ id: 2, name: "Project X" },
		{ id: 3, name: "Personal" },
	];
	store.setBoards(boards);
	return boards;
};

export const createBoard = async (name: string) => {
	const store = useKanbanStore();
	const newBoard = { id: Date.now(), name };
	store.setBoards([...store.boards, newBoard]);
	return newBoard;
};

export const deleteBoard = async (id: number) => {
	const store = useKanbanStore();
	const boards = store.boards.filter(
		(board: { id: number; name: string }) => board.id !== id,
	);
	store.setBoards(boards);
	return id;
};

const mockBoard = {
	id: 1,
	name: "My First Board",
	lists: [
		{
			id: 1,
			name: "To Do",
			tasks: [
				{ id: 1, title: "Task 1" },
				{ id: 2, title: "Task 2" },
			],
		},
		{
			id: 2,
			name: "In Progress",
			tasks: [{ id: 3, title: "Task 3" }],
		},
		{
			id: 3,
			name: "Done",
			tasks: [{ id: 4, title: "Task 4" }],
		},
	],
};

export const getBoard = async (id: number) => {
	const store = useKanbanStore();
	// In a real app, you would fetch this from an API
	const board = mockBoard;
	store.setCurrentBoard(board);
	return board;
};
