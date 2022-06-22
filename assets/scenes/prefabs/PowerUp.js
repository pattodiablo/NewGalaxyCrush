
// You can write more code here

/* START OF COMPILED CODE */

class PowerUp extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "props", frame !== undefined && frame !== null ? frame : "powerUp0000");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "powerUp1";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
	
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){

		const arcade = this.scene.physics;
		arcade.add.existing(this);
		arcade.add.overlap(this, this.scene.player, this.getItem, null, this);
		this.isActive = true;
	
	}

	getItem(powerUp,player){
		if(this.isActive){
			player.activatePowerPush();
			this.isActive = false;
			this.visible=false;
		}

		var TimeToReactivate = this.scene.time.addEvent({
			delay: 20000,                
			callback:function(){
				this.visible=true
				this.isActive = true;
			},
			callbackScope: this,
			loop: false
		});
	}

	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
