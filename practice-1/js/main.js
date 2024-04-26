class Modal {
    constructor() {
        this.status = false // открыто ли модальное окно или закрыто

        // тут еще можно запоминать позицию экрана что бы потом возвращать ан нужную позицию ибо есть небольшой баг при изменении overflow

        this.modal = document.querySelector('.modal-partner')
        this.mainHTML = [
            document.querySelector('body'),
            document.querySelector('html')
        ]

        this.addListeners()
    }

    // добавляем обработчики модального окна
    addListeners() {
        document.querySelector('.send_modal').addEventListener('click', this.send)

        // вешаем событие клика на все кнопки которые должны открывать модальное окно
        Array.from(document.querySelectorAll('.open_modal')).forEach(el => {
            el.addEventListener('click', this.open)
        });

        // вешаем событие клика на все кнопки которые должны закрывать модальное окно
        [
            ...Array.from(document.querySelectorAll('.close_modal')), 
            document.querySelector('.modal-partner')
        ].forEach(el => {
            el.addEventListener('click', this.close)
        })
    }

    // обработчик отправки формы
    send = () => {
        // проверяем валидность обязательных полей перед отправкой
        const check = this.checkValid()
        if (!check.status) return alert(
            check.message ? `Поле "${check.message}" Заполнено не верно!` : 'Поля заполнены не верно'
        )

        alert('Форма успешно отправлена!')
        this.closeForm()

    }

    // првоеряем валидность необходимых полей формы
    checkValid() {
        const nameOrg = document.querySelector('.modal-partner__input--name-org')
        const tel = document.querySelector('.modal-partner__input--tel')
        const email = document.querySelector('.modal-partner__input--email')
        const direction = document.querySelector('.modal-partner__input--direction')
        const director = document.querySelector('.modal-partner__input--director')
        const file = document.querySelector('.modal-partner__file')

        if ( !/[a-zа-я -]{3,50}/i.test(nameOrg.value.trim().replaceAll(/[ ]+/g, ' ')) ) 
            return { status: false, message: 'Название организации' }

        if ( !/[0-9]{8,9}/i.test(tel.value.trim().replaceAll(/[ ]+/g, ' ')) ) 
            return { status: false, message: 'Телефон' }

        const patternEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,20})$/i
        if ( !patternEmail.test(email.value.trim().replaceAll(/[ ]+/g, ' ')) ) 
            return { status: false, message: 'E-mail' }

        if ( !/[a-zа-я0-9 -]{3,50}/i.test(direction.value.trim().replaceAll(/[ ]+/g, ' ')) ) 
            return { status: false, message: 'Направление' }

        if ( !/[a-zа-я -]{3,50}/i.test(director.value.trim().replaceAll(/[ ]+/g, ' ')) ) 
            return { status: false, message: 'Руководитель' }

        if ( !file.value.length ) return { status: false, message: 'Логотип' }

        return { status: true }
    }

    // обработчик открытия модального окна
    open = () => {
        this.status = true
        this.modal.classList.add('open')
        this.toggleOverflow()
    }

    // обработчик закрытия окна
    close = e => {
        // првоеряем валидность клика (что точно по нужному эллементу)
        const checkValidClick = e.target.classList.contains('modal-partner') || e.target.classList.contains('close_modal')
        if (!checkValidClick) return;

        this.closeForm()
    }

    // закрывает форму
    closeForm() {
        this.status = false
        this.modal.classList.remove('open')
        this.toggleOverflow()
    }

    // переключаем возможность прокрутки основной страницы сайта
    toggleOverflow() {
        this.mainHTML.forEach(el => {
            el.style.overflowY = this.status ? 'hidden' : 'auto'
        })
    }
}


const modal = new Modal()
// modal.addListeners()

