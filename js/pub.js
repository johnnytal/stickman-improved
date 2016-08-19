var pub = function(game){
    DISTANCE = 8;
};

pub.prototype = {
    preload: function(){},
    
    create: function(){
        pub = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'pub');

        change_music(pub_music);
        
        thisPlace = 'Pub';
        items = [];
       
        pub_bound_u = game.add.sprite(0, 0, null);
        game.physics.enable(pub_bound_u, Phaser.Physics.ARCADE);
        pub_bound_u.body.setSize(TOTAL_WIDTH, 285);
        pub_bound_u.body.immovable = true;

        create_pub_items();
        
        create_man(690, 405, 4);

        sfxRain.stop();

        localStorage.setItem("stickman-location", thisPlace);

        fadeInScreen();

        showManText('This pub seems abonded, just like the rest of the town', 1400);
        suspend(total_text_time);
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
    
    reset_inventory();

    if (first_visit[thisPlace] == true){
        localStorage.setItem("stickman-item0" + thisPlace, JSON.stringify([ 'glass', true, true, 610, 417, true ]));
        localStorage.setItem("stickman-item1" + thisPlace, JSON.stringify([ 'barrel', true, false, 653, 260, true ]));
        localStorage.setItem("stickman-item2" + thisPlace, JSON.stringify([ 'barrel_glass', true, false, 653, 260, false ]));
        localStorage.setItem("stickman-item3" + thisPlace, JSON.stringify([ 'barrel_open', true, false, 653, 260, false ]));
        localStorage.setItem("stickman-item4" + thisPlace, JSON.stringify([ 'barrel_empty', true, false, 600, 265, false ]));
        localStorage.setItem("stickman-item5" + thisPlace, JSON.stringify([ 'pub_door', false, false, 431, 193, true ]));
        localStorage.setItem("stickman-item6" + thisPlace, JSON.stringify([ 'broken_pub_window', false, false, 588, 7, true ]));
        localStorage.setItem("stickman-item7" + thisPlace, JSON.stringify([ 'dart', true, true, 222, 413, true ]));
        localStorage.setItem("stickman-item8" + thisPlace, JSON.stringify([ 'dart_board', true, false, 558, 185, true ]));
        localStorage.setItem("stickman-item9" + thisPlace, JSON.stringify([ 'rock_pub', true, true, 588, 440, true ]));
        localStorage.setItem("stickman-item10" + thisPlace, JSON.stringify([ 'secret_door', true, false, 877, 420, false ]));
        localStorage.setItem("stickman-item11" + thisPlace, JSON.stringify([ 'chandelier', false, false, 364, 0, true ]));
        localStorage.setItem("stickman-item12" + thisPlace, JSON.stringify([ 'wc_door', false, false, 788, 200, true ]));
        localStorage.setItem("stickman-item13" + thisPlace, JSON.stringify([ 'poster', false, false, 694, 170, true ]));
        //localStorage.setItem("stickman-item15" + thisPlace, JSON.stringify([ 'stool', true, false, 305, 283, true ]));
        
        first_visit[thisPlace] = false;
        load_items_state(14);
    }
    
    else{
        load_items_state(null);
        localStorage.setItem("stickman-first_visit_to" + thisPlace, false);
    }
}