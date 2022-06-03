$(document).ready(function() { //wykonaj ponizsza funkcja jak zaladuje sie strona
    loadGamesToBasket();
});

function loadGamesToBasket()
{
    let data = JSON.parse(localStorage.getItem("basket")); //zaladuj dane o koszyku z grami z pamieci przegladarki i zamien na JSON - [{"title" : "fsfs"}, {"title" : "fdsfs" ... }]
    if(data == null) //jesli nie ma danych to zakoncz
    {
        return;
    }

    for(let i = 0; i < data.length; i++) //dla kazdej gry z koszyka wykonaj ponizsza funkcje
    {
        addGameToBasketView(data[i]);
    }
}

function addGameToBasketView(game) //funkcja dodajaca gre z koszyka do panelu z koszykiem, game - slownik z danymi gry
{
    let element = $("<div></div>").load("./basketitem.html", function() { //zaladuj format html pojedycznej gry z pliku i wykonaj ponizsza funkcje
            element.find($("span[name='gameName']")).html(game.title + " " + game.salePrice + "$"); //wyszukaj wyszukaj w widoku gry element przechowujacy tytul i wpisz tam odpowiednia wartosc wraz z cena
            element.find($("button[name='removeButton'")).click(function() { //szukamy w widoku gry przycisku i doczepiamy do niego ponizsza funkcje (przycisk usuwania gry - kosz)
                element.remove(); //kasuje element html (czyli widok gry)
                let totalPrice = parseFloat($("#totalPrice").html()); //pobieramy cene za wszystkie gry (na przycisku)
                $("#totalPrice").html(Math.round((totalPrice - parseFloat(game["salePrice"]) )* 100) / 100); //odejmujemy cene za usunieta gre i wpisujemy ja w przycisk
                removeGameFromBasket(game); //ta funkcja usuwa gre z pamieci przegladarki
            });
    });
    $("#koszyk").prepend(element); //najnowsza gra jest dodawana na gore koszyka, append dodalby ale na koniec
    let totalPrice = parseFloat($("#totalPrice").html()); //pobieramy cene za wszystkie gry (na przycisku)
    $("#totalPrice").html(Math.round((totalPrice + parseFloat(game["salePrice"]) )* 100) / 100);  //zwiekszamy cene o dodawana gre i zapisujemy w widoku
}

function removeGameFromBasket(game) //usuwa gre z pamieci przegladarki
{
    let data = JSON.parse(localStorage.getItem("basket")); //pobierz z pamieci przegladarki gry zapisane w koszyku
    if(data == null) //jesli nie ma gier to zakoncz
    {
        return;
    }
    for(let i = 0; i < data.length; i++) //przejdz po wszystkich grach w petli
    {
        if(data[i]["gameID"] == game["gameID"]) //jesli znalezlismy szukana do usuniecia gre
        {
            data.splice(i, 1); //usuwa gre z listy
            break; //przerwij petle
        }
    }
    localStorage.setItem("basket", JSON.stringify(data)); //zapisz dane o koszyku do pamieci przegladarki
}