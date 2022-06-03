$(document).ready(function() { //wykonaj ponizszy kod gdy zaladuje sie strona
    $("#navbar").load("nav.html", function() { //do elementu o nazwie id nazvabr zaladuj dane z pliku nav.html
        $("#wyloguj").click(function(){ //funkcja ktora uruchomi sie po kliknieciu w przycisk wyloguj
            localStorage.removeItem("login"); //usun z pamieci przegladarki dane pod kluczem login
            localStorage.removeItem("basket"); //jak wyzej ale basket
            window.location.replace("login.html"); //przejdz do strong logowania
        });
        
        let login = localStorage.getItem("login"); //pobierz z pamieci przeglardarki dane pod kluczem login
        if(login != "" && login != null) //jesli dane istnieja (czyli jestesmy zalogowani)
        {
            $("#username").html("Konto " + login); //ustaw username na pasku menu z pobranych danych
            $("#logowanie").hide(); //ukryj przycisk logowania
            $("#rejestracja").hide(); //i rejestracji
            
            var pathname = window.location.pathname; //pobierz aktualny link pod ktorym sie znajdujemy np localhost/sklep/
            if(!pathname.includes("zamowienie")) //jesli link nie zawiera w sobie nazwy "Zamowienie" (czyli nie jestemy w zamowieniu)
            {
                $("#koszykPrzycisk").click(function(){ //dodaj funkcje klikniecia w koszyk
                    if ( $( "#koszyk" ).first().is( ":hidden" ) ) { //jesli panel koszyka jest schowany to rozwin go z uzyciem animacji
                        $( "#koszyk" ).slideDown( "slow" );
                      } else {
                        $( "#koszyk" ).slideUp("slow"); //w przeciwnym razie schowaj, slow - powoli
                      }
                });
            }     
            else
            {
                $("#koszykPrzycisk").hide(); //chowamy koszyk jesli jestesmy na stronie z zamowieniem
            }       
        }
        else
        {
            $("#koszykPrzycisk").hide(); //schowaj przycisk koszyka (jesli nie jestesmy zalgoowani)
            $("#wyloguj").hide(); //tak samo przycisk wyloguj
            $("#sklepItem").hide(); //schowaj przycisk sklepu (w navbarze)
        }
    });
});