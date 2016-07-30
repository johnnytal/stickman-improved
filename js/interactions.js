function interact_item(_static_item_clicked){  
    switch(_static_item_clicked.key){
        
        case 'door':
            showManText("The door is locked", 200);
            _static_item_clicked.alpha = 0;
        break;
        
        case 'ladder_b':
            if (ladderMission && !stoneMission){
                showManText("No point, the window seems closed from the inside", 0);
            }
        break;
        
        case 'window':
             if (!ladderMission){
                 showManText("Stickmen can't jump", 0);
             }
             else if (ladderMission && !stoneMission){
                 showManText("No point, the window seems closed from the inside", 0);
             }
             
            _static_item_clicked.alpha = 0; 
        break;
        
        case 'broken_window': 
             if (stoneMission && !ladderMission){
                 showManText("Stickmen can't jump", 0);
             }
             else if (stoneMission && ladderMission) {
                 window_mission();
             }
             
             _static_item_clicked.alpha = 0.4;
        break;
        
        case 'pub_door':
            showManText("Naa, it's still raining outside", 0);
        break;
       
        case 'barrel':
            showManText("I wouldn't mind getting drunk,\nbut i'd had to open it first", 0);
        break;
        
        case 'dart_board':
            if (!drunkMission){
                showManText("It's a dartboard.\nhmm, there's something funny about that bullseye", 0);  
            }
            else{ 
                showManText("I knew there was something funny about that bullseye!", 0); 
            }
        break;
        
        case 'barrel_glass':
            showManText("I need something to hit the glass with... hmmm...", 0);
        break;
        
        case 'barrel_empty':
            showManText("I'ts empty now. someone must have drank it! * Hic *", 0);
        break;
        
        case 'secret_door':
            showManText("It's a tunnel that leads into a system of catacombs!", 300);
            showManText("Let's go, Maybe that's where they keep the extra barrels", total_text_time);

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
            if (!switchMission){
                switchMission = true;
                sfxLight_switch.play();
                
                showManText("Too bad there was no switch on the other side", 750);
                
                setTimeout(function(){
                    theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2300, Phaser.Easing.Sinusoidal.InOut, true); 
                    game.add.tween(man).to( { alpha: 0}, 2300, Phaser.Easing.Sinusoidal.InOut, true); 
                    theTween.onComplete.add(function(){
                       game.state.start("Hall");   
                    }, this);
                },3000);
            }
        break;
        
        case 'hall_door':
            showManText("I don't have a key, and it's way too heavy to break down", 200);
        break;
        
        case 'hall_window':
            showManText("It's a closed window", 0);
        break;
        
        case 'hall_window_broken':
            stoneMission2 = true;
            showManText("It looks like someone really wants me to take this jump.\nHere goes nothing...", 0);
            
            setTimeout(function(){
                
                hall_music.fadeOut();

                bigBlack = game.add.sprite(0, 0, 'bigBlack');
                bigBlack.alpha = 0;
                theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2000, Phaser.Easing.Sinusoidal.InOut, true); 
                
                theTween.onComplete.add(function(){
                   man.kill();
                   newMan = game.add.sprite(TOTAL_WIDTH / 2, 0, 'man');
                   newMan.scale.set(0.7, 0.7); 
                   newManTween = game.add.tween(newMan).to( { y: 750}, 4650, Phaser.Easing.Sinusoidal.InOut, true); 
                   game.add.tween(newMan).to( { angle: 180}, 2650, Phaser.Easing.Sinusoidal.InOut, true); 
                   
                   street_music.play();
                   
                   newManTween.onComplete.add(function(){
                       game.state.start("Room"); 
                   });
                }, this);
            }, total_text_time);
        break;
        
        case 'computer':
            stoneMission2 = true;
            showManText("Hey, this looks exactly like...", 0);
            
            setTimeout(function(){
                johnnyText = game.add.text(300, 250, '...You' , {font: "22px " + font, fill: "#d5f9a4", align:'center', stroke: "0x000000", strokeThickness: 3});
                johnnyText.alpha = 0;
                game.add.tween(johnnyText).to( { alpha: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
            }, 1400);

            setTimeout(function(){
                game.add.tween(johnnyText).to( { alpha: 0}, 2750, Phaser.Easing.Sinusoidal.InOut, true);
                endTheGame();
            }, 4900);
        break;
    }   
    
    static_item_clicked = null;
    
    if (_static_item_clicked.tint != '0xffffff') _static_item_clicked.tint = '0xffffff';
    else { _static_item_clicked.alpha = 0; }
}

function window_mission(){
    if (ladderMission && stoneMission){
        walkingIcon.visible = false;
        showManText("Broken window, here I come!", 0); 

        setTimeout(function(){
            bigBlack = game.add.sprite(0, 0, 'bigBlack');
            bigBlack.alpha = 0;
            theTween = game.add.tween(bigBlack).to( { alpha: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true); 
            theTween.onComplete.add(function(){
                game.state.start("Pub");  
            });
        }, total_text_time);
        
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
           if (thisPlace == 'street') showManText('I will take this rock. because it rocks.', 0); 
           else if (thisPlace == 'pub') { showManText("Rock, you're my only friend in this world", 0); }
           else if (thisPlace == 'hall') { showManText("Stone ex-machina.\nHow did it even get here?!", 0); }
           else if (thisPlace == 'room') { showManText("You've got to be kidding me.", 800); }
        break;
        
        case 'glass':
            showManText("At least I'd clean after myself", 0);
        break;
        
        case 'dart':
            showManText("Someone carelessly left this dart here", 0);
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
            case("rock + hall_door"):
                showManText("Stoning the door won't help", 0);
                add_item_to_inventory(inventory_item);  
                static_item.alpha = 0;
            break;
            
            case("rock + ladder_b"):
                showManText("That might break the ladder", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case('rock + window'):
                walkingIcon.visible = false;
                showManText("Take that window!", 200);
                
                setTimeout(function(){
                    sfxBreak_window.play();
                }, 700);
                
                setTimeout(function(){                    
                    kill_inventory_item(inventory_item);
                    stoneMission = true;
                    static_item.destroy();

                    get_item('name', 'broken_window').visible = true;
                    walkingIcon.visible = true;
                }, 1150);
            break;
            
            case ('glass + pub_door'):
                showManText('"Stickman was here". There. I did it.', 200);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('rock + pub_door'):
                showManText("Stickmen who lives in abonded pubs shouldn't throw stones", 0);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('dart + dart_board'):
                walkingIcon.visible = false;
                sfxDart.play();
                
                if (!drunkMission){
                    setTimeout(function(){   
                        create_item( game, 'dart', true, true, 480, 217, true );
                        walkingIcon.visible = true;
                    },300);

                    showManText("I suck at this", 1000);
                }
                
                else{
                    walkingIcon.visible = false;
                    
                    create_item( game, 'dart', true, false, 538, 185, true );
                    get_item('name', 'dart').tint = 0xffddff; 

                    showManText("Bullseye! i'm alot better at this when i'm drunk!", 500);
                    showManText("Hey what's that noise?", 4500);
                    
                    setTimeout(function(){ sfxSecret_door.play(); }, 2000);
                    
                    setTimeout(function(){ 
                        get_item('name', 'secret_door').visible = true; 
                        walkingIcon.visible = true;
                   }, 5300);
                }
                
                kill_inventory_item(inventory_item);
                static_item_clicked = null;
                itemToTake = null;
            break;
            
            case ('dart + barrel'):
            case ('dart + barrel_glass'):
                walkingIcon.visible = false;
                showManText("I guess that makes sense", 0);
                showManText("Nope. poking the barrel just makes it angrier", 3000);
                setTimeout(function(){ 
                    walkingIcon.visible = true;
                    add_item_to_inventory(inventory_item); 
                }, 3000);
            break;
            
            case ('dart + pub_door'):
                showManText("The owner might catch me do it", 0);
                add_item_to_inventory(inventory_item); 
                static_item.alpha = 0;
            break;
            
            case ('rock + barrel'):
                showManText("That's a bad way to open a barrel,\nI need something sharp... hmmm...", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + dart_board'):
            case ('rock + dart_board'):
                showManText("That might damage the dartboard", 0);
                add_item_to_inventory(inventory_item); 
            break;
            
            case ('glass + barrel'):
                walkingIcon.visible = false;
                showManText("It's worth a shot", 0);
                setTimeout(function(){
                    sfxPut_glass.play();
                    kill_inventory_item(inventory_item);
                    
                    get_item('name', 'barrel').kill();
                    get_item('name', 'barrel_glass').visible = true;
                    
                    walkingIcon.visible = true;
                }, 700);
            break;
            
            case ('rock + barrel_glass'):
                walkingIcon.visible = false;
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
                    
                    theTween = game.add.tween(bigBlack).to( { alpha: 1}, 4200, Phaser.Easing.Sinusoidal.InOut, true); 
                    game.add.tween(timePassedText).to( { alpha: 1}, 4500, Phaser.Easing.Sinusoidal.InOut, true); 

                    theTween.onComplete.add(function(){
                       game.add.tween(bigBlack).to( { alpha: 0}, 3000, Phaser.Easing.Sinusoidal.InOut, true);  
                       game.add.tween(timePassedText).to( { alpha: 0}, 2900, Phaser.Easing.Sinusoidal.InOut, true);  
                    }, this);
                    
                }, 2750);
                
                showManText("Just a little sip...", 2800);

                setTimeout(function(){
                    get_item('name', 'barrel_open').kill();
                    get_item('name', 'barrel_empty').visible = true;
                    walkingIcon.visible = true;
                    
                    man.x = 728;
                    man.y = 313;
                    man.frame = 4;
                    dir == 'left';
                }, 7000);
                
                showManText("I'm Bobbin. Are you my mother? * Hic *", 9500); //lucasatrs reference
                
                drunkMission = true;
            break;
            
            case ('rock + hall_window'):
                walkingIcon.visible = false;
                showManText("That feels awfully familiar", 200);
                
                setTimeout(function(){
                    sfxBreak_window.play();
                },700);
                
                setTimeout(function(){                    
                    kill_inventory_item(inventory_item);
                    stoneMission2 = true;
                    static_item.destroy();

                    get_item('name', 'hall_window_broken').visible = true;
                    walkingIcon.visible = true;
                }, 1150);
            break;
            
            case("rock + computer"):
                showManText("That's not a window.\nIt's windows. Ha.", 0);
                add_item_to_inventory(inventory_item);
            break;
        }
        
        static_item.tint = 0xffffff;
    } 
    
    else{
        showManText("I don't see how this is possible", 0);
        add_item_to_inventory(inventory_item);     
    }
    
    static_item_clicked = null;
    
    inventory_item.tint = 0xffffff;
}