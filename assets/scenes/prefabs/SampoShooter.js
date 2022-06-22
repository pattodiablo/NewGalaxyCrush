
// You can write more code here

/* START OF COMPILED CODE */

class SampoShooter extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "sampoShooter", frame ?? "newSampo  instance 10000");

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 500;
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyWidth = 25;
		thisPhysicsBody.bodyHeight = 40;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "sampo/newWalk";

		/* START-USER-CTR-CODE */
		//this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("create", () => this.create());
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

	/* START-USER-CODE */

	create(){


		this.startRunning = true;
		this.direction = 1;
		this.changinDirection = false;
		this.bulletRack = [];
		this.maxBullets = 5;
		this.bulletTurn=0; 
		this.setDepth(2);
		this.enemyLife = 5;

		

		this.samposhooter_damage_01 = this.scene.sound.add('samposhooter_damage_01');
		this.samposhooter_damage_01.loop = false;
		this.scene.fxcontainer.push(this.samposhooter_damage_01);


		this.initMovement();
		this.createCoins();


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

					if(this.RevivingPodID!=null){

							this.scene.revivingPods.forEach(pod => {

								if(pod.PodID==this.RevivingPodID){
									console.log(this.RevivingPodID);
									this.visible=false;
									this.isDestroyed = false
									this.x = pod.x;
									this.y = pod.y;
									pod.revivir(this);

								}
							});
						}

	}

	initMovement(){

	
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

		}else{

			this.movementTimer = this.scene.time.addEvent({
					delay: Math.ceil(Math.random()*(3000 - 2000)+2000),                // ms
					callback: function(){


							this.play("sampo/newWalk",true);


						var randomDirection = Math.random() < 0.5;

						if(randomDirection < 0.5 ){
							this.flipX = true;
							this.direction = -1;


						}else{
							this.flipX = false;
							this.direction = 1;

						}

					},
					//args: [],
					callbackScope: this,
					loop: true
				});	
		}




	}

	intitShots(){
		for (var i =0; i<=this.maxBullets; i++){
			const sampoBullet = new SampoBullet(this.scene, -100, this.y+20);
			this.scene.add.existing(sampoBullet);
			this.bulletRack.push(sampoBullet);
		}
		this.scene.physics.add.overlap(this.scene.player, this.bulletRack, this.killPlayer);	
	}	

	killPlayer(player,bullet){

		player.playerhurt();

	}

	shoot(){

		if(this.canShoot){
			if(this.bulletTurn>this.maxBullets){
				this.bulletTurn = 0;
			}

			if(this.flipX){

				this.bulletRack[this.bulletTurn].flipX = this.flipX;
				this.bulletRack[this.bulletTurn].visible = true;
				this.bulletRack[this.bulletTurn].x = this.x-24;
			}else{

				this.bulletRack[this.bulletTurn].flipX = this.flipX;
				this.bulletRack[this.bulletTurn].visible = true;
				this.bulletRack[this.bulletTurn].x = this.x+24;
			}

			this.bulletRack[this.bulletTurn].initMovement();

			this.bulletRack[this.bulletTurn].y = this.y+20;
			this.bulletTurn++;
		}


	}


	checkIfFall(){
		if(this.y >= this.scene.layer.height + 100){
		this.body.enable = false;
			this.visible=false

		}
	}

	update(){


		if(this.active){
			this.checkIfFall();
			if(this.startRunning){
			//	
				this.intitShots();

				this.startRunning =  false;
			}

			if(this.body.enable){
				if(this.body.blocked.right || this.body.blocked.left){

					this.direction*=-1;
					this.flipX = !this.flipX;

				}

				this.body.velocity.x = 30*this.direction;
			}
		}
		if (this.flipX) {
			this.body.setOffset(this.width/3, 0);
		} else {
			//derecha
			this.body.setOffset(0, 0);
		}

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

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
