
class BaseScene extends Phaser.Scene {
	
	constructor(key) {
		super(key);
		
		this.doorsEnabled = [];
		this.coinsPositions = [];
		this.emptyWalls = [];
		this.acidTiles = [];
		this.sideDoors = [];
		this.tolls = [];
		this.finalBossActiveParts = [];
		
	
	}

	

	onBlur(){
	
		this.scene.pause(); //pausa el juego
	}

	onFocus(){

		this.scene.resume(); //resume el juego
	}

	onResume(){
		//console.log("resuming");
	}

	create(){
		
	


	
		//console.log("level key " + this.scene.key);
		activeLeveles.push(this.scene.key);
		//console.log("active leveles " + activeLeveles);
		// this.game.events.addListener(Phaser.Core.Events.FOCUS, this.onFocus, this);
		// this.game.events.addListener(Phaser.Core.Events.BLUR, this.onBlur, this);
		this.game.events.addListener(Phaser.Core.Events.RESUME, this.onResume, this);
	

		this.physics.world.TILE_BIAS = 40;
		this.game.sound.stopAll();
		this.playerBullets = [];
		this.cannonRollPack = [];
		this.portalCannons = [];
		this.emptyWallsRack = [];
		this.acidWallsRack = [];
		this.wasMusicLaunched = false;
	
		this.wallsID = 49; //si en el mapa dice 21 entonces aca es 22
		this.coinsID = 93; //si en el mapa dice 21 entonces aca es 22
		this.emptyWallsId = 47 

		this.coinsCollected = 0;

		this.isRestartingGame = false;
	

        this.editorCreate();
		this.initColliders();
		this.initCamera();
		this.replaceTilesWithCoins();
		this.createCoins();
		this.createEmptyWalls();
		this.createAcidWalls();
	
		this.initTutorials();

		this.mainDoorActive = true;
		this.isfirstMainScene = true;

		//CREAR ENEMYS
		var timer = this.time.addEvent({
			delay: 1500,                // ms
			callback: function(){
				var conseguirRandomStar=Math.random();
				var conseguirRandomLeffRight=Math.random();
		
				var xEnemy=0;
				var yEnemy=0;
				
				const enemyStar = new EnemyStar(this, xEnemy, yEnemy);
					this.maxY = this.cameras.main.scrollY+this.cameras.main.height-300;
					this.minY = this.cameras.main.scrollY+100;
					this.Yrandom = Math.floor(Math.random() * (this.maxY  - this.minY)) + this.minY;
					enemyStar.y=this.Yrandom;
				if(conseguirRandomStar<0.5){
				
					enemyStar.isType1=true;
					
					if(conseguirRandomLeffRight<0.5){
						enemyStar.x=this.cameras.main.scrollX + this.cameras.main.width+100;
					}else{
						enemyStar.x=(this.cameras.main.scrollX +100)*-1;
					}
					
				}else{
					enemyStar.isType2=true;

					if(conseguirRandomLeffRight<0.5){
						enemyStar.x=this.cameras.main.scrollX + this.cameras.main.width+100;
					}else{
						enemyStar.x=(this.cameras.main.scrollX +100)*-1;
					}
				}
				this.add.existing(enemyStar);
				
				//hacer calculo randomico mathrandom >0.5
				//if true type1 else type0 
				//tambien hacer raandom yu 

				

			},
			//args: [],
			callbackScope: this,
			loop: true
		});
	
		//CREAR ENEMYS

		if(this.bgLevel1 !== undefined){
			console.log(this.bgLevel1);
			this.bgratio=this.cameras.main.width/this.bgLevel1.width
			this.bgLevel1.setScale(this.bgratio);
		}


		if(this.tilespriteBG !== undefined){
		
			this.tilespriteBG.width= this.layer.width;
			this.tilespriteBG.height=471;

			if(this.scene.key=="NewLevel0"){
		
				this.tilespriteBG.x=0;
				this.tilespriteBG.y=this.layer.height-743;
			}else{
				this.tilespriteBG.y=this.player.y+100;
			}
		
			
		}
		
		
		//MUSIC
		this.GGJ2022_gameover01 = this.sound.add('GGJ2022_gameover01');
		this.GGJ2022_ost01 = this.sound.add('GGJ2022_ost01');
		this.GGJ2022_ost02 = this.sound.add('GGJ2022_ost02');
		//this.GGJ2022_ost03 = this.sound.add('GGJ2022_ost03');
						
		this.supajukebox = [this.GGJ2022_ost01,this.GGJ2022_ost02,this.GGJ2022_gameover01];


		this.GGJ2022_gameover01.loop = false;
		this.GGJ2022_ost01.loop = true;
		this.GGJ2022_ost02.loop = true;
		//this.GGJ2022_ost03.loop = true;
		
		//______________________________________________________________________________________________________________________________________________________________
		
		//FX
		this.fxcontainer=[];

		this.GGJ2022_destroy01 = this.sound.add('GGJ2022_destroy01');
		this.GGJ2022_destroy01.loop = false;
		this.fxcontainer.push(this.GGJ2022_destroy01);

		this.GGJ2022_hurt01 = this.sound.add('GGJ2022_hurt01');
		this.GGJ2022_hurt01.loop = false;
		this.fxcontainer.push(this.GGJ2022_hurt01);

		this.GGJ2022_jump01 = this.sound.add('GGJ2022_jump01');
		this.GGJ2022_jump01.loop = false;
		this.fxcontainer.push(this.GGJ2022_jump01);

		this.GGJ2022_jump01 = this.sound.add('GGJ2022_jump01');
		this.GGJ2022_jump01.loop = false;
		this.fxcontainer.push(this.GGJ2022_jump01);

		this.GGJ2022_jump02 = this.sound.add('GGJ2022_jump02');
		this.GGJ2022_jump02.loop = false;
		this.fxcontainer.push(this.GGJ2022_jump02);

		this.GGJ2022_jump03 = this.sound.add('GGJ2022_jump03');
		this.GGJ2022_jump03.loop = false;
		this.fxcontainer.push(this.GGJ2022_jump03);

		this.GGJ2022_laser01 = this.sound.add('GGJ2022_laser01');
		this.GGJ2022_laser01.loop = false;
		this.fxcontainer.push(this.GGJ2022_laser01);

		this.GGJ2022_laser02 = this.sound.add('GGJ2022_laser02');
		this.GGJ2022_laser02.loop = false;
		this.fxcontainer.push(this.GGJ2022_laser02);

		this.GGJ2022_monsterhurt01 = this.sound.add('GGJ2022_monsterhurt01');
		this.GGJ2022_monsterhurt01.loop = false;
		this.fxcontainer.push(this.GGJ2022_monsterhurt01);

		this.GGJ2022_switchweapon01 = this.sound.add('GGJ2022_switchweapon01');
		this.GGJ2022_switchweapon01.loop = false;
		this.fxcontainer.push(this.GGJ2022_switchweapon01);

		this.GGJ2022_switchweapon02 = this.sound.add('GGJ2022_switchweapon02');
		this.GGJ2022_switchweapon02.loop = false;
		this.fxcontainer.push(this.GGJ2022_switchweapon02);

		this.GGJ2022_walk01 = this.sound.add('GGJ2022_walk01');
		this.GGJ2022_walk01.loop = false;
		this.fxcontainer.push(this.GGJ2022_walk01);

		this.GGJ2022_walk02 = this.sound.add('GGJ2022_walk02');
		this.GGJ2022_walk02.loop = false;
		this.fxcontainer.push(this.GGJ2022_walk02);
		

		//check for key
		this.game.playerData.levelsPassed.forEach(level => {
			if(level==this.scene.key){
				console.log("coincidencia")
				this.game.playerData.gotCard = true;
			}
		});


		//const shootBtn = new SupaShotBtn(this, 30, 430);
		const shootBtn = new SupaShotBtn(this, 30, this.layer.height);
		this.add.existing(shootBtn);
		this.shootBtn = shootBtn;

		//const biteBtn = new SupaBiteBtn(this, 50, 430); //es el icono del canon
		const biteBtn = new SupaBiteBtn(this, 50, this.layer.height);
		this.add.existing(biteBtn);
		this.biteBtn = biteBtn;
		this.biteBtn.depth = 11;

		const menuPanel = new MenuPanel(this, this.cameras.main.centerX, -170);
		this.add.existing(menuPanel);
			// menuPanel (prefab fields)
			menuPanel.emit("prefab-awake");
			this.menuPanel = menuPanel;

		const warning = new Warning(this, this.cameras.main.centerX, -170);
		this.add.existing(warning);
		// menuPanel (prefab fields)
		warning.emit("prefab-awake");
		this.Warning = warning;

	





	

		// readyText (components)
		const readyText = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "readyText");
		new FixedToCamera(readyText);
		readyText.emit("components-awake");
		this.readyText = readyText;

			// menuBtn
			const menuBtn = new MenuBtn(this, this.cameras.main.width-30, 37);
			this.add.existing(menuBtn);
			// menuBtn (prefab fields)
		menuBtn.emit("prefab-awake");
		// menuBtn (components)
		menuBtn.emit("components-awake");
		this.menuBtn = menuBtn;

				// menuPanel

		this.howToPlay.x=260;

		this.howToPlay.y=this.cameras.main.scrollY+this.cameras.main.height-100;

		this.gameOver.visible = false;

		this.gameOver.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

			location.reload();

		});
	

		this.checkSoundStatus();
		this.initLevel();


	
	
	
	}

	createTextBox(x,y,textToDisplay){

		this.textBox=createTextBox(this, x , y, {
			wrapWidth: 180,
			background:true
		})
		.start(textToDisplay, 50);


	}

	initTutorials(){

			if(this.tutorials!==undefined){

						this.tutorials.forEach(tutorial => {
							var blink = this.tweens.createTimeline();
							blink.add({
								targets: tutorial,
								y: tutorial.y+10,
								duration: 2000,
								ease: 'Linear',
								
								yoyo:true,
								
								repeat: -1

							});

							blink.play();
						});
			}


	
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
		this.supajukebox[this.randomFx].play();
		
	
		this.wasMusicLaunched = true;

		this.supajukebox.forEach(song => {
			song.setVolume(1);
			song.setMute(false);
		});
		
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

		this.player.visible=false;
	
	//	this.player.PhysicsBody.enable=false;

		//console.log("is main scene " + this.isMainScene)

	if(typeof this.isMainScene == "undefined"){
			this.isMainScene = true;
	}
	if(this.isMainScene){
		this.readyText.visible=true;
		var showReadyText = this.tweens.createTimeline();
		showReadyText.add({
			targets: this.readyText,
			y: this.cameras.main.centerY-100,
			alpha:0,
			duration: 400,
			delay: 500,
			ease: 'Bounce.easeIn',
			repeat: 0,
			callbackScope: this,
			onComplete: function () {
				
				
			}

		});

		showReadyText.add({
			targets: this.readyText,
			alpha: 0,
			duration: 200,
			repeat: 1,
			loop: true,
			yoyo:true,
			callbackScope: this,
			onComplete: function () {
			//	this.player.body.enable=false;
			}
		});

		showReadyText.add({
			targets: this.readyText,
			alpha: 0,
			delay:500,
			duration: 400,
			repeat: 0,
			callbackScope: this,
			onComplete: function () {

			
	

				
				}

		});
		
		showReadyText.play();
	}else{
		this.readyText.visible=false;
		var timer = this.time.addEvent({
			delay: 1500,                // ms
			callback: function(){

		
				this.player.entryAnimation();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});

			
		

	}
	

	}


	iniciarMusica(){
		songLoader.start()

	}
	createCoins(){
	
		

		this.coinsPositions.forEach(function(coinPosition) {
		
			
			const coin = new Coin(this, coinPosition[0], coinPosition[1]);
			this.coins.push(coin);
			//coin.setDepth(-2);
			coin.setDepth(this.player.supaCurrentDepth-1);
			coin.alpha = 100;
			this.add.existing(coin);
			

		},this);
		
	}

	createEmptyWalls(){
	
		

		this.emptyWalls.forEach(function(wall) {
		
			
			const emptyWall = new EmptyWall(this, wall[0], wall[1]);
			emptyWall.alpha = 0;
			this.add.existing(emptyWall);
			this.emptyWallsRack.push(emptyWall);
			

		},this);
		
	}


	createAcidWalls(){
	
		

		this.acidTiles.forEach(function(wall) {
	
			
			const emptyWall = new AcidTile(this, wall[0], wall[1]);

			this.add.existing(emptyWall);
			this.acidWallsRack.push(emptyWall);
			

		},this);
		
	}


	
	replaceTilesWithCoins(){

		//console.log(this.mapa.layer.data);
		//var coins = this.mapa.createFromObjects('capa', { id: 63, classType: Coin });
		
		this.mapa.layer.data.forEach(function(tileData) { //convierto todos los dots del mapa en dots fisicos reales
			tileData.forEach(function(tileOnly) {

			
				if(tileOnly.properties.name=="coin"){ //de lo que te senala el id sumar 1

					var tilePos = [ tileOnly.x*tileOnly.width,tileOnly.y*tileOnly.height];
					this.coinsPositions.push(tilePos);					
					tileOnly.tilemapLayer.removeTileAt(tileOnly.x,tileOnly.y);

					
				}

				if(tileOnly.properties.name=="invisible"){
								
					
					var tilePos = [ tileOnly.x*tileOnly.width,tileOnly.y*tileOnly.height];
					this.emptyWalls.push(tilePos);					
					tileOnly.tilemapLayer.removeTileAt(tileOnly.x,tileOnly.y);

					
				}



				if(tileOnly.properties.name=="acid"){
								
					
					var tilePos = [ tileOnly.x*tileOnly.width,tileOnly.y*tileOnly.height];
					this.acidTiles.push(tilePos);					
					tileOnly.tilemapLayer.removeTileAt(tileOnly.x,tileOnly.y);

					
				}


				
	
			},this);
		},this);
	}

	checkElevator(){
		
		if(this.game.playerData.gotCard && this.mainDoorActive){
			if(this.door !== undefined){
			
				this.door.mainDoor.play('bigDoorOpened',true)
				
			}
			this.mainDoorActive = false;
		}
		
	}


    initCamera() {

		const cam = this.cameras.main;
		
		cam.setBounds(0, 0, this.layer.width, this.layer.height);
		cam.setRoundPixels(true);
		cam.disableCull = true; 
		
		cam.startFollow(this.player, true, 10, 10);
		//cam.clampX(this.layer.width);
	
		cam.setLerp(0.1);
		this.fadeInAndCheck();
		
	}



	initColliders() {

		
		this.mapa.setCollisionByExclusion([0, -1]);
		
		this.physics.add.collider(this.player, this.layer, this.layerCollidingCallback, null, this);
	
		this.physics.add.collider(this.enemies, this.layer);	
		
		this.physics.add.collider(this.playerBullets, this.enemies, this.hitEnemy);	
		this.physics.add.collider(this.enemies, this.platforms);	
		
		this.physics.add.overlap(this.player, this.enemies, this.touchingEnemy);
	}

	hitEnemy(bullet,enemy){
	
		bullet.visible=false;

		if(bullet.isActive){
			enemy.enemyLife--;
			bullet.isActive = false;
			
		}
		
		if(enemy.enemyLife<=0){
			enemy.body.enable=false;
			enemy.destroySequence();
		}
	
		
	}

	hitEnemyWithJetpack(bullet,enemy){
	

	
			enemy.enemyLife--;
		
			
		
		
		if(enemy.enemyLife<=0){
			enemy.body.enable=false;
			enemy.destroySequence();
		}

		
	}


	layerCollidingCallback(player, tile){
	
		if(tile.properties.name == "speed"){
			player.wallCollision();
		}
	}

	onPlatform(player, platform){
		
		if(platform.name=="Elevator"){
			
			platform.goingUp();
		}
		
		player.overPlatform = true;
		player.wasOnPlatform = true;
		
		
		
	}

	touchingEnemy(player,enemy){

	
			if(enemy.name !=="AngrySpin"){
					player.playerhurt(player,enemy);
			}else{
				if(enemy.spiking){
					player.playerhurt(player,enemy);
				}
			}
	
	}

	enableDoorID(doorId){
	
		this.doorsEnabled.push(doorId);
		this.doors.forEach(function(aDoorID){ //por cada puerta activada
			
			if(aDoorID.doorID == doorId){ //si es que el ID de esta puerta esta en lista entonces le activa
				aDoorID.pointerDown.visible = true;
				aDoorID.smallDoor.play("newSmallDoorOpened", true);
			}
		},this);

	}

	fadeInAndCheck(){


		
		this.cameras.main.fadeIn(2000);
		this.cameras.main.once('camerafadeincomplete', function () {	

		this.player.willEnterdoor = false;	
		this.player.body.enable = true;
	//	this.lifepanel.calcularBarrasEncendidas();
		//console.log(this.scene.key);
		this.game.playerData.level = this.scene.key;

		updatear(this.game.playerData); //updatea db
		
			}, this);

		
	}

	createMisileAlert(yPos, misile){
		// alertInstance
		if(misile.scaleX>0){
			var xAlertPos = this.cameras.main.scrollX + 300;
		}else{
			var xAlertPos = this.cameras.main.scrollX+30;
		}
		
		var alertInstance = new AlertSign(this, xAlertPos, yPos);
		this.add.existing(alertInstance);
		alertInstance.emit("prefab-awake");
		alertInstance.initAnimaion(misile);

	}


	restartGame() {

		if(!this.isRestartingGame){
			this.gotoLevel = this.scene.key;
			this.isRestartingGame=true;
			this.cameras.main.fadeOut(1000);

			this.player.body.enable = false;

				
		
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

		this.gameOver.x=this.player.x;

		this.gameOver.y=this.player.y-200;
	
		this.checkElevator();
	

		if(this.launchMusic){
			this.iniciarMusica();
			this.launchMusic = false;
		}
		

	if(!this.player.flipX){
		this.distanceToShot = 85;
		this.bulletOrigin.x=this.distanceToShot*Math.cos(this.brazoderecho.mouseAngle+0.3)+this.brazoderecho.x;
		this.bulletOrigin.y=this.distanceToShot*Math.sin(this.brazoderecho.mouseAngle+0.3)+this.brazoderecho.y;
	
	}else{

		this.distanceToShot = 85;
		this.bulletOrigin.x=this.distanceToShot*Math.cos((this.brazoderecho.mouseAngle-0.3)*-1)+this.brazoderecho.x;
		this.bulletOrigin.y=this.distanceToShot*Math.sin((this.brazoderecho.mouseAngle-0.3))+this.brazoderecho.y;

	}
		
		
	}
	
}
