var pub = function(game){
    DISTANCE = 8;
};

pub.prototype = {
    preload: function(){},
    
    create: function(man){
        pub = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'pub');
       
        pub_bound_u = game.add.sprite(0, 0, null);
        game.physics.enable(pub_bound_u, Phaser.Physics.ARCADE);
        pub_bound_u.body.setSize(TOTAL_WIDTH, 275);
        pub_bound_u.body.immovable = true;
    
        pub_bound_d = game.add.sprite(0, 495, null);
        game.physics.enable(pub_bound_d, Phaser.Physics.ARCADE);
        pub_bound_d.body.setSize(TOTAL_WIDTH, 5);
        pub_bound_d.body.immovable = true;
       
        create_pub_items();
        create_man(665, 375);
        
        sfxRain.stop();
        sfxRain_indoors.play();

        showManText('This pub has been abonded, much like the rest of this town',1750);
    },
    
    update: function(){
        
        walk_update();
        
        var pub_vel_x = 40 + (Math.abs(man.body.x - placeToGoX) / 1.35);
        var pub_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.6);

        if (placeToGoX != null){ 
            if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
            
            if (man.body.x - placeToGoX < -DISTANCE && man.body.x < 770){ // man walk right
               man.body.velocity.x = pub_vel_x; 
               dir = 'right';
               manWalk = man.animations.play(dir);
            } 
            else if (man.body.x - placeToGoX > DISTANCE && man.body.x > 215){ // man walk left
               man.body.velocity.x = -pub_vel_x; 
               dir = 'left';
               manWalk = man.animations.play(dir);
            } 
            else{ placeToGoX = 'null'; }
        } 
        
        if (placeToGoY != null){
            if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
            
            if (man.body.y - placeToGoY < -DISTANCE && man.body.x > 315 && man.body.x < 770){
                man.body.velocity.y = pub_vel_y; 
                manWalk = man.animations.play(dir);
            }
            else if (man.body.y - placeToGoY > DISTANCE && man.body.x > 315 && man.body.x < 770){
                man.body.velocity.y = -pub_vel_y;  
                manWalk = man.animations.play(dir); 
            }
            else{ placeToGoY = 'null'; } 
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();

        factor = (1.7 + (man.body.y/100)) * 0.2; //scale man size
        man.scale.set(factor, factor);  

        game.physics.arcade.collide(man, pub_bound_u, hitPubBounds, null, this);
        game.physics.arcade.collide(man, pub_bound_d, hitPubBounds, null, this);    
    },
};

function hitPubBounds(){
    placeToGoY = 'null';
    sfxSteps_pub.stop();
}

function create_pub_items(){
    create_item( game, 'glass', true, true, 550, 375, true );
    create_item( game, 'barrel', true, false, 635, 243, true );
    create_item( game, 'pub_door', false, false, 356, 177, true );
    create_item( game, 'dart_board', true, false, 540, 170, true );
    create_item( game, 'rock', true, true, 570, 395, true );
    create_item( game, 'dart', true, true, 195, 350, true );
    create_item( game, 'barrel_glass', true, false, 635, 243, false );
    create_item( game, 'barrel_open', true, false, 635, 243, false );
    create_item( game, 'barrel_empty', true, false, 580, 255, false );
    create_item( game, 'secret_door', true, false, 771, 379, false );
}