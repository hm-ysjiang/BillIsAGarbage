// The tutorial scene (1)

class SceneTutorial{
	static scene = null;
	static camera = null;
	static setup() {
		SceneTutorial.scene.onBeforeRenderObservable.add(() => {
			if (SceneTutorial.hasFocus() && SceneTutorial.scene.inputMap["Escape"]) {
				scenePhase = 0;
				SceneTutorial.camera.detachControl();
				SceneMenu.camera.attachControl(canvas, true);
				console.log("Switch to Menu Scene");
			}
		});
	}
	
	static hasFocus(){
		return scenePhase == 1;
	}
}
