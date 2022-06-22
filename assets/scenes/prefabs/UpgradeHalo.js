
// You can write more code here

/* START OF COMPILED CODE */

class UpgradeHalo extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "upgradeHalo", frame);

		// this (components)
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	isDoubleJump = false;
	/** @type {boolean} */
	isCannonStrike = false;

	/* START-USER-CODE */

create(){
	this.wasUsed = false;


	this.expand = this.scene.tweens.createTimeline();
	this.expand.add({
		targets: this,
		scale: 1.2,
		alpha: 0.5,
		duration: 100,
		ease: 'Linear',
		repeat: -1,
		yoyo: true

	});

	this.expand.play();

	this.scene.physics.add.overlap(this.scene.player, this, this.getPower,false,this);	
}


getPower(){




	if(!this.wasUsed){

		if(this.isDoubleJump){
			this.scene.game.playerData.doubleJump = true;
			this.scene.player.supaDJumps = true;
			this.scene.cameras.main.flash();
	
			this.scene.envi_success_03.play();
	
			this.expand.stop();
			this.scene.player.gotPower("doubleJump");

		}

		if(this.isCannonStrike){

	
			this.scene.game.playerData.gotCannon = true;
			this.scene.player.supaBiteChances++;
			this.scene.cameras.main.flash();

			this.scene.envi_success_03.play();
			this.expand.stop();
			this.scene.player.gotPower("cannonStrike");

		}
		
		var timeline = this.scene.tweens.createTimeline();
		timeline.add({
			targets: this,
			scale: 1.1,
			duration: 100,
			ease: 'Linear',
			repeat: 4,
			yoyo:true

		});

		timeline.add({
			targets: this,
			scale: 1,
			duration: 100,
			ease: 'Linear',
			repeat: 0

		});

		timeline.add({
			targets: this,
			scale: 20,
			alpha: 0,
			duration: 300,
			ease: 'Linear',
			repeat: 0

		});


		timeline.play();

		this.wasUsed=true;

	}
}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
