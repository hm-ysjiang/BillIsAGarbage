class Scrap1 {
	constructor(scene, assetsManager, camera){
		this.scene = scene;
        this.camera = camera;
        this.model = new BABYLON.TransformNode();
        assetsManager.addMeshTask('meshs', "", "mesh/", "mithra.stl").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)
		
		this.radius = Math.random()*1400+600;
		this.model.position = new BABYLON.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
		do {
			this.axis = new BABYLON.Vector3(Math.random(), Math.random(), Math.random()).normalize();
		} while (this.model.position.equals(this.axis));
		this.model.position.scaleInPlace(this.radius);
		this.angularSpeed = ((Math.random()-0.5>0) ? 1 : -1) * Math.sqrt(gravity/this.radius)*10;
		this.selfAxis = new BABYLON.Vector3(Math.random(), Math.random(), Math.random()).normalize();
		this.selfAngSpeed = (Math.random()-0.5)/10;
		
	}
	
	update(){
		this.model.rotate(this.selfAxis, this.selfAngSpeed, BABYLON.Space.WORLD);
		let lastPos = this.model.position.clone();
		let c = Math.cos(this.angularSpeed * Math.PI / 180);
		let s = Math.sin(this.angularSpeed * Math.PI / 180)
		this.model.position = lastPos.scale(c).add(BABYLON.Vector3.Cross(lastPos, this.axis).scale(s)).add(this.axis.scale((1-c)*BABYLON.Vector3.Dot(lastPos, this.axis))).normalize().scale(this.radius);
		//console.log(this.model.position)
	}
}