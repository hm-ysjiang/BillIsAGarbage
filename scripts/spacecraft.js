class Spacecraft extends SceneNode {
	static accel = 0.245;
	
    constructor(scene, assetsManager, camera) {
        super(scene, assetsManager)
        this.camera = camera
		this.vel = 0;
		this.accelling = 0;
		this.ticksRotate = {"w": 0, "a": 0, "s": 0, "d": 0};
    }

    setup() {
		this.prevCamLook = null;
		this.prevForward = null;
		
        this.model = new BABYLON.TransformNode();
        this.model.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001)

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

        this.reset();
    }

    reset() {
        this.model.position = new BABYLON.Vector3(2500, 0, 0)
        this.model.lookAt(BABYLON.Vector3.Zero());
		this.accelling = 0;
		this.vel = 0;
		this.ticksRotate = {"w": 0, "a": 0, "s": 0, "d": 0};
    }
	
	startAccel(){
		this.accelling = Spacecraft.accel;
	}
	
	stopAccel(){
		this.accelling = 0;
	}
	
	startBrake(){
		this.accelling = -Spacecraft.accel;
	}
	
	stopBrake(){
		this.accelling = 0;
	}

    update() {
        if (this.model != null) {
			// Prevent Gimbal Lock
            let curCamLook = this.camera.getFrontPosition(1);
            if (this.preventGimbal(curCamLook)) {
                this.model.forward = this.prevForward;
            }
            this.prevCamLook = curCamLook;
            this.prevForward = this.model.forward;
			
			//* Handle velocity */
			this.vel += this.accelling
			if (Math.abs(this.vel) > 19.6)
				this.vel = this.vel > 19.6 ? 19.6 : -19.6;
            //this.translateByInput();
			let view = this.model.position.subtract(this.camera.position).normalize();
			this.model.translate(view, this.vel, BABYLON.Space.WORLD);
			this.rotateWASD();
            //this.rotateByMouse();
			this.bound();
			// fuel
            this.fitCam();
        }
    }

    fitCam() {
        this.camera.position.copyFrom(this.model.position.subtract(this.model.forward.scale(1.2)).add(new BABYLON.Vector3(0, 0.1, 0)))
        this.camera.setTarget(this.model.position)
    }
	
	bound(){
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
	
	rotateWASD(){
		if (this.scene.inputMap["w"]){
			if (this.ticksRotate["w"]<100)
				this.ticksRotate["w"]++;
		}
		else if (this.ticksRotate["w"] > 0)
			this.ticksRotate["w"]--;
		
		if (this.scene.inputMap["a"]){
			if (this.ticksRotate["a"]<100)
				this.ticksRotate["a"]++;
		}
		else if (this.ticksRotate["a"] > 0)
			this.ticksRotate["a"]--;
		
		if (this.scene.inputMap["s"]){
			if (this.ticksRotate["s"]<100)
				this.ticksRotate["s"]++;
		}
		else if (this.ticksRotate["s"] > 0)
			this.ticksRotate["s"]--;
		
		if (this.scene.inputMap["d"]){
			if (this.ticksRotate["d"]<100)
				this.ticksRotate["d"]++;
		}
		else if (this.ticksRotate["d"] > 0)
			this.ticksRotate["d"]--;
		
		this.rotateUpDown(-(this.ticksRotate["w"]/100));
		this.rotateLeftRight(-(this.ticksRotate["a"]/100));
		this.rotateUpDown((this.ticksRotate["s"]/100));
		this.rotateLeftRight((this.ticksRotate["d"]/100));
	}
	
	rotateUpDown(dy){
		let cs = BABYLON.Vector3.Dot(this.model.forward.clone().normalize(), BABYLON.Axis.Y)
		if (Math.abs(cs) <= 0.99 || ((cs > 0.99) ^ (dy < 0))){
			let speedAmp = dy;
			let speedMx = 1.5;
			let rot = Math.PI / 300;
			let pos = this.hideground.position
			let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
			let view = this.model.position.subtract(this.camera.position);
			let targetV = BABYLON.Vector3.Cross(norm, view);
			this.model.rotate(targetV, rot * speedMx * speedAmp, BABYLON.Space.WORLD);
			this.hideground.rotate(targetV, rot * speedMx * speedAmp, BABYLON.Space.WORLD);	
		}
	}
	
	rotateLeftRight(dx){
		let rot = Math.PI / 300;
		let speedAmp = dx;
		let speedMx = 4;
		let forw = this.model.forward.clone().normalize();
		let pos = this.hideground.position
		let norm = this.hideground.getNormalAtCoordinates(pos.x, pos.z);
		this.model.rotate(norm, rot * speedMx * speedAmp, BABYLON.Space.WORLD);
		this.hideground.rotate(norm, rot * speedMx * speedAmp, BABYLON.Space.WORLD);
	}
	
	preventGimbal(curCamLook){
		if (Math.abs(curCamLook) > 0.95){
			return true;
		}
		return false;
	}
}