var hall = function(game){
    DISTANCE = 8;
    
   hallWalls = [
       [0, 375, 91, 310], [91, 361, 51, 244], [51, 244, 169, 253], 
       [169, 253, 433, 304], [433, 304, 475, 338], [475, 338, 477, 311], [477, 311, 786, 230], [786, 230, 950, 251],
       [0, TOTAL_HEIGHT, TOTAL_WIDTH, TOTAL_HEIGHT]
   ]; 
};

hall.prototype = {
    preload: function(){},
    
    create: function(){
        hall = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'hall');   
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < hallWalls.length; w++){ 
            createWall(hallWalls[w]); 
        }
        
        create_hall_items();
        create_man(60, 470, 'hall');

        fadeInScreen();
        
        showManText('That was kinda fun', 1000);
    },
    update: function(){
               
        walk_update();
        
        var pub_vel_x = 60 + (Math.abs(man.body.x - placeToGoX) / 1.35);
        var pub_vel_y = 60 + (Math.abs(man.body.y - placeToGoY) / 1.6);

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
            if (man.body.touching.left || man.body.touching.right) placeToGoX = 'null';
            
            else { placeToGoY = 'null'; }
        }, null, this);
        
        factor = (1.5 + (man.body.y / 80)) * 0.25; //scale man size
        man.scale.set(factor, factor);  
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
}

function create_hall_items(){
    drawLine();
    
    create_item( game, 'hall_door', false, false, 269, 184, true );
}