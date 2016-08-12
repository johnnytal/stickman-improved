var room = function(game){
    DISTANCE = 8;
};

room.prototype = {
    preload: function(){},
    
    create: function(){
        room = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'room');   

        thisPlace = 'room';
        
        create_room_items();
        create_man(645, 462, 4);

        fadeInScreen();
        
        room_bound_u = game.add.sprite(0, 0, null);
        game.physics.enable(room_bound_u, Phaser.Physics.ARCADE);
        room_bound_u.body.setSize(TOTAL_WIDTH, 420);
        room_bound_u.body.immovable = true;
        
        room_bound_d = game.add.sprite(0, 500, null);
        game.physics.enable(room_bound_d, Phaser.Physics.ARCADE);
        room_bound_d.body.setSize(TOTAL_WIDTH, 5);
        room_bound_d.body.immovable = true;
        
        room_bound_r = game.add.sprite(TOTAL_WIDTH - 50, 0, null);
        game.physics.enable(room_bound_r, Phaser.Physics.ARCADE);
        room_bound_r.body.setSize(50, TOTAL_HEIGHT);
        room_bound_r.body.immovable = true;

        showManText('What is this place?', 1000);
        suspend(total_text_time);

        localStorage.setItem( "stickman-location", 'Room' );
        
        if (!street_music.isPlaying){
           street_music.play();
        }
    },
    
    update: function(){
               
        walk_update();
        
        var pub_vel_x = 20 + (Math.abs(man.body.x - placeToGoX) / 1.7);
        var pub_vel_y = 20 + (Math.abs(man.body.y - placeToGoY) / 1.7);

        if (placeToGoX != null){ 
            if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
            
            if (man.body.x - placeToGoX < -DISTANCE){
               man.body.velocity.x = pub_vel_x; 
               dir = 'right';
               manWalk = man.animations.play(dir);
            } 
            else if (man.body.x - placeToGoX > DISTANCE){
               man.body.velocity.x = -pub_vel_x; 
               dir = 'left';
               manWalk = man.animations.play(dir);
            } 
            else{ placeToGoX = 'null'; }
        } 
        
        if (placeToGoY != null){
            if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
          
            if (man.body.y - placeToGoY < -DISTANCE){
                man.body.velocity.y = pub_vel_y; 
                manWalk = man.animations.play(dir);
            }
            else if (man.body.y - placeToGoY > DISTANCE){
                man.body.velocity.y = -pub_vel_y;  
                manWalk = man.animations.play(dir); 
            }
            else{ placeToGoY = 'null'; } 
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();
        
        game.physics.arcade.collide(man, room_bound_u, hitRoomBounds, null, this); 
        game.physics.arcade.collide(man, room_bound_d, hitRoomBounds, null, this); 
        game.physics.arcade.collide(man, room_bound_r, function(){
            hitRoomBounds();
            placeToGoX = 'null'; 
        }, null, this); 
        
        factor = (1.5 + (man.body.y / 80)) * 0.15; //scale man size
        man.scale.set(factor, factor);  
    },
};

function hitRoomBounds(){
    placeToGoY = 'null';
    sfxSteps_pub.stop();
}

function create_room_items(){
    reset_inventory();
    
    create_item( game, 'computer', false, false, 246, 12, true );
    create_item( game, 'rock_room', true, true, 70, 462, true );
}