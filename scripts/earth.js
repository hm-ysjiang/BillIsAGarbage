class Earth{
	constructor(scene, assetsManager, camera){
		this.scene = scene;
        this.camera = camera;
        this.spacecraft = new BABYLON.TransformNode();

        assetsManager.addMeshTask('meshs', "", "mesh/", "Earth_1_12756.glb").onSuccess = (function (task) {

            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.spacecraft
                }
            });

        }).bind(this)
	}
}