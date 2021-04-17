const readline = require('readline-sync')
const fs = require("fs")

var res = []
let cards = [
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0},
    {value: 0, in: 0}
]

const iterations = [10, 50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000]
for(itr = 0; itr < iterations.length; itr++){
    accuracy = iterations[itr]
    var iterStack = [{pair: 0, dpair: 0, set: 0, street: 0, flash: 0, fullHouse: 0, kare: 0, streetFlash: 0, flashRoyal: 0, all: 0}]
    for(k = 0; k < accuracy; k++){
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
        res[0] = checkCombo(cards, values)
        iterStack[0].pair += res[0].pair
        iterStack[0].dpair += res[0].dpair
        iterStack[0].set += res[0].set
        iterStack[0].street += res[0].street
        iterStack[0].flash += res[0].flash
        iterStack[0].fullHouse += res[0].fullHouse
        iterStack[0].kare += res[0].kare
        iterStack[0].streetFlash += res[0].streetFlash
        iterStack[0].flashRoyal += res[0].flashRoyal
        iterStack[0].all = k+1
    }
    fs.appendFileSync("./log.csv", "\n" +
    iterStack[0].all + "," +
    iterStack[0].pair + "(" + (iterStack[0].pair / iterStack[0].all * 100).toFixed(3) + "%)" + "," +
    iterStack[0].dpair + "(" + (iterStack[0].dpair / iterStack[0].all * 100).toFixed(3) + "%)" + "," + 
    iterStack[0].set + "(" + (iterStack[0].set / iterStack[0].all * 100).toFixed(3)  + "%)" + "," + 
    iterStack[0].street + "(" + (iterStack[0].street / iterStack[0].all * 100).toFixed(3) + "%)" + "," +
    iterStack[0].flash + "(" + (iterStack[0].flash / iterStack[0].all * 100).toFixed(3) + "%)" + "," + 
    iterStack[0].fullHouse + "(" + (iterStack[0].fullHouse / iterStack[0].all).toFixed(3) * 100 + "%)" + "," + 
    iterStack[0].kare + "(" + (iterStack[0].kare / iterStack[0].all* 100).toFixed(3) + "%)" + "," + 
    iterStack[0].streetFlash + "(" + (iterStack[0].streetFlash / iterStack[0].all * 100).toFixed(3) + "%)" + "," + 
    iterStack[0].flashRoyal + "(" + (iterStack[0].flashRoyal / iterStack[0].all * 100).toFixed(3) + "%)" + ";")
}
/*console.log("Всего прогонов: " + iterStack[0].all + "\nКомбинации выпали:\n_______________" +
"\nПары: " + iterStack[0].pair + "(" + iterStack[0].pair / iterStack[0].all * 100 + "%)" +
"\nДве пары: " + iterStack[0].dpair + "(" + iterStack[0].dpair / iterStack[0].all * 100 + "%)" +
"\nСет: " + iterStack[0].set + "(" + iterStack[0].set / iterStack[0].all * 100  + "%)" +
"\nСтрит: " + iterStack[0].street + "(" + iterStack[0].street / iterStack[0].all * 100 + "%)" +
"\nФлеш: " + iterStack[0].flash + "(" + iterStack[0].flash / iterStack[0].all * 100 + "%)" +
"\nФулл хаус: " + iterStack[0].fullHouse + "(" + iterStack[0].fullHouse / iterStack[0].all * 100 + "%)" +
"\nКаре: " + iterStack[0].kare + "(" + iterStack[0].kare / iterStack[0].all* 100 + "%)" +
"\nСтрит флеш: " + iterStack[0].streetFlash + "(" + iterStack[0].streetFlash / iterStack[0].all * 100 + "%)" +
"\nФлеш рояль: " + iterStack[0].flashRoyal + "(" + iterStack[0].flashRoyal / iterStack[0].all * 100 + "%)")*/
//console.log(iterStack)
//Функции
//Рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//Поиск комбинаций
function checkCombo(cards, values){
    let combo = [{pair: 0, dpair: 0, set: 0, street: 0, flash: 0, fullHouse: 0, kare: 0, streetFlash: 0, flashRoyal: 0}]
    values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
    //Pair(+)
    for(i = 0; i < cards.length; i++){
        for(v = i + 1; v < cards.length; v++){
            if(cards[i].value == cards[v].value){
                combo[0].pair = 1
            }
        }
    }
    //Double-pair(+)
    if((cards[0].value == cards[1].value && cards[2].value == cards[3].value)
    || (cards[0].value == cards[1].value && cards[3].value == cards[4].value)
    || (cards[0].value == cards[1].value && cards[4].value == cards[5].value)
    || (cards[0].value == cards[1].value && cards[5].value == cards[6].value)
    || (cards[1].value == cards[2].value && cards[3].value == cards[4].value)
    || (cards[1].value == cards[2].value && cards[4].value == cards[5].value)
    || (cards[1].value == cards[2].value && cards[5].value == cards[6].value)
    || (cards[2].value == cards[3].value && cards[5].value == cards[6].value)
    || (cards[2].value == cards[3].value && cards[5].value == cards[4].value)){
        combo[0].dpair = 1
    }
    //Set(+)
    if((cards[0].value == cards[1].value && cards[1].value == cards[2].value) 
    || (cards[1].value == cards[2].value && cards[2].value == cards[3].value) 
    || (cards[2].value == cards[3].value && cards[3].value == cards[4].value) 
    || (cards[3].value == cards[4].value && cards[4].value == cards[5].value) 
    || (cards[4].value == cards[5].value && cards[5].value == cards[6].value)){
        combo[0].set = 1
    }
    //Street(+)
    if(values.indexOf(cards[0].value)+1 == values.indexOf(cards[1].value) && values.indexOf(cards[1].value)+1 == values.indexOf(cards[2].value) && values.indexOf(cards[2].value)+1 == values.indexOf(cards[3].value) && values.indexOf(cards[3].value)+1 == values.indexOf(cards[4].value) 
    || values.indexOf(cards[1].value)+1 == values.indexOf(cards[2].value) && values.indexOf(cards[2].value)+1 == values.indexOf(cards[3].value) && values.indexOf(cards[3].value)+1 == values.indexOf(cards[4].value) && values.indexOf(cards[4].value)+1 == values.indexOf(cards[5].value)
    || values.indexOf(cards[2].value)+1 == values.indexOf(cards[3].value) && values.indexOf(cards[3].value)+1 == values.indexOf(cards[4].value) && values.indexOf(cards[4].value)+1 == values.indexOf(cards[5].value) && values.indexOf(cards[5].value)+1 == values.indexOf(cards[6].value)){
        combo[0].street = 1
    }
    //Flash(+)
    let flush = [{in1: 0, in2: 0, in3: 0, in4: 0}]
    for(i = 0; i < cards.length; i++){
        if(cards[i].in == 0){
            flush[0].in1++
        }
        else if(cards[i].in == 1){
            flush[0].in2++
        }
        else if(cards[i].in == 2){
            flush[0].in3++
        }
        else flush[0].in4++
        if(flush[0].in1 >= 5 || flush[0].in2 >= 5 || flush[0].in3 >= 5 || flush[0].in4 >= 5){
            combo[0].flash = 1
        }
    }
    //FullHouse(+)
    if(combo[0].dpair == 1 && combo[0].set == 1){
        combo[0].fullHouse = 1
    }
    //Kare(+)
    if((cards[0].value == cards[1].value && cards[1].value == cards[2].value && cards[2].value == cards[3].value)
    || (cards[1].value == cards[2].value && cards[2].value == cards[3].value && cards[3].value == cards[4].value)
    || (cards[2].value == cards[3].value && cards[3].value == cards[4].value && cards[4].value == cards[5].value)
    || (cards[3].value == cards[4].value && cards[4].value == cards[5].value && cards[5].value == cards[6].value)){
        combo[0].kare = 1
    }
    //StreetFlash(+)
    if(combo[0].street == 1 && combo[0].flash == 1){
        combo[0].streetFlash = 1
    }
    //FlashRoyal(+)
    if((combo[0].streetFlash == 1 && cards[0].value == "10" && cards[1].value == "J" && cards[2].value == "Q" && cards[3].value == "K" && cards[4].value == "A")
    || (combo[0].streetFlash == 1 && cards[1].value == "10" && cards[2].value == "J" && cards[3].value == "Q" && cards[4].value == "K" && cards[5].value == "A")
    || (combo[0].streetFlash == 1 && cards[2].value == "10" && cards[3].value == "J" && cards[4].value == "Q" && cards[5].value == "K" && cards[6].value == "A")){
        combo[0].flashRoyal = 1
    }
    //console.log(cards)
    return combo[0]
}

