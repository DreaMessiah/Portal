export default function shortenText(text) {
    if(text){
        const words = text.split(' ')
        const shortenedWords = words.slice(0, 20)
        let shortenedText = shortenedWords.join(' ')
        if (words.length > 20) {
            shortenedText += '...'
        }
        return shortenedText
    }
    return false
}