
// You can write more code here

/* START OF COMPILED CODE */

class Blobber extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Blobber", frame ?? "blobberIdle instance 10000");

		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "idleBlobber";
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	travelDistance = 100;
	/** @type {number} */
	veloBlobber = 15;
	/** @type {boolean} */
	isVertical = false;

	/* START-USER-CODE */
		create(){
			this.direction = 1;
			this.initMovement();

			this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto

		}

		initMovement(){

if(!this.isVertical){
	if(this.travelDistance>0){

		this.totalTravel =  this.x+this.travelDistance;

		this.originalX = this.x;

		if(this.x>this.totalTravel){

			this.flipX = true;

			this.direction = -1;
		}

		if(this.x<this.originalX){
			this.flipX = false;
			this.direction = 1;

		}

	}


}else{

	if(this.travelDistance>0){

		this.totalTravel =  this.y+this.travelDistance;

		this.originalY = this.y;

		if(this.y>this.totalTravel){

		//	this.flipY = true;

			this.direction = -1;
		}

		if(this.y<this.originalY){
		//	this.flipY = false;
			this.direction = 1;

		}

	}

}
			




		}


		update(){

			if(!this.isVertical){
				this.body.velocity.x = this.veloBlobber*this.direction;
						if(this.travelDistance>0){



							if(this.x>this.totalTravel){

								this.flipX = true;

								this.direction = -1;
							}

							if(this.x<this.originalX){
								this.flipX = false;
								this.direction = 1;

							}

						}	

			}else{
				this.body.velocity.y = this.veloBlobber*this.direction;
				if(this.travelDistance>0){

					if(this.y>this.totalTravel){
					//	this.flipY = true;
						this.direction = -1;
					}

					if(this.y<this.originalY){
					//	this.flipY = false;
						this.direction = 1;

					}

				}	

			}
		

		}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
