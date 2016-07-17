var game_main = function(game){
     TOTAL_WIDTH = 950;
     TOTAL_HEIGHT = 600;

     ladderMission = false;
     stoneMission = false;
     stoneMission2 = false;
     drunkMission = false; 
     switchMission = false;

     placeToGoX = null;
     placeToGoY = null;
     
     static_item_clicked = null;
     itemToTake = null;

     inventory = [];
     items = [];
     
     dir = 'right';
     
     var emitter;
};

game_main.prototype = {
    create: function(){
        game.world.setBounds(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
        
        loadSfx();
        
        game.state.start(place);
    },
};

function take_from_inventory(item){
   for(var i = 0; i < inventory.length; i++) {
       inventory[i].tint = '0xffffff';
       inventory[i].scale.set(1, 1);
   }
   item.tint = '0xc9a279';
   item.scale.set(1.25, 1.25);
}

function stop_man(){    
    if (sfxSteps.isPlaying){
         sfxSteps.stop();
     }
    if (sfxSteps_pub.isPlaying) sfxSteps_pub.stop();
    
    man.animations.stop();
    man.body.velocity.x = 0;
    man.body.velocity.y = 0;
    
    if ( dir == 'right' ) man.frame = 3;
    else{ man.frame = 4; }   

    if (itemToTake != null && !itemToTake.isTaken && static_item_clicked == null && Math.abs(man.body.x - itemToTake.x < 40)){
        take_item(itemToTake);      
    }
    
    if (itemToTake != null && itemToTake.isTaken){
        use_item(itemToTake, static_item_clicked);
    }
    
    else if (static_item_clicked != null){
        interact_item(static_item_clicked);
    }
    
    placeToGoX = null;
    placeToGoY = null;
}

function kill_inventory_item(inventory_item){
    inventory_item.kill();
    
    var index = inventory.indexOf(inventory_item);
    if (index > -1) inventory.splice(index, 1);
    
    static_item_clicked = null;
    itemToTake = null;
}

function add_item_to_inventory(item){
    item.isTaken = true;
    if (inventory.indexOf(item) == -1) inventory.push(item);
    
    for (i = 0; i < inventory.length; i++){
        inventory[i].x = ((i + 1) * 50) + 100;    
    } 

    item.y = 535;
    item.tint = 0xffffff;
    item.fixedToCamera = true;    
    item.anchor.set(0.5, 0.5);
    
    itemToTake = null;
}

function create_man(x, y){
    man = game.add.sprite(x, y, 'man');
    man.frame = 3;
    game.physics.enable(man, Phaser.Physics.ARCADE);
    man.enableBody = true;
    man.inputEnabled = true;
    man.anchor.setTo(0.5, 0.5);
    
    man.events.onInputDown.add(function(){ 
        showManText("It's me, Stickman.\nBut who am i? and what does all that mean?!", 0);
    }, this);
    
    man.animations.add('right', [0, 1, 2, 3], 15, true);
    man.animations.add('left', [4, 5, 6, 7], 15, true); 
    
    manText = game.add.text(0, 70, '' , {font: "20px " + font, fill: "#f9d5b2", align:'center', stroke: "0x000000", strokeThickness: 3});
    manText.anchor.setTo(0.5, 0.5);

    walkingIcon = game.add.sprite(450, 350, 'walkingIcon');
    walkingIcon.anchor.set(0.5, 0);
    
    if (thisPlace == 'maze'){
        walkingIcon.scale.set(0.45, 0.45);
    }
    
    game.camera.follow(man, Phaser.Camera.topdownFollow);
}

function walk_update(){
    walkingIcon.x = game.input.x + game.camera.x; 
    walkingIcon.y = game.input.y - 10 + game.camera.y;   
    
    if ((game.input.mousePointer.isDown || game.input.pointer1.isDown) && game.input.y < 470){
        placeToGoX = game.input.x + game.camera.x;
        placeToGoY = game.input.y - 10 + game.camera.y;
    }  
    
    if (itemToTake != null && itemToTake.isTaken) take_from_inventory(itemToTake);
}

function showManText(textToShow, timeToWait){    
    try{ clearTimeout(textTimer); } catch(e){}

    setTimeout(function(){
        manText.text = textToShow;

        manText.x = game.world.centerX - textToShow.length * 2;
        manText.y = 70;

        manText.fixedToCamera = true;
        manText.alpha = 1;
         
        showTextTween = game.add.tween(manText).from( { alpha: 0}, 400, Phaser.Easing.Sinusoidal.InOut, true); 
        
        showTextTween.onComplete.add(function(){
            textTimer = setTimeout(function(){ 
                alphaOut = game.add.tween(manText).to( { alpha: 0}, 150, Phaser.Easing.Sinusoidal.InOut, true); 
            }, textToShow.length * 65);
        });
    }, timeToWait);
}

function get_item(attr, value) {
    for(var i = 0; i < items.length; i++) {
        if(items[i][attr] === value) {
            return items[i].sprite;
        }
    }
}

function create_item(game, name, isLayered, isTakeable, x_cor, y_cor, visible){
    items.push(new Item(
        game, 
        name,
        isLayered,
        isTakeable, 
        x_cor,
        y_cor,
        visible
    ));    
}

function create_rain(){
    sfxRain.play();
 
    emitter = game.add.emitter(game.world.centerX, -100, 500);

    emitter.width = game.world.width;
    emitter.angle = 17;

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    emitter.setYSpeed(350, 650);
    emitter.setXSpeed(-7, 7);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
}

function loadSfx(){
    sfxBreak_window = game.add.audio('sfxBreak_window', 1, false);
    sfxDart = game.add.audio('sfxDart', 1, false);
    sfxPocket = game.add.audio('sfxPocket', 1, false);
    sfxPut_ladder = game.add.audio('sfxPut_ladder', 1, false);
    sfxRain = game.add.audio('sfxRain', 0.7, true);
    sfxSteps = game.add.audio('sfxSteps', 1, true);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel', 1, false);
    sfxPut_glass = game.add.audio('sfxPut_glass', 1, false);
    sfxRain_indoors = game.add.audio('sfxRain_indoors', 0.6, true);
    sfxSecret_door = game.add.audio('sfxSecret_door', 1, false);
    sfxSteps_pub = game.add.audio('sfxSteps_pub', 1, true);
    sfxLight_switch = game.add.audio('sfxLight_switch', 0.6, false);
}

function drawLine(){
    line = game.add.sprite(26, TOTAL_HEIGHT - 100, 'line');
    line.alpha = 0.4;
    line.fixedToCamera = true;
}

function endTheGame(){ 
    tweenAlpha(bigBlack, 1, 3000);
    
    timePassedText = game.add.text(25 + game.camera.x, 150, 'To be continued...' , {font: "68px " + font, fill: "#f7f7f7", align:'center'});
    timePassedText.alpha = 0;

    timePassedText2 = game.add.text(25 + game.camera.x, 275, 'When StickMan reaches\n1,000 downloads...' , {font: "48px " + font, fill: "#f7f7f7", align:'center'});
    timePassedText2.alpha = 0;

    tweenAlpha(timePassedText, 1, 4500);            
    
    setTimeout(function(){
        tweenAlpha(timePassedText2, 1, 4500);
    }, 3000); 
    
    image1 = game.add.image(0, 0, 'image1');
    image2 = game.add.image(351, 0, 'image2');
    image3 = game.add.image(0, 0, 'image3');
    image4 = game.add.image(351, 0, 'image4');
    image1.alpha = 0;
    image2.alpha = 0;
    image3.alpha = 0;
    image4.alpha = 0;
    image1.fixedToCamera = true;
    image2.fixedToCamera = true;
    image3.fixedToCamera = true;
    image4.fixedToCamera = true;
    
    setTimeout(function(){
        game.add.tween(timePassedText).to( { alpha: 0}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(timePassedText2).to( { alpha: 0}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(image1).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(image2).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
    }, 8000);  
    
    setTimeout(function(){
        tweenAlpha(image1, 0, 4500);
        tweenAlpha(image2, 0, 4500);
        tweenAlpha(image3, 1, 4500);
        tweenAlpha(image4, 1, 4500);
    }, 16000);   
    
    setTimeout(function(){
        tweenAlpha(image3, 0, 4500);
        tweenAlpha(image4, 0, 4500);

        gameOverTxt = game.add.text(25 + game.camera.x, 100, 'The StickMan\nAdventures', {font: "68px " + font, fill: "#f7f7f7", align:'center'});
        gameOverTxt2 = game.add.text(25 + game.camera.x, 320, 'Created by Johnny Tal -\niLyich Games', {font: "42px " + font, fill: "#f7f7f7", align:'center'});
        gameOverTxt.alpha = 0;
        gameOverTxt2.alpha = 0;
        tweenAlpha(gameOverTxt, 1, 4500);  
        
        setTimeout(function(){
            tweenAlpha(gameOverTxt2, 1, 4500);
        }, 2000); 
        
        setTimeout(function(){
            tweenAlpha(gameOverTxt, 0, 4500);  
            tween = game.add.tween(gameOverTxt2).to( { alpha: 0}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
            tween.onComplete.add(function(){
               game.state.start('Preloader');
            });
        }, 10000); 
    }, 24000);              
}

function showAd(){
    try{
        interstitial.show();
    } catch(e){}       
}

function tweenAlpha(what, where, time){
    game.add.tween(what).to( { alpha: where}, time, Phaser.Easing.Sinusoidal.InOut, true); 
}

