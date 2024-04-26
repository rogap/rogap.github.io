class CreateTable {
    constructor() {
        this.table = null // DOM эллемент созданной таблицы
    }

    // (INIT) создает таблицу на основе данных
    async create() {
        const data = await this.getPosts()
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
     * Создает DOM эллемент таблицы TH и наполняет его данными
     * @param {String} text - текст для наполнения
     * @param {Boolean} first - является ли это шапкой таблицы
     * @returns DOM эллемент
     */
    createTH(text, first) {
        const th = document.createElement('th')
        th.classList.add('table__th')

        // дополнительные классы для заголовков таблицы
        if (first === true) th.classList.add('table__header--column')

        th.innerHTML = text
        return th
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

        DOM_tr.appendChild(this.createTH(data.userId, first))
        DOM_tr.appendChild(this.createTH(data.id, first))
        DOM_tr.appendChild(this.createTH(data.title, first))
        DOM_tr.appendChild(this.createTH(data.body, first))

        this.table.appendChild(DOM_tr)
    }
}
