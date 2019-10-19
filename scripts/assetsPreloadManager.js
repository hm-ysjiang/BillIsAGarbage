class AssetsPreloadManager {
	constructor(assetsMgr){
		this.mgr = assetsMgr;
		this.regs = [];
		this.map = {};
	}
	
	register(a, b, c, d, id){
		this.regs.push([a, b, c, d, id]);
	}
	
	load(){
		this.regs.forEach((v, i)=>{
			this.mgr.addMeshTask(v[0], v[1], v[2], v[3]).onSuccess = (function (task) {

				task.loadedMeshes.forEach(mesh => {
					// leave meshes already parented to maintain model hierarchy:
					console.log(Date.now())
					if (!mesh.parent) {
						this.map[v[4]] = mesh;
					}
				});

			}).bind(this);	
		});
		this.mgr.load();
	}
	
	getOrigin(id){
		return this.map[id];
	}
	
	createInstance(id){
		if (this.map[id])
			return this.map[id].createInstance();
		return this.map[id];
	}
}