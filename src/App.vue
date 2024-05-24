<script setup>
import Character from '@/components/Character.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import Pagination from '@/components/Pagination.vue'

import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'

const charactersData = ref({}) // данные персонажей
const lastNumberPage = ref(null) // сколько всего страниц
const pageNum = ref(1) // текущая страница

const name = ref('') // Имя для фильтра
const status = ref('') // статус для фильтра

const disabled = ref(false) // нужно ли запретить пагинацию/фильтр
const showError = ref(false) // показывать ли ошибку


/**
 * Получает список персонажей указанной страницы с примененными фильтрами
 * @param {Number} page - страница для запроса данных
 */
const getCharactersPage = async page => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name.value}&status=${status.value}`
    const { data: { info, results } } = await axios.get(url)
    lastNumberPage.value = info.pages // запоминаем сколько страниц
    return results
}

/**
 * Обновляет отображаемых персонажей на странице
 * @param {Number} page - не обязательный параметр, страница для запроса данных
 */
const updateCharactersPage = async page => {
    try {
        if (disabled.value) return; // если заблокирована, то выходим
        disabled.value = true
        if (!page) page = pageNum.value

        charactersData.value = await getCharactersPage(page)
        pageNum.value = page
        showError.value = false // убираем ошибку
        disabled.value = false
    } catch(error) {
        showError.value = true // показываем ошибку
        disabled.value = false
        charactersData.value = [] // убираем показ персонажей
        lastNumberPage.value = 1 // убираем пагинацию
    }
}


// event изменения имени (фильтр)
const setName = newName => {
    name.value = newName
    updateCharactersPage(1)
}

// event изменения статуса (фильтр)
const setStatus = newStatus => {
    status.value = newStatus
    updateCharactersPage(1)
}

const reset = () => {
    name.value = ''
    status.value = ''
    updateCharactersPage(1)
}



onMounted(updateCharactersPage)

</script>

<template>
    <div class="main__wrapper">
        <div class="main__container">
            <h1 class="main__header">Все персонажи из мультсериала "Рик и Морти"</h1>
            <ControlPanel 
                :name="name" 
                :status="status" 
                @setStatus="setStatus" 
                @setName="setName" 
                @reset="reset"
            />
            <span v-if="showError" class="error" @click="showError = false">
                Ошибка! По запросу ничего не найдено.
            </span>
        </div>
        <div v-if="charactersData" class="main__characters">
            <div class="main__characters--wrapper">
                <Character v-for="characterData in charactersData" :data="characterData" :key="characterData.id"/>
            </div>
        </div>
        <div v-else>
            Загружаем персонажей...
        </div>
        <Pagination 
            :lastNumberPage="lastNumberPage" 
            :pageNum="pageNum" 
            :disabled="disabled" 
            @setPage="updateCharactersPage"
        />
    </div>
</template>


<script>
export default {
    components: { Character, ControlPanel, Pagination }
}
</script>

<style>
html {
    font: 112.5% / 1.625 'Segoe UI';
}

html, body {
    margin: 0px;
    padding: 0px;
}

.main__container {
    padding: 4.5rem;
    display: grid;
    justify-content: center;
}


.main__characters {
    background: rgb(39, 43, 51);
}
.main__characters--wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 4.5rem 0px;
    max-width: 1920px;
    margin: auto;
}


.error {
    background-color: #b53636;
    color: #fff;
    font-size: 1.2em;
    display: inline-block;
    padding: 6px;
    border-radius: 4px;
    margin: 10px;
    position: fixed;
    right: 30px;
    top: 30px;
    cursor: pointer;
}
</style>
