class Spacecraft extends SceneNode {
    constructor(scene, assetsManager, camera) {
        super(scene, assetsManager)
        this.camera = camera
    }

    setup() {
        this.model = new BABYLON.TransformNode();
        this.model.position = new BABYLON.Vector3(2496.2, 0, 0)
        this.model.lookAt(BABYLON.Vector3.Zero());
        this.model.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001)
		this.prevCamLook = null;
		this.prevForward = null;

        this.model.collibox = new BABYLON.MeshBuilder.CreateBox("spacecraft", { width: 200, height: 200, depth: 200 }, this.scene);
        this.model.collibox.visibility = false;
        this.model.collibox.parent = this.model;

        this.hideground = new BABYLON.MeshBuilder.CreateGround("", { width: 0.1, height: 0.1 }, this.scene)
        this.hideground.parent = this.model;

        this.assetsManager.addMeshTask('meshs', "", "mesh/", "aero4.obj").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)
		
		this.scene.registerBeforeRender((()=>{
			let curCamLook = this.camera.getFrontPosition(1);
			if (this.preventGimbal(curCamLook)){
				this.model.forward = this.prevForward;
			}
			this.prevCamLook = curCamLook;
			this.prevForward = this.model.forward;
		}).bind(this));
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
        let vel = 1;
        let pos = this.hideground.position
        let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
        let view = this.model.position.subtract(this.camera.position);
        let rightV = BABYLON.Vector3.Cross(norm, view);
        if (this.scene.inputMap["w"]) {
            this.model.translate(
                view.multiplyByFloats(vel, vel, vel)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["a"]) {
            this.model.translate(
                rightV.multiplyByFloats(-vel, -vel, -vel)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["s"]) {
            this.model.translate(
                view.multiplyByFloats(-vel, -vel, -vel)
                , 10
                , BABYLON.Space.WORLD);
        }
        if (this.scene.inputMap["d"]) {
            this.model.translate(
                rightV.multiplyByFloats(vel, vel, vel)
                , 10
                , BABYLON.Space.WORLD);
        }
		if (Math.abs(this.model.position.x) > 3000){
			this.model.position.x = this.model.position.x > 3000 ? 3000 : -3000;
			console.log("Player reached the border");
		}
		if (Math.abs(this.model.position.y) > 3000){
			this.model.position.y = this.model.position.y > 3000 ? 3000 : -3000;
			console.log("Player reached the border");
		}
		if (Math.abs(this.model.position.z) > 3000){
			this.model.position.z = this.model.position.z > 3000 ? 3000 : -3000;
			console.log("Player reached the border");
		}
    }

    rotateByMouse() {
        let dx = SceneMain.scene.pointerX - canvas.width / 2;
        let dy = (SceneMain.scene.pointerY - canvas.height / 2);
		let sen = 0.1;
		let rot = Math.PI / 300;

        if (Math.abs(dx) > canvas.width * sen) {
			let speedAmp = (Math.abs(dx) - canvas.width * sen) / canvas.width;
			let speedMx = 4;
            let pos = this.hideground.position
            let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
            this.model.rotate(norm, dx / Math.abs(dx) * rot * speedMx * speedAmp, BABYLON.Space.WORLD);
            this.hideground.rotate(norm, dx / Math.abs(dx) * rot * speedMx * speedAmp, BABYLON.Space.WORLD);
        }
        if (Math.abs(dy) > canvas.height * sen) {
			let speedAmp = (Math.abs(dy) - canvas.height * sen) / canvas.height;
			let speedMx = 1.5;
            let pos = this.hideground.position
            let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
            let view = this.model.position.subtract(this.camera.position);
            let targetV = BABYLON.Vector3.Cross(norm, view);
            this.model.rotate(targetV, dy / Math.abs(dy) * rot * speedMx * speedAmp, BABYLON.Space.WORLD);
            this.hideground.rotate(targetV, dy / Math.abs(dy) * rot * speedMx * speedAmp, BABYLON.Space.WORLD);
        }
    }
	
	preventGimbal(curCamLook){
		if (Math.abs(curCamLook) > 0.95){
			return true;
		}
		return false;
	}
}