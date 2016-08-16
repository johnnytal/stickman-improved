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
            first_visit = {
                
                Street: true,
                Alley: true,
                Pub: true, 
                Wc: true,
                Roof: true,
                Maze: true, 
                Hall: true,
                Stone_room: true,
                Room: true
                
            }; 
            
            place = "Street";
            startGame();
            
        }, this);
        
        contBtn.events.onInputUp.add(function(){ 
            first_visit = {
                
                Street: localStorage.getItem("stickman-first_visit_toStreet"),
                Alley: localStorage.getItem("stickman-first_visit_toAlley"),
                Pub: localStorage.getItem("stickman-first_visit_toPub"),
                Wc: localStorage.getItem("stickman-first_visit_toWc"),
                Roof: localStorage.getItem("stickman-first_visit_toRoof"),
                Maze: localStorage.getItem("stickman-first_visit_toMaze"),
                Hall: localStorage.getItem("stickman-first_visit_toHall"),
                Stone_room: localStorage.getItem("stickman-first_visit_toStone_room"),
                Room: localStorage.getItem("stickman-first_visit_toRoom"),

            }; 

            for (var key in first_visit) {
                if (first_visit[key] == null){
                    first_visit[key] = true;
                }
            }
            
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

function change_music(music_to_play){
    musics = [street_music, pub_music, hall_music, maze_music];
    
    for(m = 0; m < musics.length; m++){
        if (musics[m].isPlaying && musics[m] != music_to_play){
            musics[m].fadeOut();
            
            setTimeout(function(){ // in case fadeOut fails
                try{
                    musics[m].stop();
                } catch(e){}
            }, 1500);
        } 
    }
    
    music_to_play.fadeIn();
    
    setTimeout(function(){ // in case fadeIn fails
        if (!music_to_play.isPlaying){
            music_to_play.play();
        }   
    }, 1500);
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
