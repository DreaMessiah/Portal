exports.send = (req, res) => {
    const aiResponse = req.aiResponse
    res.status(200).json({ response: aiResponse })
}