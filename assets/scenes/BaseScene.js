
class BaseScene extends Phaser.Scene {
	
	constructor(key) {
		super(key);
		
	
	}


	create(){
		
	


	
	
		activeLeveles.push(this.scene.key);
		
	
	

		this.physics.world.TILE_BIAS = 40;
		this.game.sound.stopAll();
		this.wasMusicLaunched = false;

		this.isRestartingGame = false;
	

        this.editorCreate();
		this.initColliders();
		this.initCamera();


		
		
		//MUSIC
	
		//this.GGJ2022_ost03 = this.sound.add('GGJ2022_ost03');
						
		this.supajukebox = []; //agregar aqui las musics

		//this.GGJ2022_ost03.loop = true;
		
		//______________________________________________________________________________________________________________________________________________________________
		
		//FX
		this.fxcontainer=[];

		this.GGJ2022_destroy01 = this.sound.add('GGJ2022_destroy01');
		this.GGJ2022_destroy01.loop = false;
		this.fxcontainer.push(this.GGJ2022_destroy01);





		this.checkSoundStatus();
		this.initLevel();


	
	
	
	}



	initTutorials(){



	
	}
	
	checkSoundStatus(){

		if(this.game.playerData.isFxMuted){
	
			this.disableFx();
			this.menuPanel.fxBtn.setTint(0x6d6d6d);
		}else{
			this.enableFxOnLoad();	
		}

		//console.log("is music muted " + this.game.playerData.isMusicMuted);
		if(this.game.playerData.isMusicMuted){
	
			this.disableMusic();
			this.menuPanel.musicBtn.setTint(0x6d6d6d);
		}else{
			
			this.enableMusicOnLoad();	
		}

	}

	disableFx(){
		//console.log("disabling fx");
		this.game.playerData.isFxMuted = true;
		this.fxcontainer.forEach(fx => {
			
				fx.setVolume(0);
				fx.setMute(true);

			
		});
	}

	enableFx(){

		this.game.playerData.isFxMuted = false;
		this.fxcontainer.forEach(fx => {

				fx.setVolume(1);
				fx.setMute(false);
		});
	}


	disableMusic(){
		///console.log("disabling music");
		this.game.playerData.isMusicMuted = true;
		
		this.supajukebox.forEach(song => {
			
			
			song.setVolume(0);
			song.setMute(true);
		
		});

	}

	enableMusic(){
		//console.log("enabling music");
		this.game.playerData.isMusicMuted = false;

		if(this.wasMusicLaunched){
		
			this.supajukebox.forEach(song => {
				song.setVolume(1);
				song.setMute(false);
			});
			
		}else{
			this.enableMusicOnLoad();
			
		}
		

	}

	enableMusicOnLoad(){
		console.log("estoy entrando a music on load");
	
		const randomFx = Math.abs(Math.round(Math.random()*this.supajukebox.length-1));
			
		
		if(this.scene.key=="NewLevel0") {
			this.randomFx = Math.round((Math.random()*(1-0)+0));
		};

					
		
	console.log("random fx " + this.randomFx);
		if(this.supajukebox.length>0){

		
			this.supajukebox[this.randomFx].play();
			
		
			this.wasMusicLaunched = true;

			this.supajukebox.forEach(song => {
				song.setVolume(1);
				song.setMute(false);
			});
		}
	}

	enableFxOnLoad(){
		this.fxcontainer.forEach(fx => {

			fx.setVolume(1);
			fx.setMute(false);
		});
	}


	setSceneType(isMain){ //permite definir el tipo de escena que es si es mainScene o no para entrar con animacion de texto o no
		//console.log("definign main scene")
		this.isMainScene=isMain;
	}

	initLevel(){

	

	}


	iniciarMusica(){
		songLoader.start()

	}



    initCamera() {

	
		
	}



	initColliders() {

	
	}

	hitEnemy(bullet,enemy){
	
	}


	layerCollidingCallback(player, tile){
	
		if(tile.properties.name == "speed"){
			player.wallCollision();
		}
	}



	fadeInAndCheck(){


		
		this.cameras.main.fadeIn(2000);
		this.cameras.main.once('camerafadeincomplete', function () {	

		this.game.playerData.level = this.scene.key;

		updatear(this.game.playerData); //updatea db
		
			}, this);

		
	}




	restartGame() {

		if(!this.isRestartingGame){
			this.gotoLevel = this.scene.key;
			this.isRestartingGame=true;
			this.cameras.main.fadeOut(1000);


				
		
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {	
			
				
					this.scene.remove(this.scene.keys);
					var sceneToGo = this.scene.get("gameOverScene");
				
					sceneToGo.setLevel(this.gotoLevel ,1,1,0,0,false); //nombre de la escena a cargar, casillero en el mapa para trasladarse y casillero donde debe partir
					sceneToGo.isMainScene = false;

					
			

					activeLeveles.forEach(level => {
						this.scene.remove(level)
					});

					activeLeveles=[];
					this.scene.start("gameOverScene");


			},this);

		}
		
		
	}


	update(){

		
	}
}
