import { useKanbanStore } from '@/stores/kanban'
import type { Task } from '@/types'
import api from './api'

export const getTasks = async (listId: string) => {
    const store = useKanbanStore()
    const response = await api.get<Task[]>(`/task/list/${listId}`)
    store.setTasks(response.data)
    return response.data
}

export const createTask = async (title: string, listId: string) => {
    const store = useKanbanStore()
    const response = await api.post<Task>('/task', { title, listId })
    const lists = store.lists.map((list) => {
        if (list.id === listId) {
            return { ...list, tasks: [...list.tasks, response.data] }
        }
        return list
    })
    store.setLists(lists)
    return response.data
}

export const deleteTask = async (id: string) => {
    const store = useKanbanStore()
    await api.delete(`/task/${id}`)
    const lists = store.lists.map((list) => {
        const tasks = list.tasks.filter((task) => task.id !== id)
        return { ...list, tasks }
    })
    store.setLists(lists)
    return id
}

export const updateTask = async (id: string, data: { title?: string; listId?: string }) => {
    const store = useKanbanStore()
    const response = await api.patch<Task>(`/task/${id}`, data)
    const { listId } = data
    const updatedTask = response.data

    const lists = store.lists.map((list) => {
        if (list.id === listId) {
            const taskExists = list.tasks.some((task) => task.id === id)
            if (!taskExists) {
                return { ...list, tasks: [...list.tasks, updatedTask] }
            }
        }

        const tasks = list.tasks
            .map((task) => {
                if (task.id === id) {
                    return updatedTask
                }
                return task
            })
            .filter((task) => !(listId && task.id === id && list.id !== listId))
        return { ...list, tasks }
    })

    store.setLists(lists)
    return response.data
}
