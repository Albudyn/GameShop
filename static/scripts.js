$(document).ready(function() { //gdy zaladuje sie dokument wykonaj ponizszy kod
    let login = localStorage.getItem("login"); //pobierz login zalogowanego uzytkownika
    if(login == "" || login == null){ //jesli uzytkownik nie jest zalogowany
        window.location.replace("login.html"); //przejdz na strone logowania
        return;
    }

    loadGamesToBasket(); //zaladuj gry do koszyka

    $("#payButton").click(function() { //dodaj akcje pod przycisk z platnoscia ktora przeniesie uzytkownika do strony z koszykiem i danymi kontaktowymi
        window.location.replace("zamowienie.html");
    });

    $("#username").html("Konto " + login); //ustaw nazwe uzytkownika na pasku menu
    $.get("https://www.cheapshark.com/api/1.0/deals", //pobierz dostepne gry z podanego linku
        function(data, status) //uruchom funkcje gdy gry zostana pobrane, data przechowuje odpowiedz na zapytanie a status informacje czy udalo sie wykonac zapytanie poprawni
        {
            if(status == "success") //jesli zapytanie zostalo wykonane poprawnie
            {
                let content = $("#gry"); //pobierz widok z grami
                content.html(""); //wyczysc ten widok (przy okazji kasuje sie animacja ladowania)
                for(let i = 0; i < data.length; i++) //dla kazdej pobranej gry wykonaj w petli ponizszy kod
                {
                    let col1 = $("<div><img src='" + data[i]["thumb"] + "'/></div>"); //utworz widok na minuaturke i dodaj link z danych
                    let shortTitle = data[i]["title"]; //pobierz tytul gry
                    if(shortTitle.length > 25) //jesli tytul jest dluzszy niz 25 literek to:
                    {
                        shortTitle = shortTitle.substring(0, 25) + "..."; //utnij go i dodaj kropki
                    }
                    let col2 = $("<div title='" + data[i]["title"] +"'></div>").html(shortTitle);//utworz div z tytulem
                    let col3 = $("<div style='text-decoration: line-through;'>"+ data[i]["normalPrice"] +"$</div>"); //utworz div z cena przekreslona za pomoca stylu
                    let col4 = $("<div>"+ data[i]["salePrice"] +"$</div>"); //utworz div z cena promocyjna
                    if(data[i]["steamRatingText"] == null) //jesli nie ma oceny steam to wpisz "brak oceny"
                    {
                        data[i]["steamRatingText"] = "Brak oceny";
                    }
                    let col5 = $("<div>"+ data[i]["steamRatingText"]  +"</div>"); //utworz diva z ocena
                    let button = $("<button style='width: 100%;'>Dodaj do koszyka</button>"); //utworz przycisk kupna gry
                    button.click(function() { //dodaj akcja do przycisku ktora bedzie dodawac gre do koszyka
                        addGameToBasket(data[i]);
                        addGameToBasketView(data[i]);
                    });

                    let div = $("<div name='game' class='shop-item'></div>"); //utworz div z miejscem na dane gry
                    div.append(col1, col2, col3, col4, col5, button); //na zapakuj wszystkie utworzone wyzej elementy do jednego diva
                    content.append(div); //dodaj div do widoku z grami
                }
                let noResult = $("<div id='noResult'></div>").html("");  //utworz element ktory bedzie sie pojawiac tylko gdy nie zostana znalezione gry (domyslnie jest schowany)
                content.append(noResult); //dodaj ten element do widoku z grami
            }
        }
    );

    $("#szukaj").click(function(){ //dodaj akcje pod przycisk szukania
        let tekst = $("#szukanaFraza").val().toLowerCase(); //pobierz nazwe szukanej gry i zamien jej literki na male
        let count = 0;
        $("div[name='game']").each(function(index) { //dla kazdej gry na stronie
            let row = $(this); //pobierz element z gra
            let col = $(row.children("div")[1]); //pobierz div-a z tytulem
            let title  = col.html(); //pobierz tekst ktory sie tam znajduje
            if(title.toLowerCase().includes(tekst)){ //jesli tytul zawiera szukana fraze (zamieniamy tytul na male literki zeby ignorowac ich wielkosc)
                row.show(); //pokaz dana gre
                count++; //zwieksz licznik wyszukanych gier
            }
            else{
                row.hide(); //ukryj dana gre
            }
        });

        if(count > 0) //jesli znaleziono gry
        {
            let noResult = $("#noResult");
            noResult.hide(); //ukryj informacje o braku gier
        }
        else
        {
            let top = $("<div style='font-size: 30px;'></div>").html("Czy na pewno szukasz „" + tekst + "”?"); //ustaw div z tekstem
            let bottom = $("<div></div>").html("Być może to, czego szukasz, występuje pod inną nazwą. Spróbuj wpisać to inaczej."); //ustaw drugi div z tekstem
            let noResult = $("#noResult"); //pobierz element ktory zawiera komunikat o braku gier
            noResult.html(""); //wyczysc aktualny komunikat
            noResult.append(top, bottom); //wstaw wyzej wygenerowany komunikat
            noResult.show(); //wysietl element z komunikatem
        }
    });
});



function addGameToBasket(game)
{
    let data = JSON.parse(localStorage.getItem("basket")); //pobierz z pameci gry znajdujace sie w koszyku
    if(data == null) //jesli nie ma gier to wstaw pusta tablice
    {
        data = [];
    }
    data.push(game); //dodaj gre do tablicy
    localStorage.setItem("basket", JSON.stringify(data)); //wrzuc ponownie gry znajdujace sie w koszyku do pamieci
}

function removeGameFromBasket(game)
{
    let data = JSON.parse(localStorage.getItem("basket")); //pobierz z pameci gry znajdujace sie w koszyku
    if(data == null) //jesli nie ma gier w koszyku to zakoncz
    {
        return;
    }
    for(let i = 0; i < data.length; i++) //przejdz po kazdej grze z koszyka
    {
        if(data[i]["gameID"] == game["gameID"]) //jesli id usuwanej gry jest taki sam jak id przegladanej gry
        {
            data.splice(i, 1); //usuwa gre z koszyka pod danym indesem i
            break; //przerwij petle
        }
    }
    localStorage.setItem("basket", JSON.stringify(data));//wrzuc ponownie gry znajdujace sie w koszyku do pamieci
}

function loadGamesToBasket()
{
    let data = JSON.parse(localStorage.getItem("basket"));  //pobierz z pameci gry znajdujace sie w koszyku
    if(data == null) //jesli nie ma gier w koszyku to zakonczs
    {
        return;
    }

    for(let i = 0; i < data.length; i++) //przechodzi po kazdej grze i laduje ja do widoku koszyka na ekranie
    {
        addGameToBasketView(data[i]);
    }
}

function addGameToBasketView(game)
{
    let guzik = $("<button style='float: right;height: 30px' class='bi bi-trash rounded-button'></button>") //utworz przycisk kosza (usunicie gry z koszyka)
    let div = $("<div style='margin-bottom: 20px'></div>").html("<span>" + game["title"] + " " + game["salePrice"] + "$</span>"); //utworz div ze szczegolami odnosnie gry
    div.append(guzik); //dodaj przycisk do tego diva
    $("#koszyk").prepend(div); //wrzuc gre na gore koszyka
    let price = parseFloat(game["salePrice"]);
    addToTotalPrice(price);
    guzik.click(function() {  //akcja po kliknieciu w przycisk koszta
        div.remove(); //usun div z gra z widoku koszyka
        addToTotalPrice(-price);
        removeGameFromBasket(game); //usun gre z pamieci            
    });
}

function addToTotalPrice(value)
{
    let totalPrice = parseFloat($("#totalPrice").html()); //pobierz cene calkowita gier z koszyka
    $("#totalPrice").html(Math.round((totalPrice + parseFloat(value) )* 100) / 100); //podnies cene calkowita o ta gre
}