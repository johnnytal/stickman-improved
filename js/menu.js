var menu = function(game){};
 
menu.prototype = {
    preload: function(){},
    
    create: function(){   
        this.game.add.sprite(0, 0, 'opening');
        
        startBtn = this.game.add.sprite(70, 395, 'startBtn');
        contBtn = this.game.add.sprite(390, 395, 'contBtn');

        startBtn.inputEnabled = true;
        contBtn.inputEnabled = true;

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
            
            missions = {
                
                 ladder_mission: false,
                 stone_mission: false,
                 window_mission: false,
                 drunk_mission: false,
                 switch_mission: false,
                 stone_hall_mission: false
                 
             };
             
            inventory = [];
            
            place = "Street";
            
            startGame();
            
        }, this);
        
        contBtn.events.onInputUp.add(function(){ 
            first_visit = {
                
                Street: JSON.parse(localStorage.getItem("stickman-first_visit_toStreet")),
                Alley: JSON.parse(localStorage.getItem("stickman-first_visit_toAlley")),
                Pub: JSON.parse(localStorage.getItem("stickman-first_visit_toPub")),
                Wc: JSON.parse(localStorage.getItem("stickman-first_visit_toWc")),
                Roof: JSON.parse(localStorage.getItem("stickman-first_visit_toRoof")),
                Maze: JSON.parse(localStorage.getItem("stickman-first_visit_toMaze")),
                Hall: JSON.parse(localStorage.getItem("stickman-first_visit_toHall")),
                Stone_room: JSON.parse(localStorage.getItem("stickman-first_visit_toStone_room")),
                Room: JSON.parse(localStorage.getItem("stickman-first_visit_toRoom")),

            }; 
            
            missions = {
                
                 ladder_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_ladder_mission")),
                 stone_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_stone_mission")),
                 window_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_window_mission")),
                 drunk_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_drunk_mission")),
                 switch_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_switch_mission")),
                 stone_hall_mission: JSON.parse(localStorage.getItem("stickman-mission_complete_stone_hall_mission")),
                 
            };
            
            inventory = [];
             
            storage_inventory = JSON.parse(localStorage.getItem("stickman-inventory"));
            
            if (storage_inventory != null){
                for (i = 0; i < storage_inventory.length; i++){
                    var x = ((i + 1) * 50) + 100; 
                    var name = storage_inventory[i];
                    
                    items.push(new Item(game, name, true, true, x, 535, true, true));
                } 
            }

            for (var key in first_visit) {
                if (first_visit[key] == null){
                    first_visit[key] = true;
                }
            }
            
            for (var key in missions) {
                if (missions[key] == null){
                    missions[key] = false;
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
        
        credits_music.play();
        
        create_rain();
        sfxRain.stop();
        
        fadeInScreen();
    }, 
};

function fadeInScreen(){
    bigBlack = game.add.sprite(0, 0, 'bigBlack');
    var theTween = game.add.tween(bigBlack).to( { alpha: 0}, 2500, Phaser.Easing.Sinusoidal.InOut, true);  
    
    theTween.onComplete.add(function(){
        bigBlack.destroy();
    });
}

function startGame(){
    if (sfxclick.isDecoded){
        sfxclick.play();
    }
    credits_music.fadeOut();
    showAd();
    
    this.game.state.start('Game');    
}

function loadSfx(){
    sfxBreak_window = game.add.audio('sfxBreak_window', 0.9, false);
    sfxDart = game.add.audio('sfxDart', 1, false);
    sfxPocket = game.add.audio('sfxPocket', 1, false);
    sfxPut_ladder = game.add.audio('sfxPut_ladder', 1, false);
    sfxRain = game.add.audio('sfxRain', 0.5, true);
    sfxSteps = game.add.audio('sfxSteps', 1, true);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel', 1, false);
    sfxPut_glass = game.add.audio('sfxPut_glass', 1, false);
    sfxRain_indoors = game.add.audio('sfxRain_indoors', 0.3, true);
    sfxSecret_door = game.add.audio('sfxSecret_door', 1, false);
    sfxSteps_pub = game.add.audio('sfxSteps_pub', 1, true);
    sfxLight_switch = game.add.audio('sfxLight_switch', 0.6, false);
    sfxclick = game.add.audio('sfxclick', 0.9, false);
    
    hall_music = game.add.audio('hall_music', 0.7, true);
    street_music = game.add.audio('street_music', 0.7, true);
    pub_music = game.add.audio('pub_music', 0.6, true);
    maze_music = game.add.audio('maze_music', 0.7, true);
    credits_music = game.add.audio('credits_music', 0.7, true);
}

function change_music(music_to_play){
    musics = [street_music, pub_music, hall_music, maze_music, credits_music];
    
    for(m = 0; m < musics.length; m++){
        if (musics[m].isPlaying && musics[m] != music_to_play){
            musics[m].fadeOut();

        } 
    }
           
    setTimeout(function(){ // in case fadeOut fails
        for(m = 0; m < musics.length; m++){
            if (musics[m].isPlaying && musics[m] != music_to_play){
                 musics[m].stop();
            }
        }
    }, 1500);
    
    music_to_play.fadeTo(1500, 0.7);
    
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
