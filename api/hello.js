module.exports = (req, res) => {
    res.json({
        hola: 'Alex', 
        env: process.env.MY_SECRET
    })
}