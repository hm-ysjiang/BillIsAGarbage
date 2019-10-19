// The main scene (2)

class SceneMain {
    static scene = null;
    static camera = null;
    static assetsManager = null;
    static spacecraft = null;
    static setup() {
        SceneMain.assetsManager = new BABYLON.AssetsManager(SceneMain.scene);
        // SceneMain.assetsManage.addMeshTask('meshs', "", "mesh/", "ISS_stationary.glb").onSuccess
        //     = function (task) {
        //         SceneMain.home = task.loadedMeshes[0];
        //     }
        SceneMain.spacecraft = new Spacecraft(SceneMain.scene, SceneMain.assetsManager, SceneMain.camera);
        SceneMain.scene.registerAfterRender(SceneMain.spacecraft.update.bind(SceneMain.spacecraft));
        SceneMain.assetsManager.load();
    } 

    static hasFocus() {
        return scenePhase == 2;
    }
}
