class UiMain extends SceneNode {
    setup() {
        let adv = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TextUI");
        let panelTxt1 = new BABYLON.GUI.Rectangle();
        let panelTxt2 = new BABYLON.GUI.Rectangle();
        let panelTxt3 = new BABYLON.GUI.Rectangle();
        let panelTxt4 = new BABYLON.GUI.Rectangle();
        let panelTxt5 = new BABYLON.GUI.Rectangle();

        adv.addControl(panelTxt1);
        adv.addControl(panelTxt2);
        adv.addControl(panelTxt3);
        adv.addControl(panelTxt4);
        adv.addControl(panelTxt5);

        panelTxt1.width = "150px";
        panelTxt1.height = "100px";
        panelTxt1.isVertical = true;
        panelTxt1.fontSize = 24;
        panelTxt1.thickness = 0;
        panelTxt1.top = "5";
        panelTxt1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        panelTxt2.width = "150px";
        panelTxt2.height = "100px";
        panelTxt2.isVertical = true;
        panelTxt2.fontSize = 24;
        panelTxt2.thickness = 0;
        panelTxt2.top = "35";
        panelTxt2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        panelTxt3.width = "150px";
        panelTxt3.height = "100px";
        panelTxt3.isVertical = true;
        panelTxt3.fontSize = 24;
        panelTxt3.thickness = 0;
        panelTxt3.top = "65";
        panelTxt3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        panelTxt4.width = "250px";
        panelTxt4.height = "120px";
        panelTxt4.isVertical = true;
        panelTxt4.fontSize = 24;
        panelTxt4.thickness = 0;
        panelTxt4.top = "5";
        panelTxt4.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        panelTxt5.width = "150px";
        panelTxt5.height = "100px";
        panelTxt5.isVertical = true;
        panelTxt5.fontSize = 24;
        panelTxt5.thickness = 0;
        panelTxt5.top = "95";
        panelTxt5.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.txtHp = new BABYLON.GUI.TextBlock("");
        this.txtFuel = new BABYLON.GUI.TextBlock("");
        this.txtMoney = new BABYLON.GUI.TextBlock("");
        this.txtHeight = new BABYLON.GUI.TextBlock("");
        this.txtScore = new BABYLON.GUI.TextBlock("");

        panelTxt1.addControl(this.txtHp);
        panelTxt2.addControl(this.txtFuel);
        panelTxt3.addControl(this.txtMoney);
        panelTxt4.addControl(this.txtHeight);
        panelTxt5.addControl(this.txtScore);

        this.txtHp.text = "HP: 100";
        this.txtFuel.text = "Fuel: 100%";
        this.txtMoney.text = "$ 0";
        this.txtHeight.text = "$ 0";
        this.txtScore.text = "Score: ";

        this.txtHp.color = "white";
        this.txtFuel.color = "white";
        this.txtMoney.color = "white";
        this.txtHeight.color = "white";
        this.txtScore.color = "white";
    }

    update() {

    }
}