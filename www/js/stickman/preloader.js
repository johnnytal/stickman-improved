var preloader = function(game){
    img_path = 'assets/stickman/images/';
    sfx_path = 'assets/stickman/sounds/';
    music_path = 'assets/stickman/sounds/music/';
};
 
preloader.prototype = {
    preload: function(){ 
        progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
  
        // sprites
        game.load.spritesheet('man', img_path + 'man.png', 54, 72.5);
        game.load.spritesheet('walkingIcon', img_path + 'man_icon.png',20, 32);
        game.load.spritesheet('string', img_path + 'string.png',70/2, 140);
        game.load.spritesheet('towel', img_path + 'towel.png', 23, 59);
        game.load.spritesheet('letters', img_path + 'letters.png', 540/9, 210/3);
        
        // general
        game.load.image('opening', img_path + 'menu.jpg');
        game.load.image('contBtn', img_path + 'old_btn.png');
        game.load.image('startBtn', img_path + 'new_btn.png');
        game.load.image('watchAd', img_path + 'watchAd.png');
        
        game.load.image('rain', img_path + 'rain.png');
        game.load.image('bigBlack', img_path + 'blackBig.png');
        game.load.image('line', img_path + 'line.png');
        
        // states
        game.load.image('street', img_path + 'drawing.jpg');
        game.load.image('alley', img_path + 'alley.jpg');
        game.load.image('pub', img_path + 'pub.jpg');
        game.load.image('wc', img_path + 'wc.jpg');
        game.load.image('maze', img_path + 'maze.jpg');
        game.load.image('hall', img_path + 'hall.jpg');
        game.load.image('room', img_path + 'room.jpg');
        
        // street
        game.load.image('door', img_path + 'door.png');
        game.load.image('window', img_path + 'window.png');
        game.load.image('broken_window', img_path + 'broken_window.png');
        game.load.image('alley_entrance', img_path + 'alley_entrance.png');
        game.load.image('bar_sign', img_path + 'bar_sign.png');
        game.load.image('ladder_b', img_path + 'ladder_b.png');
        game.load.image('rock_alley', img_path + 'rock_alley.png');
        
        // alley
        game.load.image('ladder_s', img_path + 'ladder_s.png');
        
        // pub
        game.load.image('pub_door', img_path + 'pub_door.png');
        game.load.image('barrel', img_path + 'barrel.png');
        game.load.image('barrel_empty', img_path + 'barrel_empty.png');
        game.load.image('barrel_glass', img_path + 'barrel_glass.png');
        game.load.image('barrel_open', img_path + 'barrel_open.png');
        game.load.image('rock_pub', img_path + 'rock_pub.png');
        game.load.image('glass', img_path + 'glass.png');
        game.load.image('broken_pub_window', img_path + 'broken_pub_window.png');
        game.load.image('dart_board', img_path + 'dart_board.png');
        game.load.image('dart', img_path + 'dart.png');
        game.load.image('chandelier', img_path + 'chandelier.png');
        game.load.image('poster', img_path + 'poster.png');
        game.load.image('wc_door', img_path + 'wc_door.png');
        game.load.image('secret_door', img_path + 'secret_door.png');
        game.load.image('chain', img_path + 'chain.png');
        game.load.image('broken_chandelier', img_path + 'broken_chandelier.png');
        game.load.image('candle', img_path + 'candle.png');
        
        // wc
        game.load.image('wc_flood', img_path + 'wc_flood.png');
        game.load.image('roof_door', img_path + 'roof_door.png');
        game.load.image('brush', img_path + 'brush.png');
        game.load.image('toilet', img_path + 'toilet.png');
        
        // maze
        game.load.image('switch', img_path + 'switch.png');

        // hall
        game.load.image('rock_hall', img_path + 'rock_hall.png');
        game.load.image('hall_door', img_path + 'hall_door.png');
        game.load.image('hall_window', img_path + 'hall_window.png');
        game.load.image('hall_window_broken', img_path + 'hall_window_broken.png');
        game.load.image('pass_frame', img_path + 'pass_frame.png');
        game.load.image('frame', img_path + 'frame.jpg');
        game.load.image('rate', img_path + 'rate.png');
        
        // room
        game.load.image('rock_room', img_path + 'rock_room.png');
        game.load.image('computer', img_path + 'computer.png');
        
        // ending
        game.load.image('image1', img_path + 'image1.jpg');
        game.load.image('image2', img_path + 'image2.jpg');
        game.load.image('image3', img_path + 'image3.jpg');
        game.load.image('image4', img_path + 'image4.jpg');

        // audio
        game.load.audio('hall_music', music_path + 'hall_music.ogg');
        game.load.audio('street_music', music_path + 'street_music.ogg');
        game.load.audio('pub_music', music_path + 'pub_music.ogg');
        game.load.audio('maze_music', music_path + 'maze_music.ogg');
        game.load.audio('credits_music', music_path + 'credits_music.ogg');
        
        game.load.audio('sfxBreak_window', sfx_path + 'break_window.ogg');
        game.load.audio('sfxDart', sfx_path + 'dart.ogg');
        game.load.audio('sfxPocket', sfx_path + 'pocket.ogg');
        game.load.audio('sfxPut_ladder', sfx_path + 'put_ladder.ogg');
        game.load.audio('sfxRain', sfx_path + 'rain.ogg');
        game.load.audio('sfxSteps', sfx_path + 'steps.ogg');
        game.load.audio('sfxOpen_barrel', sfx_path + 'open_barrel.ogg');
        game.load.audio('sfxPut_glass', sfx_path + 'put_glass.ogg');
        game.load.audio('sfxSecret_door', sfx_path + 'secret_door.ogg');
        game.load.audio('sfxSteps_pub', sfx_path + 'steps_pub.ogg');
        game.load.audio('sfxLight_switch', sfx_path + 'switch.ogg');
        game.load.audio('sfxclick', sfx_path + 'click.ogg');
        game.load.audio('sfxFall', sfx_path + 'fall.ogg');
        game.load.audio('sfxFlush1', sfx_path + 'flush1.ogg');
        game.load.audio('sfxFlush2', sfx_path + 'flush2.ogg');
        game.load.audio('sfxType', sfx_path + 'type.ogg');
        game.load.audio('sfxWrong', sfx_path + 'wrong.ogg');
        game.load.audio('sfxRight', sfx_path + 'right.ogg');
    },
    
    create: function(){
        this.game.state.start("Menu");
        loadSfx();  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};
