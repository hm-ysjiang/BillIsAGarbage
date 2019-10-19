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
        
        SceneMain.scene.registerAfterRender((() => {
            let dx = SceneMain.scene.pointerX - canvas.width / 2;
            let dy = (SceneMain.scene.pointerY - canvas.height / 2);

            if (Math.abs(dx) > canvas.width * 0.3 || Math.abs(dy) > canvas.height * 0.3) {
                let theta = Math.atan(dy / dx);
                console.log(dx, dy, theta);
                this.spacecraft.model.rotate(new BABYLON.Vector3(dy, -dx, 0).normalize(), Math.PI / 120, BABYLON.Space.LOCAL);
            }
            // this.spacecraft.model.rotate(new BABYLON.Vector3(dy, -dx, 0).normalize(), Math.PI / 120, BABYLON.Space.LOCAL);

        }).bind(this));
    }

    static hasFocus() {
        return scenePhase == 2;
    }
}

