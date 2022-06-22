
// You can write more code here

/* START OF COMPILED CODE */

class PassCard extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "newCard instance 10000");
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "card";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */
	
	create(){
		this.envi_grabcard02 = this.scene.sound.add('envi_grabcard02');
		this.envi_grabcard02.loop = false;
		this.scene.fxcontainer.push(this.envi_grabcard02);

	


		this.scene.physics.add.overlap(this.scene.player, this, this.getCard,false,this);	
		this.scene.tweens.add({
			targets: this,
			y: this.y+30,
			ease: 'Linear',
			duration: 1000,
			yoyo:true,
			repeat:-1
		
		});
		
		
	}

	getCard(){
		
	this.scene.game.playerData.gotCard=true;
	

	updatear(this.scene.game.playerData); //updatea db
		this.scene.envi_grabcard01.play();
	
			this.scene.hasCardIcon.visible=true;
		
		this.destroy();

		//data.player.gotCard =  true;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
