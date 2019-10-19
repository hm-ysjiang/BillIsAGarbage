class Earth extends SceneNode {
    setup() {
        this.model = new BABYLON.MeshBuilder.CreateSphere("earth", { diameter: 1000 }, this.scene);
        this.model.visibility = false;
        this.assetsManager.addMeshTask('meshs', "", "mesh/", "Earth_1_12756.glb").onSuccess = (function (task) {
            task.loadedMeshes.forEach(mesh => {
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });
        }).bind(this)
		this.model.rotate(new BABYLON.Vector3(0, 0, 1), 23.5 * Math.PI / 180);
    }

    update() {
        this.model.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 4320);
    }
}