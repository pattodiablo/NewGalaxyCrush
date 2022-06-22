
// You can write more code here

/* START OF COMPILED CODE */

class Catapulta extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "catpultaOff instance 10000");
		
		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyY = 24;
		thisPhysicsBody.bodyHeight = 10;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "catapultaOff";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	power = 1000;
	
	/* START-USER-CODE */

	create(){
		this.body.setImmovable(true);
		this.initColliders();
		this.readyTolaunch = true;
		
		
		
	}

	initColliders(){
	
		this.scene.physics.add.overlap(this.scene.player, this, this.readyToLaunch,null,this);	
	}

	readyToLaunch(){
		this.scene.player.collidingCata =  true;
	
		if(this.scene.player.wannaLaunch && this.readyToLaunch){
		
			this.scene.envi_slingcharge_02.play();
			this.scene.player.launchingAnimation(this);
			this.play("catapultaOn", true);	
			this.readyToLaunch=false;
			var reloadCatapultaTimer = this.scene.time.addEvent({
				delay: 3000,                // ms
				callback: function(){
					this.readyToLaunch=true;
				},
				//args: [],
				callbackScope: this,
				
			});
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
