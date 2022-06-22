
// You can write more code here

/* START OF COMPILED CODE */

class SmallDoor extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// smallDoor
		const smallDoor = scene.add.sprite(0, 126, "propsNew", "puerta pequeña version 03.ai instance 10000");
		this.add(smallDoor);
		
		// pointerDown
		const pointerDown = new PointerDownBtn(scene, 2, 139);
		this.add(pointerDown);
		
		// smallDoor (components)
		new Physics(smallDoor);
		smallDoor.emit("components-awake");
		
		// pointerDown (prefab fields)
		pointerDown.emit("prefab-awake");
		
		this.smallDoor = smallDoor;
		this.pointerDown = pointerDown;
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		this.emit("prefab-awake");
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	smallDoor;
	/** @type {PointerDownBtn} */
	pointerDown;
	/** @type {string} */
	goToLevel = "Level1";
	/** @type {string} */
	doorID = "1";
	/** @type {boolean} */
	isLocked = true;
	/** @type {boolean} */
	showScore = true;
	
	/* START-USER-CODE */
	create() {
		
		this.canGo = true;
		if(this.isLocked){
			this.isEnabled = false;	
		}else{
			this.isEnabled = true;	
		}
		
		this.IsOverlapingPlayer = false;
		this.scene.physics.add.overlap(this.scene.player, this.smallDoor, this.entrarEnPuerta, false, this);
		this.pointerDown.visible = false;

		this.pointerDown.setInteractive().on('pointerdown', function(pointer, localX, localY, event){

			this.scene.player.entrandoSmallDoor();
		});

	}

	entrarEnPuerta() {
		//empieza codigo para entrar en puerta


		if(this.isEnabled){
			this.pointerDown.visible = true;
		}

		this.IsOverlapingPlayer = true;

		if (this.canGo) {

			this.scene.doorsEnabled.forEach(function (aDoorID) { //por cada puerta activada

				if (aDoorID == this.doorID) { //si es que el ID de esta puerta esta en lista entonces le activa
					this.isEnabled = true;					
				}

			}, this);

			//condiciones para ingresar a la puerta, el segundo arguento depende de si el jugador hace swipe en Y
			if (this.isEnabled && this.scene.player.enteringDoor) {
			//	this.scene.player.body.enable = false;
				this.scene.cameras.main.fadeOut(500);
				this.scene.player.body.enable = false;

				this.scene.game.sound.stopAll();

				this.scene.fxcontainer.forEach(fx => {
					fx.destroy();
				});

				this.scene.supajukebox.forEach(song => {
					song.destroy();
				});

				//this.enteringDoor = false;
				this.scene.cameras.main.once('camerafadeoutcomplete', function () {	


					this.scene.scene.remove(this.scene.keys);
					var sceneToGo = this.scene.scene.get("InterludeMap");
					var coinsCollected = this.scene.coinsCollected;
					var totalCoinsinLevel = this.scene.coinsPositions.length;
					sceneToGo.setLevel(this.goToLevel,1,1,coinsCollected,totalCoinsinLevel,this.showScore); //nombre de la escena a cargar, casillero en el mapa para trasladarse y casillero donde debe partir
					sceneToGo.isMainScene = false;

					
			

					activeLeveles.forEach(level => {
						this.scene.scene.remove(level)
					});

					activeLeveles=[];
					this.scene.scene.start("InterludeMap");






				}, this);

				this.canGo = false;
			}

		}

		//final codigo entrar en puerta
	}

	update() {

		if (this.isEnabled && this.IsOverlapingPlayer) {
			this.smallDoor.play("newSmallDoorOpened", true);

			this.scene.player.canEnterDoor = true;
		} else if (this.isEnabled) {

			this.smallDoor.play("newSmallDoorOpened", true);

		}

		if (this.smallDoor.body.touching.none) {

			this.canGo = true;
			this.IsOverlapingPlayer = false;
			this.scene.player.canEnterDoor = false;
			this.scene.player.enteringDoor = false;
			this.pointerDown.visible = false;
		}

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
