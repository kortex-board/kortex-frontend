<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        isOpen: boolean
        title?: string
    }>(),
    {
        title: 'Modal Title',
    },
)

const emit = defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <div v-if="props.isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal">
                <div class="modal-header">
                    <h2>{{ props.title }}</h2>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div class="modal-footer" v-if="$slots.footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    padding: 1.5rem;
    background: #42414d;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-body {
    display: flex;
    flex-direction: column;
}

.modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
</style>
