// The tutorial scene (1)

class SceneTutorial{
	static scene = null;
	static setup() {
		SceneTutorial.onBeforeRenderObservable.add(() => {
			if (SceneTutorial.inputMap["Escape"]) {
				scenePhase = 0;
				console.log("Switch to Menu Scene");
			}
		});
	}
}
