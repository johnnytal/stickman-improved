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
     
     var emitter;
};

game_main.prototype = {
    create: function(){
        game.world.setBounds(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
        
        loadSfx();

        game.state.start("Street");
    },
    
    update: function(){},
};

function take_from_inventory(item){
    item.fixedToCamera = false;
    item.x = game.input.x + game.camera.x;
    item.y = game.input.y + game.camera.y + item.width - 50;  
}

function stop_man(){    
    if (sfxSteps.isPlaying) sfxSteps.stop();
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
            if (!window_mission()) showManText("Breaking & entry is no good\n unless i break something first", 0);
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
            showManText("Wouldn't mind getting drunk,\n but i'd had to open it first", 0);
        break;
        case 'dart_board':
            showManText("It's a dartboard.\n hmm, there's something funny about that bullseye", 0);
        break;
        case 'barrel_glass':
            showManText("Now I need something to hit the glass with... hmmm...", 0);
        break;
        case 'secret_door':
            showManText("It's a tunnel that leads into a system of catacombs!", 300);
            showManText("OK, I'm going in.\n It's not like I have anything better to do", 4100);
            
            setTimeout(function(){ 
                fadeOverlay(); 
            },6500);
            setTimeout(function(){
                game.state.start("Maze");
            },9000);
        break;
        case 'switch':
            fog.destroy();
            showManText("Too bad there was no switch\n on the other side", 700);
        break;
    }   
    static_item_clicked = null;
}

function window_mission(){
    if (ladderMission && stoneMission){
        showManText("Broken window, here I come!"); 
        
        fadeOverlay();
        
        setTimeout(function(){
            game.state.start("Pub");
        },3000);
        
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
           if (!(ladderMission && stoneMission)) showManText('I will take that rock.\n because it rocks.', 0); 
           else { showManText('Rock, you are my only friend in this world', 0); }
        break;
        case 'glass':
            showManText('This shred of glass seems so useful', 0);
        break;
        case 'dart':
            showManText("It's a dart.\n I took stupider things then this i suppose", 0);
        break;
    }  
    
    item.isTaken = true;
    
    add_item_to_inventory(item);
    itemToTake = null; 
    
    sfxPocket.play();   
}

function use_item(inventory_item, static_item){
    if (static_item != null){
        var combined_items = inventory_item.key + ' + ' + static_item.key;
        
        switch(combined_items){
            case("ladder_s + door"):
                showManText("I can reach it without the ladder", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case("ladder_s + window"):
            case("ladder_s + broken_window"):
                sfxPut_ladder.play();
            
                showManText("That's a perfect place for a ladder", 300);
                get_item('name', 'ladder_b').visible = true;
                kill_inventory_item(inventory_item);
                
                ladderMission = true; 
            break;
            
            case("rock + door"):
                showManText("Stoning the door won't help", 0);
                add_item_to_inventory(inventory_item);  
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
            break;
            
            case ('rock + pub_door'):
                showManText("Stickmen who lives in an abonded pub\n shouldn't throw stones", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('dart + dart_board'):
                sfxDart.play();
                
                if (!drunkMission){
                    setTimeout(function(){             
                        inventory_item.x = 480;
                        inventory_item.y = 217;
                    },300);

                    showManText("I suck at this", 1000);
                }
                
                else{
                    inventory_item.x = 547;
                    inventory_item.y = 191;
                    
                    showManText("Bullseye! guess i'm better at this when i'm drunk", 500);
                    
                    setTimeout(function(){ sfxSecret_door.play(); }, 2000);
                    showManText("Hey, what is this noise?", 4000);
                    setTimeout(function(){ get_item('name', 'secret_door').visible = true; }, 5300);
                }
                
                inventory.splice(inventory.indexOf(inventory_item), 1);
                static_item_clicked = null;
                itemToTake = null;
            break;
            
            case ('dart + barrel'):
                showManText("That won't open the barrel,\n It's more likely I'll just break the dart", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('dart + pub_door'):
                showManText("I'm afraid the owener will catch me", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('rock + barrel'):
                showManText("That's a bad way to open a barrel,\n I should use something sharp... hmmm...", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + dart_board'):
            case ('rock + dart_board'):
                showManText("That doesn't feel right", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + barrel'):
                showManText("It's worth a shot", 0);
                setTimeout(function(){
                    sfxPut_glass.play();
                    
                    inventory_item.x = 727;
                    inventory_item.y = 240;
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
                }, 2750);
                
                showManText("I'll just have a little sip...", 3500);
               
                setTimeout(function(){
                    $('#overlay').fadeTo(1000,1).css('z-index','200');
                    $('#message').html('2 hours later...');
                }, 7000);
                
                setTimeout(function(){
                    $('#overlay').fadeTo(1000,0, function(){
                        $('#overlay').css('z-index','1');  
                    });
                    
                    get_item('name', 'barrel_open').kill();
                    get_item('name', 'barrel_empty').visible = true;
                    
                }, 9000);
                
                showManText("I'm Bobbin. Are you my mother? *Hic*", 10000); //lucasatrs reference
                
                drunkMission = true;
            break;
        }
    } 
    else{
        showManText("These objects\n can't possibly interact", 0);
        add_item_to_inventory(inventory_item);     
    }
    
    static_item_clicked = null;
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
    
    for (i=0; i<inventory.length; i++){
        inventory[i].x = WIDTH - ((i + 1) * 50);    
    } 

    item.y = 8;
    item.tint = 0xffffff;
    item.fixedToCamera = true;    
    
    itemToTake = null;
}

function create_man(x, y){
    man = game.add.sprite(x, y, 'man');
    man.events.onInputDown.add(function(){ Item.interact(); }, this);
    man.frame = 3;
    game.physics.enable(man, Phaser.Physics.ARCADE);
    man.enableBody = true;
    man.anchor.setTo(0.5, 0.5);
    
    man.animations.add('right', [0, 1, 2, 3], 15, true);
    man.animations.add('left', [4, 5, 6, 7], 15, true); 
    
    manText = game.add.text(0, 0, '' , {font: "16px " + font, fill: "#f9d5b2"});
    manText.anchor.setTo(0.5, 0.5);
    
    walkingIcon = game.add.sprite(450, 350, 'walkingIcon');
}

function walk_update(){
    walkingIcon.x = game.input.x + game.camera.x; 
    walkingIcon.y = game.input.y - 10 + game.camera.y;   
    
    if ((game.input.mousePointer.isDown || game.input.pointer1.isDown) && game.input.y > 50){
        placeToGoX = game.input.x + game.camera.x;
        placeToGoY = game.input.y - 10 + game.camera.y;
    }  
    
    if (itemToTake != null && itemToTake.isTaken) take_from_inventory(itemToTake);
}

function showManText(textToShow, timeToWait){    
    try{ clearTimeout(textTimer); }catch(e){}

    var textLocation = (man.x > game.world.centerX) ? man.x - textToShow.length : man.x + (textToShow.length / 2);
    
    setTimeout(function(){
        manText.text = textToShow;
        manText.x = textLocation;
        manText.y = man.body.y - 50;
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

function fadeOverlay(){
    $('#message').html('');
    
    setTimeout(function(){ $('#overlay').fadeTo(1000,1).css('z-index','200'); },1500); 
    
    setTimeout(function(){
        $('#overlay').fadeTo(1000,0, function(){
            $('#overlay').css('z-index','1');   
        }); 
    },3000);
}

function loadSfx(){
    sfxBreak_window = game.add.audio('sfxBreak_window');
    sfxDart = game.add.audio('sfxDart');
    sfxPocket = game.add.audio('sfxPocket');
    sfxPut_ladder = game.add.audio('sfxPut_ladder');
    sfxRain = game.add.audio('sfxRain', true);
    sfxSteps = game.add.audio('sfxSteps', true);
    sfxOpen_barrel = game.add.audio('sfxOpen_barrel');
    sfxPut_glass = game.add.audio('sfxPut_glass');
    sfxRain_indoors = game.add.audio('sfxRain_indoors', 0.5, true);
    sfxSecret_door = game.add.audio('sfxSecret_door');
    sfxSteps_pub = game.add.audio('sfxSteps_pub', true);
}
