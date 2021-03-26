
//inputData()
let fs = require('fs')
function inputData(){
    var cards = [
        {value: document.forms["form"].elements["card-1"].value, in: document.forms["form"].elements["type-1"].value},
        {value: document.forms["form"].elements["card-2"].value, in: document.forms["form"].elements["type-2"].value},
        {value: document.forms["form"].elements["card-3"].value, in: document.forms["form"].elements["type-3"].value},
        {value: document.forms["form"].elements["card-4"].value, in: document.forms["form"].elements["type-4"].value},
        {value: document.forms["form"].elements["card-5"].value, in: document.forms["form"].elements["type-5"].value}
    ]
    var values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]   
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
    if(cards[0].value == "" || cards[1].value == "" || cards[2].value == "" || cards[3].value == "" || cards[4].value == ""){
        console.log("empty")
        console.log(cards)
        document.querySelector("p.status").innerHTML = ""
        document.querySelector("p.status").innerHTML = "Введите комбинацию полностью"
    }
    else{
        for(j = 0; j != cards.length; j++){
            for(i = 0; i != values.length; i++){
                if(cards[j].value == values[i]){
                    cards[j].legit = 1
                    break
                }
            }
        }
    }
    console.log(cards, values)
    if(cards[0].legit == 1 && cards[1].legit == 1 && cards[2].legit == 1 && cards[3].legit == 1 && cards[4].legit == 1){
        check(cards)
       
        
    }
    else{
        document.querySelector("p.status").innerHTML = "В комбинации допущены ошибки"
    }
}

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
    if(combo[0].pair == 1 && combo[0].set == 1){
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

    let currentDate = new Date()
        if(combo[0].flashRoyal == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Флеш Рояль"
        }
        else if(combo[0].streetFlash == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Стрит Флеш"
        }
        else if(combo[0].kare == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Каре"
        }
        else if(combo[0].fullHouse == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Фулл Хаус"
        }
        else if(combo[0].flash == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Флеш"
        }
        else if(combo[0].street == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Стрит"
        }
        else if(combo[0].set == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Сет"
        }
        else if(combo[0].dpair == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Две пары"
        }
        else if(combo[0].pair == 1){
            document.querySelector("p.status").innerHTML = "Старшая комбинация: Пара"
        }
        else{
            document.querySelector("p.status").innerHTML = "Комбинаций нет"
        }
}
window.inputData = inputData
console.log("Вимкнено")