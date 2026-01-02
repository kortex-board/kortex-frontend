<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createBoard, deleteBoard as deleteBoardService, getBoards } from '@/services/boardService'
import { useKanbanStore } from '@/stores/kanban'
import BaseModal from '@/components/utils/BaseModal.vue'
import BaseButton from '@/components/utils/BaseButton.vue'

const router = useRouter()
const store = useKanbanStore()
const { boards } = storeToRefs(store)
const modals = ref({ createBoard: false, deleteBoard: false })
const newBoardName = ref('')
const boardToDelete = ref('')

onMounted(async () => {
    await getBoards()
})

const goToBoard = (id: string) => {
    router.push({ name: 'board', params: { id } })
}

const createNewBoard = async () => {
    newBoardName.value = ''
    modals.value.createBoard = true
}

const deleteBoard = async (id: string) => {
    boardToDelete.value = id
    modals.value.deleteBoard = true
}

const closeModal = (modal: string) => {
    if (modal === 'deleteBoard') {
        modals.value.deleteBoard = false
    } else if (modal === 'createBoard') {
        modals.value.createBoard = false
    }
}

const handleConfirm = async (modal: string, newBoardName?: string) => {
    if (modal === 'createBoard' && newBoardName) {
        await createBoard(newBoardName)
        modals.value.createBoard = false
    } else if (modal === 'deleteBoard') {
        await deleteBoardService(boardToDelete.value)
        modals.value.deleteBoard = false
    }
}
</script>

<template>
    <div class="boards-container">
        <h1>My Boards</h1>
        <div class="boards-grid">
            <div
                v-for="board in boards"
                :key="board.id"
                class="board-card"
                @click="goToBoard(board.id)"
            >
                <h2>{{ board.title }}</h2>
                <button class="delete-board-btn" @click.stop="deleteBoard(board.id)">×</button>
            </div>
            <div class="board-card new-board-card" @click="createNewBoard">
                <h2>+ Create New Board</h2>
            </div>
        </div>
        <BaseModal :isOpen="modals.createBoard" title="Create New Board">
            <template #default>
                <p>Enter the name of the new board:</p>
                <input v-model="newBoardName" />
            </template>
            <template #footer>
                <BaseButton color="cancel" @click="closeModal('createBoard')">Cancel</BaseButton>
                <BaseButton color="confirm" @click="handleConfirm('createBoard', newBoardName)">
                    Confirm
                </BaseButton>
            </template>
        </BaseModal>
        <BaseModal :isOpen="modals.deleteBoard" title="Delete Board">
            <template #default>
                <p>Are you sure you want to delete this board?</p>
            </template>
            <template #footer>
                <BaseButton color="cancel" @click="closeModal('deleteBoard')">Cancel</BaseButton>
                <BaseButton
                    color="confirm"
                    @click="handleConfirm('deleteBoard')"
                >
                    Confirm
                </BaseButton>
            </template>
        </BaseModal>
    </div>
</template>

<style scoped>
.boards-container {
    width: 100%;
    padding: 2rem;
}

.boards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}

.board-card {
    position: relative;
    padding: 2rem;
    overflow: hidden;
    text-align: center;
    word-break: break-word;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.board-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

.new-board-card {
    color: #888;
    border-style: dashed;
}

.delete-board-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    visibility: hidden;
    font-size: 1.5rem;
    color: #888;
    cursor: pointer;
    background: none;
    border: none;
}

.board-card:hover .delete-board-btn {
    visibility: visible;
}

@media (max-width: 600px) {
    .boards-grid {
        grid-template-columns: 1fr;
    }
    .boards-container {
        padding: 1rem;
    }
    .delete-board-btn {
        visibility: visible;
    }
}
</style>
