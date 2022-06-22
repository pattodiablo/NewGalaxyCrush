
// You can write more code here

/* START OF COMPILED CODE */

class PowerReady extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "props", frame !== undefined && frame !== null ? frame : "powerReady0000");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "powerReady";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.updateEvent = 	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){
		this.visible = false;
		this.alpha = 0.5;
	}

	update(){
		this.x = this.scene.player.x;
		this.y = this.scene.player.y;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
