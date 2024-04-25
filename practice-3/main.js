class SortTable extends CreateTable {
    constructor() {
        super()

        // параметры сортировки [ userId, id, title, body ] соответственно
        // (что бы помнить состояние прошлой сортировки для каждого столбца)
        this.sortedParams = [ null, null, null, null ]

        // текст по которому фильтруем таблицу
        this.filteredText = ''
    }

    // (INIT) добавляет прослушиватели к таблице и создает над таблицей поле для фильтрации
    createItSorted() {
        this.createFilters()
        this.addListeners()
    }

    createFilters() {
        const input = document.createElement('input')
        input.classList.add('table__input')
        input.type = 'text'
        this.table.parentNode.insertBefore(input, this.table)

        input.addEventListener('input', this.input)
    }

    // обработчик ввода текста в поле для фильтрации
    input = (e) => {
        const text = e.target.value ?? ''
        if (text.length < 3) {
            this.filteredText = ''
        } else {
            this.filteredText = text
        }

        // фильтруем...
        this.filter()
    }

    // фильтрует таблицу
    filter() {
        const list = this.table.children
        const text = this.filteredText

        for (let i = 1; i < list.length; i++) {
            const el = list[i]

            const title = el.children[2].innerHTML ?? ''
            const body = el.children[3].innerHTML ?? ''

            const check = title.indexOf(text) !== -1 || body.indexOf(text) !== -1
            el.classList.toggle('hidden', !check)
        }
    }

    // добавляет обработчики событий для сортировки таблицы
    addListeners() {
        const DOM_tr = this.table.children[0]
        const [ DOM_userId, DOM_id, DOM_title, DOM_body ] = DOM_tr.children

        DOM_userId.addEventListener('click', this.clickUserId)
        DOM_id.addEventListener('click', this.clickId)
        DOM_title.addEventListener('click', this.clickTitle)
        DOM_body.addEventListener('click', this.clickBody)
    }

    // обработчик клика по userid
    clickUserId = () => {
        console.log('clickUserId')
        this.sortedParams[0] = !this.sortedParams[0]
        this.sortTableFromNum(0)
    }

    // обработчик клика по id
    clickId = () => {
        console.log('clickId')
        this.sortedParams[1] = !this.sortedParams[1]
        this.sortTableFromNum(1)
    }

    // обработчик клика по title
    clickTitle = () => {
        console.log('clickTitle')
        this.sortedParams[2] = !this.sortedParams[2]
        this.sortTableFromNum(2)
    }

    // обработчик клика по body
    clickBody = () => {
        console.log('clickBody')
        this.sortedParams[3] = !this.sortedParams[3]
        this.sortTableFromNum(3)
    }

    // сортирует по указанному номеру колонки (0 - userid, 1 - id, ...)
    sortTableFromNum(numSorted=0) {
        const tableChList = Array.from(this.table.children)

        tableChList.shift() // удаляем первый так как это заголовок таблицы

        // сортируем
        tableChList.sort((a, b) => {
            const dataA = a.children[numSorted].innerHTML
            const dataB = b.children[numSorted].innerHTML

            if (typeof dataA === 'string') return this.sortedParams[numSorted] ? 
            dataB.localeCompare(dataA) : dataA.localeCompare(dataB)

            return this.sortedParams[numSorted] ?  dataB - dataA : dataA - dataB
        })

        // получаем данные для формирования таблицы
        const data = this.getTableData(tableChList)

        // очищаем таблицу
        this.clearTable()

        // создаем таблицу заного
        data.forEach(this.addToTable)

        // фильтруем если нужно
        this.filter()
    }

    clearTable() {
        while (this.table.children[1]) {
            this.table.removeChild(this.table.lastChild)
        }
    }

    /**
     * получает данные из таблицы или указанного массива эллементов принадлежащего таблице
     * @param {Array} - список эллементов таблицы
     * @returns {Object} - обьект с данными
     */
    getTableData(list) {
        if (!this.table.children) {
            list = Array.from(this.table.children)
            list.shift()
        }

        return list.map(el => {
            const [ DOM_userId, DOM_id, DOM_title, DOM_body ] = el.children
            return {
                userId: DOM_userId.innerHTML,
                id: DOM_id.innerHTML,
                title: DOM_title.innerHTML,
                body: DOM_body.innerHTML
            }
        })
    }
}


const table = new SortTable()
table.create()
.then(() => {
    table.createItSorted()
})