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
		
		let panelTxt = new BABYLON.GUI.PlanePanel();
		// panelTxt.
		
		let panelBtn = new BABYLON.GUI.PlanePanel();
		panelBtn.margin = 0.2;
		SceneMenu.manager.addControl(panelBtn);
		panelBtn.position.y = -0.5;
		panelBtn.position.z = -2;
		let btnPlay = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(btnPlay);
		btnPlay.text = "Play";
		btnPlay.onPointerDownObservable.add(()=>{
			scenePhase = 2;
			console.log("Switch to Game Scene");
		});
		let btnTutorial = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(btnTutorial);
		btnTutorial.text = "Tutorial";
		btnTutorial.onPointerDownObservable.add(()=>{
			scenePhase = 1;
			console.log("Switch to Tutorial Scene");
		});
		panelBtn.columns = 2;
	}
}

// The menu scene (0 and defalut)