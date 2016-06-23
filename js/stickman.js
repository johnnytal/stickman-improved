var game_main = function(game){
     TOTAL_WIDTH = 950;
     TOTAL_HEIGHT = 600;

     ladderMission = false;
     stoneMission = false;
     drunkMission = false; 

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

        game.state.start("Hall");
    },
    
    update: function(){},
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

    if (itemToTake != null && !itemToTake.isTaken && static_item_clicked == null && Math.abs(man.body.x - itemToTake.x < 20)){
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

function interact_item(_static_item_clicked){  

    switch(_static_item_clicked.key){
        case 'door':
            showManText("The door is locked", 200);
            _static_item_clicked.alpha = 0;
        break;
        case 'man':
            showManText("It's me, Stickman", 0);
        break;
        case 'ladder_b':
            if (!window_mission()) showManText("Breaking & entry is no good unless i break something first", 0);
        break;
        case 'window':
             showManText("I can't reach", 0);
            _static_item_clicked.alpha = 0;
        break;
        case 'broken_window':
             if (!window_mission()) showManText("It's broken, but I can't reach it", 0);
             _static_item_clicked.alpha = 0.4;
        break;
        case 'pub_door':
            showManText("No, it's raining outside", 0);
        break;
        case 'barrel':
            showManText("Wouldn't mind getting drunk, but i'd had to open it first", 0);
        break;
        case 'dart_board':
            showManText("It's a dartboard. hmm, there's something funny about that bullseye", 0);
        break;
        case 'barrel_glass':
            showManText("Now I need something to hit the glass with... hmmm...", 0);
        break;
        case 'secret_door':
            showManText("It's a tunnel that leads into a system of catacombs!", 300);
            showManText("OK, I'm going in. It's not like I have anything better to do", 4100);

            setTimeout(function(){
                bigBlack = game.add.sprite(0, 0, 'bigBlack');
                bigBlack.alpha = 0;
                theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2000, Phaser.Easing.Sinusoidal.InOut, true); 
                theTween.onComplete.add(function(){
                   game.state.start("Maze");   
                }, this);
            },9000);
        break;
        case 'switch':
            fog.destroy();
            showManText("Too bad there was no switch on the other side", 700);
            
            setTimeout(function(){
                theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2000, Phaser.Easing.Sinusoidal.InOut, true); 
                theTween.onComplete.add(function(){
                   game.state.start("Hall");   
                }, this);
            },2500);
        break;
        case 'hall_door':
            showManText("This door is way too heavy to open without a key", 200);
        break;
    }   
    static_item_clicked = null;
    
    if (_static_item_clicked.tint != '0xffffff') _static_item_clicked.tint = '0xffffff';
    else { _static_item_clicked.alpha = 0; }
}

function window_mission(){
    if (ladderMission && stoneMission){
        showManText("Broken window, here I come!"); 

        setTimeout(function(){
            bigBlack = game.add.sprite(0, 0, 'bigBlack');
            bigBlack.alpha = 0;
            theTween = game.add.tween(bigBlack).to( { alpha: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true); 
            theTween.onComplete.add(function(){
                game.state.start("Pub");  
            });
        }, 3000);
        
        return true;
    }
    else{ 
        return false; 
    }
}

function take_item(item){
    switch(item.key){
        case 'ladder_s':
            showManText('This ladder fits right in my pocket!',500);
        break;
        case 'rock':
           if (!(ladderMission && stoneMission)) showManText('I will take that rock. because it rocks.', 0); 
           else { showManText('Rock, you are my only friend in this world', 0); }
        break;
        case 'glass':
            showManText('This shred of glass seems so useful', 0);
        break;
        case 'dart':
            showManText("It's a dart. I took stupider things then this i suppose", 0);
        break;
    }  
    
    item.isTaken = true;
    
    add_item_to_inventory(item);
    itemToTake = null; 
    
    sfxPocket.play();   
}

function use_item(inventory_item, static_item){
    inventory_item.scale.set(1, 1);
    
    if (static_item != null){
        var combined_items = inventory_item.key + ' + ' + static_item.key;
        
        switch(combined_items){
            case("ladder_s + door"):
                showManText("I can reach it without the ladder", 0);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case("ladder_s + window"):
            case("ladder_s + broken_window"):
                sfxPut_ladder.play();
            
                showManText("I'm sure that won't look suspicious to anyone", 300);
                get_item('name', 'ladder_b').visible = true;
                kill_inventory_item(inventory_item);
                
                ladderMission = true;
                
                if (static_item.key == 'window'){
                    static_item.alpha = 0; 
                }
            break;
            
            case("rock + door"):
                showManText("Stoning the door won't help", 0);
                add_item_to_inventory(inventory_item);  
                static_item.alpha = 0;
            break;
            
            case("rock + ladder_b"):
                showManText("That might break the ladder", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case('rock + window'):
                showManText("Take that window!", 200);
                
                setTimeout(function(){
                    sfxBreak_window.play();
                },700);
                
                setTimeout(function(){                    
                    kill_inventory_item(inventory_item);
                    stoneMission = true;
                    static_item.destroy();

                    get_item('name', 'broken_window').visible = true;
                }, 1150);
            break;
            
            case ('glass + pub_door'):
                showManText('"Stickman was here". There. I did it.', 200);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('rock + pub_door'):
                showManText("Stickmen who lives in an abonded pub shouldn't throw stones", 0);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('dart + dart_board'):
                sfxDart.play();
                
                if (!drunkMission){
                    setTimeout(function(){   
                        create_item( game, 'dart', true, true, 480, 217, true );
                    },300);

                    showManText("I suck at this", 1000);
                }
                
                else{
                    create_item( game, 'dart', true, false, 547, 191, true );
                    
                    showManText("Bullseye! guess i'm better at this when i'm drunk", 500);
                    showManText("What's that noise?", 4500);
                    
                    setTimeout(function(){ sfxSecret_door.play(); }, 2000);
                    setTimeout(function(){ get_item('name', 'secret_door').visible = true; }, 5300);
                }
                
                kill_inventory_item(inventory_item);
                static_item_clicked = null;
                itemToTake = null;
            break;
            
            case ('dart + barrel'):
                showManText("I guess it makes sense", 0);
                showManText("Nope. poking the barrel just makes it angry", 3000);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('dart + pub_door'):
                showManText("The owner might catch me do it", 0);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('rock + barrel'):
                showManText("That's a bad way to open a barrel, I need something sharp... hmmm...", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + dart_board'):
            case ('rock + dart_board'):
                showManText("That might damage the dart board", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + barrel'):
                showManText("It's worth a shot", 0);
                setTimeout(function(){
                    sfxPut_glass.play();
                    kill_inventory_item(inventory_item);
                    
                    get_item('name', 'barrel').kill();
                    get_item('name', 'barrel_glass').visible = true;
                },700);
            break;
            
            case ('rock + barrel_glass'):
                showManText("OK, here we go...", 0);

                setTimeout(function(){  
                    sfxOpen_barrel.play();
                    kill_inventory_item(inventory_item);              
                }, 1500);
                
                setTimeout(function(){
                    get_item('name', 'barrel_glass').kill();
                    get_item('name', 'barrel_open').visible = true;

                    timePassedText = game.add.text(300, 200, '2 Hours Later' , {font: "72px " + font, fill: "#f7f7f7", align:'center'});
                    timePassedText.alpha = 0;
                    
                    theTween = game.add.tween(bigBlack).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 
                    game.add.tween(timePassedText).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 

                    theTween.onComplete.add(function(){
                       game.add.tween(bigBlack).to( { alpha: 0}, 3000, Phaser.Easing.Sinusoidal.InOut, true);  
                       game.add.tween(timePassedText).to( { alpha: 0}, 3000, Phaser.Easing.Sinusoidal.InOut, true);  
                    }, this);
                    
                }, 2750);
                
                showManText("I'll just have a little sip...", 3000);

                setTimeout(function(){
                    get_item('name', 'barrel_open').kill();
                    get_item('name', 'barrel_empty').visible = true;
                }, 8000);
                
                showManText("I'm Bobbin. Are you my mother? * Hic *", 9500); //lucasatrs reference
                
                drunkMission = true;
            break;
        }
        
        static_item.tint = 0xffffff;
    } 
    
    else{
        showManText("These objects can't possibly interact", 0);
        add_item_to_inventory(inventory_item);     
    }
    
    static_item_clicked = null;
    
    inventory_item.tint = 0xffffff;
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
        inventory[i].x = ((i + 1) * 50) + 20;    
    } 

    item.y = 535;
    item.tint = 0xffffff;
    item.fixedToCamera = true;    
    item.anchor.set(0.5, 0.5);
    
    itemToTake = null;
}

function create_man(x, y, where){
    man = game.add.sprite(x, y, 'man');
    man.events.onInputDown.add(function(){ Item.interact(); }, this);
    man.frame = 3;
    game.physics.enable(man, Phaser.Physics.ARCADE);
    man.enableBody = true;
    man.anchor.setTo(0.5, 0.5);
    
    man.animations.add('right', [0, 1, 2, 3], 15, true);
    man.animations.add('left', [4, 5, 6, 7], 15, true); 
    
    manText = game.add.text(0, 0, '' , {font: "18px " + font, fill: "#f9d5b2", align:'center', stroke: "0x000000", strokeThickness: 2});
    manText.anchor.setTo(0.5, 0.5);

    walkingIcon = game.add.sprite(450, 350, 'walkingIcon');
    if (where == 'maze'){
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
        textTimer = setTimeout(function(){ manText.text = '';}, 400 + textToShow.length * 60);
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
    emitter.angle = 15;

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
}

function loadSfx(){
    sfxBreak_window = game.add.audio('sfxBreak_window');
    sfxDart = game.add.audio('sfxDart');
    sfxPocket = game.add.audio('sfxPocket');
    sfxPut_ladder = game.add.audio('sfxPut_ladder');
    sfxRain = game.add.audio('sfxRain', true, 0.7);
    sfxSteps = game.add.audio('sfxSteps', true);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel');
    sfxPut_glass = game.add.audio('sfxPut_glass');
    sfxRain_indoors = game.add.audio('sfxRain_indoors', 0.6, true);
    sfxSecret_door = game.add.audio('sfxSecret_door');
    sfxSteps_pub = game.add.audio('sfxSteps_pub', true);
}

function fadeInScreen(){
    bigBlack = game.add.sprite(0, 0, 'bigBlack');
    game.add.tween(bigBlack).to( { alpha: 0}, 1000, Phaser.Easing.Sinusoidal.InOut, true);  
}

function drawLine(){
    line = game.add.sprite(26, TOTAL_HEIGHT - 100, 'line');
    line.alpha = 0.4;
    line.fixedToCamera = true;
}
