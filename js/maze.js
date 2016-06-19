var maze = function(game){
    mazeWalls = [
        [0,177,133,177],[133,177,133,131],[133,131,432,131],[432,131,443,337],[443,337,501,337],
        [501,337,503,124],[503,124,818,124],[818,124,818,375],[818,375,900,375],
        [827,420,827,496],[827,420,900,420],[827,496,762,496],[762,496,762,370],
        [762,370,653,370],[653,370,653,291],[653,291,782,291],[782,291,782,198],[782,198,645,198],
        [645,198,645,145],[645,145,562,145],[562,145,562,459],[562,459,649,459],[649,459,649,437],
        [649,437,673,437],[673,437,673,498],[673,498,532,498],[532,498,532,418],[532,418,357,418],
        [357,418,357,506],[357,506,318,506],[318,506,318,277],[318,277,380,277],[380,277,380,190],
        [380,190,225,190],[225,190,225,505],[225,505,132,505],[132,505,132,213],[132,213,0,213]
    ]; 
    
    VELOCITY = 60;
    DISTANCE = 3;
};

maze.prototype = {
    preload: function(){},
    
    create: function(){
        maze = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'maze');
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w=0; w<mazeWalls.length; w++){ 
            createWall(mazeWalls[w]); 
        }
        
        create_item( game, 'switch', true, false, 831, 358, true );
        
        create_man(30, 185);
        man.scale.set(0.33, 0.29); 

        fog = game.add.group();
        fog.enableBody = true;
        fog.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (y=0; y<12; y++){ //create the fog
            for (x=0; x<19; x++){
                black = fog.create(0+x*50, 0+y*50, 'black');   
            }
        }
    },
    
    update: function(){
            
            walk_update();
            
            fog.forEach(function(black){ //check if man overlaps the fog
                checkOverlap_man_black(man, black);
            });

            if (placeToGoX != null){ 
                if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
                
                if (man.body.x - placeToGoX < -DISTANCE){
                   man.body.velocity.x = VELOCITY; 
                   dir = 'right';
                   manWalk = man.animations.play(dir);
                } 
                else if (man.body.x - placeToGoX > DISTANCE){
                   man.body.velocity.x = -VELOCITY; 
                   dir = 'left';
                   manWalk = man.animations.play(dir);
                } 
                else{ placeToGoX = 'null'; }
            } 
            
            if (placeToGoY != null){
                if (!(sfxSteps_pub.isPlaying)) sfxSteps_pub.play();
              
                if (man.body.y - placeToGoY < -DISTANCE){
                    man.body.velocity.y = VELOCITY; 
                    manWalk = man.animations.play(dir);
                }
                else if (man.body.y - placeToGoY > DISTANCE){
                    man.body.velocity.y = -VELOCITY;  
                    manWalk = man.animations.play(dir); 
                }
                else{ placeToGoY = 'null'; } 
            }
            
            if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();
            
        game.physics.arcade.collide(man, walls, function(){
            placeToGoY = 'null';
            placeToGoX = 'null';
        }, null, this);
    },
};

function createWall(cords){
    var x0, x1, y0, y1, startX, endX, startY, endY, sizeX, sizeY;
    
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

    walkingIcon = game.add.sprite(450, 350, 'walkingIcon');
    walkingIcon.scale.set(0.3,0.3);
}

function checkOverlap_man_black(_man, _black) {
    var boundsA = _man.getBounds();
    var boundsB = _black.getBounds();
    
    if (Phaser.Rectangle.intersects(boundsA, boundsB)) _black.kill();
    else{ _black.revive(); }
}