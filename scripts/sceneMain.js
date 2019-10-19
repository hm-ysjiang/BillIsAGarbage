// The main scene (2)

class SceneMain {
    static scene = null;
    static camera = null;
    static assetsManager = null;
    static spacecraft = null;
	static earth = null;
	
    static setup() {
        SceneMain.assetsManager = new BABYLON.AssetsManager(SceneMain.scene);
		
		let scene = SceneMain.scene;
		let assetsMgr = SceneMain.assetsManager;
		let cam = SceneMain.camera
        
		let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
		
        SceneMain.spacecraft = new Spacecraft(scene, assetsMgr, cam);
        scene.registerAfterRender(SceneMain.spacecraft.update.bind(SceneMain.spacecraft));
		SceneMain.earth = new Earth(scene, assetsMgr, cam);
        scene.registerAfterRender(SceneMain.earth.update.bind(SceneMain.earth));
        assetsMgr.load();
    }

    static hasFocus() {
        return scenePhase == 2;
    }
}
