var hall = function(game){
   DISTANCE = 8;
    
   hallWalls = [
       [0, 375, 91, 310], [91, 361, 51, 244], [51, 244, 169, 253], 
       [169, 253, 433, 304], [433, 304, 475, 338], [475, 338, 477, 311], [477, 311, 786, 230], [786, 210, 950, 231],
       [0, TOTAL_HEIGHT - 70, TOTAL_WIDTH - 1, TOTAL_HEIGHT - 70], [TOTAL_WIDTH - 1, 0, TOTAL_WIDTH - 1, TOTAL_HEIGHT]
   ]; 
};

hall.prototype = {
    preload: function(){},
    
    create: function(){
        hall = game.add.sprite(0, 0, 'hall');  
        
        reset_click(hall);
        
        change_music(hall_music);
        
        thisPlace = 'Hall'; 
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < hallWalls.length; w++){ 
            create_walls(hallWalls[w]); 
        }
        
        create_hall_items();
        
        var x, y;
        
        if(coming_from == 'Password' && check_mission('password')){
            x = 352;
            y = 352;    
            
            setTimeout(function(){
                showManText('Ah. Yes of course', 100);
                suspend(total_text_time);                
            }, 2000);
        }
        
        else if(coming_from == 'Password' && !check_mission('password')){
            x = 352;
            y = 352;    
            
            setTimeout(function(){
                showManText("Seems the password is incorrect... hmmm", 100);
                suspend(total_text_time);                
            }, 2000);
        }
        
        else{
            x = 60;
            y = 470;
        }
        
        create_man(x, y, 3);
        
        store.set("stickman-location", thisPlace);

        fadeInScreen();
        
        if (first_visit[thisPlace] == true){
            showManText('That was kinda fun!', 1000);
            suspend(total_text_time);
        }
        
    },
    
    update: function(){
               
        walk_update();
        
        var hall_vel_x = 50 + (Math.abs(man.body.x - placeToGoX) / 1.45);
        var hall_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.55);

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
        store.set("stickman-item0" + thisPlace, [ 'hall_door', false, false, 269, 184, true, false ]);
        store.set("stickman-item1" + thisPlace, [ 'hall_window', false, false, 887, 162, true, false ]);
        store.set("stickman-item2" + thisPlace, [ 'hall_window_broken', true, false, 887, 163, false, false ]);
        store.set("stickman-item3" + thisPlace, [ 'pass_frame', true, false, 400, 260, true, false ]);
        
        not_first_visit(thisPlace);
        
        load_items_state(4);
    }
    store.set("stickman-item4" + thisPlace, [ 'rock_hall', true, true, 800, 340, false, false ]);
    load_items_state();
}