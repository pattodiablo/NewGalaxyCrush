
// You can write more code here

/* START OF COMPILED CODE */

class Heart extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "CORAZON 2.ai instance 10000");
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "heartPump";
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.scene.physics.add.overlap(this.scene.player, this, this.getHeart,false,this);

	}


	getHeart(){
		if(this.scene.player.playerLife <= 	this.scene.game.playerData.maxLife){
			this.scene.player.playerLife++
			this.scene.lifepanel.calcularBarrasEncendidas();
		}
		console.log(this.scene.player.playerLife);
		
		this.scene.supa_pickupheart_01.play();
		
		this.destroy();
	

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
