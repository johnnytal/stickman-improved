var alley = function(game){
    var poly;
    
    DISTANCE = 4;
    stopped = false;

    alleyWalls = [
        [664,197,664,424],[664,424,950,424],[641,237,537,237],[537,237,0,237],[326,325,0,325],
        [0,600,900,600]
    ]; 
};

alley.prototype = {
    preload: function(){},
    
    create: function(){
        alley = game.add.sprite(0, 0, 'alley');    

        watchAD = game.add.sprite(5, 10, 'watchAd');
        watchAD.inputEnabled = true;
        watchAD.events.onInputDown.add(showAd, this);
        watchAD.fixedToCamera = true;
        
        reset_click(alley);
        
        poly = new Phaser.Polygon([ 
            new Phaser.Point(64, 600), new Phaser.Point(0, 600), new Phaser.Point(0, 0),
            new Phaser.Point(540, 0), new Phaser.Point(540, 280)
        ]);
        
        thisPlace = 'Alley';
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < alleyWalls.length; w++){ 
            create_walls(alleyWalls[w]); 
        }
        
        create_alley_items();

        create_man(595, 503, 4);
        
        store.set("stickman-location", thisPlace);
        
        if (coming_from != 'Street'){
            sfxRain.play();
            change_music(street_music);
        }
        
        create_rain();
        fadeInScreen();
    },
    
    update: function(){
        walk_update();
        
        var alley_vel_x = 26 + (Math.abs(man.body.x - placeToGoX) / 0.85);
        var alley_vel_y = 45 + (Math.abs(man.body.y - placeToGoY) / 0.85);
        
        if (poly.contains(man.x, man.y)){
            if (!stopped || stopped && poly.contains(placeToGoX, placeToGoY)){
                stop_man(); 
                stopped = true;
            }
            else{
                stopped = false;
                walk_update(); 
            } 
        }
        
        if (placeToGoX != null){ 
            if (!sfxSteps.isPlaying) sfxSteps.play();
            
            if (man.body.x - placeToGoX < -DISTANCE){
               man.body.velocity.x = alley_vel_x; 
               dir = 'right';
               manWalk = man.animations.play(dir);
            } 
            else if (man.body.x - placeToGoX > DISTANCE){
               man.body.velocity.x = -alley_vel_x; 
               dir = 'left';
               manWalk = man.animations.play(dir);
            } 
            else{ placeToGoX = 'null'; }
        } 
        
        if (placeToGoY != null){
            if (!sfxSteps.isPlaying) sfxSteps.play();
          
            if (man.body.y - placeToGoY < -DISTANCE){
                man.body.velocity.y = alley_vel_y; 
                manWalk = man.animations.play(dir);
            }
            else if (man.body.y - placeToGoY > DISTANCE){
                man.body.velocity.y = -alley_vel_y;  
                manWalk = man.animations.play(dir); 
            }
            else{ placeToGoY = 'null'; } 
        }
        
        if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();
        
        game.physics.arcade.collide(man, walls, function(){
            placeToGoY = 'null';
            placeToGoX = 'null';
        }, null, this);
        
        if (man.x > 715){
            tween_black(500, 0, "Street", thisPlace);
            placeToGoY = 'null';
            placeToGoX = 'null';
        }
        
        factor = (1.5 + (man.body.y / 80)) * 0.17; //scale man size
        man.scale.set(factor, factor);  
        sfxSteps.volume = factor / 1.5;
    },
};

function create_alley_items(){
    reset_inventory();

    if (first_visit[thisPlace] == true){
        store.set("stickman-item0" + thisPlace, [ 'ladder_s', true, true, 575, 242, true, false ]);
        store.set("stickman-item1" + thisPlace, [ 'towel', true, true, 423, 280, true, false ]);
        
        not_first_visit(thisPlace);
        
        load_items_state(2);
    }
    
    else{
        load_items_state(null); 
    }
}