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
        console.log("kill")
        scrap.dispose()
        this.money += 10;
        this.score += 10;
    }

    onDamage() {

    }

}