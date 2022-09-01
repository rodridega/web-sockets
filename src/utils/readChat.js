const fs = require("fs")


const readChat = async () => {

    try {
        const data = await fs.promises.readFile('chat.txt', 'utf-8', (err, data) => {
            if(err) throw err
            return data
        })
        return JSON.parse(data) 

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = readChat