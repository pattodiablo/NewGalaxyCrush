
// You can write more code here

/* START OF COMPILED CODE */

class SampoBullet extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "sampoBullet", frame);
		
		this.scaleX = 0.5;
		this.scaleY = 0.5;
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
	
		this.startRunning = true;
		this.bulleSpeed = 200;
		this.visible = false;
	}

	initMovement(){

	
		if(this.flipX){
			this.body.velocity.x = -this.bulleSpeed;
		}else{
			this.body.velocity.x = this.bulleSpeed;
		}
		
	}

	update(){
		if(this.x > 1920 + 200){
			this.visible = false;
		}
		if(this.x < -50){
			this.visible = false;

		}
	

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
