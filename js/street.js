var street = function(game){
    MAN_VEL_X = 120;
    MAN_VEL_Y = 32;
    
    MIDDLE = (TOTAL_WIDTH / 2) - 27;
};

street.prototype = {
    preload: function(){},
    
    create: function(){
        street = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'street');    
        
        thisPlace = 'Street';

        floor = game.add.sprite(TOTAL_WIDTH/2-27, 450, null);
        game.physics.enable(floor, Phaser.Physics.ARCADE);
        floor.body.setSize(0, 100);
        floor.body.immovable = true;
        
        create_street_items();
        
        var x, y;
        
        if (coming_from != 'Pub'){
            x = 119;
            y = 294; 
        }
        else{
            x = 591;
            y = 360;
        }
        
        create_man(x, y, 3);

        create_rain();

        fadeInScreen();
        
        localStorage.setItem("stickman-location", thisPlace);
        
        change_music(street_music);
        
        if (banner_not_created){
            try{
                Cocoon.Ad.AdMob.configure({
                    android: { 
                        banner:"ca-app-pub-9795366520625065/9752537037"
                    }
                });
                banner = Cocoon.Ad.AdMob.createBanner();
                banner.load();
                
                banner_not_created = false;
            } catch(e){}
        }
    },
    
    update: function(){
        
        walk_update();

        if (placeToGoX != null){  
                        
            if (!(sfxSteps.isPlaying)){
                sfxSteps.play();
            } 
            
            if (man.body.x - placeToGoX < -3 && man.body.x < 900){ // man walk right
                man.body.velocity.x = MAN_VEL_X; 
             
                if (man.body.x < MIDDLE) man.body.velocity.y = MAN_VEL_Y;
                else if (man.body.x > MIDDLE) { man.body.velocity.y = -MAN_VEL_Y; }
               
                dir = 'right';
            } 
                
            else if (man.body.x - placeToGoX > 3 && man.body.x > 35){ // man walk left
                
               man.body.velocity.x = -MAN_VEL_X; 
              
               if (man.body.x < MIDDLE) man.body.velocity.y = -MAN_VEL_Y;
               else if (man.body.x > MIDDLE) {man.body.velocity.y = MAN_VEL_Y;}
               
               dir = 'left';
            } 
            
            else{ // man stop
                stop_man(); 
                dir = null;
            }

            manWalk = man.animations.play(dir);    
        }
        
        factor = -2.25 + (man.body.y / 95);
        if (factor < 1.1) man.scale.set(factor, factor); //scale man size
        sfxSteps.volume = factor; // change step volume by distance from camera   

        game.physics.arcade.collide(man, floor, null, null, this);
    },
};

function create_street_items(){
    
    reset_inventory();

    if (first_visit[thisPlace] == true){
 
        localStorage.setItem("stickman-item0" + thisPlace, JSON.stringify([ 'door', false, false, 520, 264, true ]));
        localStorage.setItem("stickman-item1" + thisPlace, JSON.stringify([ 'window', false, false, 490, 88, true ]));
        localStorage.setItem("stickman-item2" + thisPlace, JSON.stringify([ 'broken_window', true, false, 491, 172, false ]));
        localStorage.setItem("stickman-item3" + thisPlace, JSON.stringify([ 'ladder_b', true, false, 493, 245, false ]));
        localStorage.setItem("stickman-item4" + thisPlace, JSON.stringify([ 'bar_sign', true, false, 600, 174, true ]));
        localStorage.setItem("stickman-item5" + thisPlace, JSON.stringify([ 'alley_entrance', false, false, 144, 267, true ]));

        first_visit[thisPlace] = false; // for this game
        localStorage.setItem("stickman-first_visit_to" + thisPlace, false); // for continues
        
        load_items_state(6);
    }
    
    else{
        load_items_state(null);    
    }
}
