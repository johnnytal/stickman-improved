var menu = function(game){};
 
menu.prototype = {
    preload: function(){},
    
    create: function(){   
        this.game.add.sprite(0, 0, 'opening');

        startBtn = this.game.add.sprite(75, 350, 'startBtn');
        contBtn = this.game.add.sprite(370, 335, 'contBtn');

        startBtn.inputEnabled = true;
        contBtn.inputEnabled = true;

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
            
            store.set("stickman-first_visit_toStreet", true),
            store.set("stickman-first_visit_toAlley", true),
            store.set("stickman-first_visit_toPub", true),
            store.set("stickman-first_visit_toWc", true),
            store.set("stickman-first_visit_toRoof", true),
            store.set("stickman-first_visit_toMaze", true),
            store.set("stickman-first_visit_toHall", true),
            store.set("stickman-first_visit_toStone_room", true),
            store.set("stickman-first_visit_toRoom", true),
            
            missions = {
                
                ladder_mission: false,
                stone_mission: false,
                window_mission: false,
                drunk_mission: false,
                plug_mission: false,
                switch_mission: false,
                password_mission: false,
                stone_hall_mission: false
                 
            };
        
            store.set("stickman-mission_complete_ladder_mission", false),
            store.set("stickman-mission_complete_stone_mission", false),
            store.set("stickman-mission_complete_window_mission", false),
            store.set("stickman-mission_complete_drunk_mission", false),
            store.set("stickman-mission_complete_plug_mission", false),
            store.set("stickman-mission_complete_switch_mission", false),
            store.set("stickman-mission_complete_password_mission", false),
            store.set("stickman-mission_complete_stone_hall_mission", false),

            inventory = [];
            
            store.set("stickman-inventory", null);
            
            place = "Street";
            
            startGame();
            
        }, this);
        
        contBtn.events.onInputUp.add(function(){ 
            first_visit = {
                
                Street: store.get("stickman-first_visit_toStreet"),
                Alley: store.get("stickman-first_visit_toAlley"),
                Pub: store.get("stickman-first_visit_toPub"),
                Wc: store.get("stickman-first_visit_toWc"),
                Roof: store.get("stickman-first_visit_toRoof"),
                Maze: store.get("stickman-first_visit_toMaze"),
                Hall: store.get("stickman-first_visit_toHall"),
                Stone_room: store.get("stickman-first_visit_toStone_room"),
                Room: store.get("stickman-first_visit_toRoom"),

            }; 
            
            missions = {
                
                 ladder_mission: store.get("stickman-mission_complete_ladder_mission"),
                 stone_mission: store.get("stickman-mission_complete_stone_mission"),
                 window_mission: store.get("stickman-mission_complete_window_mission"),
                 drunk_mission: store.get("stickman-mission_complete_drunk_mission"),
                 plug_mission: store.get("stickman-mission_complete_plug_mission"),
                 switch_mission: store.get("stickman-mission_complete_switch_mission"),
                 password_mission: store.get("stickman-mission_complete_password_mission"),
                 stone_hall_mission: store.get("stickman-mission_complete_stone_hall_mission"),
                 
            };
            
            inventory = [];
             
            storage_inventory = store.get("stickman-inventory");
            
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
            document.getElementById('game').style.cursor = 'none';
        }, this);
        
        contBtn.events.onInputDown.add(function(){ 
            contBtn.tint = 0xc9a279;  
            document.getElementById('game').style.cursor = 'none';
        }, this);
        
        credits_music.play();
        
        create_rain();
        
        fadeInScreen();
    }, 
};

function fadeInScreen(){
    bigBlack = game.add.sprite(0, 0, 'bigBlack');
    tween_alpha(bigBlack, 0, 2500, 1);
}

function tween_alpha(what, where, time, from){
    if (from) what.alpha = from;
    game.add.tween(what).to( { alpha: where}, time, Phaser.Easing.Sinusoidal.InOut, true); 
}

function startGame(){
    if (sfxclick.isDecoded){
        sfxclick.play();
    }
    credits_music.fadeOut();

    theTween = game.add.tween(bigBlack).to( { alpha: 1}, 700, Phaser.Easing.Sinusoidal.InOut, true); 
    theTween.onComplete.add(function(){
        this.game.state.start('Game');    
    });
}

function loadSfx(){
    credits_music = game.add.audio('credits_music', 0.7, true);
    street_music = game.add.audio('street_music', 0.7, true);
    pub_music = game.add.audio('pub_music', 0.6, true);
    maze_music = game.add.audio('maze_music', 0.7, true);
    hall_music = game.add.audio('hall_music', 0.7, true);
    
    sfxclick = game.add.audio('sfxclick', 0.9, false);
    sfxRain = game.add.audio('sfxRain', 0.5, true);
    sfxSteps = game.add.audio('sfxSteps', 1, true);
    sfxPocket = game.add.audio('sfxPocket', 1, false);
    sfxPut_ladder = game.add.audio('sfxPut_ladder', 1, false);
    sfxBreak_window = game.add.audio('sfxBreak_window', 0.9, false);
    sfxSteps_pub = game.add.audio('sfxSteps_pub', 1, true);
    sfxDart = game.add.audio('sfxDart', 1, false);
    sfxPut_glass = game.add.audio('sfxPut_glass', 1, false);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel', 1, false);
    sfxSecret_door = game.add.audio('sfxSecret_door', 1, false);
    sfxLight_switch = game.add.audio('sfxLight_switch', 0.6, false);    
    sfxFall = game.add.audio('sfxFall', 0.4, false);    
    sfxFlush1 = game.add.audio('sfxFlush1', 1, false);    
    sfxFlush2 = game.add.audio('sfxFlush2', 0.8, false);    
    sfxWrong = game.add.audio('sfxWrong', 1, false);    
    sfxRight = game.add.audio('sfxRight', 1, false);    
    sfxType = game.add.audio('sfxType', 0.8, false);    
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
            if (musics[m] != music_to_play){
                 musics[m].stop();
            }
        }
    }, 1500);
    
    music_to_play.fadeIn();
    
    setTimeout(function(){ // in case fadeIn fails
        if (!music_to_play.isPlaying){
            music_to_play.play();
        }   
    }, 1500);
    
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}    
    }, 1000);
    
    try{
        window.plugins.insomnia.keepAwake();
    } catch(e){}
}

function showAd(){    
    texts = [
        'Short commercial breaks are part of life I guess',
        'I feel a sudden urge to thank someone',
        'I suddenly remember! The meaning of life is...',
        'Ye, perfect time to go for commercials',
        'Not bad, now lets see if you can click it...',
        'Come on, I bet this guy\nmakes millions on our backs!',
        'I bet this 0.002 cents will be put to good use',
        'An angel just got his wings',
        'Oh look! A three headed monkey!',
        'I think I wanna be a pirate!',
        'Viva la Revolución!',
    
    ];

    showManText(texts[game.rnd.integerInRange(0, texts.length-1)], 0);
    
    
    setTimeout(function(){
        interstitial.show();   
    }, total_text_time); 
}
