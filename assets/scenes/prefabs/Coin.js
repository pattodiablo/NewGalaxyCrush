
// You can write more code here

/* START OF COMPILED CODE */

class Coin extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Aro de Luz instance 10040");
		
		this.setOrigin(0, 0);
		
		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "ring";
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyX = 13;
		thisPhysicsBody.bodyY = 6;
		thisPhysicsBody.bodyWidth = 20;
		thisPhysicsBody.bodyHeight = 20;
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {boolean} */
	enableSound = false;
	/** @type {boolean} */
	hasGravity = false;
	/** @type {boolean} */
	isEnemyCoin = false;
	
	/* START-USER-CODE */

	create(){
		
		this.setDepth(this.scene.player.depth-1);
		this.scene.physics.add.overlap(this.scene.player, this, this.getCoin,false,this);	
	
			
		this.distance = Phaser.Math.Between(10, 15);
		this.animDuration = Phaser.Math.Between(1000, 2000);

		if(!this.hasGravity){
			this.initMovement();
		}else{
			this.body.setDrag(60)
			
			this.body.gravity.y=900;
			this.scene.physics.add.collider(this.scene.layer, this);	
		}

		if(this.isEnemyCoin){
			this.body.enable=false;
		}
	
		
		
	
	}
	
	disableBody(){
		this.body.enable=false;
	}

	initMovement(){
		this.scene.tweens.add({
			targets: this,
			y: this.y-this.distance,
			ease: 'Quadratic.Out',
			duration: this.animDuration,
			yoyo:true,
			repeat:-1
		
		});
	}

	startTimer(){

		var titila = this.scene.tweens.createTimeline();
		titila.add({
			targets: this,
			alpha: 0.2,
			duration: 100,
			ease: 'Linear',
			repeat: -1,
		repeatDelay:50,
			yoyo:true

		});

		titila.play();

		this.killtimer = this.scene.time.addEvent({
			delay: 6000,                // ms
			callback: function(){
				this.destroy();	
			},
			//args: [],
			callbackScope: this,
			loop: false
		});


	}

	getCoin(){
		//sonidos para coins
		
		this.fxcoinlist = [this.scene.Envi_PickupCoin_05_01, this.scene.Envi_PickupCoin_05_02, this.scene.Envi_PickupCoin_05_03];
		
		
		
		//this.scene.envi_pickupcoin_04.play();
		const randomFx = Math.abs(Math.round(Math.random() * this.fxcoinlist.length - 1));

				this.fxcoinlist[randomFx].play();

		this.scene.coinsCollected++;
		if(this.scene.game.playerData.coins < 9999){
			this.scene.game.playerData.coins++;
		}
		
		this.body.enable=false;
		this.scene.tweens.add({
			targets: this,
			y: 0,
			x: 30,
			ease: 'Quadratic.Out',
			duration: 1000,
			callbackScope: this,
			onComplete: function () {
			
				this.destroy();
			}
		
		});

		this.scene.coinText.text = this.scene.game.playerData.coins;

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
