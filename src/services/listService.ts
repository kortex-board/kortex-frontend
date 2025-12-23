import { useKanbanStore } from '@/stores/kanban'
import type { List } from '@/types'
import api from './api'

export const getLists = async (boardId: string) => {
    const store = useKanbanStore()
    const response = await api.get<List[]>(`/list/board/${boardId}`)
    store.setLists(response.data)
    return response.data
}

export const createList = async (title: string, boardId: string) => {
    const store = useKanbanStore()
    const response = await api.post<List>('/list', { title, boardId })
    const newList = { ...response.data, tasks: response.data.tasks || [] }
    store.setLists([...store.lists, newList])
    return response.data
}

export const deleteList = async (id: string) => {
    const store = useKanbanStore()
    await api.delete(`/list/${id}`)
    const lists = store.lists.filter((list) => list.id !== id)
    store.setLists(lists)
    return id
}

export const updateList = async (id: string, title: string) => {
    const store = useKanbanStore()
    const response = await api.patch<List>(`/list/${id}`, { title })
    const lists = store.lists.map((list) => {
        if (list.id === id) {
            return response.data
        }
        return list
    })
    store.setLists(lists)
    return response.data
}
