
// You can write more code here

/* START OF COMPILED CODE */

class MainEntrance extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// supaEntrance
		const supaEntrance = scene.add.sprite(32, 0, "supaEntrance");
		this.add(supaEntrance);
		
		// pointerDownBtn
		const pointerDownBtn = new PointerDownBtn(scene, 32, 0);
		this.add(pointerDownBtn);
		
		// supaEntrance (components)
		new Physics(supaEntrance);
		new PhysicsBody(supaEntrance);
		supaEntrance.emit("components-awake");
		
		// pointerDownBtn (prefab fields)
		pointerDownBtn.emit("prefab-awake");
		
		this.supaEntrance = supaEntrance;
		this.pointerDownBtn = pointerDownBtn;
		
		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.on("update", () => this.update());
		this.scene.events.on("create", () => this.create());
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	supaEntrance;
	/** @type {PointerDownBtn} */
	pointerDownBtn;
	
	/* START-USER-CODE */

	create(){

		this.initColliders();
		this.isActive = true;

		this.pointerDownBtn.setInteractive().once('pointerdown', function(pointer, localX, localY, event){
		
			this.scene.cameras.main.fadeOut(1000);
			this.scene.cameras.main.once('camerafadeoutcomplete', function (camera) {
				
				var sceneToGo = this.scene.scene.get("LevelMap");
				sceneToGo.setLevel("NewLevel1A",1,0); //nombre de la escena a cargar, casillero en el mapa para trasladarse y casillero donde debe partir
				sceneToGo.isMainScene = true;
				this.scene.scene.remove(this.scene.keys);
				this.scene.scene.start("LevelMap");
				
				
				this.destroy();
			},this);

		});

		this.pointerDownBtn.visible = false;
		
		
	}
	initColliders(){
		this.scene.physics.add.overlap(this.scene.player, this.supaEntrance, this.prepareToEnter,false,this);
	}

	prepareToEnter(){
	
		this.pointerDownBtn.visible = true;
		this.scene.player.canEnterMainEntrance = true;
	}

	update(){


		if (this.supaEntrance.body.touching.none) {

			this.pointerDownBtn.visible = false;
			
		}
	
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
