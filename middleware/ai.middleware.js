const axios = require('axios');
const config = require("config");

const aiMiddleware = async (req, res, next) => {
    const { message } = req.body

    if (!message) {
        return res.status(400).send('Message is required')
    }
    try {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(message)
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${config.get('gpt_api_key')}`,
                'Content-Type': 'application/json'
            }
        })

        req.aiResponse = response.data.choices[0].text
        next()
    } catch (error) {
        console.error(error)
        res.status(500).send('Error occurred while processing AI request')
    }
};

module.exports = aiMiddleware