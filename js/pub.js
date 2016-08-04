var pub = function(game){
    DISTANCE = 8;
};

pub.prototype = {
    preload: function(){},
    
    create: function(){
        pub = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'pub');
        
        street_music.fadeOut();
        pub_music.fadeIn();
        
        thisPlace = 'pub';
        items = [];
       
        pub_bound_u = game.add.sprite(0, 0, null);
        game.physics.enable(pub_bound_u, Phaser.Physics.ARCADE);
        pub_bound_u.body.setSize(TOTAL_WIDTH, 285);
        pub_bound_u.body.immovable = true;

        create_pub_items();
        create_man(690, 405, 4);

        sfxRain.stop();

        fadeInScreen();

        showManText('This pub seems abonded, just like the rest of the town', 1400);
        suspend(total_text_time);
        
        localStorage.setItem( "stickman-location", 'Pub' );
    },
    
    update: function(){
        
        walk_update();
        
        var pub_vel_x = 40 + (Math.abs(man.body.x - placeToGoX) / 1.35);
        var pub_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.6);
        
        var boundsR = 760;
        var boundsL = 260;

        if (placeToGoX != null){ 
            if (!sfxSteps_pub.isPlaying) sfxSteps_pub.play();
            
            if (man.body.x - placeToGoX < -DISTANCE && man.body.x < boundsR){ // man walk right
               man.body.velocity.x = pub_vel_x; 
               dir = 'right';
               manWalk = man.animations.play(dir);
            } 
            else if (man.body.x - placeToGoX > DISTANCE && man.body.x > boundsL){ // man walk left
               man.body.velocity.x = -pub_vel_x; 
               dir = 'left';
               manWalk = man.animations.play(dir);
            } 
            else{ placeToGoX = 'null'; }
        } 
        
        if (placeToGoY != null){
            if (!sfxSteps_pub.isPlaying) sfxSteps_pub.play();
            
            if (man.body.y - placeToGoY < -DISTANCE && man.body.x > boundsL + 100 && man.body.x < boundsR){ // man walk up
                man.body.velocity.y = pub_vel_y; 
                manWalk = man.animations.play(dir);
            }
            else if (man.body.y - placeToGoY > DISTANCE && man.body.x > boundsL + 100 && man.body.x < boundsR){ // man walk down
                man.body.velocity.y = -pub_vel_y;  
                manWalk = man.animations.play(dir); 
            }
            else{ placeToGoY = 'null'; } 
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();

        factor = (1.7 + (man.body.y / 100)) * 0.2; //scale man size
        man.scale.set(factor, factor);  

        game.physics.arcade.collide(man, pub_bound_u, hitPubBounds, null, this); 
    },
};

function hitPubBounds(){
    placeToGoY = 'null';
    sfxSteps_pub.stop();
}

function create_pub_items(){
    drawLine();
    
    create_item( game, 'glass', true, true, 610, 417, true );
    create_item( game, 'barrel', true, false, 653, 260, true );
    create_item( game, 'barrel_glass', true, false, 653, 260, false );
    create_item( game, 'barrel_open', true, false, 653, 260, false );
    create_item( game, 'barrel_empty', true, false, 600, 265, false );
    create_item( game, 'pub_door', false, false, 431, 193, true );
    create_item( game, 'broken_pub_window', false, false, 588, 7, true );
    create_item( game, 'dart', true, true, 222, 413, true );
    create_item( game, 'dart_board', true, false, 558, 185, true );
    create_item( game, 'rock', true, true, 588, 440, true );
    create_item( game, 'secret_door', true, false, 877, 420, false );
    //create_item( game, 'stool', true, false, 305, 283, true );
    create_item( game, 'chandelier', false, false, 364, 0, true );
    create_item( game, 'wc_door', false, false, 788, 200, true ); // stop man comes before the interaction with door
    create_item( game, 'poster', false, false, 694, 170, true );
}