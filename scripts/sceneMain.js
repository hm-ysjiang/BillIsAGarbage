// The main scene (2)

class SceneMain {
    static scene = null;
    static camera = null;
    static assetsManager = null;
    static spacecraft = null;
    static earth = null;
    static sceneNodes = []
	static tmp;

    static setup() {
        SceneMain.assetsManager = new BABYLON.AssetsManager(SceneMain.scene);

        let scene = SceneMain.scene;
        let assetsMgr = SceneMain.assetsManager;
        let cam = SceneMain.camera;
		
		cam.noRotationConstraint = true;
		
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

		SceneMain.spacecraft = new Spacecraft(scene, assetsMgr, cam);
		SceneMain.earth = new Earth(scene, assetsMgr);
        SceneMain.addNode(SceneMain.spacecraft);
        SceneMain.addNode(SceneMain.earth);
        SceneMain.addNode(new UiMain(scene, cam));
		
		Scrap1.setup(scene, assetsMgr);

        scene.registerAfterRender(()=>SceneMain.sceneNodes.forEach((s, i) => {
            s.update();
        }))
		
        assetsMgr.load();
    }

    static addNode(node) {
        node.setup();
        SceneMain.addSetupedNode(node);
    }
	
	static addSetupedNode(node){
		SceneMain.sceneNodes.push(node);
	}

    static hasFocus() {
        return scenePhase == 2;
    }
}

