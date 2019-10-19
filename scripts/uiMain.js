class UiMain extends SceneNode {
    setup() {
        let adv = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TextUI");
        let panelTxt1 = new BABYLON.GUI.Rectangle();
        let panelTxt2 = new BABYLON.GUI.Rectangle();
        adv.addControl(panelTxt1);
        adv.addControl(panelTxt2);

        panelTxt1.width = "150px";
        panelTxt1.height = "100px";
        panelTxt1.isVertical = true;
        panelTxt1.fontSize = 12;
        panelTxt1.thickness = 0;
        panelTxt1.top = "5";
        // panelTxt1.left = "10";
        panelTxt1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        panelTxt2.width = "150px";
        panelTxt2.height = "100px";
        panelTxt2.isVertical = true;
        panelTxt2.fontSize = 12;
        panelTxt2.thickness = 0;
        panelTxt2.top = "5";
        // panelTxt2.right = "10";
        panelTxt2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panelTxt2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        let txt1 = new BABYLON.GUI.TextBlock("");
        let txt2 = new BABYLON.GUI.TextBlock("");
        panelTxt1.addControl(txt1);
        panelTxt2.addControl(txt2);
        txt1.text = "$ 300";
        txt2.text = "HP: 10";
        txt1.color = "white";
        txt2.color = "white";
    }

    update() {

    }
}