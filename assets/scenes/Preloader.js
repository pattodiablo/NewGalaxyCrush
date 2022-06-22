
// You can write more code here

/* START OF COMPILED CODE */

class Preloader extends Phaser.Scene {
	
	constructor() {
		super("Preloader");
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	editorPreload() {
		
		this.load.pack("asset-pack", "assets/asset-pack.json");
	}
	
	editorCreate() {
		
		// loading
	
		const loading = this.add.image(160, 240, "loading");

		
		this.loading = loading;
	}
	
	/** @type {Phaser.GameObjects.Image} */
	loading;
	loadingBG;
	/* START-USER-CODE */

	preload() {		

		this.editorCreate();

	


		this.loading.x=this.cameras.main.centerX;
		this.loading.y=this.cameras.main.centerY;


		this.load.on(Phaser.Loader.Events.PROGRESS, p => {

			this.loading.scaleX = p;
		});		

		this.editorPreload();
	}

	create() {

		this.scene.start("TitleScreen");		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
