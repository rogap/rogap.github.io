<script setup>
import { ref } from 'vue'

const props = defineProps([ 'status', 'name' ])
const emit = defineEmits([ 'setName', 'setStatus', 'reset' ])
const status = ref(props.status)
const name = ref(props.name)


const applyStatus = () => {
    emit('setStatus', status.value)
}

const applyName = () => {
    emit('setName', name.value)
}

const reset = () => {
    status.value = ''
    name.value = ''
    emit('reset')
}
</script>


<template>
    <nav class="navigation">
        <label class="navigation__item">
            <span class="navigation__label">Фильтровать по имени:</span>
            <input class="navigation__input" type="text" v-model="name">
            <button class="navigation__button" type="button" @click="applyName">Применить</button>
        </label>
        <label class="navigation__item">
            <span class="navigation__label">Фильтровать по статусу:</span>
            <input class="navigation__input" type="text" v-model="status">
            <button class="navigation__button" type="button" @click="applyStatus">Применить</button>
        </label>
        <label class="navigation__item">
            <button class="navigation__button" type="button" @click="reset">Сбросить</button>
        </label>
    </nav>
</template>


<style scoped>
.navigation {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.navigation__item {
    display: grid;
    grid-template-columns: 250px 300px 115px;
    gap: 6px;
}
</style>