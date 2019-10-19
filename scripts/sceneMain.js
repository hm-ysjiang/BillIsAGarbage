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

		let preloadMgr = new AssetsPreloadManager(assetsMgr);
		preloadMgr.register('meshs', "", "mesh/", "mithra.stl", "scrap1");
		preloadMgr.load();
		SceneMain.tmp = preloadMgr;
		
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

		SceneMain.spacecraft = new Spacecraft(scene, assetsMgr, cam);
		SceneMain.earth = new Earth(scene, assetsMgr);
        SceneMain.addNode(SceneMain.spacecraft);
        SceneMain.addNode(SceneMain.earth);
		for (let i = 0 ; i<10 ; i++){
			SceneMain.addNode(new Scrap1(scene, preloadMgr.createInstance("scrap1")));
		}

        scene.registerAfterRender(()=>SceneMain.sceneNodes.forEach((s, i) => {
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

