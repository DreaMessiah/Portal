export default function YearsSting(years) {
    const Years = parseInt(years)
    if(Years) {
        if(Years%10 === 1 && Years !== 11) return Years + ' год '
        if( (Years%10 === 2 || Years%10 === 3 || Years%10 === 4) && (Years < 11 || Years > 19)) return Years + ' года '
        else return Years + ' лет '
    }
}

