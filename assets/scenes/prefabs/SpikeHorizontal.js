
// You can write more code here

/* START OF COMPILED CODE */

class SpikeHorizontal extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "saw0000");
		
		this.angle = -90;
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "newSaw";
		new PhysicsBody(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.body.setImmovable(true);
		this.body.setCircle(45,-18,30);
		this.initColliders();
		//this.body.setSize(110,110);
		
	}

	initColliders(){
	
		this.scene.physics.add.overlap(this.scene.player, this, this.killPlayer,null,this);	
	}

	killPlayer(player,saw){
		this.scene.player.playerhurt(player,saw);
		this.scene.envi_saw_01.play();
	}

	destroySequence(){

		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
