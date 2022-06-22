
// You can write more code here

/* START OF COMPILED CODE */

class LightBeam extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "lightBean", frame);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){

		var blink = this.scene.tweens.createTimeline();
		blink.add({
			targets: this,
			alpha: 0.2,
			duration: 100,
			ease: 'Linear',
			repeatDelay:Math.random()*13000,
			yoyo:true,
			loop:2,
			repeat: -1

		});

		blink.play();

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
