import axios from 'axios'


const getEpizode = async url => {
    const { data } = await axios.get(url)
    return data
}


export default getEpizode