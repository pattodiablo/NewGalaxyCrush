
// You can write more code here

/* START OF COMPILED CODE */

class Mina extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "mina", frame);

		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "beepingMine";
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 980;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.initColliders();
		this.initTimer();
		//this.body.setCircle(15);
		this.body.bounce.y=0.4;
		this.body.setFrictionX(2);
		this.isExplotable = true;
	}

	initTimer(){
	this.Explodetimer = this.scene.time.addEvent({
			delay: 4000,                // ms
			callback: function(){
				this.visible=false;
				const explotion = new Explotion(this.scene, this.x, this.y);
				this.scene.add.existing(explotion);		
				// explotion (prefab fields)
				explotion.emit("prefab-awake");
				this.scene.finalboss_minedestroy_01.play();
				this.destroy();
			
			},
			//args: [],
			callbackScope: this,
			loop: false
		});

	

	}

	initColliders(){

		this.scene.physics.add.collider(this.scene.player, this, this.onCart);
		this.scene.physics.add.collider(this.scene.layer, this);	
		this.scene.physics.add.overlap(this.scene.finalBossActiveParts, this, this.checkIfDagameRobot);	
	

	}

	checkIfDagameRobot(robotPart,mina){
	
		if(mina.isExplotable){
			
			mina.visible=false;
			const explotion = new Explotion(mina.scene, mina.x, mina.y);
			mina.scene.add.existing(explotion);		
			// explotion (prefab fields)
			explotion.emit("prefab-awake");
			mina.scene.finalboss_minedestroy_01.play();
			mina.scene.cameras.main.shake(500,0.03);

			mina.Explodetimer.destroy();
			mina.destroy();

			robotPart.Health--;
			console.log("partHealt " + robotPart.Health);
			if(robotPart.Health<=9){
				console.log("setting tint");
				robotPart.setTint(0xD20011, 0xD25011, 0xD20011, 0xD20011);
			}
			if(robotPart.Health<=8){
				robotPart.destroyPart();
			}
			robotPart.damageTween = robotPart.scene.tweens.createTimeline();
		


			robotPart.damageTween.add({
				targets: robotPart,
				alpha: 0.5,
				duration: 250,
				ease: 'Linear',
				yoyo: true,
				repeat: 3

			});

			

			robotPart.damageTween.play();
			mina.isExplotable=false;
		}

		
	}

	onCart(player,cart){
		player.overPlatform = true;
		player.wasOnPlatform = true;
		if(cart.body.touching.left ||cart.body.touching.right ){
			cart.body.immovable = false;
		}else{
			cart.body.immovable = true;
		}
	
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
