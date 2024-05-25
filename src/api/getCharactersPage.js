import axios from 'axios'


/**
 * Получает список персонажей указанной страницы с примененными фильтрами
 * @param {Number} page - страница для запроса данных
 */
const getCharactersPage = async ({ page, name, status }) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}&status=${status}`
    const { data } = await axios.get(url)
    return data
}


export default getCharactersPage