<script setup>
import { reactive, onMounted, toRefs } from 'vue'

import getEpizode from '@/api/getEpizode.js'

const props = defineProps([ 'data' ])
const data = reactive(props.data)


const epizodeData = reactive({ name: 'Загрузка...' })

onMounted(async () => {
    const getData = await getEpizode(data.episode[0])
    epizodeData.name = getData.name
})
</script>


<template>
    <article class="character">
        <div class="character__picture">
            <img class="character__img" :src="data.image" :alt="data.name">
        </div>
        <div class="character__content">
            <section class="character__item">
                <header class="character__name">{{ data.name }}</header>
                <div class="character__status">
                    <span class="character__status-icon--dead" v-if="data.status === 'Dead'"></span>
                    <span class="character__status-icon--alive" v-else-if="data.status === 'Alive'"></span>
                    <span class="character__status-icon--uncnown" v-else></span>
                    <span class="character__status--text">{{ data.status }} - {{ data.species }}</span>
                </div>
            </section>
            <section class="character__item">
                <span class="character__label">Last known location:</span>
                <span class="character__location-name">{{ data.location.name }}</span>
            </section>
            <section class="character__item">
                <span class="character__label">First seen in:</span>
                <span class="character__location-name">{{ epizodeData?.name }}</span>
            </section>
        </div>
    </article>
</template>


<style scoped>
.character {
    display: flex;
    width: 600px;
    height: 220px;
    background: rgb(60, 62, 68);
    border-radius: 0.5rem;
}

.character__picture {
    display: flex;
}

.character__img {
    margin: 0px;
    padding: 0px;
    width: 220px;
    height: 220px;
    border-radius: 0.5rem 0 0 0.5rem;
}

.character__content {
    /* display: grid;
    gap: 10px; */
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.character__name {
    font-size: 1.5em;
    color: #fff;
    font-weight: 800;
    line-height: 1.1;
}



.character__status {
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
}

.character__status-icon--dead,
.character__status-icon--alive,
.character__status-icon--uncnown {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    margin-right: 0.375rem;
    display: block;
    font-size: 16px;
    font-weight: 500;
}

.character__status-icon--dead {
    background: rgb(214, 61, 46);
}
.character__status-icon--alive {
    background: rgb(85, 204, 68);
}
.character__status-icon--uncnown {
    background: rgb(158, 158, 158);
}


.character__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.character__label {
    color: rgb(158, 158, 158);
    font-size: 16px;
    font-weight: 500;
}

.character__location-name {
    color: rgb(245, 245, 245);
}
</style>