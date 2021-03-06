window.addEventListener("load", function(){
    truncateCardText();
    truncateCardPrice();
    truncateCardTitle();
});

function truncateCardText(){
    var cardList = document.getElementsByClassName("card-text");
    for(var i = 0; i < cardList.length; i++){
        var text = cardList[i].innerHTML;
        var newText = truncateString(text, 40);
        cardList[i].innerHTML = newText;
    }
}

function truncateString(str, num){
    if (str.length > num){
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

function truncateCardPrice(){
    var cardList = document.getElementsByClassName("card-price-num");
    for(var i = 0; i < cardList.length; i++){
        var text = cardList[i].innerHTML;
        var newText = truncatePrice(text);
        cardList[i].innerHTML = newText;
    }
}

function truncatePrice(str) {
    if (str.length > 4){
        return str.slice(0, str.length - 3) + "." + str.slice(str.length - 3,str.length);
    }
     else {
        return str;
    }
}

function truncateCardTitle(){
    var cardList = document.getElementsByClassName("card-title");
    for(var i = 0; i < cardList.length; i++){
        var text = cardList[i].innerHTML;
        var newText = truncateString(text,19);
        cardList[i].innerHTML = newText;
    }
}