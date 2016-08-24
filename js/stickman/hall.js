var hall = function(game){
   DISTANCE = 8;
    
   hallWalls = [
       [0, 375, 91, 310], [91, 361, 51, 244], [51, 244, 169, 253], 
       [169, 253, 433, 304], [433, 304, 475, 338], [475, 338, 477, 311], [477, 311, 786, 230], [786, 210, 950, 231],
       [0, TOTAL_HEIGHT - 70, TOTAL_WIDTH, TOTAL_HEIGHT - 70], [TOTAL_WIDTH, 0, TOTAL_WIDTH, TOTAL_HEIGHT]
   ]; 
};

hall.prototype = {
    preload: function(){},
    
    create: function(){
        hall = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'hall');  
            
        change_music(hall_music);
        
        thisPlace = 'Hall'; 
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < hallWalls.length; w++){ 
            create_walls(hallWalls[w]); 
        }
        
        create_hall_items();
        create_man(60, 470, 3);
        
        store.set("stickman-location", thisPlace);

        fadeInScreen();
        
        showManText('That was kinda fun!', 1000);
        suspend(total_text_time);
    },
    
    update: function(){
               
        walk_update();
        
        var hall_vel_x = 40 + (Math.abs(man.body.x - placeToGoX) / 1.7);
        var hall_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.7);

        if (placeToGoX != null){ 
            if (!sfxSteps_pub.isPlaying) sfxSteps_pub.play();
            
            if (man.body.x - placeToGoX < -DISTANCE){
               man.body.velocity.x = hall_vel_x; 
               dir = 'right';
               manWalk = man.animations.play(dir);
            } 
            else if (man.body.x - placeToGoX > DISTANCE){
               man.body.velocity.x = -hall_vel_x; 
               dir = 'left';
               manWalk = man.animations.play(dir);
            } 
            else{ placeToGoX = 'null'; }
        } 
        
        if (placeToGoY != null){
            if (!sfxSteps_pub.isPlaying) sfxSteps_pub.play();
          
            if (man.body.y - placeToGoY < -DISTANCE){
                man.body.velocity.y = hall_vel_y; 
                manWalk = man.animations.play(dir);
            }
            else if (man.body.y - placeToGoY > DISTANCE){
                man.body.velocity.y = -hall_vel_y;  
                manWalk = man.animations.play(dir); 
            }
            else{ placeToGoY = 'null'; } 
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();
        
        game.physics.arcade.collide(man, walls, function(){
            if (man.body.touching.left || man.body.touching.right) placeToGoX = 'null';
            else { placeToGoY = 'null'; }
            
            if (sfxSteps_pub.isPlaying) sfxSteps_pub.stop();
        }, null, this);
        
        factor = (1.5 + (man.body.y / 80)) * 0.25; //scale man size
        man.scale.set(factor, factor);
        sfxSteps.volume = factor; 
         
    },
};

function create_hall_items(){
    reset_inventory();

    if (first_visit[thisPlace] == true){
        store.set("stickman-item0" + thisPlace, [ 'hall_door', false, false, 269, 184, true ]);
        store.set("stickman-item1" + thisPlace, [ 'hall_window', false, false, 887, 162, true ]);
        store.set("stickman-item2" + thisPlace, [ 'hall_window_broken', true, false, 887, 163, false ]);
        store.set("stickman-item3" + thisPlace, [ 'rock_hall', true, true, 800, 340, true ]);
        
        first_visit[thisPlace] = false;
        store.set("stickman-first_visit_to" + thisPlace, false);
        
        load_items_state(4);
    }
    
    load_items_state();
}