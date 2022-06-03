$("#zaloguj").click(function(){ //funkcja po kliknieciu w zaloguj
    let czyDobrze = true; //trzyma informacje o tym czy udalo sie poprawnie pobrac dane
    $("#loginError").html(""); //wyczysc komunikat o bledzie loginu w formularzu
    $("#passwordError").html(""); //jw ale haslo

    let login = $("#login").val(); //pobierz login z formularza (z inputa)
    if(login == "" || login == null){ //jesli login nie zostal podany
        $("#loginError").html("Login is required"); //pokaz komunikat o bledzie w formularzu
        czyDobrze = false; //oznaczamy blad w logowaniu
    }
    let haslo = $("#haslo").val(); //jw ale dla hasla
    if (haslo == "" || haslo == null){ //jesli haslo nie podane
        $("#passwordError").html("Password is required"); //pokaz blad
        czyDobrze = false; //jw
    }
    if (czyDobrze){ //jesli dane sa wprowadzone
        let credentials = JSON.parse(localStorage.getItem("credentials")); //pobierz dane spod klucza credentials i zamien na slownik (JSON) - {"login1" : "haslo1", "login2" : "haslo2" ....}
        if(credentials == null) //jesli nie ma danych o uzytkownikach w przegladarce
        {
            credentials = {}; //utworz pusty slownik na dane
        }
        if(!(login in credentials)) //jesli podanego loginu nie ma w tym slowniku
        {
            $("#loginError").html("Login does not exist!"); //wyswietl komunikat o bledzie w formularzu
            return; //zakoncz 
        }
        if(credentials[login] != haslo){ //jesli jest podany klucz (login) ale zapisane haslo jest nieporpawne
            $("#passwordError").html("Password is incorrect"); //pokaz komuniakt o bledzie
            return; //zakoncz
        }

        localStorage.setItem("login", login); //zapisz dane o uzytkownikach z powrotem do pamieci
        window.location.replace("sklep.html"); //przejdz do strony ze sklepem
    }
});