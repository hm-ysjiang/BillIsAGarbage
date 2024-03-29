class SceneMenu {
	static scene = null;
	static camera = null;
	static manager = null;

	static setup() {
		SceneMenu.manager = new BABYLON.GUI.GUI3DManager(SceneMenu.scene);

		let scene = SceneMenu.scene;
		let cam = SceneMenu.camera;
		let manager = SceneMenu.manager;

		cam.inputs.clear();

		let adv = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TextUI");
		let panelTxt1 = new BABYLON.GUI.Rectangle();
		let panelTxt2 = new BABYLON.GUI.Rectangle();
		adv.addControl(panelTxt1);
		adv.addControl(panelTxt2);
		panelTxt1.width = "600px";
		panelTxt1.height = "100px";
		panelTxt1.isVertical = true;
		panelTxt1.fontSize = 64;
		panelTxt1.thickness = 0;
		panelTxt1.top = "50";
		panelTxt1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		panelTxt2.width = "600px";
		panelTxt2.height = "100px";
		panelTxt2.isVertical = true;
		panelTxt2.fontSize = 64;
		panelTxt2.thickness = 0;
		panelTxt2.top = "200";
		panelTxt2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		let txt1 = new BABYLON.GUI.TextBlock("Welcome");
		let txt2 = new BABYLON.GUI.TextBlock("Title");
		panelTxt1.addControl(txt1);
		panelTxt2.addControl(txt2);
		txt1.text = "Welcome to";
		txt2.text = "Bill Is A Garbage";
		txt1.color = "white";
		txt2.color = "white";


		let btnMaterial = new BABYLON.StandardMaterial("btnMaterial", scene);
		btnMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		btnMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		btnMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		btnMaterial.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		btnMaterial.alpha = 0.5;

		let panelBtn = new BABYLON.GUI.PlanePanel();
		panelBtn.margin = 0.2;
		manager.addControl(panelBtn);
		panelBtn.position.y = -0.5;
		panelBtn.position.z = -2;
		let btnPlay = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(btnPlay);
		btnPlay.text = "Play";
		btnPlay.mesh.material = btnMaterial;
		btnPlay.onPointerDownObservable.add(() => {
			if (SceneMenu.hasFocus()) {
				scenePhase = 2;
				cam.detachControl();
				SceneMain.camera.attachControl(canvas, true);
				console.log("Switch to Game Scene");
			}
		});
		let btnTutorial = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(btnTutorial);
		btnTutorial.text = "Tutorial";
		btnTutorial.mesh.material = btnMaterial;
		btnTutorial.onPointerDownObservable.add(() => {
			if (SceneMenu.hasFocus()) {
				scenePhase = 1;
				cam.detachControl();
				SceneTutorial.camera.attachControl(canvas, true);
				SceneTutorial.camera.position = new BABYLON.Vector3(0, 0, -5);
				SceneTutorial.camera.setTarget(new BABYLON.Vector3(0, 0, 0));
				console.log("Switch to Tutorial Scene");
			}
		});
		panelBtn.columns = 2;

		SceneMenu.scene.registerBeforeRender(() => {
			if (SceneMenu.skybox)
				SceneMenu.skybox.rotate(new BABYLON.Vector3(0.2, 1, 0), Math.PI / 3000);
		});

	}

	static hasFocus() {
		return scenePhase != 1 && scenePhase != 2;
	}

	static setupSkybox() {
		let scene = SceneMenu.scene;
		let skybox = BABYLON.Mesh.CreateBox("skyBox", 7000.0, scene);
		let skyMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		skyMaterial.backFaceCulling = false;
		skyMaterial.disableLighting = true;
		skyMaterial.reflectionTexture = new BABYLON.CubeTexture("media/textures/skybox/box", scene);;
		skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		skybox.infiniteDistance = true;
		skybox.material = skyMaterial;
		SceneMenu.skybox = skybox
	}
}

// The menu scene (0 and defalut)