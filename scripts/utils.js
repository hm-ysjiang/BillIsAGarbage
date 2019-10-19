function initPhysics(obj, impostorType, parms, scene) {
    obj.physicsImpostor = new BABYLON.PhysicsImpostor(obj,
        impostorType,
        parms,
        scene
    )
    return obj;
}