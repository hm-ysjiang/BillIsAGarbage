class Spacecraft {
    constructor(scene, assetsManager, camera) {
        this.scene = scene;
        this.camera = camera;
        this.model = new BABYLON.TransformNode();
        this.hideground = new BABYLON.MeshBuilder.CreateGround("", { width: 0.1, height: 0.1 }, this.scene)
        this.hideground.parent = this.model;
        assetsManager.addMeshTask('meshs', "", "mesh/", "aero4.obj").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)

        this.model.position = new BABYLON.Vector3(0, 0, 5000);
        this.model.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        this.model.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001)
    }

    update() {
        if (this.model != null) {
            this.translateByInput();
            this.rotateByMouse();
            this.fitCam();
        }
    }

    fitCam() {
        this.camera.position.copyFrom(this.model.position.subtract(this.model.forward.scale(1.2)).add(new BABYLON.Vector3(0, 0.1, 0)))
        this.camera.setTarget(this.model.position)
    }

    translateByInput() {
        // console.log("-====-")
        // console.log(this.spacecraft.getWorldMatrix())
        if (this.scene.inputMap["w"]) {
            this.model.translate(
                new BABYLON.Vector3(0, 0, -1)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["a"]) {
            this.model.translate(
                new BABYLON.Vector3(1, 0, 0)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["s"]) {
            this.model.translate(
                new BABYLON.Vector3(0, 0, 1)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["d"]) {
            this.model.translate(
                new BABYLON.Vector3(-1, 0, 0)
                , 10
                , BABYLON.Space.WORLD);
        }
    }

    rotateByMouse() {
        let dx = SceneMain.scene.pointerX - canvas.width / 2;
        let dy = (SceneMain.scene.pointerY - canvas.height / 2);
		let sen = 0.1;
		let rot = Math.PI / 300;

        // if (Math.abs(dx) > canvas.width * 0.3 || Math.abs(dy) > canvas.height * 0.3) {
        //     let theta = Math.atan(dy / dx);
        //     console.log(dx, dy, theta);
        //     this.spacecraft.model.rotate(new BABYLON.Vector3(dy, dx, 0).normalize(), Math.PI / 120, BABYLON.Space.LOCAL);
        // }
        // this.spacecraft.model.rotate(new BABYLON.Vector3(dy, -dx, 0).normalize(), Math.PI / 120, BABYLON.Space.LOCAL);
        if (Math.abs(dx) > canvas.width * sen) {
            let pos = this.hideground.position
            let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
            this.model.rotate(norm, dx / Math.abs(dx) * rot, BABYLON.Space.WORLD);
            this.hideground.rotate(norm, dx / Math.abs(dx) * rot, BABYLON.Space.WORLD);
        }
        if (Math.abs(dy) > canvas.height * sen) {
            let pos = this.hideground.position
            let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
            let view = this.model.position.subtract(this.camera.position);
            let targetV = BABYLON.Vector3.Cross(norm, view);
            this.model.rotate(targetV, dy / Math.abs(dy) * rot, BABYLON.Space.WORLD);
            this.hideground.rotate(targetV, dy / Math.abs(dy) * rot, BABYLON.Space.WORLD);
        }
        // if (this.camera.absoluteRotation.normalize().equals(new BABYLON.Vector3(0, 1, 0)) ||
        //     this.camera.absoluteRotation.normalize().equals(new BABYLON.Vector3(0, -1, 0))) {
        //     this.model.rotation = BABYLON.Vector3.Zero();
        //     this.hideground.rotation = BABYLON.Vector3.Zero();
        // }
    }
}