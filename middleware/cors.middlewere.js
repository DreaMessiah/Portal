function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    next()
}

module.exports = cors