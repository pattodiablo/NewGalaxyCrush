
// You can write more code here

/* START OF COMPILED CODE */

class AlertSign extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "misile", frame !== undefined && frame !== null ? frame : "alert instance 10000");
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
	

		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
	this.initAnimaion();	
	}


	initAnimaion(misile){

		var blink = this.scene.tweens.createTimeline();
		blink.add({
		targets: this,
		alpha: 0,
		duration: 100,
		loop: true,
		repeat: 3,
		yoyo: true,
		callbackScope:this,
		onComplete: function(){
			misile.isAlerting = false;
			this.destroy();
		}

		});

		blink.play();
	}



	normalAlert(){

		var blink = this.scene.tweens.createTimeline();
		blink.add({
		targets: this,
		alpha: 0,
		duration: 100,
		loop: true,
		repeat: 3,
		yoyo: true,
		callbackScope:this,
		onComplete: function(){
		
			this.destroy();
		}

		});

		blink.play();
	}




	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
