class Earth{
	constructor(scene, assetsManager, camera){
		this.scene = scene;
        this.camera = camera;
        this.model = new BABYLON.TransformNode();

        assetsManager.addMeshTask('meshs', "", "mesh/", "Earth_1_12756.glb").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)
	}
	
	update(){
		this.model.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI/4320);
	}
}