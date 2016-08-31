var wc = function(game){
    DISTANCE = 4;
};

wc.prototype = {
    preload: function(){},
    
    create: function(){

        wc = game.add.sprite(TOTAL_WIDTH / 8, 0, 'wc');
        
        reset_click(wc);
        
        thisPlace = 'Wc';
        items = [];
       
        pub_bound_u = game.add.sprite(0, 0, null);
        game.physics.enable(pub_bound_u, Phaser.Physics.ARCADE);
        pub_bound_u.body.setSize(TOTAL_WIDTH, 380);
        pub_bound_u.body.immovable = true;
        
        if (coming_from != 'Pub'){
            change_music(pub_music);
        }
        
        create_wc_items();
        
        create_man(356, 510, 3);

        store.set("stickman-location", thisPlace);
        
        line.scale.set(0.9, 0.85);
        
        fadeInScreen();
        
        if (first_visit[thisPlace] == true){
            showManText("No one bothered to clean before they left", 2000);
            suspend(total_text_time);
        }
    },
    
    update: function(){
        
        walk_update();
        
        var pub_vel_x = 40 + (Math.abs(man.body.x - placeToGoX) / 1.35);
        var pub_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.6);
        
        var boundsR = 430;
        var boundsL = 190;
        
        if (get_item('name', 'wc_flood', 'sprite').visible == false){
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
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null' && man.body.gravity.y == 0) stop_man();
        
        if (man.y > 525){
            tween_black(500, 0, "Pub", thisPlace);
            placeToGoY = 'null';
            placeToGoX = 'null';
        }

        if (man.body.angularVelocity != -20 && man.y >= 183){
            factor = (1.7 + (man.body.y / 100)) * 0.32; 
            man.scale.set(factor, factor);  

            game.physics.arcade.collide(man, pub_bound_u, hitPubBounds, null, this); 
        }
        
        if (man.y < 183){
            stop_man();
            
            man.frame = 0;
            man.alpha = 0.8;
            man.body.angularVelocity = 0;
            man.body.gravity.y = 0;
        }
    },
};

function hitPubBounds(){
    placeToGoY = 'null';
    sfxSteps_pub.stop();
}

function create_wc_items(){
          
    reset_inventory();

    if (first_visit[thisPlace] == true){
    
        store.set("stickman-item0" + thisPlace, [ 'string', true, false, 280, 300, true, false ]); 
        store.set("stickman-item1" + thisPlace, [ 'wc_flood', true, false, TOTAL_WIDTH / 8, 150, false, false ]); 
        store.set("stickman-item2" + thisPlace, [ 'roof_door', false, false, 229, 14, true, false ]); 
        store.set("stickman-item3" + thisPlace, [ 'brush', false, false, 428, 395, true, false ]); 
        store.set("stickman-item4" + thisPlace, [ 'toilet', false, false, 303, 276, true, false ]); 
        
        not_first_visit(thisPlace);
        
        load_items_state(5);
    }
    
    else{    
        load_items_state(null);  
    }
}