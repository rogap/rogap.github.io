<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps([ 'lastNumberPage', 'pageNum', 'disabled' ])
const emit = defineEmits([ 'setPage' ])
const { lastNumberPage, pageNum, disabled } = toRefs(props)



const pageLeft = () => {
    if (pageNum.value <= 1) return; // запрещаем делать страницы меньше 1
    emit('setPage', pageNum.value - 1)
}

const pageRight = () => {
    if (pageNum.value >= lastNumberPage) return; // запрещаем делать страницы больше чем страниц всего
    emit('setPage', pageNum.value + 1)
}

const setPage = page => {
    if (pageNum.value === page) return;
    emit('setPage', page)
}


</script>


<template>
    <footer class="pagination">
        <button class="pagination__btn" @click="pageLeft" v-if="pageNum !== 1" :disabled="disabled">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.80474 13.138C10.0651 12.8776 10.0651 12.4555 9.80474 12.1952L5.60947 7.99992L9.80474 3.80466C10.0651 3.54431 10.0651 3.1222 9.80474 2.86185C9.54439 2.6015 9.12228 2.6015 8.86193 2.86185L4.66667 7.05711C4.14597 7.57781 4.14597 8.42203 4.66667 8.94273L8.86193 13.138C9.12228 13.3983 9.54439 13.3983 9.80474 13.138Z" fill="#333333"/>
            </svg>
            Предыдущая
        </button>
        <div class="pagination__list">
            <button class="pagination__number" v-if="pageNum > 3" @click="setPage(1)">
                1
            </button>
            <button class="pagination__number" v-if="pageNum > 4">
                ...
            </button>
            <button class="pagination__number" v-if="pageNum > 2" @click="setPage(pageNum - 2)">
                {{ pageNum - 2 }}
            </button>
            <button class="pagination__number" v-if="pageNum > 1" @click="setPage(pageNum - 1)">
                {{ pageNum - 1 }}
            </button>
            <button class="pagination__number active" v-if="lastNumberPage !== 1">
                {{ pageNum }}
            </button>
            <button class="pagination__number" v-if="pageNum + 1 < lastNumberPage" @click="setPage(pageNum + 1)">
                {{ pageNum + 1 }}
            </button>
            <button class="pagination__number" v-if="pageNum + 2 < lastNumberPage" @click="setPage(pageNum + 2)">
                {{ pageNum + 2 }}
            </button>
            <button class="pagination__number" v-if="pageNum + 3 < lastNumberPage">
                ...
            </button>
            <button class="pagination__number" v-if="pageNum < lastNumberPage" @click="setPage(lastNumberPage)">
                {{ lastNumberPage }}
            </button>
        </div>
        <button class="pagination__btn" @click="pageRight" v-if="pageNum !== lastNumberPage" :disabled="disabled">
            Следующая
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.19526 13.138C5.93491 12.8776 5.93491 12.4555 6.19526 12.1952L10.3905 7.99992L6.19526 3.80466C5.93491 3.54431 5.93491 3.1222 6.19526 2.86185C6.45561 2.6015 6.87772 2.6015 7.13807 2.86185L11.3333 7.05711C11.854 7.57781 11.854 8.42203 11.3333 8.94273L7.13807 13.138C6.87772 13.3983 6.45561 13.3983 6.19526 13.138Z" fill="#333333"/>
            </svg>
        </button>
    </footer>
</template>


<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-bottom: 100px;
    padding-top: 30px;

}

.pagination__btn {
    border: none;
    padding: 4px 6px 4px 6px;
    border-radius: 4px;
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    background-color: transparent;
    cursor: pointer;
}
.pagination__btn:disabled {
    background-color: #00000018;
}

.pagination__list {
    display: flex;
    gap: 4px;
}

.pagination__number {
    padding: 4px 10px 4px 10px;
    border-radius: 7px;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    border: none;
}
.pagination__number:disabled.active,
.pagination__number.active:disabled,
.pagination__number:disabled:hover,
.pagination__number:disabled {
    background-color: #00000059;
}

.pagination__number.active, .pagination__number:hover {
    color: #ffffff;
    background-color: #279FB9;
}
</style>