
// You can write more code here

/* START OF COMPILED CODE */

class Platform2 extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Symbol 9 instance 10000");
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "platform1";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	distance = 100;
	/** @type {number} */
	timeTravel = 6000;
	
	/* START-USER-CODE */

	create(){

	
		this.body.setImmovable(true);
	
    	this.body.allowGravity = false;
		this.name = "Elevator";
		this.isActive = true;
		this.isPlayerOver =  false;
		
		

	}

	goingUp(){
	
		if(this.isActive && this.scene.player.overPlatform){
			this.elevatorAnim = this.scene.tweens.add({
				delay: 1000,
				targets: this,
				y: this.y-this.distance,
				ease: ' Quadratic.In',
				duration: this.timeTravel,
				yoyo:false,
				callbackScope: this,
				onStart: function () {
				
					this.scene.envi_elevator_01.play();
					
				},
	
				onComplete: function () {
			
					this.scene.envi_elevator_01.stop();
				this.descendTween =	this.scene.tweens.add({
						delay: 5000,
						targets: this,
						y: this.y+this.distance,
						ease: ' Quadratic.In',
						duration: 1000,
						yoyo:false,
						callbackScope: this,
						onStart: function () {
							if(this.active){

								this.envi_elevator_01Available = this.scene.sound.get("envi_elevator_01"); 
									if(this.envi_elevator_01Available){
										this.scene.envi_elevator_01.play();
									}

							
							}
							
						},
						onComplete: function () {
							this.isActive=true;
							if(this.active){
							this.scene.envi_elevator_01.stop();
							}
						
						},
						repeat:0
					
					});
				},
				repeat:0
			
			});
			this.isActive=false;
		}
	
	
	


	}

update(){

	if(!this.active){
		this.descendTween.stop();
	}
}

	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
