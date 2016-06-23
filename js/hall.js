var hall = function(game){
    MAN_VEL_X = 200;
    MAN_VEL_Y = 48;
    
    MIDDLE = (TOTAL_WIDTH / 2) - 27;
};

hall.prototype = {
    preload: function(){},
    
    create: function(){
        hall = game.add.tileSprite(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT, 'hall');   
        create_man(60, 470, 'hall');
        showManText('That was kinda fun', 1000);
        
        fadeInScreen();
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
        
        factor = (1.7 + (man.body.y / 100)) * 0.2; //scale man size
        man.scale.set(factor, factor);  
    },
};