/*****************************
 *	Variables Section Start  *
 *****************************/
var canvas = document.getElementById("renderCanvas");
// Babylon 3D engine
var engine = new BABYLON.Engine(canvas, true);

/**
 * Current phase of the game {0: Menu Selection
 * 							  1: Game Tutorial
 * 							  2: The Game}
 */
var scenePhase = 0;
/***************************
 *	Variables Section End  *
 ***************************/



/*****************************
 *	Functions Section Start  *
 *****************************/
function createScenes() {
	/** Menu Scene Start **/
	SceneMenu.scene = new BABYLON.Scene(engine);
	initInputSystem(SceneMenu.scene)
	let camMenu = new BABYLON.FreeCamera("MainCam", new BABYLON.Vector3(0,0,5), SceneMenu.scene);
	camMenu.setTarget(BABYLON.Vector3.Zero());
	camMenu.attachControl(canvas, true);
	SceneMenu.setup();
	/** Menu Scene End **/
	
	/** Tutorial Scene Start **/
	SceneTutorial.scene = new BABYLON.Scene(engine);
	initInputSystem(SceneTutorial.scene)
	let camTutorial = new BABYLON.FreeCamera("MainCam", new BABYLON.Vector3(0, 0, 5), SceneTutorial);
	camTutorial.setTarget(BABYLON.Vector3.Zero());
	camTutorial.attachControl(canvas, true);
	setupTutorial();
	/** Tutorial Scene End **/
	
	/** Main Scene Start **/
	SceneMain.scene = new BABYLON.Scene(engine);
	initInputSystem(SceneMain.scene)
	camMain = new BABYLON.UniversalCamera("MainCam", new BABYLON.Vector3(0, 0, 5), SceneMain);
	camMain.setTarget(BABYLON.Vector3.Zero());
	camMain.attachControl(canvas, true);
	setupMain();
	/** Main Scene End **/
}

function initInputSystem(scene) {
	scene.inputMap = {};
	scene.actionManager = new BABYLON.ActionManager(scene);
	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
		scene.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
	}));
	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
		scene.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
	}));
}

/***************************
 *	Functions Section End  *
 ***************************/


 
/****************************************
 *	Things that are actually happening  *
 ****************************************/
createScenes(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
	switch (scenePhase){
	case 1:
		sceneTutorial.render();
		break;
	case 2:
		sceneMain.render();
		break;
	case 0:
	default:
		SceneMenu.scene.render();
		break;
	}
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
	engine.resize();
});