
// You can write more code here

/* START OF COMPILED CODE */

class Toll extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew2", frame !== undefined && frame !== null ? frame : "Symbol 33 instance 10006");
		
		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyY = 10;
		thisPhysicsBody.bodyHeight = 20;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "TollIdle";
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	tollCost = 200;
	/** @type {string} */
	LockId = "1";
	
	/* START-USER-CODE */

	create(){
		this.initColliders();
		this.body.immovable = true;
		this.islocked = false;
		this.createCoins();
		this.scene.tolls.push(this);

		this.isLevel1 =  false;
		this.isLevel2 =  false;
		this.isLevel3 =  false;
		this.isLevel4 =  false;
		this.isLevel5 =  false;
		
		//FX
		

		
	}

	
	createCoins(){
		this.enemyCoins = [];

		for(var i=0; i<=25; i++){
			const coin = new Coin(this.scene, this.x, this.y);
			coin.isEnemyCoin=false;
			coin.hasGravity=false;
			coin.visible=false;
			this.enemyCoins.push(coin);
			this.scene.add.existing(coin);
		}

		this.hasCoins = true;
	}

	dropcoins(){

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


	initColliders(){

		this.scene.physics.add.collider(this.scene.player, this, this.checkAndOpen,false,this.scene.player);
	}

	checkAndOpen(player,toll){
		
		if(player.isDropping && !toll.islocked){
			this.scene.cameras.main.flash();
			var currentMoney =  player.scene.game.playerData.coins;
			if(currentMoney >=toll.tollCost){

				toll.isLevel5 = true;
				this.scene.envi_sideswitch_01.play();
			
				toll.dropcoins();

				toll.scene.game.playerData.coins -= toll.tollCost;
				console.log("i must open")
			
				toll.islocked= true;
				toll.scene.coinText.text = toll.scene.game.playerData.coins;
				
				toll.scene.sideDoors.forEach(door => {
				
					if(door.LockedBy == toll.LockId){
						console.log("puerta desbloqeuada")
						door.isLocked = false;
						door.setTint("0xffffff");

					}
				
				});

			}else{
				//this.scene.envi_tollerror_01.play();
				this.scene.envi_tollerror_02.play();

				var valorCadaBarra = toll.tollCost / 5;

					//console.log("no tengo plata solo tengo " + currentMoney + "y eso cuesta " + toll.tollCost )
					var diffToll = toll.tollCost - currentMoney;
					this.scene.createTextBox(this.x-40,this.y-100, "still "+diffToll+" rings more to go");

				if(currentMoney<=valorCadaBarra){
					console.log("valor1");
					toll.isLevel1 = true;
					
		
				}else if(currentMoney<=valorCadaBarra*2){
					console.log("valor2");
					toll.isLevel2 = true;
					

				}else if(currentMoney<=valorCadaBarra*3){
					console.log("valor3");
					toll.isLevel3 = true;
					

				
				}else if(currentMoney>=valorCadaBarra*4){
					console.log("valor4");
					toll.isLevel4 = true;
					
			
				}
			

			
				
				

			}

		
			
		
		}
	}

	checkAnimStatus() {

		if(this.isLevel1){

			this.play("TollLevel1", true);
			console.log("is level 1")
			this.isLevel1 = false;
			this.scene.envi_sideswitch_tier01.play();
	
		}

		if(this.isLevel2){

			this.play("TollLevel2", true);
			console.log("is level 2")
			this.isLevel2 = false;
			this.scene.envi_sideswitch_tier02.play();
	
		}

		if(this.isLevel3){

			this.play("TollLevel3", true);
			console.log("is level 3")
			this.isLevel3 = false;
			this.scene.envi_sideswitch_tier03.play();

		}

		if(this.isLevel4){

			this.play("TollLevel4", true);
			console.log("is level 4")
			this.isLevel4 = false;
			this.scene.envi_sideswitch_tier04.play();


		}

		if(this.isLevel5){
			console.log("is level 5")
			this.play("TollLevel5", true);
			this.isLevel5=false;
		}




	}

	update(){

		this.checkAnimStatus();

			}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
