
// You can write more code here

/* START OF COMPILED CODE */

class CyberPigeon extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "CyberPigeon", frame !== undefined && frame !== null ? frame : "CyberPigeon instance 10003");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "pigeon/flying";
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	distance = 300;
	
	/* START-USER-CODE */

		create(){
			
			this.velocity = 20;
			this.originalX = this.x;
			this.finalX = this.originalX + this.distance;
			this.isMoving = false;
			this.bombArmed =  true;
			this.isDestroyed = false;
			
			var bouncingTween = this.scene.tweens.createTimeline();
			bouncingTween.add({
				targets: this,
				y: this.y+10,
				duration: 500,
				ease: 'Linear',
				repeat: -1,
				loop: true,
				yoyo: true
		
			});
			bouncingTween.play();



			this.createCoins();
			
		}

		creteEgg(){


						// eggBomb
						const eggBomb = new EggBomb(this.scene, this.x, this.y+20);
						this.scene.add.existing(eggBomb);

						this.eggbomb_deploy_01Available = this.scene.sound.get("eggbomb_deploy_01"); 
						if(this.eggbomb_deploy_01Available){
							this.scene.eggbomb_deploy_01.play();
						}
					
					
								
						// eggBomb (prefab fields)
						eggBomb.emit("prefab-awake");
						
						// eggBomb (components)
						eggBomb.emit("components-awake");
					

						var armedAgainTimer = this.scene.time.addEvent({
							delay: 3000,                // ms
							callback: function(){

									this.bombArmed=true;
							},
							//args: [],
							callbackScope: this,
							loop: false
						});

		

		}

		createCoins(){
			this.pigeonCoins = [];
	
			for(var i=0; i<5; i++){
				const pigeon_coin = new Coin(this.scene, this.x, this.y-100);
				 //pigeon_coin.body.enable=true;
				 pigeon_coin.isEnemyCoin=true;
				 pigeon_coin.hasGravity=true;
				 pigeon_coin.visible=false;

			
				this.pigeonCoins.push(pigeon_coin);
				this.scene.add.existing(pigeon_coin);
			}
			
			this.hasCoins = true;

			// const pigeon_coin = new Coin(this.scene, this.x, this.y);
			// this.pigeon_coin = pigeon_coin;
			// this.scene.add.existing(pigeon_coin);
			// pigeon_coin.isEnemyCoin=true;
			// pigeon_coin.hasGravity=true;
			// pigeon_coin.visible=false;
		}

		destroySequence(){
  		
			
				if(this.hasCoins){
	
					this.pigeonCoins.forEach(pigeon_coin => {
						pigeon_coin.body.enable=true;
					  	//pigeon_coin.body.gravity.y=900;
						pigeon_coin.visible=true;
						pigeon_coin.x = this.x;
						pigeon_coin.y = this.y;
						pigeon_coin.body.velocity.y=-500;
						pigeon_coin.body.velocity.x=Math.random()*300;
					
					});
	
					this.hasCoins = false;

	
				}
				 //this.pigeon_coin.body.enable=true;
				//  this.pigeon_coin.body.gravity.y=900;
				//  console.log('body coin: '+ this.pigeon_coin.body.gravity.y);
				//  this.pigeon_coin.visible=true;
				//  this.pigeon_coin.x = this.x;
				//  this.pigeon_coin.y = this.y;
				// this.pigeon_coin.body.velocity.y=0;
				// this.pigeon_coin.body.velocity.x=Math.random()*300;

				this.visible=false;

				// explotion
				const explotion = new Explotion(this.scene, this.x, this.y);
				this.scene.add.existing(explotion);		
				// explotion (prefab fields)
				explotion.emit("prefab-awake");


				this.scene.samposhooter_destroy_01.play();
				this.isDestroyed = true
		
			
			
				
				
	
	
		}


		update(){
			if (!this.isMoving){
				this.body.velocity.x = this.velocity;
				this.isMoving = true;
			}

			if(this.x > this.scene.player.x - 100 &&  this.x < this.scene.player.x+100 && this.bombArmed && this.y < this.scene.player.y && !this.isDestroyed){
				
				this.creteEgg();
		
				this.bombArmed = false;
				
			}
			if(this.x >= this.finalX){
				this.body.velocity.x =this.velocity*-1;
				this.flipX = true;
			}
			if(this.x < this.originalX){
				this.body.velocity.x =this.velocity;
				this.flipX = false;
			}
		}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
