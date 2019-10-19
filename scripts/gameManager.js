class GameManager {
    constructor(uiMain) {
        this.hp = 100;
        this.money = 0;
        this.fuel = 100;
        this.score = 0;
        this.uiMain = uiMain;
    }

    start() {
        this.updateUi();
    }

    updateUi() {
        this.uiMain.txtHp.text = "Hp: " + this.hp;
        this.uiMain.txtMoney.text = "$ " + this.money;
    }

    update() {

    }

    onCollect(craft, scrap) {
        delete Scrap1.scraps[Scrap1.scraps.indexOf(scrap)];
        scrap.model.dispose()
        this.money += 10;
        this.score += 10;
        this.updateUi()
    }

    onDamage() {

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
        this.updateUi()
    }
}