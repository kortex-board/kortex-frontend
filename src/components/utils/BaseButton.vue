<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    color?: 'confirm' | 'cancel'
}>()

const buttonClass = computed(() => {
    return {
        'base-button': true,
        'base-button--confirm': props.color === 'confirm',
        'base-button--cancel': props.color === 'cancel',
    }
})
</script>

<template>
    <button type="button" :class="buttonClass">
        <slot />
    </button>
</template>

<style scoped>
.base-button {
    --base-bg: #3498db;
    --hover-bg: #2980b9;

    background-color: var(--base-bg);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #ffffff;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.base-button:hover {
    background-color: var(--hover-bg);
}

.base-button--confirm {
    --base-bg: #2ecc71;
    --hover-bg: #27ae60;
}

.base-button--cancel {
    --base-bg: #e74c3c;
    --hover-bg: #c0392b;
}
</style>
