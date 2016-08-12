var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        game.load.spritesheet('man', 'images/stickman/man.png', 54, 72.5);
        game.load.spritesheet('walkingIcon', 'images/stickman/man_icon.png',20, 32);
        
        game.load.image('bigBlack', 'images/stickman/blackBig.png');
        game.load.image('line', 'images/stickman/line.png');
        game.load.image('street', 'images/stickman/drawing.jpg');
        game.load.image('pub', 'images/stickman/pub.jpg');
        game.load.image('maze', 'images/stickman/maze.jpg');
        game.load.image('hall', 'images/stickman/hall.jpg');
        game.load.image('alley', 'images/stickman/alley.jpg');
        game.load.image('door', 'images/stickman/door.png');
        game.load.image('ladder_s', 'images/stickman/ladder_s.png');
        game.load.image('bar_sign', 'images/stickman/bar_sign.png');
        game.load.image('window', 'images/stickman/window.png');
        game.load.image('pub_door', 'images/stickman/pub_door.png');
        game.load.image('barrel_empty', 'images/stickman/barrel_empty.png');
        game.load.image('broken_window', 'images/stickman/broken_window.png');
        game.load.image('rain', 'images/stickman/rain.png');
        game.load.image('ladder_s', 'images/stickman/ladder_s.png');
        game.load.image('ladder_b', 'images/stickman/ladder_b.png');
        game.load.image('alley_entrance', 'images/stickman/alley_entrance.png');
        game.load.image('rock_alley', 'images/stickman/rock_alley.png');
        game.load.image('rock_pub', 'images/stickman/rock_pub.png');
        game.load.image('rock_hall', 'images/stickman/rock_hall.png');
        game.load.image('rock_room', 'images/stickman/rock_room.png');
        game.load.image('glass', 'images/stickman/glass.png');
        game.load.image('broken_pub_window', 'images/stickman/broken_pub_window.png');
        game.load.image('barrel', 'images/stickman/barrel.png');
        game.load.image('barrel_glass', 'images/stickman/barrel_glass.png');
        game.load.image('barrel_open', 'images/stickman/barrel_open.png');
        game.load.image('stool', 'images/stickman/stool.png');
        game.load.image('dart_board', 'images/stickman/dart_board.png');
        game.load.image('dart', 'images/stickman/dart.png');
        game.load.image('chandelier', 'images/stickman/chandelier.png');
        game.load.image('poster', 'images/stickman/poster.png');
        game.load.image('wc_door', 'images/stickman/wc_door.png');
        game.load.image('secret_door', 'images/stickman/secret_door.png');
        game.load.image('switch', 'images/stickman/switch.png');
        game.load.image('hall_door', 'images/stickman/hall_door.png');
        game.load.image('hall_window', 'images/stickman/hall_window.png');
        game.load.image('hall_window_broken', 'images/stickman/hall_window_broken.png');
        game.load.image('opening', 'images/stickman/opening2.png');
        game.load.image('contBtn', 'images/stickman/contBtn2.png');
        game.load.image('startBtn', 'images/stickman/startBtn.png');
        game.load.image('room', 'images/stickman/myRoom2.jpg');
        game.load.image('computer', 'images/stickman/computer.png');
        
        game.load.image('image1', 'images/stickman/image1.jpg');
        game.load.image('image2', 'images/stickman/image2.jpg');
        game.load.image('image3', 'images/stickman/image3.jpg');
        game.load.image('image4', 'images/stickman/image4.jpg');

        game.load.audio('hall_music', 'sounds/stickman/music/hall_music.ogg');
        game.load.audio('street_music', 'sounds/stickman/music/street_music.ogg');
        game.load.audio('pub_music', 'sounds/stickman/music/pub_music.ogg');
        game.load.audio('maze_music', 'sounds/stickman/music/maze_music.ogg');
        
        game.load.audio('sfxBreak_window', 'sounds/stickman/break_window.ogg');
        game.load.audio('sfxDart', 'sounds/stickman/dart.ogg');
        game.load.audio('sfxPocket', 'sounds/stickman/pocket.ogg');
        game.load.audio('sfxPut_ladder', 'sounds/stickman/put_ladder.ogg');
        game.load.audio('sfxRain', 'sounds/stickman/rain.ogg');
        game.load.audio('sfxSteps', 'sounds/stickman/steps.ogg');
        game.load.audio('sfxOpen_barrel', 'sounds/stickman/open_barrel.ogg');
        game.load.audio('sfxPut_glass', 'sounds/stickman/put_glass.ogg');
        game.load.audio('sfxSecret_door', 'sounds/stickman/secret_door.ogg');
        game.load.audio('sfxSteps_pub', 'sounds/stickman/steps_pub.ogg');
        game.load.audio('sfxLight_switch', 'sounds/stickman/switch.ogg');
        game.load.audio('sfxclick', 'sounds/stickman/click.ogg');
    },
    
    create: function(){
        this.game.state.start("Menu");  
    }
};
