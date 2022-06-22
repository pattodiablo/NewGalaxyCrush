
// You can write more code here

/* START OF COMPILED CODE */

class SupaShotBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "props", frame !== undefined && frame !== null ? frame : "shootBtn instance 10001");
		
		this.scaleX = 0.7;
		this.scaleY = 0.7;
		
		// this (components)
		new FixedToCamera(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "SupaShotBtnActive";
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
	
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.visible=false;
		
		this.isActive=true;
		this.OriginalX = this.x;
		this.OriginalY = this.y;
		this.isOnScreen=false;
		
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
		
			if(this.isActive){
				
				this.isActive=false;
				this.scene.player.wannaRoll = true;
			}

			
		});

	}

	activateBtn(){
	
	this.isActive=true;
	if(!this.isOnScreen){
		this.scene.tweens.add({
			targets: this,
			y: 430,
			ease: 'Quadratic.Out',
			duration: 1000,
		});
		this.isOnScreen=true;
	}


	}

	deactivateBtn(){

		this.isActive=false;
		this.scene.tweens.add({
			targets: this,
			y: this.scene.layer.height + 100,
			ease: 'Quadratic.Out',
			duration: 1000,
		});
		this.isOnScreen=false;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
