
// You can write more code here

/* START OF COMPILED CODE */

class SwitchPanel extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "swtich0000");
		
		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyX = -16;
		thisPhysicsBody.bodyWidth = 60;
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	doorID = 1;
	
	/* START-USER-CODE */

	create() {

		

		this.scene.physics.add.overlap(this.scene.player, this, this.activateSwitch, false, this);
		this.setInteractive();
		this.isEnable = true;
		this.canActivate = false;

		this.on('pointerup', function (pointer) {
			var ponterup_timer = this.scene.time.addEvent({
				delay: 250,                // ms
				callback: function(){
					this.canActivate = false;
					console.log('canActivate ' + this.canActivate);
				},
				//args: [],
				callbackScope: this,
				loop: false
			});
			this.canActivate = true;
			console.log('canActivate ' + this.canActivate);
			

		});	

	}

	disableSwitch() {
		this.isEnable = true;
	}

	activateSwitch() {
		

		if (this.isEnable && this.canActivate) {
				this.scene.enableDoorID(this.doorID);
				this.play("switchOn", true);
				this.scene.envi_switch_02.play();
				this.canActivate = false;
				this.isEnable = false;
	
		}

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
