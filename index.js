let cards = [
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0}
]
let cardValue = 0
let cardIn = 0
var values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
// Заполнение массива картами
for(i = 0; i < cards.length; i++){
    cardValue = getRandomInt(0, values.length - 1)
    cardIn = getRandomInt(0,3)
    cards[i].value = values[cardValue]
    cards[i].in = cardIn
    for(j = 0; j < i; j++){
        if(cards[j].value == cards[i].value && cards[j].in == cards[i].in){
            console.log("+")
            i--
            cardIn = 0
            cardValue = 0
        }
    }

    
}
//Сортировка карт 
cards.sort(function(a, b){
    if(values.indexOf(a.value) < values.indexOf(b.value)){
        return -1
    }
    if(values.indexOf(a.value) > values.indexOf(b.value)){
        return 1
    }
    if(values.indexOf(a.value) == values.indexOf(b.value)){
        return 0
    }
})
check(cards, values)

//console.log(cards)
//Функции
//Рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//Поиск комбинаций
function check(cards, values){
    let combo = [{pair: 0, dpair: 0, set: 0, street: 0, flash: 0, fullHouse: 0, kare: 0, streetFlash: 0, flashRoyal: 0}]
    values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
    console.log("check")
    //Pair
    for(i = 0; i < cards.length; i++){
        for(v = i + 1; v < cards.length; v++){
            if(cards[i].value == cards[v].value){
                combo[0].pair = 1
            }
        }
    }
    //Double-pair
    if((cards[0].value == cards[1].value && cards[2].value == cards[3].value) || (cards[1].value == cards[2].value && cards[3].value == cards[4].value) || (cards[0].value == cards[1].value && cards[3].value == cards[4].value)){
        combo[0].dpair = 1
    }
    //Set
    if((cards[0].value == cards[1].value && cards[1].value == cards[2].value) || (cards[1].value == cards[2].value && cards[2].value == cards[3].value) || (cards[2].value == cards[3].value && cards[3].value == cards[4].value)){
        combo[0].set = 1
    }
    //Street
    if(values.indexOf(cards[0].value)+1 == values.indexOf(cards[1].value) && values.indexOf(cards[1].value)+1 == values.indexOf(cards[2].value) && values.indexOf(cards[2].value)+1 == values.indexOf(cards[3].value) && values.indexOf(cards[3].value)+1 == values.indexOf(cards[4].value)){
        combo[0].street = 1
    }
    //Flash
    j = 1
    for(i = 0; i < cards.length; i++){
        if(i + 1 < cards.length){
            if(cards[i].in == cards[i+1].in){
                j++
                if(j == 5){
                    combo[0].flash = 1
                }
            }
        }
    }
    //FullHouse
    if((cards[0].value == cards[1].value && cards[1].value == cards[2].value && cards[3].value == cards[4].value) || (cards[0].value == cards[1].value && cards[2].value == cards[3].value && cards[3].value == cards[4].value)){
        combo[0].fullHouse = 1
    }
    //Kare
    if((cards[0].value == cards[1].value && cards[1].value == cards[2].value && cards[2].value == cards[3].value)|| (cards[1].value == cards[2].value && cards[2].value == cards[3].value && cards[3].value == cards[4].value)){
        combo[0].kare = 1
    }
    //StreetFlash
    if(combo[0].street == 1 && combo[0].flash == 1){
        combo[0].streetFlash = 1
    }
    //FlashRoyal
    if(combo[0].flash == 1 && cards[0].value == "10" && cards[1].value == "J" && cards[2].value == "Q" && cards[3].value == "K" && cards[4].value == "A"){
        combo[0].flashRoyal = 1
    }
    console.log(cards, combo)
}
