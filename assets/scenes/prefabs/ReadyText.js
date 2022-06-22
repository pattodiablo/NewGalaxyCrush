
// You can write more code here

/* START OF COMPILED CODE */

class ReadyText extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "props", frame !== undefined && frame !== null ? frame : "rdytext0000");
		
		// this (components)
		new FixedToCamera(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */
	create(){
		this.alpha = 0;
		this.play("rdyText", true);
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
