// The tutorial scene (1)

class SceneTutorial{
	static scene = null;
	static camera = null;
	
	static setup() {
		let scene = SceneTutorial.scene;
		let cam = SceneTutorial.camera;
		
		cam.gamepadMoveSensibility = 0.00001;
		cam.inputs.clear();
		cam.inputs.addKeyboard();
		
		scene.onBeforeRenderObservable.add(() => {
			if (SceneTutorial.hasFocus() && scene.inputMap["Escape"]) {
				scenePhase = 0;
				cam.detachControl();
				cam.attachControl(canvas, true);
				console.log("Switch to Menu Scene");
			}
		});
		
		let ground = BABYLON.MeshBuilder.CreatePlane("ground", {height: 100, width: 40, sourcePlane: 
				(new BABYLON.Plane(0, 1, 0, 5)).normalize()});
	}
	
	static hasFocus(){
		return scenePhase == 1;
	}
}
