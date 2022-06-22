
// You can write more code here

/* START OF COMPILED CODE */

class MechaPirana extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "mechapirana", frame !== undefined && frame !== null ? frame : "pescadito instance 10000");
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "movingPirana";
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	travelDistance = 100;
	
	/* START-USER-CODE */

create(){

	this.initColliders();


	this.isLauched = false;
	this.isAlert = false;
	this.originalY = this.y;

	this.initMovement();
  	this.createCoins();

}

initMovement(playerDistance){

	if(!this.isAlert){


		this.alertSquence = this.scene.tweens.createTimeline();

		this.alertSquence.add({
			targets: this,
			y: this.originalY-30,
			duration: 300,
			ease: 'Linear',
			repeat: -1,
			yoyo:true

		});

		this.alertSquence.play();

		this.isAlert=true;

	}


	if(playerDistance<80){

		if(!this.isLauched){
			this.alertSquence.stop();
			console.log("travel distance " + this.travelDistance  );
			this.jumpsequence = this.scene.tweens.createTimeline();

			this.jumpsequence.add({
				targets: this,
				y: this.originalY,
				scale: 0.8,
				duration: 100,
				ease: 'Linear',
			});

			this.jumpsequence.add({
				targets: this,
				scale:1,
				y: this.originalY-this.travelDistance,
				duration: 350*this.travelDistance/100,
				ease: 'Phaser.Easing.Bounce.Out',
			});

			this.jumpsequence.add({
				targets: this,
				angle: 180,
				duration: 500,
				ease: 'Linear',
			});

			this.jumpsequence.add({
				targets: this,
				y: this.originalY,
				duration: 350*this.travelDistance/100,
				ease: 'Phaser.Easing.Bounce.in',
			});

			this.jumpsequence.add({
				targets: this,
				delay: 1500,
				angle: 0,
				duration: 500,
				ease: 'Linear',
				callbackScope: this,
				onComplete: function () {

					this.isLauched=false;
					this.isAlert=false

				}
			});



			this.jumpsequence.play();
			this.isLauched=true;
			this.scene.piranha_jump_01.play();
		}


	}
}


initColliders(){

	this.scene.physics.add.overlap(this.scene.player, this, this.hurtplayer,false,this);	
}

hurtplayer(player,acid){
	player.playerhurt();
	//this.scene.piranha_bite_01.play();
	this.scene.piranha_bite_02.play();
}


createCoins(){
	this.enemyCoins = [];

	for(var i=0; i<5; i++){
		const coin = new Coin(this.scene, this.x, this.y-100);
		coin.isEnemyCoin=true;
		coin.hasGravity=true;
		coin.visible=false;
		this.enemyCoins.push(coin);
		this.scene.add.existing(coin);
	}

	this.hasCoins = true;
}

destroySequence(){

	//	var destroying = this.play("explode2",true);

		console.log("destroy on complete");
			if(this.hasCoins){

				this.enemyCoins.forEach(coin => {
					coin.body.enable=true;
					coin.visible=true;
					coin.x = this.x;
					coin.y = this.y;
					coin.visible = true;
					coin.body.velocity.y=-500;
					coin.body.velocity.x=Math.random()*300;

				});

				this.hasCoins = false;

			}


			    this.visible=false;
				// explotion
				const explotion = new Explotion(this.scene, this.x, this.y);
				this.scene.add.existing(explotion);		
				// explotion (prefab fields)
				explotion.emit("prefab-awake");


			this.scene.samposhooter_destroy_01.play();

	}

update(){
	this.distanceToPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

	if(this.distanceToPlayer <=120){

			this.initMovement(this.distanceToPlayer);


	}

}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
