
// You can write more code here

/* START OF COMPILED CODE */

class Saw extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "props", frame !== undefined && frame !== null ? frame : "saw10000");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "Saw";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.updateEvent = 	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */
	//create(){
		//this.envi_saw_01 = this.scene.sound.add('envi_saw_01');
		//this.envi_saw_01.loop = false;
	//}
	start(){
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		arcade.add.overlap(this, this.scene.player, this.touchSaw, null, this);
		this.body.setCircle(this.width/2);

		
	}
	c
	touchSaw(saw,player){
		player.x = player.originalX;
		player.y = player.originalY;
		//console.log('cortarr');
		//this.envi_saw_01.play();
		

	}

	update(){

		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
