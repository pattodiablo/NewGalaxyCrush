
// You can write more code here

/* START OF COMPILED CODE */

class DroneShot extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "drone", frame ?? "energyBullet0000");

		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "droneShot";
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){

		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt,false,this.scene.player);

		this.finalX=this.scene.player.x;
		this.finalY=this.scene.player.y;

		this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto

		this.rad = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
		this.deg = Phaser.Math.RadToDeg(this.rad);


		this.scene.physics.velocityFromAngle(this.deg, 400, this.body.velocity);//chequear

		this.lifeTimer = this.scene.time.addEvent({
			delay: 2000,                // ms
			callback: function(){
	
				this.destroy();

			},
			//args: [],
			callbackScope: this,
			loop: false
		});

	}

	




	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
