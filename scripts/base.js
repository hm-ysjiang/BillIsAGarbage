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
	sceneMenu = new BABYLON.Scene(engine);
	let camMenu = new BABYLON.FreeCamera("MainCam", new BABYLON.Vector3(0,0,5), sceneMenu);
	camMenu.setTarget(BABYLON.Vector3.Zero());
	camMenu.attachControl(canvas, true);
	setupMenu();
	/** Menu Scene End **/
	
	/** Tutorial Scene Start **/
	sceneTutorial = new BABYLON.Scene(engine);
	let camTutorial = new BABYLON.FreeCamera("MainCam", new BABYLON.Vector3(0,0,5), sceneTutorial);
	camTutorial.setTarget(BABYLON.Vector3.Zero());
	camTutorial.attachControl(canvas, true);
	setupTutorial();
	/** Tutorial Scene End **/
	
	/** Main Scene Start **/
	sceneMain = new BABYLON.Scene(engine);
	camMain = new BABYLON.UniversalCamera("MainCam", new BABYLON.Vector3(0,0,5), sceneMain);
	camMain.setTarget(BABYLON.Vector3.Zero());
	camMain.attachControl(canvas, true);
	setupMain();
	/** Main Scene End **/
	
	
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
		sceneMenu.render();
		break;
	}
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
	engine.resize();
});