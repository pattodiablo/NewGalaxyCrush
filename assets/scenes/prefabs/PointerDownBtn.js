
// You can write more code here

/* START OF COMPILED CODE */

class PointerDownBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Dedito instance 10000");
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
	
		this.distance = 10;
		this.animDuration = 1000;
		this.initMovement();
		this.play("dedito", true);
	}

	initMovement(){
		this.scene.tweens.add({
			targets: this,
			y: this.y-this.distance,
			ease: 'Quadratic.Out',
			duration: this.animDuration,
			yoyo:true,
			repeat:-1
		
		});
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
