class Spacecraft extends SceneNode {
    constructor(scene, assetsManager, camera) {
        super(scene, assetsManager)
        this.camera = camera
    }

    setup() {
		this.prevCamLook = null;
		this.prevForward = null;
		
        this.model = new BABYLON.TransformNode();
        this.model.position = new BABYLON.Vector3(2496.2, 0, 0)
        this.model.lookAt(BABYLON.Vector3.Zero());
        this.model.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001)

        this.model.collibox = new BABYLON.MeshBuilder.CreateBox("spacecraft", { width: 200, height: 200, depth: 200 }, this.scene);
        this.model.collibox.visibility = false;
        this.model.collibox.parent = this.model;

        this.hideground = new BABYLON.MeshBuilder.CreateGround("", { width: 0.1, height: 0.1 }, this.scene)
        this.hideground.parent = this.model;

        this.model.collector = new BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);
        this.model.collector.visibility = true;
        this.model.collector.parent = this.model;
        this.model.collector.position.y += 62

        this.assetsManager.addMeshTask('meshs', "", "mesh/", "aero4.obj").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)
		this.assetsManager.addMeshTask('meshs', "", "mesh/", "jellyfish_net_spongebob.gltf").onSuccess = (task=>{
			task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
					mesh.position = this.model.position.clone()
					mesh.position.y += 62
					mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
					mesh.rotate(BABYLON.Axis.Y, Math.PI)
                    mesh.parent = this.model
                }
            });
		}).bind(this)
    }

    update() {
        if (this.model != null) {
            let curCamLook = this.camera.getFrontPosition(1);
            if (this.preventGimbal(curCamLook)) {
                this.model.forward = this.prevForward;
            }
            this.prevCamLook = curCamLook;
            this.prevForward = this.model.forward;

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
			let forw = this.model.forward.clone().normalize();
			let speedDebuf = (Math.PI - Math.abs(Math.acos(BABYLON.Vector3.Dot(forw, BABYLON.Axis.Y)))) / Math.PI;
            let pos = this.hideground.position
            let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
            this.model.rotate(norm, dx / Math.abs(dx) * rot * speedMx * speedAmp * speedDebuf, BABYLON.Space.WORLD);
            this.hideground.rotate(norm, dx / Math.abs(dx) * rot * speedMx * speedAmp, BABYLON.Space.WORLD);
        }
        if (Math.abs(dy) > canvas.height * sen) {
			let cs = BABYLON.Vector3.Dot(this.model.forward.clone().normalize(), BABYLON.Axis.Y)
			if (Math.abs(cs) <= 0.99 || ((cs > 0.99) ^ (dy < 0))){
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
    }
	
	preventGimbal(curCamLook){
		if (Math.abs(curCamLook) > 0.95){
			return true;
		}
		return false;
	}
}