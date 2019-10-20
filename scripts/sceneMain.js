// The main scene (2)

class SceneMain {
    static scene = null;
    static camera = null;
    static assetsManager = null;
    static uiMain = null;
    static gameManager = null;
    static spacecraft = null;
    static earth = null;
    static sceneNodes = []

    static setup() {
        SceneMain.assetsManager = new BABYLON.AssetsManager(SceneMain.scene);

        let scene = SceneMain.scene;
        let assetsMgr = SceneMain.assetsManager;
        let cam = SceneMain.camera;

        cam.noRotationConstraint = true;
        cam.inputs.clear();

        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

        SceneMain.spacecraft = new Spacecraft(scene, assetsMgr, cam);
        SceneMain.earth = new Earth(scene, assetsMgr);
        SceneMain.uiMain = new UiMain(scene, cam);
        SceneMain.gameManager = new GameManager(SceneMain.uiMain)
        SceneMain.station = new Station(scene, assetsMgr);
        SceneMain.addNode(SceneMain.spacecraft);
        SceneMain.addNode(SceneMain.earth);
        SceneMain.addNode(SceneMain.station);
        SceneMain.addNode(SceneMain.uiMain);
        SceneMain.addSetupedNode(SceneMain.gameManager);

        Scrap1.setup(scene, assetsMgr);

        scene.registerAfterRender(() => SceneMain.sceneNodes.forEach((s, i) => {
            s.update();
        }))
        SceneMain.hookEvents();
        SceneMain.gameManager.start();
        assetsMgr.load();
    }

    static hookEvents() {
        SceneMain.scene.registerAfterRender(() => {
            Scrap1.scraps.forEach((v) => {
                if (SceneMain.spacecraft.model.collibox.intersectsMesh(v.model.collibox)) {
                    SceneMain.gameManager.onHit(v);
                }
            }
            )
            if (SceneMain.spacecraft.model.collibox.intersectsMesh(SceneMain.earth.model.collibox)) {
                SceneMain.gameManager.onDamage();
            }
            if (SceneMain.spacecraft.model.collibox.intersectsMesh(SceneMain.station.model.collibox)) {
                console.log("home")
                SceneMain.gameManager.onHome();
            }
        }
        );
    }

    static addNode(node) {
        node.setup();
        SceneMain.addSetupedNode(node);
    }

    static addSetupedNode(node) {
        SceneMain.sceneNodes.push(node);
    }

    static hasFocus() {
        return scenePhase == 2;
    }

    static setupSkybox() {
        let scene = SceneMain.scene;
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 7000.0, scene);
        let skyMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyMaterial.backFaceCulling = false;
        skyMaterial.disableLighting = true;
        skyMaterial.reflectionTexture = new BABYLON.CubeTexture("media/textures/skybox/box", scene);;
        skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.infiniteDistance = true;
        skybox.material = skyMaterial;
    }
}

