import { useKanbanStore } from "@/stores/kanban";
import type { Board } from "@/types";
import api from "./api";

export const getBoards = async () => {
	const store = useKanbanStore();
	const response = await api.get<Board[]>("/board");
	store.setBoards(response.data);
	return response.data;
};

export const createBoard = async (name: string) => {
	const store = useKanbanStore();
	const response = await api.post<Board>("/board", { title: name });
	store.setBoards([...store.boards, response.data]);
	return response.data;
};

export const deleteBoard = async (id: string) => {
	const store = useKanbanStore();
	await api.delete(`/board/${id}`);
	const boards = store.boards.filter(
		(board: { id: string; name: string }) => board.id !== id,
	);
	store.setBoards(boards);
	return id;
};

export const getBoard = async (id: string) => {
	const store = useKanbanStore();
	const response = await api.get<Board>(`/board/${id}`);
	store.setCurrentBoard(response.data);
	return response.data;
};
