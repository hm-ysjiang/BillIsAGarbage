class SceneMenu {
	static scene = null;
	static camera = null;
	static manager = null;
	static anchor = null;

	static setup(){
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
			if (SceneMenu.hasFocus()){
				scenePhase = 2;
				SceneMenu.camera.detachControl();
				SceneMain.camera.attachControl(canvas, true);
				console.log("Switch to Game Scene");
			}
		});
		let btnTutorial = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(btnTutorial);
		btnTutorial.text = "Tutorial";
		btnTutorial.onPointerDownObservable.add(()=>{
			if (SceneMenu.hasFocus()){
				scenePhase = 1;
				SceneMenu.camera.detachControl();
				SceneTutorial.camera.attachControl(canvas, true);
				console.log("Switch to Tutorial Scene");
			}
		});
		panelBtn.columns = 2;
	}
	
	static hasFocus(){
		return scenePhase != 1 && scenePhase != 2;
	}
}

// The menu scene (0 and defalut)