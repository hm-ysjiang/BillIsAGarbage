class Station extends SceneNode{
    setup() {
        this.model = new BABYLON.TransformNode();
        
        this.model.collibox = new BABYLON.MeshBuilder.CreateBox("spacecraft", { width: 200, height: 200, depth: 200 }, this.scene);
        this.model.collibox.visibility = false;
        this.model.collibox.parent = this.model;

        this.model.rotate(BABYLON.Axis.Y, Math.PI / 2)

        this.assetsManager.addMeshTask('meshs', "", "mesh/", "ISS_stationary.glb").onSuccess = (function (task) {
            task.loadedMeshes.forEach(mesh => {
                // leave meshes already parented to maintain model hierarchy:
                if (!mesh.parent) {
                    mesh.parent = this.model
                }
            });

        }).bind(this)
        
        this.model.position = new BABYLON.Vector3(2500, 0, 0);
        this.model.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        this.model.collibox.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    }

    update() {
        
    }
}