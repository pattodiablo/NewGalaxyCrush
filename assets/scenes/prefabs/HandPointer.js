
// You can write more code here

/* START OF COMPILED CODE */

class HandPointer extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "hand", frame);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

		create(){
			this.initAnimation();
		}


		initAnimation(){

			var floating = this.scene.tweens.createTimeline();
			floating.add({
			targets: this,
			y: this.y-2,
			x: this.x+12,
			angle:-6,
			duration: 500,
			ease: 'Phaser.Easing.Bounce.Out',
			loop: true,
			repeat: 3,
			callbackScope:this,
			onComplete: function(){
				this.destroy();
			},
			yoyo: true,
	
			});
	
			floating.play();
		}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
