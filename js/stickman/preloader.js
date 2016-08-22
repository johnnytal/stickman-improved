var preloader = function(game){
    img_path = 'assets/stickman/images/';
    sfx_path = 'assets/stickman/sounds/';
    music_path = 'assets/stickman/sounds/music/';
};
 
preloader.prototype = {
    preload: function(){ 
        game.load.spritesheet('man', img_path + 'man.png', 54, 72.5);
        game.load.spritesheet('walkingIcon', img_path + 'man_icon.png',20, 32);
        
        game.load.image('bigBlack', img_path + 'blackBig.png');
        game.load.image('line', img_path + 'line.png');
        game.load.image('street', img_path + 'drawing.jpg');
        game.load.image('pub', img_path + 'pub.jpg');
        game.load.image('wc', img_path + 'wc.jpg');
        game.load.image('maze', img_path + 'maze.jpg');
        game.load.image('hall', img_path + 'hall.jpg');
        game.load.image('alley', img_path + 'alley.jpg');
        game.load.image('door', img_path + 'door.png');
        game.load.image('ladder_s', img_path + 'ladder_s.png');
        game.load.image('bar_sign', img_path + 'bar_sign.png');
        game.load.image('window', img_path + 'window.png');
        game.load.image('pub_door', img_path + 'pub_door.png');
        game.load.image('barrel_empty', img_path + 'barrel_empty.png');
        game.load.image('broken_window', img_path + 'broken_window.png');
        game.load.image('rain', img_path + 'rain.png');
        game.load.image('ladder_s', img_path + 'ladder_s.png');
        game.load.image('ladder_b', img_path + 'ladder_b.png');
        game.load.image('alley_entrance', img_path + 'alley_entrance.png');
        game.load.image('rock_alley', img_path + 'rock_alley.png');
        game.load.image('rock_pub', img_path + 'rock_pub.png');
        game.load.image('rock_hall', img_path + 'rock_hall.png');
        game.load.image('rock_room', img_path + 'rock_room.png');
        game.load.image('glass', img_path + 'glass.png');
        game.load.image('broken_pub_window', img_path + 'broken_pub_window.png');
        game.load.image('barrel', img_path + 'barrel.png');
        game.load.image('barrel_glass', img_path + 'barrel_glass.png');
        game.load.image('barrel_open', img_path + 'barrel_open.png');
        //game.load.image('stool', img_path + 'stool.png');
        game.load.image('dart_board', img_path + 'dart_board.png');
        game.load.image('dart', img_path + 'dart.png');
        game.load.image('chandelier', img_path + 'chandelier.png');
        game.load.image('poster', img_path + 'poster.png');
        game.load.image('wc_door', img_path + 'wc_door.png');
        game.load.image('secret_door', img_path + 'secret_door.png');
        game.load.image('switch', img_path + 'switch.png');
        game.load.image('hall_door', img_path + 'hall_door.png');
        game.load.image('hall_window', img_path + 'hall_window.png');
        game.load.image('hall_window_broken', img_path + 'hall_window_broken.png');
        game.load.image('opening', img_path + 'opening2.png');
        game.load.image('contBtn', img_path + 'contBtn2.png');
        game.load.image('startBtn', img_path + 'startBtn.png');
        game.load.image('room', img_path + 'myRoom2.jpg');
        game.load.image('computer', img_path + 'computer.png');
        game.load.image('image1', img_path + 'image1.jpg');
        game.load.image('image2', img_path + 'image2.jpg');
        game.load.image('image3', img_path + 'image3.jpg');
        game.load.image('image4', img_path + 'image4.jpg');

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
    },
    
    create: function(){
        this.game.state.start("Menu");
        loadSfx();  
    }
};
