
// You can write more code here

/* START OF COMPILED CODE */

class Traverso extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "traversoAnimations", frame ?? "idle0000");

		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "idleTraverso";
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

		create(){

			console.log("y position " + this.y);

			this.OriginalX = this.x;
			this.OriginalY = this.y;
			this.turnoSecuencia=0;
			this.etapa=0;
			this.entryAnimation();
			this.initColliders();
		}


	initColliders(){

		this.scene.physics.add.collider(this.scene.player, this, this.killPlayer,null,this);	


	}


	killPlayer(){

		if(!this.body.touching.up){
			this.scene.player.playerhurt();

		}
	

		

	}


		entryAnimation(){

				var entrandoTimeline = this.scene.tweens.createTimeline();

				entrandoTimeline.add({

					targets: this,
					y: 120,
					duration: 1500,
					ease: 'Linear',
					repeat: 0,
					callbackScope: this,
					onComplete: function () {

						this.decideMovement();

					}

				});

				entrandoTimeline.play();

		}

		decideMovement(){

				this.secuenciadeEventos = ['hover','leaveScreen','picadaSalvaje','picadaSalvaje','picadaSalvaje','appearAgain','hover','leaveScreen','lateralPunch',];
				this.cualAccion = this.secuenciadeEventos[this.turnoSecuencia];
			console.log("cual accion " + this.cualAccion);

			switch (this.cualAccion) {
				case 'hover':
					this.hover();
					break;

					case 'leaveScreen':
					this.leaveScreen();
					break;

					case 'appearAgain':
					this.appearAgain();
					break;

					case 'picadaSalvaje':
					this.picadaSalvaje();
					break;

					case 'lateralPunch':
					this.lateralPunch();
					break;



					default:
					this.hover();
					break;
			}
			this.turnoSecuencia++;
			if(this.turnoSecuencia>this.secuenciadeEventos.length-1){
				this.turnoSecuencia=0;
			}


		}


		hover(){
			this.hovering = this.scene.tweens.createTimeline();

			this.hovering.add({

				targets: this,
				y: this.y-20,
				duration: 500,
				ease: 'Linear',
				repeat: 3,
				yoyo: true,
				callbackScope: this,
					onComplete: function () {
						console.log("hovering complete");
					
						this.decideMovement();

					}

			});

			this.hovering.play();
		}

		lateralPunch(){
			this.play('idleTraverso');
			this.y = this.scene.player.y;

			

			this.randomDirection = Math.random()<0.5;
			if(this.randomDirection){
				this.x = 560;

				const alerta = new AlertSign(this.scene, 300, this.scene.player.y );
				alerta.normalAlert();
				this.scene.add.existing(alerta);

				
			}else{

				this.x = -100

				const alerta = new AlertSign(this.scene, 30, this.scene.player.y );
				alerta.normalAlert();
				this.scene.add.existing(alerta);

			}

			var picadaTimer = this.scene.time.addEvent({
				delay: 800,                // ms
				callback: function(){
	
					this.laterlaAttack = this.scene.tweens.createTimeline();

					this.laterlaAttack.add({
		
						targets: this,
						x: this.scene.player.x,
						duration: 800,
						ease: 'Linear',
						yoyo:true,
						callbackScope: this,
						onComplete: function () {
							this.y = this.y-100;
		
						}
		
					});
		
					this.laterlaAttack.add({
		
						targets: this,
						x: this.scene.player.x,
						duration: 500,
						ease: 'Linear',
						yoyo:true,
						callbackScope: this,
						onComplete: function () {
							this.y = this.y-100;
		
						}
		
					});
		
					this.laterlaAttack.add({
		
						targets: this,
						x: this.scene.player.x,
						duration: 500,
						ease: 'Linear',
						yoyo:true,
						callbackScope: this,
						onComplete: function () {
							
								console.log("leaving screen complete");
						
								this.decideMovement();
		
						}
		
					});
		
		
					this.laterlaAttack.play();
	
	
				},
				//args: [],
				callbackScope: this,
				loop: false
			});
	

		


		}

		leaveScreen(){
			this.play('idleTraverso');
			this.leaveScreenMove = this.scene.tweens.createTimeline();

			this.leaveScreenMove.add({

				targets: this,
				y: this.y+10,
				duration: 200,
				ease: 'Linear',

			});


			this.leaveScreenMove.add({

				targets: this,
				y: -200,
				duration: 500,
				ease: 'Linear',
				callbackScope: this,
					onComplete: function () {
						this.x=this.OriginalX;
						console.log("leaving screen complete");
				
						this.decideMovement();

					}

			});

			this.leaveScreenMove.play();

		}



		appearAgain(){

			this.play('idleTraverso');
			var entrandoTimeline = this.scene.tweens.createTimeline();

			entrandoTimeline.add({

				targets: this,
				y: 120,
				duration: 1500,
				ease: 'Linear',
				repeat: 0,
				callbackScope: this,
				onComplete: function () {

				
					this.decideMovement();

				}

			});

			entrandoTimeline.play();

	}

	picadaSalvaje(){

		this.play('traversoFly');
		this.x=this.scene.player.x;

		const alerta = new AlertSign(this.scene, this.scene.player.x, 20 );
		alerta.normalAlert();
		this.scene.add.existing(alerta);

		var picadaTimer = this.scene.time.addEvent({
			delay: 800,                // ms
			callback: function(){


				var picadaSalvaje = this.scene.tweens.createTimeline();

				picadaSalvaje.add({

					targets: this,
					y: 900,
					duration: 800,
					ease: 'Linear',
					repeat: 0,
					callbackScope: this,
					onComplete: function () {
						this.y=-200;
						this.x=this.OriginalX;
				
						this.decideMovement();

					}

				});

				picadaSalvaje.play();


			},
			//args: [],
			callbackScope: this,
			loop: false
		});




	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
