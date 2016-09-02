var street = function(game){
    MAN_VEL_X = 120;
    MAN_VEL_Y = 32;
    
    MIDDLE = (TOTAL_WIDTH / 2) - 27;
};

street.prototype = {
    preload: function(){},
    
    create: function(){
        street = game.add.sprite(0, 0, 'street');    
        
        reset_click(street);
        
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
        
        if (coming_from != 'Alley'){
            sfxRain.play();
            change_music(street_music);
        }
        
        create_rain();
        fadeInScreen();
        
        store.set("stickman-location", thisPlace);
        
        if (first_visit[thisPlace] == true){
            man.alpha = 0;
            tween_alpha(man, 1, 6000);
            showManText('Where am I? WHO am I? What is this place?', 2500);
            suspend(total_text_time);
        }
        /*if (banner_not_created){
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
        }*/
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
 
        store.set("stickman-item0" + thisPlace, [ 'door', false, false, 520, 264, true ]);
        store.set("stickman-item1" + thisPlace, [ 'window', false, false, 490, 88, true ]);
        store.set("stickman-item2" + thisPlace, [ 'broken_window', true, false, 491, 172, false ]);
        store.set("stickman-item3" + thisPlace, [ 'ladder_b', true, false, 493, 245, false ]);
        store.set("stickman-item4" + thisPlace, [ 'bar_sign', true, false, 600, 174, true ]);
        store.set("stickman-item5" + thisPlace, [ 'alley_entrance', false, false, 144, 267, true ]);
        store.set("stickman-item6" + thisPlace, [ 'rock_alley', true, true, 375, 410, true, false ]);
        
        not_first_visit(thisPlace);
        
        load_items_state(7);
    }
    
    else{
        load_items_state(null);    
    }
}
