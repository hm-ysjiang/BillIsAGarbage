class SceneMenu {
	static scene = null;
	static manager = null;
	static anchor = null;

	static setup = function (){
		/*sceneMenu.onBeforeRenderObservable.add(()=>{
			if (sceneMenu.inputMap["p"]){
				scenePhase = 2;
				console.log("Switch to Game Scene");
			}
			else if (sceneMenu.inputMap["t"]){
				scenePhase = 1;
				console.log("Switch to Tutorial Scene");
			}
		});*/
		SceneMenu.manager = new BABYLON.GUI.GUI3DManager(SceneMenu.scene);
		SceneMenu.anchor = new BABYLON.TransformNode("");
		
	}
}

// The menu scene (0 and defalut)