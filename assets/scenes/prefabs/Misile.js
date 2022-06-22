
// You can write more code here

/* START OF COMPILED CODE */

class Misile extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "misile", frame !== undefined && frame !== null ? frame : "misileOff instance 20000");
		
		this.setOrigin(1, 0.5);
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){

		
		this.velocityX = 3;
		this.origin_misileX = this.x;
		//this.originY = this.y;
		this.angle=-10;
		this.initAnimation();
		this.isAlerting = false;
		this.canlaunch = false;
		
		
		this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto


		
		if(this.scaleX < 0){
			this.body.setOffset(this.width,0);
		}
		

		this.particles = this.scene.add.particles('flares');
	
		this.particles.createEmitter({
			frame:"flare10000",
			scale: { start: 0.4, end: 0.1 },
			blendMode: 'ADD',
			lifespan:300,
			
			follow: this
		});

		this.scene.createMisileAlert(this.y,this);
		this.initColliders();

	
		
	}

	initColliders(){

		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt,false,this.scene.player);
	}



	initAnimation(){

		var floating = this.scene.tweens.createTimeline();
		floating.add({
		targets: this,
		y: this.y+5,
		angle:10,
		duration: 500,
		ease: 'Phaser.Easing.Bounce.Out',
		loop: true,
		repeat: -1,
		yoyo: true,

		});

	

		floating.play();
	}

	
	update(){

		//lansamiento horizontal
		//if(this.angle = 0){

			if(this.scene.player.y>=this.y-30 && this.scene.player.y<=this.y+30 && !this.canlaunch){
				this.canlaunch = true;
				//console.log("can launch");
			}
	
		
			if(this.canlaunch){
			
				if(this.scaleX>0){
					this.body.velocity.x = -130;
				}else{
					this.body.velocity.x = 130;
				}
			
				this.canlaunch=false;
			}
	
			if(this.scaleX>0){
				if(this.x<=-100){
					this.x = this.origin_misileX;
					this.body.velocity.x = 0;
					if(!this.isAlerting){
						this.scene.createMisileAlert(this.y,this);
						this.isAlerting=true;

						this.envi_missile_warning_01Available = this.scene.sound.get("envi_missile_warning_01"); 
						if(this.envi_missile_warning_01Available){
							this.scene.envi_missile_warning_01.play();
						}
					
						this.canlaunch = true;
					}
				}
	
			}else{
				if(this.x>=this.scene.layer.width+100){
					this.x = this.origin_misileX;
					this.body.velocity.x = 0;
					if(!this.isAlerting){
						this.scene.createMisileAlert(this.y,this);
						this.isAlerting=true;
						
						this.envi_missile_warning_01Available = this.scene.sound.get("envi_missile_warning_01"); 
						if(this.envi_missile_warning_01Available){
							this.scene.envi_missile_warning_01.play();
						}
					

						this.canlaunch = true;
					}
				}
	
			}
			

		//}
		
		//lanzamiento vertical
		// if(this.angle = 90){
		// 	if(this.scene.player.x>=this.x-30 && this.scene.player.x<=this.x+30 && !this.canlaunch){
		// 		this.canlaunch = true;
		// 		console.log("can launch");
		// 	}
	
		
		// 	if(this.canlaunch){
			
		// 		if(this.scaleX>0){
		// 			this.body.velocity.y = -130;
		// 		}else{
		// 			this.body.velocity.y = 130;
		// 		}
			
		// 		this.canlaunch=false;
		// 	}
	
		// 	if(this.scaleX>0){
		// 		if(this.y<=-100){
		// 			this.y = this.originY;
		// 			this.body.velocity.y = 0;
		// 			if(!this.isAlerting){
		// 				this.scene.createMisileAlert(this.x,this);
		// 				this.isAlerting=true;
		// 				this.canlaunch = true;
		// 			}
		// 		}
	
		// 	}else{
		// 		if(this.y>=this.scene.layer.width+100){
		// 			this.y = this.originY;
		// 			this.body.velocity.y = 0;
		// 			if(!this.isAlerting){
		// 				this.scene.createMisileAlert(this.x,this);
		// 				this.isAlerting=true;
		// 				this.canlaunch = true;
		// 			}
		// 		}
	
		// 	}
		//}
		
	
	
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
