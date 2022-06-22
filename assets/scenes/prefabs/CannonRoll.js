
// You can write more code here

/* START OF COMPILED CODE */

class CannonRoll extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "newSupaAnimations", frame !== undefined && frame !== null ? frame : "rueda_animation instance 10000");
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){

		this.isBeingfired = false;
		this.body.setCircle(13,7,5);
		console.log("cannon roll created")
	
		this.initColliders();

		this.particles = this.scene.add.particles('flares');
		var tree = new Phaser.Geom.Triangle.BuildEquilateral(0, -10, 40);
		this.particles.createEmitter({
			frame: "flare30000",
			scale: { start: 0.4, end: 0.1 },
			blendMode: 'ADD',
			lifespan: 700,
			//	emitZone: { type: 'edge', source: rose, quantity: 360 },
			follow: this
		});
		
	}

	initColliders(){

		this.scene.physics.add.collider(this, this.scene.layer, this.translatePlayer,false,this);
		this.scene.physics.add.collider(this, this.scene.emptyWallsRack, this.translatePlayer,false,this);
		this.scene.physics.add.overlap(this, this.scene.portalCannons, this.catapultePlayer,false,this);
		this.scene.physics.add.overlap(this, this.scene.coins, this.getCoin,false,this);	
	}

	getCoin(cannonRoll,coin){
		coin.getCoin(cannonRoll,coin);
	}

	catapultePlayer(rolledPlayer, cannon){
	if(this.scene.player.isFiredfromCannon){
		if(this.Killtimer !==null){
			this.Killtimer.destroy();
	}

	if(this.isBeingfired){
	
		this.body.enable=true;
	}else{

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.visible=true;
		this.x=cannon.x;
		this.y=cannon.y;
		this.body.enable=false;
	
	var catapulttime = this.scene.time.addEvent({
		delay: 400,                // ms
		callback: function(){
			rolledPlayer.isBeingfired=true;
			rolledPlayer.body.enable=true;
			rolledPlayer.scene.physics.velocityFromAngle(cannon.angle-90,600, rolledPlayer.body.velocity);//chequear
			var coolDownTimer = this.scene.time.addEvent({
				delay: 200,                // ms
				callback: function(){
					this.isBeingfired=false;
				
				},
				//args: [],
				callbackScope: this,
				loop: false
			});
		},
		//args: [],
		callbackScope: this,
		loop: false
	});

	this.timeToStopFlying();

}
	}
	

	}

	timeToStopFlying(){
		console.log(this)
		this.timertoKill = this.scene.time.addEvent({
			delay: 1000,                // ms
			callback: function(){
				console.log("trying to translate");
				if(this.isActive){
					this.translatePlayer();
				}
			
			},
			//args: [],
			callbackScope: this,
			loop: false
		}, this);
	}

	killFirstRollcanon(scenario){
		this.visible=false;
		this.Killtimer = this.scene.time.addEvent({
			delay: 250,                // ms
			callback: function(){
				console.log(" a ver")
		
				scenario.player.visible = true;
				scenario.player.body.enable = true;
				scenario.player.x = this.x;
				scenario.player.y = this.y;
				scenario.cameras.main.startFollow(scenario.player);
				scenario.cannonRollPack = [];
				this.particles.destroy();
				this.destroy();
		
		
				
			},
			//args: [],
			callbackScope: this,
			loop: false
		});

	}

	translatePlayer(cannonRoll,wall){
	console.log("topandoo")
	console.log(this.isBeingfired)
		if(	this.scene.player.isFiredfromCannon){
			this.scene.player.visible = true;
			this.scene.player.isFiredfromCannon=false;
				this.scene.player.body.enable = true;
				this.scene.player.x = this.x;
				this.scene.player.y = this.y;
				this.scene.cameras.main.startFollow(this.scene.player);
				this.scene.cannonRollPack = [];
				this.particles.destroy();
				console.log("need to translate");

				this.destroy();
		}
				
		
				

		}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
