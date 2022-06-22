
// You can write more code here

/* START OF COMPILED CODE */

class GotoLevelWall extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "gotoLevelWall", frame);
		
		this.tintFill = true;
		this.tintTopLeft = 16535632;
		this.tintTopRight = 16479605;
		this.tintBottomLeft = 10683396;
		this.tintBottomRight = 16257554;
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/** @type {string} */
	gotoLevelName = "Level0";
	/** @type {boolean} */
	showScore = true;
	
	/* START-USER-CODE */
	create(){

		this.initColliders();
		this.canGo = true;
		this.alpha=0;

	}

	initColliders(){
		

		this.scene.physics.add.overlap(this.scene.player, this, this.gotoLevel,false,this.scene.player);
		

	}


	gotoLevel(player,wall){

		if(wall.canGo){	
			player.body.enable = false;
			console.log("willGo " + wall.gotoLevelName)
			wall.scene.cameras.main.fadeOut(1000);

			wall.scene.cameras.main.once('camerafadeoutcomplete', function () {	

			wall.scene.scene.remove(wall.scene.keys);
			var sceneToGo = wall.scene.scene.get("InterludeMap");
			var coinsCollected = this.scene.coinsCollected;
			var totalCoinsinLevel = this.scene.coinsPositions.length;
			sceneToGo.setLevel(wall.gotoLevelName,1,1,coinsCollected,totalCoinsinLevel,wall.showScore); //nombre de la escena a cargar, casillero en el mapa para trasladarse y casillero donde debe partir
			sceneToGo.isMainScene = false;

			activeLeveles.forEach(level => {
				wall.scene.scene.remove(level)
			});
		
			activeLeveles=[];
			wall.scene.scene.start("InterludeMap");


			}, this);
			this.scene.game.sound.stopAll();

			this.scene.fxcontainer.forEach(fx => {
				fx.destroy();
			});

			this.scene.supajukebox.forEach(song => {
				song.destroy();
			});



			wall.canGo= false
		}

	
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
