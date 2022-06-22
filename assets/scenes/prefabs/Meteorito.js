
// You can write more code here

/* START OF COMPILED CODE */

class Meteorito extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Meteorito", frame);

		this.scaleX = 0.35;
		this.scaleY = 0.35;

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 150;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){

		this.body.setCircle(100,0,0);
		this.initColliders()
		this.animMeteoro();
		this.vaAsonar = true;

	}

	animMeteoro(){
		this.rotar = this.scene.tweens.createTimeline();
		this.rotar.add({
			targets: this,
			angle: 360,
			duration: 3500,
			ease: 'Linear',
			repeat: -1,
			callbackScope: this,
		});
	this.rotar.play()
	}

	initColliders(){

		this.scene.physics.add.overlap(this.scene.player, this, this.killPlayer,null,this);	

	}

	killPlayer(){

			this.scene.player.playerhurt();
	}

	update(){

		if(this.y>-250 && this.vaAsonar){
			this.scene.finalboss_moltenrain_01.play();
			this.vaAsonar=false;
		}
		if(this.y>1000){
			this.destroy();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
