<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import KanbanList from '@/components/kanban/KanbanList.vue'
import { getBoard } from '@/services/boardService'
import { createList, getLists } from '@/services/listService'
import { useKanbanStore } from '@/stores/kanban'
import BaseModal from '@/components/utils/BaseModal.vue'
import BaseButton from '@/components/utils/BaseButton.vue'

const route = useRoute()
const store = useKanbanStore()
const { currentBoard: board, lists } = storeToRefs(store)
const createListModal = ref(false)
const newListName = ref('')

onMounted(async () => {
    const boardId = route.params.id as string
    await getBoard(boardId)
    await getLists(boardId)
})

const createNewList = async () => {
    newListName.value = ''
    createListModal.value = true
}

const closeModal = () => {
    createListModal.value = false
}

const handleConfirm = async (newListName: string) => {
    if (newListName && board.value) {
        await createList(newListName, board.value.id)
        createListModal.value = false
    }
}
</script>

<template>
    <div v-if="board" class="board-view">
        <h1>{{ board.title }}</h1>
        <div class="lists-container">
            <KanbanList v-for="list in lists" :key="list.id" :list="list"> </KanbanList>
            <div class="new-list-card" @click="createNewList">+ Add another list</div>
        </div>
    </div>
    <div v-else>
        <p>Loading board...</p>
    </div>
    <BaseModal :isOpen="createListModal" title="Create New List">
        <template #default>
            <p>Enter the name of the new list:</p>
            <input v-model="newListName" />
        </template>
        <template #footer>
            <BaseButton color="cancel" @click="closeModal()">Cancel</BaseButton>
            <BaseButton color="confirm" @click="handleConfirm(newListName)"> Confirm </BaseButton>
        </template>
    </BaseModal>
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
