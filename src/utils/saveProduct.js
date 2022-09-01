
const saveProduct = async (data) => {
    
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}

module.exports = saveProduct