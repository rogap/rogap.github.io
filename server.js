'use strict';
console.log(`\n\n\nSTART SERVER SITE!\n\n`) // ВСЕ ГЛОБАЛЬЫНЕ ПЕРЕМЕННЫЕ СЛЕДОВАЛО БЫ СДЕЛАТЬ КАПСОМ

const path = require('path')
const mainPath = require.main.path
const fs = require('fs')

const port = 3003

const express = require('express')
const server = express()


server.use('/assets', express.static(path.resolve(mainPath, './dist/assets')))
server.disable('cross-origin-embedder-policy') // разрешаем загрузку изображений с других доменов





const template = fs.readFileSync(path.join(mainPath, 'dist', 'index.html'), 'utf-8') // по идее тут бы дождаться окончания загрузки, но не обязательно
server.get('*', async (request, response) => {
    response.set({ 'Content-Type': 'text/html' })
    return response.send(template)
})



server.listen(port, () => {
    console.log(`Server running at ${port}`)
})