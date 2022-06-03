$("#rejestruj").click(function(){ //akcja po kliknieciu w przycisk zarejestruj
    let czyDobrze = true; //trzyma informacje o tym czy wprowadzono wszystkie dane
    $("#loginError").html(""); //wyczysz informacje o bledzie loginu
    $("#passwordError").html(""); //jw ale haslo

    let login = $("#login").val(); //pobierz login
    if(login == null || login == ""){ //jesli login nie zostal podany
        $("#loginError").html("Login is required"); //wyswietl komunikat o bledzie
        let czyDobrze = false; //sygnalizujemy blad w formularzu ustawiajac ta zmienna na false
    }
    else if(login.length < 3){ //jesli login jest krotszy niz 3 znaki
        $("#loginError").html("Login too short"); //komunikat o bledzie
        let czyDobrze = false; 
    }
    let haslo1 = $("#haslo1").val(); //pobierz haslo
    let haslo2 = $("#haslo2").val(); //pobierz potwierdzenie hasla 
    if(haslo1 == null || haslo1 == ""){ //jesli haslo puste
        $("#passwordError").html("Password is required"); //komunikat o bledzie
        let czyDobrze = false; 
    }
    else if(haslo1.length < 3){ //jesli haslo za krotkie
        $("#passwordError").html("Password too short"); //komunikat o bledzie
        let czyDobrze = false; 
    }
    else if(haslo1 != haslo2){ //jesli hasla sa od siebie rozne
        $("#passwordError").html("Diffrent passwords"); //komunikat o bledzie
        let czyDobrze = false;
    }
    if(czyDobrze){ //jesli wszystkie dane zostaly wprowadzone poprawnie
        let credentials = JSON.parse(localStorage.getItem("credentials")); //pobierz dane o uzytkownikach z pamieci przegladarki
        if(credentials == null) //jesli danych nie ma
        {
            credentials = {}; //utworz pusty slownik
        }
        if(login in credentials) //jesli login wystepuje w danych uzytkownikow 
        {
            $("#loginError").html("Login exists!"); //daj komunikat o bledzie, nie mozna rejestrowac z tym samym loginem co istnieje w pamieci
            return; //zakoncz
        }
        credentials[login] = haslo1; //w przeciwnym razie dodaj do slownika login i haslo
        localStorage.setItem("credentials", JSON.stringify(credentials)); //zapisz dane o uzytkownikach do pamieci

        $("#login").val(""); //wyczysc pola z formularza
        $("#haslo1").val("");
        $("#haslo2").val("");
        alert("zarejestrowano"); //wyswietl alert 
        window.location.replace("login.html"); //przejdz na strone logowania
    }
});