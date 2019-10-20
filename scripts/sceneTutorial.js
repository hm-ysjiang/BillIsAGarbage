// The tutorial scene (1)

class SceneTutorial{
	static scene = null;
	static camera = null;
	static manager = null;
	
	static setup() {
		SceneTutorial.manager = new BABYLON.GUI.GUI3DManager(SceneTutorial.scene);
		
		let scene = SceneTutorial.scene;
		let cam = SceneTutorial.camera;
		let manager = SceneTutorial.manager;
		
		let grayMaterial = new BABYLON.StandardMaterial("grayMaterial", scene);
		grayMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		grayMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		grayMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		grayMaterial.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		grayMaterial.alpha = 0.5;
		
		cam.gamepadMoveSensibility = 0.00001;
		cam.inputs.clear();
		
		scene.onBeforeRenderObservable.add(() => {
			if (SceneTutorial.hasFocus() && scene.inputMap["Escape"]) {
				scenePhase = 0;
				cam.detachControl();
				cam.attachControl(canvas, true);
				console.log("Switch to Menu Scene");
			}
		});
		scene.onAfterRenderObservable.add(()=>{
			SceneTutorial.translateByInput(scene, cam);
            SceneTutorial.rotateByMouse(scene, cam);
		});
		
		let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
		let ground = BABYLON.MeshBuilder.CreatePlane("ground", {height: 15, width: 7, sourcePlane: 
				(new BABYLON.Plane(0, 1, 0, 2)).normalize()});
		ground.material = grayMaterial;
		ground.position.z = -5
		
		let panelBtn = new BABYLON.GUI.PlanePanel();
		panelBtn.margin = 0.1;
		panelBtn.z = 10;
		manager.addControl(panelBtn);
		
		/*
		SceneTutorial.spacecraft = new Spacecraft(scene, new BABYLON.AssetsManager(scene), cam);
		SceneTutorial.spacecraft.setup();
		SceneTutorial.spacecraft.assetsManager.load()
		SceneTutorial.spacecraft.model.position = new BABYLON.Vector3(1, 12, 30)
		SceneTutorial.spacecraft.model.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 6);
		SceneTutorial.spacecraft.model.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 6);
        SceneTutorial.spacecraft.model.scaling = new BABYLON.Vector3(0.075, 0.075, 0.075)
		*/
		
		let tmpBtn = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(tmpBtn);
		//tmpBtn.text = "Instruction";
		let btnMaterial = new BABYLON.StandardMaterial("btnMaterial", scene);
		let buttonTexture = new BABYLON.Texture("media/textures/tutorial/01.jpg", scene);
		btnMaterial.diffuseTexture = buttonTexture
		btnMaterial.specularTexture = buttonTexture
		btnMaterial.emissiveTexture = buttonTexture
		btnMaterial.ambientTexture = buttonTexture
		tmpBtn.mesh.material = btnMaterial;
		
		tmpBtn = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(tmpBtn);
		//tmpBtn.text = "Story";
		btnMaterial = new BABYLON.StandardMaterial("btnMaterial", scene);
		buttonTexture = new BABYLON.Texture("media/textures/tutorial/02.jpg", scene);
		btnMaterial.diffuseTexture = buttonTexture
		btnMaterial.specularTexture = buttonTexture
		btnMaterial.emissiveTexture = buttonTexture
		btnMaterial.ambientTexture = buttonTexture
		tmpBtn.mesh.material = btnMaterial;
		
		let exitBtn = new BABYLON.GUI.HolographicButton("orientation");
		panelBtn.addControl(exitBtn);
		exitBtn.text = "Exit";
		exitBtn.onPointerDownObservable.add(()=>{
			if (SceneTutorial.hasFocus()){
				scenePhase = 0;
				cam.detachControl();
				SceneMenu.camera.attachControl(canvas, true);
				console.log("Switch to Menu Scene");
			}
		});
		exitBtn.height = 500;
		exitBtn.width = 500;
		panelBtn.columns = 3;
	}

    static translateByInput(scene, cam) {
        let vel = 0.05;
        let view = cam.getFrontPosition(1).subtract(cam.position).normalize();
		view.y = 0;
        let rightV = BABYLON.Vector3.Cross(BABYLON.Axis.Y, view).normalize();
        if (scene.inputMap["w"]) {
			cam.position.addInPlace(view.scale(vel, vel, vel));
        }
        if (scene.inputMap["a"]) {
			cam.position.addInPlace(rightV.scale(-vel, -vel, -vel));
        }
        if (scene.inputMap["s"]) {
			cam.position.addInPlace(view.scale(-vel, -vel, -vel));
        }
        if (scene.inputMap["d"]) {
			cam.position.addInPlace(rightV.scale(vel, vel, vel));
        }
		
		if (Math.abs(cam.position.x) > 7.5){
			cam.position.x = cam.position.x > 7.5 ? 7.5 : -7.5;
			console.log("Player reached the border");
		}
		if (cam.position.z > -1.5){
			cam.position.z = -1.5;
			console.log("Player reached the border");
		}
		else if (cam.position.z < -8.5){
			cam.position.z = -8.5;
			console.log("Player reached the border");
		}
    }

    static rotateByMouse(scene, cam) {
        let dx = scene.pointerX - canvas.width / 2;
		let sen = 0.1;
		let rot = Math.PI / 300;

        if (Math.abs(dx) > canvas.width * sen) {
			let speedAmp = (Math.abs(dx) - canvas.width * sen) / canvas.width;
			let speedMx = 4;
			cam.rotation.y += dx / Math.abs(dx) * rot * speedMx * speedAmp;
        }
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
