const fs = require("fs")
const readChat = require("./readChat")


const insertChat = async (mensaje) => {

    try {
        const chat = await readChat() 
        chat.push(mensaje)
        await fs.promises.writeFile('chat.txt', JSON.stringify(chat, null, 2), err => {
        if(err) throw err
    })

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = insertChat