var alley = function(game){
    DISTANCE = 8;
    var poly;
    stopped = false;
    //var graphics;

    alleyWalls = [
        [664,197,664,424],[664,424,950,424],[641,237,537,237],[537,237,0,237],[326,325,0,325]
    ]; 
};

alley.prototype = {
    preload: function(){},
    
    create: function(){
        alley = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'alley');    

        poly = new Phaser.Polygon([ 
            new Phaser.Point(64, 600), new Phaser.Point(0, 600), new Phaser.Point(0, 0),
            new Phaser.Point(540, 0), new Phaser.Point(540, 286)
        ]);
        
        /*graphics = game.add.graphics(0, 0);
        graphics.beginFill(0xFF33ff);
        graphics.drawPolygon(poly.points);
        graphics.endFill();*/
        
        thisPlace = 'Alley';
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < alleyWalls.length; w++){ 
            create_alley_walls(alleyWalls[w]); 
        }
        
        create_alley_items();

        create_man(600, 440, 4);
        
        localStorage.setItem("stickman-location", thisPlace);
        
        fadeInScreen();
    },
    
    update: function(){
        walk_update();
        
        var pub_vel_x = 40 + (Math.abs(man.body.x - placeToGoX) / 1.7);
        var pub_vel_y = 40 + (Math.abs(man.body.y - placeToGoY) / 1.7);
        
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
            if (!sfxSteps.isPlaying) sfxSteps.play();
          
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
        
        game.physics.arcade.collide(man, walls, function(){
            placeToGoY = 'null';
            placeToGoX = 'null';
        }, null, this);
        
        if (man.x > 730){
            store_game_state(items, thisPlace);
            tween_black(500, 0, "Street", thisPlace);
        }
        
        factor = (1.5 + (man.body.y / 80)) * 0.17; //scale man size
        man.scale.set(factor, factor);  
    },
};

function create_alley_walls(cords){
    var x0, x1, y0, y1, startX, startY, sizeX, sizeY;
    
    x0 = cords[0];
    x1 = cords[2];
   
    y0 = cords[1];
    y1 = cords[3];

    if (x0 > x1) startX = x1;
    else { startX = x0; }

    if (y0 > y1) startY = y1;
    else { startY = y0; }
    
    sizeX = Math.abs(x1 - x0);
    sizeY = Math.abs(y1 - y0);;

    wall = walls.create(startX, startY, '');
    wall.body.setSize(sizeX, sizeY);
    wall.body.immovable = true;
}

function create_alley_items(){
    reset_inventory();

    if (first_visit[thisPlace]){
        localStorage.setItem("stickman-item0" + thisPlace, JSON.stringify([ 'ladder_s', true, true, 595, 242, true, false ]));
        localStorage.setItem("stickman-item1" + thisPlace, JSON.stringify([ 'rock_alley', true, true, 490, 385, true, false ]));

        first_visit[thisPlace] = false;
        localStorage.setItem("stickman-first_visit_to" + thisPlace, false);
        
        load_items_state(2);
    }
    
    else{
        load_items_state(null); 
    }
}