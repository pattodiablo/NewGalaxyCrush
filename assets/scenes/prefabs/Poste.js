
// You can write more code here

/* START OF COMPILED CODE */

class Poste extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew2", frame !== undefined && frame !== null ? frame : "poste instance 10000");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "posteAnimation";
		
		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){

		this.setDepth(11);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
