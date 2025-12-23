<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createBoard, deleteBoard as deleteBoardService, getBoards } from '@/services/boardService'
import { useKanbanStore } from '@/stores/kanban'

const router = useRouter()
const store = useKanbanStore()
const { boards } = storeToRefs(store)

onMounted(async () => {
    await getBoards()
})

const goToBoard = (id: string) => {
    router.push({ name: 'board', params: { id } })
}

const createNewBoard = async () => {
    const newBoardName = prompt('Enter the name of the new board:')
    if (newBoardName) {
        await createBoard(newBoardName)
    }
}

const deleteBoard = async (id: string) => {
    if (confirm('Are you sure you want to delete this board?')) {
        await deleteBoardService(id)
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
