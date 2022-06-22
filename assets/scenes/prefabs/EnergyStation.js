
// You can write more code here

/* START OF COMPILED CODE */

class EnergyStation extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? -72);

		// energyStation
		const energyStation = scene.add.sprite(0, 72, "propsNew", "Symbol 7 instance 10000");
		this.add(energyStation);

		// pointerDown
		const pointerDown = new PointerDownBtn(scene, -2, -4);
		pointerDown.angle = -180;
		this.add(pointerDown);

		// energyStation (components)
		new Physics(energyStation);
		const energyStationPhysicsBody = new PhysicsBody(energyStation);
		energyStationPhysicsBody.bodyY = 50;
		energyStationPhysicsBody.bodyHeight = 20;
		const energyStationStartAnimation = new StartAnimation(energyStation);
		energyStationStartAnimation.animationKey = "powerStationEmpty";

		this.energyStation = energyStation;
		this.pointerDown = pointerDown;

		/* START-USER-CTR-CODE */
		this.scene.events.on("update", () => this.update());
		this.scene.events.on("create", () => this.create());

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	energyStation;
	/** @type {PointerDownBtn} */
	pointerDown;

	/* START-USER-CODE */

	create(){

		this.initColliders();


		this.pointerDown.setInteractive().on('pointerdown', function(pointer, localX, localY, event){

			this.scene.player.wannaEnterPod = true;
		});


		this.pointerDown.visible = false;
		this.pointerDown.play("dedito", true);
	}

	initColliders(){
		this.scene.physics.add.overlap(this.scene.player, this.energyStation, this.prepareToEnter,false,this);
	}

	prepareToEnter(){

	
		if(!this.scene.player.isJetPackActive){
			this.pointerDown.visible = true;
			this.scene.player.canEnterPod = true;
		}
		
	}

	update(){

		if (this.energyStation.body.touching.none) {

			this.pointerDown.visible = false;
		}

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
