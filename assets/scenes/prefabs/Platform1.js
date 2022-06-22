
// You can write more code here

/* START OF COMPILED CODE */

class Platform1 extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Symbol 10 instance 10000");
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "platform2";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	distance = 100;
	/** @type {number} */
	timeTravel = 6000;
	/** @type {boolean} */
	isHorizontal = false;
	
	/* START-USER-CODE */

	create(){

		this.initMovement();
		this.body.setImmovable(true);
		this.direction = -1
		this.velocity = 55;
		this.playerLocked = true;
		this.body.setFrictionX(1);
	}

	initMovement(){
		
	if(this.isHorizontal){
		var timer = this.scene.time.addEvent({
			delay:  this.timeTravel,                // ms
			callback: function(){
				this.direction*=-1;
			},
			//args: [],
			callbackScope: this,
			loop: true
		});
	}else{
		this.scene.tweens.add({
			targets: this,
			y: this.y-this.distance,
			ease: 'Linear',
			duration: this.timeTravel,
			yoyo:true,
			repeat:-1
		
		});
	}
	
	
	

		


	}

	update(){
		if(this.isHorizontal){
			this.body.velocity.x = this.velocity*this.direction;
		}
	

	}

	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
