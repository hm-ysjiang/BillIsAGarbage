// The main scene (2)

class SceneMain {
    static scene = null;
    static camera = null;
    static assetsManager = null;
    static spacecraft = null;
    static earth = null;
    static sceneNodes = []

    static setup() {
        SceneMain.assetsManager = new BABYLON.AssetsManager(SceneMain.scene);

        let scene = SceneMain.scene;
        let assetsMgr = SceneMain.assetsManager;
        let cam = SceneMain.camera

        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

        SceneMain.addNode(new Spacecraft(scene, assetsMgr, cam));
        SceneMain.addNode(new Earth(scene, assetsMgr));
        SceneMain.addNode(new UiMain(scene, cam));

        scene.registerAfterRender(()=>SceneMain.sceneNodes.forEach((s, i) => {
            console.log('qq')
            s.update();
        }))
        assetsMgr.load();
    }

    static addNode(node) {
        node.setup();
        SceneMain.sceneNodes.push(node);
        return this
    }

    static hasFocus() {
        return scenePhase == 2;
    }
}

