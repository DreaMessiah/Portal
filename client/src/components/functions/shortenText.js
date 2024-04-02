export default function shortenText(text,num=20) {
    if(text){
        const words = text.split(' ')
        const shortenedWords = words.slice(0, num)
        let shortenedText = shortenedWords.join(' ')
        if (words.length > 20) {
            shortenedText += '...'
        }
        return shortenedText
    }
    return false
}