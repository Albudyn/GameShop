from flask import Flask, render_template, request, redirect, url_for

app = Flask("website")

@app.route("/")
@app.route("/login.html")
@app.route("/login")
def home():
    return render_template("login.html")

@app.route("/sklep.html")
@app.route("/sklep")
def sklep():
    return render_template("sklep.html")

@app.route("/register.html")
@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/zamowienie.html", methods=["GET", "POST"])
@app.route("/zamowienie", methods=["GET", "POST"])
def order():
    if request.method == "POST":
        data = dict(request.form) #zapisz dane z formularza do zmiennej (powstanie slownik kluczy-wartosci)
        name = data["name"]
        surname = data["surname"]
        email = data["email"]
        street = data["street"]
        city = data["city"]
        postcode = data["postcode"]
        cardnumber = data["cardnumber"]
        carddate = data["carddate"]
        cvv = data["cvv"]
        with open("database.csv", "a") as file: #otworz plik w trybie do dopisywania na koniec pliku
            file.write(name + ";" + surname + ";" + email + ";" + street + ";" + city + ";" + postcode + ";" + cardnumber + ";" + carddate + ";" + cvv + "\n")
        return redirect(url_for("podsumowanie"))

    return render_template("zamowienie.html")

@app.route("/nav.html")
def nav():
    return render_template("nav.html")

@app.route("/basketitem.html")
def basketitem():
    return render_template("basketitem.html")

@app.route("/podsumowanie.html")
def podsumowanie():
    return render_template("podsumowanie.html")

app.run(debug=True)