class GameManager {
    constructor(uiMain) {
        this.uiMain = uiMain;
        this.reset();
    }

    reset() {
        this.hp = 100;
        this.money = 0;
        this.fuel = 100;
        this.score = 0;
        this.total_delta = 0;
        this.played = false;
    }

    start() {
        this.played = true;
    }

    updateUi() {
        this.uiMain.txtHp.text = "Hp: " + this.hp;
        this.uiMain.txtFuel.text = "Fuel: " + this.fuel + "%";
        this.uiMain.txtMoney.text = "$ " + this.money;
        this.uiMain.txtHeight.text = "Height: " + ((SceneMain.spacecraft.model.position.length() - 510) * 12.5).numberFormat(2, '.', ',') + "Km";
        this.uiMain.txtScore.text = "Score: " + this.score;
    }

    update() {
        if (this.fuel <= 0 || this.hp <= 0) {
            this.onDamage();
        }
        this.updateUi()
    }
	
	useFuel(fuel) {
        this.total_delta += fuel * engine.getDeltaTime();
        while (this.total_delta > 10000) {
            this.total_delta -= 10000;
            this.fuel -= 1;
        }
	}

    onCollect(scrap) {
        delete Scrap1.scraps[Scrap1.scraps.indexOf(scrap)];
        scrap.model.dispose()
        this.money += 10;
        this.score += 10;
    }

    onHit() {
        this.hp -= 1;
    }

    onDamage() {
        console.log("dead")
        console.log(SceneMain.spacecraft.model.position);
    }


    onHome() {
        if (this.money > (100 - this.fuel)) {
            this.money -= (100 - this.fuel);
            this.fuel = 100;
        } else {
            this.fuel += this.money;
            this.money = 0;
        }
        if (this.money > (100 - this.hp)) {
            this.money -= (100 - this.hp);
            this.hp = 100;
        } else {
            this.hp += this.money;
            this.money = 0;
        }
    }
}

Number.prototype.numberFormat = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
