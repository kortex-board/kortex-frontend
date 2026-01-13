<script setup lang="ts">
import { deleteList, updateList } from '@/services/listService'
import { createTask, deleteTask, updateTask } from '@/services/taskService'
import type { List } from '@/types'
import { ref } from 'vue'
import BaseModal from '@/components/utils/BaseModal.vue'
import BaseButton from '@/components/utils/BaseButton.vue'

const props = defineProps<{
    list: List
}>()

const modals = ref({
    list: { id: '', name: '', update: false, delete: false },
    task: { id: '', name: '', create: false, update: false, delete: false },
})

const handleDelete = (modal: string, id: string) => {
    if (modal === 'deleteList') {
        modals.value.list.id = id
        modals.value.list.delete = true
    } else if (modal === 'deleteTask') {
        modals.value.task.id = id
        modals.value.task.delete = true
    }
}

const handleUpdate = (modal: string, id: string) => {
    if (modal === 'updateList') {
        modals.value.list.id = id
        modals.value.list.update = true
    } else if (modal === 'updateTask') {
        modals.value.task.id = id
        modals.value.task.update = true
    }
}

const handleCreate = (modal: string, id: string) => {
    if (modal === 'createTask') {
        modals.value.list.id = id
        modals.value.task.name = ''
        modals.value.task.create = true
    }
}

const closeModal = (modal: string) => {
    if (modal === 'deleteList') {
        modals.value.list.delete = false
    } else if (modal === 'updateList') {
        modals.value.list.update = false
    } else if (modal === 'createTask') {
        modals.value.task.create = false
    } else if (modal === 'updateTask') {
        modals.value.task.update = false
    } else if (modal === 'deleteTask') {
        modals.value.task.delete = false
    }
}

const handleConfirm = async (modal: string, name?: string) => {
    if (modal === 'updateList' && name) {
        await updateList(modals.value.list.id, name)
        modals.value.list.update = false
    } else if (modal === 'deleteList') {
        await deleteList(modals.value.list.id)
        modals.value.list.delete = false
    } else if (modal === 'createTask' && name) {
        await createTask(name, modals.value.list.id)
        modals.value.task.create = false
    } else if (modal === 'updateTask' && name) {
        await updateTask(modals.value.task.id, { title: name })
        modals.value.task.update = false
    } else if (modal === 'deleteTask') {
        await deleteTask(modals.value.task.id)
        modals.value.task.delete = false
    }
}
</script>

<template>
    <div class="list">
        <div class="list-header">
            <h3 @click="handleUpdate('updateList', props.list.id)">{{ props.list.title }}</h3>
            <button class="delete-list-btn" @click="handleDelete('deleteList', props.list.id)">
                ×
            </button>
        </div>
        <div class="tasks">
            <div v-for="task in props.list.tasks" :key="task.id" class="task-card">
                <span @click="handleUpdate('updateTask', task.id)">{{ task.title }}</span>
                <button @click="handleDelete('deleteTask', task.id)">×</button>
            </div>
        </div>
        <div class="add-task">
            <button @click="handleCreate('createTask', props.list.id)">+ Add a task</button>
        </div>
    </div>
    <BaseModal :isOpen="modals.list.delete" title="Delete List">
        <template #default>
            <p>Are you sure you want to delete this list?</p>
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal('deleteList')">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm('deleteList')"> Confirm </BaseButton>
        </template>
    </BaseModal>
    <BaseModal :isOpen="modals.list.update" title="Update List">
        <template #default>
            <p>Enter the new list title:</p>
            <input v-model="modals.list.name" />
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal('updateList')">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm('updateList', modals.list.name)">
                Confirm
            </BaseButton>
        </template>
    </BaseModal>
    <BaseModal :isOpen="modals.task.create" title="Create Task">
        <template #default>
            <p>Enter the name of the new task:</p>
            <input v-model="modals.task.name" />
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal('createTask')">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm('createTask', modals.task.name)">
                Confirm
            </BaseButton>
        </template>
    </BaseModal>
    <BaseModal :isOpen="modals.task.update" title="Update Task">
        <template #default>
            <p>Enter the new task title:</p>
            <input v-model="modals.task.name" />
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal('updateTask')">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm('updateTask', modals.task.name)">
                Confirm
            </BaseButton>
        </template>
    </BaseModal>
    <BaseModal :isOpen="modals.task.delete" title="Delete Task">
        <template #default>
            <p>Are you sure you want to delete this task?</p>
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal('deleteTask')">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm('deleteTask')"> Confirm </BaseButton>
        </template>
    </BaseModal>
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
    overflow: hidden;
    word-break: break-word;
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
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    color: #333;
    word-break: break-word;
    cursor: pointer;
}
.task-card button {
    font-size: 1.2rem;
    color: #888;
    cursor: pointer;
    background: none;
    border: none;
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
