class Spacecraft {
    constructor(scene, assetsManager, camera) {
        this.scene = scene;
        this.camera = camera;
        this.model = new BABYLON.TransformNode();

        assetsManager.addMeshTask('meshs', "", "mesh/", "aero4.obj").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.spacecraft
                }
            });

        }).bind(this)
    }

    update() {
        if (this.model != null) {
            // console.log("-====-")
            // console.log(this.spacecraft.getWorldMatrix())
            if (this.scene.inputMap["w"]) {
                this.model.translate(
                    new BABYLON.Vector3(0, 0, 1)
                    , 10
                    , BABYLON.Space.WORLD);
            }
            if (this.scene.inputMap["a"]) {
                this.model.translate(
                    new BABYLON.Vector3(-1, 0, 0)
                    , 10
                    , BABYLON.Space.WORLD);
            }
            if (this.scene.inputMap["s"]) {
                this.model.translate(
                    new BABYLON.Vector3(0, 0, -1)
                    , 10
                    , BABYLON.Space.WORLD);
            }
            if (this.scene.inputMap["d"]) {
                this.model.translate(
                    new BABYLON.Vector3(1, 0, 0)
                    , 10
                    , BABYLON.Space.WORLD);
            }
            // console.log(this.spacecraft.getWorldMatrix())
            // this.camera.position = BABYLON.Vector3.TransformCoordinates(
            //     new BABYLON.Vector3(0, 0, -100),
            //     this.spacecraft.getWorldMatrix()
            // )
            // this.camera.rotation = this.spacecraft.rotation.clone();
            // this.camera.rotation.y *= -1;
            // this.camera.position.copyFrom(this.model.position.subtract(this.model.forward.scale(150)).add(new BABYLON.Vector3(0, 1.6, 0)))
            // this.camera.setTarget(this.model.position)
        }
    }
}