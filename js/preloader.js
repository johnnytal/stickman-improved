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
        game.load.image('door', 'images/stickman/door.png');
        game.load.image('ladder_s', 'images/stickman/ladder_s.png');
        game.load.image('window', 'images/stickman/window.png');
        game.load.image('pub_door', 'images/stickman/pub_door.png');
        game.load.image('barrel_empty', 'images/stickman/barrel_empty.png');
        game.load.image('black', 'images/stickman/black.png');
        game.load.image('broken_window', 'images/stickman/broken_window.png');
        game.load.image('rain', 'images/stickman/rain.png');
        game.load.image('ladder_s', 'images/stickman/ladder_s.png');
        game.load.image('ladder_b', 'images/stickman/ladder_b.png');
        game.load.image('rock', 'images/stickman/rock.png');
        game.load.image('glass', 'images/stickman/glass.png');
        game.load.image('barrel', 'images/stickman/barrel.png');
        game.load.image('barrel_glass', 'images/stickman/barrel_glass.png');
        game.load.image('barrel_open', 'images/stickman/barrel_open.png');
        game.load.image('dart_board', 'images/stickman/dart_board.png');
        game.load.image('dart', 'images/stickman/dart.png');
        game.load.image('secret_door', 'images/stickman/secret_door.png');
        game.load.image('switch', 'images/stickman/switch.png');
        game.load.image('hall_door', 'images/stickman/hall_door.png');
        game.load.image('hall_window', 'images/stickman/hall_window.png');
        game.load.image('hall_window_broken', 'images/stickman/hall_window_broken.png');
        
        game.load.audio('sfxBreak_window', 'sounds/stickman/break_window.mp3');
        game.load.audio('sfxDart', 'sounds/stickman/dart.mp3');
        game.load.audio('sfxPocket', 'sounds/stickman/pocket.mp3');
        game.load.audio('sfxPut_ladder', 'sounds/stickman/put_ladder.mp3');
        game.load.audio('sfxRain', 'sounds/stickman/rain.mp3');
        game.load.audio('sfxSteps', 'sounds/stickman/steps.mp3');
        game.load.audio('sfxOpen_barrel', 'sounds/stickman/open_barrel.mp3');
        game.load.audio('sfxPut_glass', 'sounds/stickman/put_glass.mp3');
        game.load.audio('sfxRain_indoors', 'sounds/stickman/rain_indoors.mp3');
        game.load.audio('sfxSecret_door', 'sounds/stickman/secret_door.mp3');
        game.load.audio('sfxSteps_pub', 'sounds/stickman/steps_pub.mp3');
        game.load.audio('sfxLight_switch', 'sounds/stickman/switch.mp3');

        game.load.image('image1', 'images/stickman/image1.jpg');
        game.load.image('image2', 'images/stickman/image2.jpg');
        game.load.image('image3', 'images/stickman/image3.jpg');
        game.load.image('image4', 'images/stickman/image4.jpg');

        game.load.spritesheet('man', 'images/stickman/man.png', 54, 72.5);
        game.load.spritesheet('walkingIcon', 'images/stickman/man_icon.png',20, 32);
        
        game.load.audio('sfxBreak_window', 'sounds/stickman/break_window.wav');
        game.load.audio('sfxDart', 'sounds/stickman/dart.wav');
        game.load.audio('sfxPocket', 'sounds/stickman/pocket.wav');
        game.load.audio('sfxPut_ladder', 'sounds/stickman/put_ladder.wav');
        game.load.audio('sfxRain', 'sounds/stickman/rain.wav');
        game.load.audio('sfxSteps', 'sounds/stickman/steps.wav');
        game.load.audio('sfxOpen_barrel', 'sounds/stickman/open_barrel.wav');
        game.load.audio('sfxPut_glass', 'sounds/stickman/put_glass.wav');
        game.load.audio('sfxRain_indoors', 'sounds/stickman/rain_indoors.wav');
        game.load.audio('sfxSecret_door', 'sounds/stickman/secret_door.wav');
        game.load.audio('sfxSteps_pub', 'sounds/stickman/steps_pub.wav');

    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};
