class CreateTable {
    constructor() {
        this.table = null // DOM эллемент созданной таблицы
    }

    // (INIT) создает таблицу на основе данных
    async create() {
        const data = await this.getPosts()
        console.log(data)

        this.createDefaultTable()

        data.forEach(this.addToTable)
    }

    // получаем данные
    async getPosts() {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    // создает дефолтную пустую таблицу
    createDefaultTable(body=document.body) {
        const DOM_table = document.createElement('table')
        this.table = DOM_table
        DOM_table.classList.add('table')

        // добавляем шапку таблицы
        this.addToTable({
            userId: 'userId',
            id: 'id',
            title: 'title',
            body: 'body'
        }, true)

        body.appendChild(DOM_table)
    }

    /**
     * добавляет ряд в таблицу
     * @param {Object} data - данные на основе которых будет добавлен ряд в таблицу
     * @param {Boolean} first - является ли это шапкой таблицы
     */
    addToTable = (data, first=false) => {
        const DOM_tr = document.createElement('tr')
        DOM_tr.classList.add('table__tr')
        this.table.appendChild(DOM_tr)

        if (first === true) {
            DOM_tr.classList.add('table__header--line')
        }

        const DOM_userId = document.createElement('th')
        const DOM_id = document.createElement('th')
        const DOM_title = document.createElement('th')
        const DOM_body = document.createElement('th')

        DOM_userId.classList.add('table__th')
        DOM_id.classList.add('table__th')
        DOM_title.classList.add('table__th')
        DOM_body.classList.add('table__th')

        // дополнительные классы для заголовков таблицы
        if (first === true) {
            DOM_userId.classList.add('table__header--column')
            DOM_id.classList.add('table__header--column')
            DOM_title.classList.add('table__header--column')
            DOM_body.classList.add('table__header--column')
        }

        DOM_userId.innerHTML = data.userId
        DOM_id.innerHTML = data.id
        DOM_title.innerHTML = data.title
        DOM_body.innerHTML = data.body

        DOM_tr.appendChild(DOM_userId)
        DOM_tr.appendChild(DOM_id)
        DOM_tr.appendChild(DOM_title)
        DOM_tr.appendChild(DOM_body)

        this.table.appendChild(DOM_tr)
        // return { DOM_tr, DOM_userId, DOM_id, DOM_title, DOM_title, DOM_body }
    }
}


// const table = new CreateTable()
// table.create()