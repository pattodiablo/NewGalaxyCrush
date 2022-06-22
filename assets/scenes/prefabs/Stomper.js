
// You can write more code here

/* START OF COMPILED CODE */

class Stomper extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? -106);

		// stomperPipe
		const stomperPipe = scene.add.image(0, 83, "stomperPipe");
		stomperPipe.scaleY = 1.5;
		stomperPipe.setOrigin(0.5, 1);
		this.add(stomperPipe);

		// mainStomp
		const mainStomp = new MainStomp(scene, 0, 106);
		this.add(mainStomp);

		this.stomperPipe = stomperPipe;
		this.mainStomp = mainStomp;

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	stomperPipe;
	/** @type {MainStomp} */
	mainStomp;
	/** @type {number} */
	retardo = 1000;

	/* START-USER-CODE */

	create(){
	this.mainStomp.retardo = this.retardo;
	this.mainStomp.iniciarstomp();
		//FX
		//this.envi_stomper_01 = this.scene.sound.add('envi_stomper_01');
		//this.envi_stomper_01.loop = false;
	}



	update(){
		this.stomperPipe.y = this.mainStomp.y;
		//this.envi_stomper_01.play();

	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
