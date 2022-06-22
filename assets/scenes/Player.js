
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "playerAnimations", frame ?? "idle instancia 10000");

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 500;
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyWidth = 100;
		thisPhysicsBody.bodyHeight = 100;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "idlePlayer";

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.updatePlayer())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){

		this.velocityPlayer = 250;
		this.bulletRackCapacity=10;
		this.bulletRack=[];
		this.isDeath = false;
		this.isRedFireActive = true;
		this.isSpaceBarPrssed = false;

		this.cursors = this.scene.input.keyboard.addKeys(
			{
			up:Phaser.Input.Keyboard.KeyCodes.W,
			down:Phaser.Input.Keyboard.KeyCodes.S,
			left:Phaser.Input.Keyboard.KeyCodes.A,
			right:Phaser.Input.Keyboard.KeyCodes.D,
			space:Phaser.Input.Keyboard.KeyCodes.SPACE
			
			});

		
		this.createBullets();

	}

	createBullets(){
		for (let i = 0; i < this.bulletRackCapacity; i++) {
			
			
			
		}
	}

	deathProcess(){
	

		this.isWalking=false;
		this.body.enable=false;

		var destroyTimeline = this.scene.tweens.createTimeline();
		destroyTimeline.add({
			targets: this,
			alpha: 0.3,
			duration: 150,
			ease: 'Linear',
			yoyo: true,
			repeat: 4,
			callbackScope: this,
			onComplete: function () {
				console.log("tween complete");
				this.isDeath=true;
				this.scene.GGJ2022_hurt01.play();
				this.scene.gameOver.visible=true;
				this.scene.GGJ2022_gameover01.play();
			}
		});
		destroyTimeline.play();

		var timer = this.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				const explotion = new Explotion(this.scene, this.x, this.y);
				this.scene.add.existing(explotion);
			},
			//args: [],
			callbackScope: this,
			reapeat: -1
		});


		

	}

	updatePlayer(){

		if(this.cursors.space.isDown && !this.isSpaceBarPrssed){
			this.isSpaceBarPrssed=true;
			this.scene.GGJ2022_switchweapon01.play();
			if(this.isRedFireActive){
				this.isRedFireActive=false;
			}else{
				this.isRedFireActive=true;
			}
			console.log(this.isRedFireActive);
		}
		if(this.cursors.space.isUp){
			this.isSpaceBarPrssed=false;
		}
		if (this.cursors.right.isDown) {

			this.body.velocity.x=this.velocityPlayer;
			this.flipX=false;
			this.isWalking=true;

		
			

		}else if (this.cursors.left.isDown) {

			this.flipX=true;
			this.body.velocity.x=-this.velocityPlayer;
			this.isWalking=true;
	
			

		}else{
			this.body.velocity.x=0;
			this.isWalking=false;
		}

		this.checkAnimStatus()
	}


	checkAnimStatus(){


		if(!this.isDeath){
				if(this.isWalking){

						this.play("walkingPlayer",true);
					}
					if(!this.isWalking){
						this.play("idlePlayer",true);

					}
		}else{
			this.play("almostDeath",true);

		}
	

	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
