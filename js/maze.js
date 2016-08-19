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
    create: function(){
        maze = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'maze');
        
        change_music(maze_music);
        
        thisPlace = 'Maze';
        
        reset_inventory();
        
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(w = 0; w < mazeWalls.length; w++){ 
            create_maze_walls(mazeWalls[w]); 
        }
        
        create_maze_items();

        this.LIGHT_RADIUS = 70;
        LIGHT_RADIUS = this.LIGHT_RADIUS;

        this.shadowTexture = this.game.add.bitmapData(TOTAL_WIDTH, TOTAL_HEIGHT);

        var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

        this.flash = this.game.add.graphics(0, 0);
        this.flash.beginFill(0xffffff, 1);
        this.flash.drawRect(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
        this.flash.endFill();
        this.flash.alpha = 0;

        create_man(30, 185, 3);
        man.scale.set(0.33, 0.29);
        
        localStorage.setItem("stickman-location", thisPlace);
        
        fadeInScreen();

        mazeText = showManText('Sure is dark here!', 1200);   
    },
    
    update: function(){
            
            walk_update();

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
            
            if (man.x > 878){
                item = get_item('name', 'switch');
                
                item.tint = 0xc9a279;   
                interact_item(item);
            }
            
            if (placeToGoX == 'null' && placeToGoY == 'null') stop_man();
            
        game.physics.arcade.collide(man, walls, function(){
            placeToGoY = 'null';
            placeToGoX = 'null';
        }, null, this);
        
        this.updateShadowTexture(missions['switch_mission']);
    },

    updateShadowTexture: function(_switch_mission){ // Draw shadow
        if (_switch_mission) {
            this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
        } 
        else {
            this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
        }
        this.shadowTexture.context.fillRect(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);

        var posY = man.y;
        if (!this.game.device.desktop) {
            posY = man.y - (this.LIGHT_RADIUS/2);
        }

        var gradient = this.shadowTexture.context.createRadialGradient(
            man.x, posY, this.LIGHT_RADIUS * 0.75,
            man.x, posY, this.LIGHT_RADIUS);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(man.x, posY, this.LIGHT_RADIUS, 0, Math.PI * 2);
        this.shadowTexture.context.fill();
        this.shadowTexture.dirty = true;
        game.world.bringToTop(this.shadowTexture);
    }
};

function create_maze_walls(cords){
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

function create_maze_items(){
    reset_inventory();

    if (first_visit[thisPlace] == true){
        localStorage.setItem("stickman-item0" + thisPlace, JSON.stringify([ 'switch', true, false, 831, 358, true ]));
        
        first_visit[thisPlace] = false;
    }
    
    load_items_state();
}
