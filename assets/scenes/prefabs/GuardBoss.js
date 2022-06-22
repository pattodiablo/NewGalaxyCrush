
// You can write more code here

/* START OF COMPILED CODE */

class GuardBoss extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "TheGuardBoss", frame !== undefined && frame !== null ? frame : "idle0000");
		
		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 500;
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyY = 100;
		thisPhysicsBody.bodyHeight = 100;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "guardianIdle";
		
		/* START-USER-CTR-CODE */
		//this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {boolean} */
	bulletEnable = false;
	/** @type {string} */
	RevivingPodID = "pod1";
	/** @type {number} */
	EnemyID = 0;
	/** @type {number} */
	travelDistance = 0;
	/** @type {string} */
	ThingToDrop = "Cart";
	
	/* START-USER-CODE */

	create(){


		this.startRunning = true;
		this.direction = 1;
		this.changinDirection = false;
		this.bulletRack = [];
		this.maxBullets = 5;
		this.bulletTurn=0; 
		this.setDepth(2);
		this.enemyLife = 3;
		this.originalX = this.x;
		this.originalY = this.y;
		this.timesCrushed = 3;
		this.boosVelo = 0;
		this.isDead = false;
		this.isBoss=true;
		this.stopSound=false;



		this.createCoins();
		//this.entryAnimation();

		this.body.enable=false;
		this.y=-200;

		//this.entryAnimation();

	}

	entryAnimation(){

		this.isFalling=true;
		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			y:this.originalY,
			duration: 500,
			ease: 'Linear',
			callbackScope: this,
			onComplete: function () {
				this.isFalling=false;
				this.isIdle = true;
				this.initMovement();
				
				this.scene.cameras.main.shake(1000);
				this.body.enable=true;
				

				var musictimer = this.scene.time.addEvent({
					delay: 1500,                // ms
					callback: function(){
						this.scene.superbravo_gameplay_chip05.play();
					},
					//args: [],
					callbackScope: this,
					loop: false

				});
			
			},
			
			repeat: 0

			

		});

		entrandoTimeline.play();
		//this.scene.supajukebox[this.scene.randomFx].stop();

		this.scene.supajukebox.forEach(song => {
			
			
			song.stop();
			
		
		});

		this.scene.bossguard_fall01.play();
		
		
		

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
				console.log("times crushed " + this.timesCrushed)
				this.body.enable=false;
				this.isFalling =  false;
				this.isIdle =  false;
				this.isFiring = false;
				this.isWalking =  false;
				this.isdamaged = true;

			if(this.timesCrushed > 0){

				this.scene.bossguard_hurt01.play();
				var enableTimer = this.scene.time.addEvent({
					delay: 4000,                // ms
					callback: function(){
						this.isdamaged = false;
						this.body.enable=true;
					},
					//args: [],
					callbackScope: this,
					repeat: 0
				});

			

				this.timesCrushed--;
			}else{
						this.body.enable=false;
						// explotion

						var explotefull = this.scene.time.addEvent({
							delay: 500,                // ms
							callback: function(){
								this.visible=false;
								var randomx = Phaser.Math.RND.between(-60,60);
								var randomy = Phaser.Math.RND.between(-60,60);
								const explotion = new Explotion(this.scene, this.x+randomx, this.y+randomy);
								this.scene.add.existing(explotion);	
								explotion.emit("prefab-awake");
								this.scene.bossguard_destroy04.play();
								this.stopSound = true;

							},
							//args: [],
							callbackScope: this,
							repeat:6,
							loop: false
						});

						var giveReward = this.scene.time.addEvent({
							delay: 3500,                // ms
							callback: function(){
					

								switch(this.ThingToDrop){
									case "Cart":
										const cart = new Cart(this.scene, this.x, this.y-80);
										this.scene.add.existing(cart);
									break;

									case "PassCard":
										const passCard = new PassCard(this.scene, this.x, this.y);
										this.scene.add.existing(passCard);
									break;

									case "SupaJet":
										const supaJet = new SupaJet(this.scene, this.x, this.y);
										this.scene.add.existing(supaJet);
									break;

									case "Heart":
										const heart = new Heart(this.scene, this.x, this.y);
										this.scene.add.existing(heart);
									break;

									case "Platform1":
										const platform1 = new Platform2(this.scene, 620, this.y);
									
										this.scene.platforms.push(platform1);
										platform1.distance=300;
										platform1.timeTravel=4000;
										this.scene.add.existing(platform1);
									break;


									case "GuardBoss":
										const guardBoss = new GuardBoss(this.scene, this.x, this.y-500);
										this.scene.add.existing(guardBoss);
										guardBoss.entryAnimation();
									break;

									default:
										const cart2 = new Cart(this.scene, this.x, this.y-500);
										this.scene.add.existing(cart2);
									break;

								}
								//
							
					
							},
							//args: [],
							callbackScope: this,
							loop: false
						});


						this.isDead = true;
						this.decisionTimer.remove();
			}



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
	

	}

	initMovement(){

		this.decisionTimer = this.scene.time.addEvent({
			delay: 2000,                // ms
			callback: function(){
				this.decisionChance = Math.ceil(Math.random()*3);
				console.log("decision " + this.decisionChance);

				switch (this.decisionChance) {
					case 1:
						
						this.isFalling =  false;
						this.isIdle =  false;
						this.isFiring = false;
						this.isWalking =  true;
						this.isdamaged = false;

						this.boosVelo=30;
								
						this.scene.time.addEvent({
							delay: 2000,                // ms
							callback: function(){

								this.initMovement();
							},
					
							callbackScope: this,
							loop: false
						});

						break;

					case 2:

						this.isFalling =  false;
						this.isIdle =  false;
						this.isFiring = false;
						this.isWalking =  true;
						this.isdamaged = false;

						this.boosVelo=30;
						this.direction=1;
					
						
								
						this.scene.time.addEvent({
							delay: 2000,                // ms
							callback: function(){

								this.initMovement();
							},
					
							callbackScope: this,
							loop: false
						});

						break;

					case 3:
						this.isFalling =  false;
						this.isIdle =  false;
						this.isFiring = true;
						this.isWalking =  false;
						this.isdamaged = false;

						this.boosVelo=0;
						if(!this.stopSound){
							this.scene.bossguard_charge01.play();
						}
						
						
						this.shoot();
								
						this.scene.time.addEvent({
							delay: 2000,                // ms
							callback: function(){

								this.initMovement();
							},
					
							callbackScope: this,
							loop: false
						});


						break;
				
					default:
						break;
				}

			

			},
			//args: [],
			callbackScope: this,
			loop: false
		});

	if(this.timesCrushed <2){


	}


	}



	killPlayer(player,bullet){

		player.playerhurt();

	}

	shoot(){

		if(!this.isDead){
				var shootsDelay = this.scene.time.addEvent({
						delay: 1500,                // ms
						callback: function(){
					// guardianShot_instancia_10000
							if(!this.isDead){

						
								if(this.direction>0){
									const guardianShot = new GuardianShot(this.scene, this.x+34, this.y);
									guardianShot.setDepth(11);
									guardianShot.BulletDirection=true;
									this.scene.add.existing(guardianShot);
								}else{
									const guardianShot = new GuardianShot(this.scene, this.x-34, this.y);
									guardianShot.setDepth(11);
									guardianShot.BulletDirection=false;
									this.scene.add.existing(guardianShot);
								}
						
								
								this.scene.bossguard_shot01.play();
							}
						},
						//args: [],
						callbackScope: this,
						repeat: 3
					});
		}
	
			
		
	}


	checkIfFall(){
		if(this.y >= this.scene.layer.height + 100){
		this.body.enable = false;
			this.visible=false

		}
	}

	checkAnimStatus() {
		if(this.isdamaged){
			this.play("guardianDamaged", true);
		}
		if(this.isFalling){
			this.play("guardianFalling", true);
		}
		if(this.isIdle){
			this.play("guardianIdle", true);
		}
		if(this.isWalking){
			this.play("guardianWalk", true);
		}

		if(this.isFiring){
			this.play("guardianFiring", true);
		}

	}


	getDirectionToPlayer(){
		if(this.x>this.scene.player.x){

			this.flipX=false;
			this.direction=-1;
		}else{
			this.flipX=true;
			this.direction=1;
		}
	}
	update(){

		

		this.getDirectionToPlayer();
		this.checkAnimStatus();

		if(this.active){
		
			if(this.startRunning){

				this.startRunning =  false;
			}

			if(this.body.enable){

				this.body.velocity.x = this.boosVelo*this.direction;
			}
		}
		if (this.flipX) {
			this.body.setOffset(0, 0);
		} else {
			//derecha
			this.body.setOffset(0, 0);
		}

		

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
