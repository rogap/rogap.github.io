### Обьяснение что выведет код ниже

- цикл сработает и запишет в событийный цикл (макротаски) запуск всех таймаутов через 3000мс
- таймауты сработают через 3000мс (по возможности) в той очередности в которой были поставлены
- при вызове function переменная i будет доступна по замыканию и будет равна 4
- arr[4] будет равным undefined
- console.log выведет "Bad: undefined" 4 раза

```js
const arr = [ 10, 12, 15, 21 ]

// обьявить переменную i через let
for (var i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```

### Вариант модификации 1

```js
const arr = [ 10, 12, 15, 21 ]

// обьявить переменную i через let
for (let i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```

### Вариант модификации 2

```js
const arr = [ 10, 12, 15, 21 ]

for (var i = 0; i < arr.length; i++) {
    // добавим функцию-обертку для того что бы хранить переменную i в scope и она была доступна по замыканию для setTimeout функции
    (function() {
        var scope = i
        setTimeout(function() {
            console.log(arr[scope] > 13 ? `Good: ${arr[scope]}` : `Bad: ${arr[scope]}`)
        }, 3000)
    })()
}
```