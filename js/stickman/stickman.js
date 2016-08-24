var game_main = function(game){
     TOTAL_WIDTH = 950;
     TOTAL_HEIGHT = 600;

     placeToGoX = null;
     placeToGoY = null;
     
     static_item_clicked = null;
     itemToTake = null;
     
     suspended = false;
     total_text_time = 0;

     items = [];
     
     dir = 'right';
};

game_main.prototype = {
    create: function(){
        game.world.setBounds(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
        game.state.start(place);
    },
};

function take_from_inventory(item){
   for(var i = 0; i < inventory.length; i++) {
       inventory[i].tint = '0xffffff';
       inventory[i].scale.set(1, 1);
   }
   if (item != null){
       item.tint = '0xc9a279';
       item.scale.set(1.25, 1.25);
   }
}

function stop_man(){    
    if (sfxSteps.isPlaying) sfxSteps.stop();  
    if (sfxSteps_pub.isPlaying) sfxSteps_pub.stop();

    man.body.velocity.x = 0;
    man.body.velocity.y = 0;
    
    if ( dir == 'right' ) man.frame = 3;
    else{ man.frame = 4; }   

    if (itemToTake != null && !itemToTake.isTaken && static_item_clicked == null && 
        Math.abs(man.body.x - itemToTake.x < 45) && Math.abs(man.body.y - itemToTake.y < 65)){
        take_item(itemToTake);  
        take_from_inventory(null); // in case user select from inventory and click a takeable item
    }
    else if (itemToTake != null && !itemToTake.isTaken){ // cancel selection 
        itemToTake.tint = 0xffffff;
        itemToTake = null;
    }
    
    if (itemToTake != null && itemToTake.isTaken){
        use_item(itemToTake, static_item_clicked); 
    }
    
    else if (static_item_clicked != null){
        interact_item(static_item_clicked);
    }
    
    placeToGoX = null;
    placeToGoY = null;
    
    man.animations.stop();
}

function kill_inventory_item(_item){
    _item.kill();
    
    var index = inventory.indexOf(_item);
    if (index > -1) inventory.splice(index, 1);
    
    static_item_clicked = null;
    itemToTake = null;
}

function add_item_to_inventory(_item, v){ 
    if (inventory.indexOf(_item) == -1){
        inventory.push(_item);
    }

    if (!v){
        for (i = 0; i < inventory.length; i++){
            try{
                get_item('name', inventory[i].key).fixedToCamera = false; // to move back the rest of the items
                get_item('name', inventory[i].key).y = 535;
                
                inventory[i].x = ((i + 1) * 50) + 100; 
                
                get_item('name', inventory[i].key).fixedToCamera = true;
            } catch(e){}
        }
    }
    
    _item.isTaken = true;
    _item.y = 535;
    _item.tint = 0xffffff;
    _item.fixedToCamera = true;    
    _item.anchor.set(0.5, 0.5);
    
    itemToTake = null;
}

function create_man(x, y, _frame){
    man = game.add.sprite(x, y, 'man');
    man.frame = _frame;
    game.physics.enable(man, Phaser.Physics.ARCADE);
    man.enableBody = true;
    man.inputEnabled = true;
    man.anchor.setTo(0.5, 0.5);
    
    if (_frame < 4){
        dir = 'right';
    }
    else{
        dir = 'left';
    }

    man.events.onInputDown.add(function(){ 
        showManText("It's me, Stickman.\nBut who am I? and what does it all mean?!", 0);
    }, this);
    
    man.animations.add('right', [0, 1, 2, 3], 15, true);
    man.animations.add('left', [4, 5, 6, 7], 15, true); 
    
    manText = game.add.text(0, 70, '' , {font: "20px " + font, fill: "#f9d5b2", align:'center', stroke: "0x000000", strokeThickness: 3});
    manText.anchor.setTo(0.5, 0.5);

    walkingIcon = game.add.sprite(350, 290, 'walkingIcon');
    walkingIcon.anchor.set(0.5, 0);
    
    if (thisPlace == 'maze'){
        walkingIcon.scale.set(0.45, 0.45);
    }
    
    game.camera.follow(man, Phaser.Camera.topdownFollow);
}

function walk_update(){
    walkingIcon.x = game.input.x + game.camera.x; 
    walkingIcon.y = game.input.y - 10 + game.camera.y;  

    if ( !(polyLine.contains(walkingIcon.x, walkingIcon.y)) &&
       (game.input.mousePointer.isDown || game.input.pointer1.isDown) && 
        suspended == false){ 
        placeToGoX = game.input.x + game.camera.x;
        placeToGoY = game.input.y - 10 + game.camera.y;
    }  
    
    if (itemToTake != null && itemToTake.isTaken) take_from_inventory(itemToTake);
}

function showManText(textToShow, timeToWait){    
    try{ clearTimeout(textTimer); } catch(e){}
    
    fade_text_time = 350;
    text_show_time = textToShow.length * 60;
    total_text_time = timeToWait + text_show_time + (fade_text_time * 1.5) + 50; 

    setTimeout(function(){
        manText.text = textToShow;

        manText.x = game.world.centerX - textToShow.length * 2.2;
        manText.y = 120;

        manText.fixedToCamera = true;
        manText.alpha = 1;
         
        showTextTween = game.add.tween(manText).from( { alpha: 0}, fade_text_time, Phaser.Easing.Sinusoidal.InOut, true); 
        
        showTextTween.onComplete.add(function(){
            textTimer = setTimeout(function(){ 
                alphaOut = game.add.tween(manText).to( { alpha: 0}, fade_text_time / 2, Phaser.Easing.Sinusoidal.InOut, true); 
            }, text_show_time);
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

function create_item(game, name, isLayered, isTakeable, x_cor, y_cor, visible, taken){
    items.push(new Item(
        game,
        name,
        isLayered,
        isTakeable, 
        x_cor,
        y_cor,
        visible,
        taken
    )); 
}

function reset_inventory(){
    items = [];
    
    line = game.add.sprite(96, TOTAL_HEIGHT - 100, 'line');
    line.alpha = 0.3;
    line.fixedToCamera = true;
       
    polyLine = new Phaser.Polygon([ 
        new Phaser.Point(96, TOTAL_HEIGHT - 100), new Phaser.Point(96 + line.width, TOTAL_HEIGHT - 100), 
        new Phaser.Point(96 + line.width, TOTAL_HEIGHT - 100 + line.height),
        new Phaser.Point(96, TOTAL_HEIGHT - 100 + line.height), new Phaser.Point(96, TOTAL_HEIGHT - 100)
    ]);

    var pseudoInventory = inventory;

    inventory = [];
   
    for (i = 0; i < pseudoInventory.length; i++){
        var x = ((i + 1) * 50) + 100; 
        var name = pseudoInventory[i].key;

        items.push(new Item(game, name, true, true, x, 535, true, true));
    }    
}

function tween_black(time, delay, going_to, _coming_from){
    setTimeout(function(){
        bigBlack = game.add.sprite(0, 0, 'bigBlack');
        bigBlack.alpha = 0;
        
        theTween = game.add.tween(bigBlack).to( { alpha: 1}, time, Phaser.Easing.Sinusoidal.InOut, true); 
        
        theTween.onComplete.add(function(){
            coming_from = _coming_from;
            game.state.start(going_to);  
        });
    }, delay);
}

function store_game_state(items, place){    
    
    var last_item = "stickman-item" + (items.length) + place;
     
    for (i = 0; i < items.length; i++){
        store.set("stickman-item" + i + place, 
        [
            items[i].name, 
            items[i].isLayered, 
            items[i].isTakeable, 
            items[i].x, 
            items[i].y, 
            items[i].sprite.visible, 
            items[i].sprite.isTaken
        ]);
    }

    if (store.get(last_item) != null && store.get(last_item) != undefined && store.get(last_item) != 'undefined'){ 
        store.remove(last_item);
    }
    
    inventory_keys = []; // saving the keys and not the sprite to avoid circular structure, grrrr
    
    for (i = 0; i < inventory.length; i++){
        var name = inventory[i].key;
        inventory_keys.push(name);
    } 
    
    store.set("stickman-inventory", inventory_keys);
}

function load_items_state(num_of_items){
    var i = 0;
    var num;
    
    if (num_of_items != null){
        num = num_of_items;
    } 
 
    while(store.get("stickman-item" + i + thisPlace) != null && store.get("stickman-item" + i + thisPlace) != undefined &&
        store.get("stickman-item" + i + thisPlace) != 'undefined' && i != num){
            
        var name = store.get("stickman-item" + i + thisPlace)[0];
        var isLayered = store.get("stickman-item" + i + thisPlace)[1];
        var isTakeable = store.get("stickman-item" + i + thisPlace)[2];
        var x_cor = store.get("stickman-item" + i + thisPlace)[3];
        var y_cor = store.get("stickman-item" + i + thisPlace)[4];
        var visible = store.get("stickman-item" + i + thisPlace)[5];
        var isTaken = store.get("stickman-item" + i + thisPlace)[6];
        
        if (!isTaken){
            create_item(game, name, isLayered, isTakeable, x_cor, y_cor, visible, isTaken);
        } 
        
        i++;
    }
}

function suspend(time_to_suspend){
    walkingIcon.visible = false;
    suspended = true;
    
    setTimeout(function(){
        suspended = false;
        walkingIcon.visible = true;
    }, time_to_suspend);
}

function mission_complete(_mission){
    missions[_mission] = true;
    store.set("stickman-mission_complete_" + _mission, true);
}

function check_mission(_mission){
    if (missions[_mission + '_mission'] == true){
        return true;
    }
    else{
        return false;
    }
}

function create_walls(cords){
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

function end_game(){ 
    suspended = true;

    tween_alpha(bigBlack, 1, 3000);
    
    timePassedText = game.add.text(40 + game.camera.x, 120, 'To be continued...' , {font: "68px " + font, fill: "#f7f7f7", align:'center'});
    timePassedText.alpha = 0;

    timePassedText2 = game.add.text(40 + game.camera.x, 245, 'October 31st, 2016' , {font: "48px " + font, fill: "#f7f7f7", align:'center'});
    timePassedText2.alpha = 0;

    tween_alpha(timePassedText, 1, 4500);            
    
    setTimeout(function(){
        tween_alpha(timePassedText2, 1, 4500);
    }, 3000); 
    
    image1 = game.add.image(0, 0, 'image1');
    image2 = game.add.image(351, 0, 'image2');
    image3 = game.add.image(0, 0, 'image3');
    image4 = game.add.image(351, 0, 'image4');
    
    image1.alpha = 0; image2.alpha = 0; image3.alpha = 0; image4.alpha = 0;
    
    image1.fixedToCamera = true; image2.fixedToCamera = true; image3.fixedToCamera = true; image4.fixedToCamera = true;
    
    setTimeout(function(){
        game.add.tween(timePassedText).to( { alpha: 0}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(timePassedText2).to( { alpha: 0}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(image1).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
        game.add.tween(image2).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
    }, 8000);  
    
    setTimeout(function(){
        tween_alpha(image1, 0, 4500);
        tween_alpha(image2, 0, 4500);
        tween_alpha(image3, 1, 4500);
        tween_alpha(image4, 1, 4500);
    }, 16000);   
    
    setTimeout(function(){
        tween_alpha(image3, 0, 4500);
        tween_alpha(image4, 0, 4500);

        gameOverTxt = game.add.text(70 + game.camera.x, 80, 'The StickMan\nAdventures', {font: "68px " + font, fill: "#f7f7f7", align:'center'});
        gameOverTxt2 = game.add.text(70 + game.camera.x, 300, 'Created by Johnny Tal\niLyich Games\njohnnytal9@gmail.com', {font: "42px " + font, fill: "#f7f7f7", align:'center'});
        gameOverTxt2.padding.set(10, 5);
        gameOverTxt.alpha = 0;
        gameOverTxt2.alpha = 0;
        tween_alpha(gameOverTxt, 1, 4500); 
     
        setTimeout(function(){ tween_alpha(gameOverTxt2, 1, 4500); }, 2000); 
        
        setTimeout(function(){ tween_alpha(gameOverTxt, 0, 4500);   }, 10000);  
        
        setTimeout(function(){ tween_alpha(gameOverTxt2, 0, 4500);   }, 14500);  
    }, 24000);              
}

function create_rain(){
    emitter = game.add.emitter(game.world.centerX, -100, 500);

    emitter.width = game.world.width;
    emitter.angle = 17;

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.2;
    emitter.maxParticleScale = 0.4;

    emitter.setYSpeed(300, 550);
    emitter.setXSpeed(-7, 7);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
}
