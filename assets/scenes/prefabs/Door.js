
// You can write more code here

/* START OF COMPILED CODE */

class Door extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// mainDoor
		const mainDoor = scene.add.sprite(16, 137, "propsNew", "mainDoor0000");
		this.add(mainDoor);
		
		// pointerDown
		const pointerDown = new PointerDownBtn(scene, 16, 143);
		this.add(pointerDown);
		
		// mainDoor (components)
		new Physics(mainDoor);
		const mainDoorPhysicsBody = new PhysicsBody(mainDoor);
		mainDoorPhysicsBody.bodyWidth = 130;
		mainDoor.emit("components-awake");
		
		// pointerDown (prefab fields)
		pointerDown.emit("prefab-awake");
		
		this.mainDoor = mainDoor;
		this.pointerDown = pointerDown;
		
		/* START-USER-CTR-CODE */
		this.frameName = 'door0001';
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	mainDoor;
	/** @type {PointerDownBtn} */
	pointerDown;
	/** @type {string} */
	goToLevel = "Level1";
	/** @type {number} */
	desde = 0;
	/** @type {number} */
	hasta = 0;
	/** @type {boolean} */
	isLocked = true;
	
	/* START-USER-CODE */
		start(){
			this.scene.events.on("update", () => this.update());
			this.scene.physics.add.overlap(this.scene.player, this.mainDoor, this.collidingDoor,false,this);	
			this.isEnabled = true;
			this.pointerDown.visible = false;

			this.pointerDown.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
		
				this.scene.player.entrandoMainDoor();
			});

		}



		collidingDoor(player, door){

			player.isCollidingMainDoor =  true;
			if(this.isLocked){
					if(this.scene.game.playerData.gotCard && this.isEnabled){
					
						
							this.transitionDoor();
							
							}
			}else{
				if( this.isEnabled){
				
					this.transitionDoor();
				}

			}
		
		
		}

		transitionDoor(){
			this.pointerDown.visible = true;
			if(this.scene.player.wannaEnterMainDoor){
					var count = 0;
					this.scene.game.playerData.levelsPassed.forEach(level => {
						if(level==this.scene.scene.key){
							var count = count + 1;
						}
					});
					if(count = 0){
						this.scene.game.playerData.levelsPassed.push(this.scene.scene.key);
					}
					
				this.scene.cameras.main.fadeOut(1000);
				this.scene.player.body.enable = false;

				this.scene.game.sound.stopAll();
				this.scene.fxcontainer.forEach(fx => {
					fx.destroy();
				});

				this.scene.supajukebox.forEach(song => {
					song.destroy();
				});


				
				this.scene.cameras.main.once('camerafadeoutcomplete', function (camera) {
					this.scene.game.playerData.gotCard = false;
				
					this.scene.scene.remove(this.scene.keys);
					var sceneToGo = this.scene.scene.get("LevelMap");
					sceneToGo.setLevel(this.goToLevel,this.hasta,this.desde); //nombre de la escena a cargar, casillero en el mapa para trasladarse y casillero donde debe partir
					sceneToGo.isMainScene = true;
					
					activeLeveles.forEach(level => {
						this.scene.scene.remove(level)
					});
				
					activeLeveles=[];
					this.scene.scene.start("LevelMap");
			
				},this);
				this.isEnabled=false;
				
			}

		}
		update(){
			if (this.mainDoor.body.touching.none) {
				this.pointerDown.visible = false;
				this.scene.player.isCollidingMainDoor = false;
				this.scene.player.wannaEnterMainDoor  =false;
			}
		}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
