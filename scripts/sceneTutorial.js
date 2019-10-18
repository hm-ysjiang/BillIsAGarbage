// The tutorial scene (1)
var sceneTutorial = null;

function setupTutorial(){
	sceneTutorial.onBeforeRenderObservable.add(()=>{
		if (sceneTutorial.inputMap["Escape"]){
			scenePhase = 0;
			console.log("Switch to Menu Scene");
		}
	});
}