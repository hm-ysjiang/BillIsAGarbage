class Spacecraft {
    constructor(scene, assetsManager, camera) {
        this.scene = scene;
        this.camera = camera;
        this.spacecraft = null;

        assetsManager.addMeshTask('meshs', "", "mesh/", "aero4.obj").onSuccess
            = (function (task) {
                this.spacecraft = task.loadedMeshes[0];
            }).bind(this)
    }

    update() {
            console.log(this.spacecraft)
        if (this.spacecraft != null) {
            console.log("trigger~")
            if (this.scene.inputMap["w"]) {
                console.log("trigger")
                let direction = BABYLON.Vector3.Normalize(
                    BABYLON.Vector3.TransformCoordinates(
                        BABYLON.Vector3(1, 0, 0),
                        this.spacecraft.getWorldMatrix()));
                this.spacecraft.position.add(direction);
            }
        }

    }
}