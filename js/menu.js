var menu = function(game){};
 
menu.prototype = {
    preload: function(){},
    
    create: function(){   
        this.game.add.sprite(0, 0, 'opening');
        
        startBtn = this.game.add.sprite(70, 395, 'startBtn');
        contBtn = this.game.add.sprite(390, 395, 'contBtn');

        startBtn.inputEnabled = true;
        contBtn.inputEnabled = true;
        
        fadeInScreen();
        loadSfx();

        startBtn.events.onInputUp.add(function(){ 
            place = "Street";
            startGame();
        }, this);
        
        contBtn.events.onInputUp.add(function(){ 
            if (place == null){
                place = "Street";
            }
            startGame();
        }, this);
                
        startBtn.events.onInputDown.add(function(){ 
            startBtn.tint = 0xc9a279;  
        }, this);
        
        contBtn.events.onInputDown.add(function(){ 
            contBtn.tint = 0xc9a279;  
        }, this);
        
        street_music.play();
    }, 
};

function fadeInScreen(){
    bigBlack = game.add.sprite(0, 0, 'bigBlack');
    game.add.tween(bigBlack).to( { alpha: 0}, 2500, Phaser.Easing.Sinusoidal.InOut, true);  
}

function startGame(){
    sfxclick.play();
    street_music.stop();
    showAd();
    
    this.game.state.start('Game');    
}

function loadSfx(){
    sfxBreak_window = game.add.audio('sfxBreak_window', 0.9, false);
    sfxDart = game.add.audio('sfxDart', 1, false);
    sfxPocket = game.add.audio('sfxPocket', 1, false);
    sfxPut_ladder = game.add.audio('sfxPut_ladder', 1, false);
    sfxRain = game.add.audio('sfxRain', 0.8, true);
    sfxSteps = game.add.audio('sfxSteps', 1, true);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel', 1, false);
    sfxPut_glass = game.add.audio('sfxPut_glass', 1, false);
    sfxRain_indoors = game.add.audio('sfxRain_indoors', 0.6, true);
    sfxSecret_door = game.add.audio('sfxSecret_door', 1, false);
    sfxSteps_pub = game.add.audio('sfxSteps_pub', 1, true);
    sfxLight_switch = game.add.audio('sfxLight_switch', 0.6, false);
    sfxclick = game.add.audio('sfxclick', 0.9, false);
    
    hall_music = game.add.audio('hall_music', 0.7, true);
    street_music = game.add.audio('street_music', 0.7, true);
    pub_music = game.add.audio('pub_music', 0.6, true);
    maze_music = game.add.audio('maze_music', 0.7, true);
}

function showAd(){
    var timeToShow = game.rnd.integerInRange(30000, 75000);
    var timeToHide = game.rnd.integerInRange(10000, 30000);
    
    setTimeout(function(){  
        try{
            banner.show();
        } catch(e){}
        
        setTimeout(function(){
           try{
               banner.hide(); 
               showAd();
           } catch(e){}
        }, timeToHide);
    }, timeToShow);     
}
