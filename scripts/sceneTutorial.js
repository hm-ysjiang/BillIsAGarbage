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
	
	static setupSkybox(){
		let scene = SceneTutorial.scene;
		let skybox = BABYLON.Mesh.CreateBox("skyBox", 7000.0, scene);
		let skyMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		skyMaterial.backFaceCulling = false;
		skyMaterial.disableLighting = true;
		skyMaterial.reflectionTexture = new BABYLON.CubeTexture("media/textures/skybox/box", scene);
		skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		skybox.infiniteDistance = true;
		skybox.material = skyMaterial;
	}
}
