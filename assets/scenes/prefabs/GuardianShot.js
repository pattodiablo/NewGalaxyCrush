
// You can write more code here

/* START OF COMPILED CODE */

class GuardianShot extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "TheGuardBoss", frame ?? "guardianShot instancia 10000");

		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "guardianShot";

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	BulletDirection = false;

	/* START-USER-CODE */
	create(){

		this.startRunning = true;
		this.bulletSpeed = 200;
		this.visible = true;
		this.direction=0;
		this.isBossShot = true;

		this.initColliders();

		var ondulacion = this.scene.tweens.createTimeline();
		ondulacion.add({
			targets: this,
			y: this.y + 30,
			duration: 500,
			ease: 'Linear',
			repeat: -1,
			yoyo: true

		});

		ondulacion.play();


	}



		
	initColliders(){

		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt,false,this.scene.player);
		

	}

	destroySequence(){


	}



	update(){

		if(this.active){
			if(this.BulletDirection){

				this.body.velocity.x = this.bulletSpeed;
			}else{
				this.body.velocity.x = -this.bulletSpeed;
	
			}
	
			if(this.x<-200){
				this.destroy();
				console.log("bullet destroyed");
			}
			if(this.x>2000){

				this.destroy();
				console.log("bullet destroyed");
			}
		}
}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
