
// You can write more code here

/* START OF COMPILED CODE */

class Bangta extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "bangta", frame);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.originalX = this.x;
		this.distance = 200;
		this.velo = 2;
		this.direccion = 1;
	}

	update(){
		this.x +=2*this.direccion;
		if(this.x > this.originalX+this.distance){
			this.direccion*=-1;
			this.scaleX*=-1;
		}else if(this.x < this.originalX-this.distance){
			this.direccion*=-1;
			this.scaleX*=-1;
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
