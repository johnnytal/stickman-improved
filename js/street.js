var street = function(game){
    MAN_VEL_X = 120;
    MAN_VEL_Y = 32;
    
    MIDDLE = (TOTAL_WIDTH / 2) - 27;
};

street.prototype = {
    preload: function(){},
    
    create: function(){
        street = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'street');    
        
        thisPlace = 'street';

        floor = game.add.sprite(TOTAL_WIDTH/2-27, 450, null);
        game.physics.enable(floor, Phaser.Physics.ARCADE);
        floor.body.setSize(0, 100);
        floor.body.immovable = true;
        
        create_street_items();
        
        var x, y;
        
        if (ladderMission && stoneMission){
            x = 591;
            y = 360;
        }
        else{
            x = 119;
            y = 294;    
        }
        create_man(x, y, 3);

        create_rain();

        fadeInScreen();
        
        street_music.play();
        
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

    create_item( game, 'door', false, false, 520, 264, true );
    create_item( game, 'window', false, false, 490, 88, true );
    create_item( game, 'broken_window', true, false, 491, 172, false );
    create_item( game, 'ladder_b', true, false, 493, 245, false );
    create_item( game, 'bar_sign', true, false, 600, 174, true ); 
    create_item( game, 'alley_entrance', false, false, 144, 267, true );
     
    if (ladderMission){
        get_item('name', 'ladder_b').visible = true;  
    }
    
    if (stoneMission){
        get_item('name', 'broken_window').visible = true;
    }
}
