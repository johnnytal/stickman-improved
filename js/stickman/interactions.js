
function interact_item(_static_item_clicked){  
    
    switch(_static_item_clicked.key){    
        case 'door':
        //complete_window_mission()
            showManText("The door is locked", 200);
        break;
        
        case 'bar_sign':
            showManText('It reads: "BAR"', 200);
        break;

        case 'ladder_b':
            if (!check_mission('stone')){
                showManText("No point, the window seems closed from the inside", 0);
            }
            else{
                complete_window_mission();
            }
        break;
        
        case 'alley_entrance':        
            if (first_visit['Alley']){
                showManText("There's a narrow alley here", 0);
                suspend(total_text_time);
                tween_black(500, total_text_time, "Alley", "Street"); 
            }
            
            else{
                tween_black(500, 150, "Alley", "Street"); 
            }
        break;

        case 'window':
             if (!check_mission('ladder')){
                 showManText("Stickmen can't jump", 0);
             }
             else if (check_mission('ladder') && !check_mission('stone')){
                 showManText("No point, the window seems closed from the inside", 0);
             }
             
            _static_item_clicked.alpha = 0; 
        break;
        
        case 'broken_window': 
             if (check_mission('stone') && !check_mission('ladder')){
                 showManText("Stickmen can't jump", 0);
             }
             else if (check_mission('stone') && check_mission('ladder')) {
                complete_window_mission();
             }
             
             _static_item_clicked.alpha = 0.4;
        break;
        
        case 'pub_door':
            tween_black(700, 200, "Street", "Pub");
        break;
        
        case 'broken_pub_window':
            showManText("Someone broke that window", 0);
        break;
       
        case 'barrel':
            showManText("Getting drunk can give my life a purpose,\nbut i'll have to open the barrel first", 0);
        break;
        
        case 'dart_board':
            if (!get_item('name', 'secret_door').visible){
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
        
        case 'chain':
            if (man.y > 160){
                showManText("I think this chain holds the chandelier", 0);
            }
            
            else{
                showManText("That's for not cleaning the toilet!", 0);
                
                suspend(10000);
                    
                setTimeout(function(){
                    theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2000, Phaser.Easing.Sinusoidal.InOut, true);
                    
                    theTween.onComplete.add(function(){
                       sfxFall.play();
                       tween_alpha(bigBlack, 0, 3500);
                       
                       man.x = 782;
                       man.y = 327;
                       man.frame = 4;

                       get_item('name', 'broken_chandelier').visible = true;
                       get_item('name', 'candle').visible = true;
                       
                       get_item('name', 'chandelier').visible = false;
                       get_item('name', 'chain').visible = false;

                       store_game_state('Pub');
                       coming_from = 'Wc';

                       showManText("Bringing the ladder from outside\ncould have been easier i guess", 1000);

                    }, this);
                }, 2500);
            }
        break;
        
        case 'broken_chandelier':
            showManText("Maybe that's my purpose in life?\nInflicting damage on abandoned pubs?", 0);
        break;
        
        case 'wc_flood':
            showManText("Please stop! It gets dirtier when you click on it!", 0);
        break;
        
        case 'toilet':
            showManText("Stickmen bodily functions don't work that way", 0);
        break;
        
        case 'brush':
            showManText("Whatever purpose my life has, I'm sure that's not it", 0);
        break;
        
        case 'wc_door':
            if ( get_item('name', 'broken_chandelier').visible == true ){
                showManText("I'm wet enough");
            }
            
            else{
                if (man.y > 160){
                    tween_black(500, 0, "Wc", 'Pub');
                    
                }
                else{
                    _static_item_clicked.alpha = 0;
                }
            }
        break;
        
        case 'roof_door':
            if ( get_item('name', 'wc_flood').visible == false ){
                showManText("It leads to the roof of the toilet, but I can't reach");
            }
            else{
                showManText("Now I can reach it, but at what price?", 0);
                suspend(total_text_time);

                tween_black(500, total_text_time, "Pub", 'Wc_roof');
            }
        break;
        
        case 'string':
            if ( get_item('name', 'wc_flood').visible == false ){
            
                _static_item_clicked.frame = 1;
                man.frame = 4;
                
                if (!check_mission('plug')){
                    setTimeout(function(){
                        _static_item_clicked.frame = 0;
                        mission_complete('plug_mission');
                        sfxFlush1.play();
                        showManText("That doesn't sound so good...", 500); 
                    },1500);
                }
                
                else{
                    sfxFlush2.play();
                    showManText('Uh oh...', 1000); 
                    suspend(8000);
                        
                    setTimeout(function(){
                        theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2500, Phaser.Easing.Sinusoidal.InOut, true);
                        
                        theTween.onComplete.add(function(){
                           tween_alpha(bigBlack, 0, 2500);
                           
                           man.frame = 0;
                           _static_item_clicked.frame = 0;
                           
                           get_item('name', 'wc_flood').visible = true;
                           
                           man.body.angularVelocity = -20;
                           man.body.gravity.y = -30;
                           man.alpha = 0.6;
                           
                        }, this);
                    }, 2000);
                }
            }
            
            else{
                showManText("I've done enough damage already", 0);
            }
            
        break;
        
        case 'chandelier':
            showManText("It's a chandelier made of many small lamps,\nIt gives warm, comforting light", 0);
        break;
        
        case 'poster':
            showManText('"Beer. Helping ugly Stickmen get laid since 1862"', 0);
        break;
        
        case 'secret_door':
            suspend(7000);
            showManText("It's a tunnel that leads into a system of catacombs!", 300);
            showManText("But it's way too dark, I'm afraid something will bite me", total_text_time);
        break;
        
        case 'switch':
            if (!check_mission('switch')){
                
                sfxLight_switch.play();
                
                showManText("Too bad there was no switch on the other side", 750);
                suspend(total_text_time);
                
                tween_black(2300, 3000, "Hall", "Maze");
                
                setTimeout(function(){
                    tween_alpha(man, 0, 2300);
                },3000);
                
                mission_complete('switch_mission');
            }
        break;
        
        case 'hall_door':
            showManText("I don't have a key, and it's way too heavy to break down", 200);
        break;
        
        case 'hall_window':
            showManText("It's a closed window", 0);
        break;
        
        case 'hall_window_broken':
            showManText("Looks like someone really wants me to take this jump.\nHere goes nothing...", 0);
            suspend(total_text_time);
            
            setTimeout(function(){
                
                change_music(street_music);

                theTween = game.add.tween(bigBlack).to( { alpha: 1}, 2000, Phaser.Easing.Sinusoidal.InOut, true); 
                
                theTween.onComplete.add(function(){
                   man.kill();
                   
                   newMan = game.add.sprite(TOTAL_WIDTH / 2, 0, 'man'); // cutscene animation
                   newMan.scale.set(0.7, 0.7); 
                   newManTween = game.add.tween(newMan).to( { y: 750}, 4650, Phaser.Easing.Sinusoidal.InOut, true); 
                   game.add.tween(newMan).to( { angle: 180}, 2650, Phaser.Easing.Sinusoidal.InOut, true); 

                   newManTween.onComplete.add(function(){
                       game.state.start("Room"); 
                   });
                }, this);
            }, total_text_time);
        break;
        
        case 'computer':
            showManText("Hey, this looks exactly like...", 0);
            suspend(total_text_time);
            
            setTimeout(function(){
                johnnyText = game.add.text(300, 250, '...You' 
                ,{font: "22px " + font, fill: "#d5f9a4", align:'center', stroke: "0x000000", strokeThickness: 3});
                johnnyText.alpha = 0;
                tween_alpha(johnnyText, 1, 1000);
            }, 1400);

            setTimeout(function(){
                tween_alpha(johnnyText, 0, 2750);
                end_game();
            }, 4900);
        break;
    }   
    
    static_item_clicked = null;
    
    if (_static_item_clicked.tint != '0xffffff'){
        setTimeout(function(){
            _static_item_clicked.tint = '0xffffff';  
        }, 200); 
    }
    else { 
        setTimeout(function(){
            _static_item_clicked.alpha = 0; 
        }, 100); 
   }
}

function take_item(item){
    var name = item.key; 
    
    switch(name){
        case 'ladder_s':
            showManText('This ladder fits right in my pocket!',500);
        break;
        
        case 'rock_alley':
           showManText('I will take this rock. because it rocks.', 0);
        break;
        
        case 'rock_pub':
           showManText("Sticks and stones, best friends forever", 0);
        break;
        
        case 'rock_hall':
           showManText("Stone ex-machina.\nHow did it even get here?!", 0);
        break;
        
        case 'rock_room':
           showManText("You've got to be kidding me.", 800);
        break;
        
        case 'glass':
            showManText("At least I'd clean after myself", 0);
        break;
        
        case 'dart':
            if (!check_mission('drunk')){
                showManText("Someone carelessly left this dart here", 0);
            }
            else{
                showManText("Someone carelessly left this dart here. * Hic *", 0);
            }
        break;
    
        case 'candle':
            showManText("Still lit. Hope it won't make a hole in my bottomless pocket", 0);
        break;
    }  
    
    item.isTaken = true;
    
    add_item_to_inventory(item);
    itemToTake = null; 
    
    sfxPocket.play();     
}

function use_item(inventory_item, static_item){
    static_item_clicked = null;
   
    inventory_item.scale.set(1, 1);
    inventory_item.tint = 0xffffff;

    var combined_items = null;
    
    if (static_item != null){
        combined_items = inventory_item.key + ' + ' + static_item.key;
        static_item.tint = 0xffffff;
    }
    
    switch(combined_items){
        case("ladder_s + door"):
            showManText("I can reach it without the ladder", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case("ladder_s + window"):
        case("ladder_s + broken_window"):
            sfxPut_ladder.play();

            get_item('name', 'ladder_b').visible = true;
            kill_inventory_item(inventory_item);
            showManText("Might look a bit suspicious i guess", 300);
            suspend(total_text_time);
            
            mission_complete('ladder_mission');
            
            if (static_item.key == 'window'){
                static_item.alpha = 0; 
            }
        break;
        
        case("rock_alley + door"):
        case("rock_hall + hall_door"):
        case("rock_pub + door"):
            showManText("Stoning the door won't help", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case("rock_alley + ladder_b"):
        case("rock_pub + ladder_b"):
            showManText("That might break the ladder", 0);
            add_item_to_inventory(inventory_item); 
        break;
        
        case('rock_alley + window'):
            suspend(1200);
            showManText("Take that window!", 200);
            
            setTimeout(function(){
                sfxBreak_window.play();
            }, 700);
            
            setTimeout(function(){                    
                kill_inventory_item(inventory_item);
                static_item.destroy();
                get_item('name', 'broken_window').visible = true;
                
                mission_complete('stone_mission');
            }, 1150);
        break;
        
        case('rock_pub + broken_window'):
            showManText("I'ts already very much broken", 0);
        break;
        
        case ('candle + pub_door'):
        case ('candle + poster'):
            showManText("I have caused enough damage for now", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('candle + barrel'):
            showManText("I want to open it, not burn it!", 0);
            add_item_to_inventory(inventory_item);
        break;

        case ('glass + pub_door'):
            showManText('"Stickman was here". There. I did it.', 200);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('glass + broken_pub_window'):
            showManText("It's only fair, But I'll need some kind of super glue", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('rock_pub + broken_pub_window'):
            showManText("Already did it, it was a great success", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('dart + broken_pub_window'):
            showManText('I think the window had suffered enough', 0);
            put_item_away(inventory_item, static_item);
        break;

        case ('rock_pub + pub_door'):
            showManText("Stickmen who lives in abandoned pubs shouldn't throw stones", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('dart + dart_board'):
            sfxDart.play();
            
            if (!check_mission('drunk')){
                suspend(1000);
                
                setTimeout(function(){  
                    create_item( game, 'dart', true, true, 474, 224, true );
                },300);

                showManText("I suck at this", 1000);
            }
            
            else{
                suspend(5300);
                
                create_item( game, 'dart', true, false, 555, 196, true );
                get_item('name', 'dart').tint = 0xffddff; 

                showManText("Bullseye! i'm alot better at this when i'm drunk!", 500);
                showManText("Hey what's that noise?", 4500);
                
                setTimeout(function(){ sfxSecret_door.play(); }, 2000);
                
                setTimeout(function(){ 
                    get_item('name', 'secret_door').visible = true; 
               }, 5300);
            }
            
            kill_inventory_item(inventory_item);
            static_item_clicked = null;
            itemToTake = null;
        break;
        
        case ('dart + barrel'):
        case ('dart + barrel_glass'):
            suspend(3000);
            
            showManText("I guess that makes sense", 0);
            showManText("Nope. poking the barrel just makes it angrier", 3000);
            
            setTimeout(function(){ 
                add_item_to_inventory(inventory_item); 
            }, 3000);
        break;
        
        case ('dart + pub_door'):
            showManText("The owner might catch me do it", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        case ('rock_pub + barrel'):
            showManText("That's a bad way to open a barrel,\nI need something sharp... hmmm...", 0);
            add_item_to_inventory(inventory_item); 
        break;
        
        case ('glass + dart_board'):
        case ('rock_pub + dart_board'):
            showManText("That might damage the dartboard", 0);
            add_item_to_inventory(inventory_item); 
        break;
        
        case ('glass + barrel'):
            suspend(700);
            showManText("It's worth a shot", 0);
            man.frame = 4;
           
            setTimeout(function(){
                sfxPut_glass.play();
                kill_inventory_item(inventory_item);
                
                get_item('name', 'barrel').kill();
                get_item('name', 'barrel_glass').visible = true;
            }, 700);
        break;
        
        case ('rock_pub + barrel_glass'):
            suspend(9500);
            showManText("OK, here we go...", 0);
            man.frame = 4;

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
                tween_alpha(timePassedText, 1, 4500);

                theTween.onComplete.add(function(){
                   tween_alpha(bigBlack, 0, 3000);
                   tween_alpha(timePassedText, 0, 2900);
                }, this);
                
            }, 2750);
            
            showManText("Just a little sip...", 2800);

            setTimeout(function(){
                get_item('name', 'barrel_open').kill();
                get_item('name', 'barrel_empty').visible = true;
                
                man.x = 728;
                man.y = 320;
                man.frame = 4;
                dir == 'left';
            }, 7000);
            
            showManText("I'm Bobbin. Are you my mother? * Hic *", 9500); //lucasatrs reference
            
            mission_complete('drunk_mission');
        break;
        
        case ('candle + secret_door'):
            showManText("OK let's go, maybe that's where they keep the extra barrels", 0);
            suspend(total_text_time);

            tween_black(2000, total_text_time, "Maze", "Pub");
        break;
        
        case ('rock_hall + hall_window'):
            suspend(1150);
            showManText("That feels awfully familiar", 200);
            
            setTimeout(function(){
                sfxBreak_window.play();
            },700);
            
            setTimeout(function(){                    
                kill_inventory_item(inventory_item);
                static_item.destroy();
                get_item('name', 'hall_window_broken').visible = true;
                
                mission_complete('stone_hall_mission');
            }, 1150);
        break;
        
        case("rock_room + computer"):
            showManText("That's not a window.\nIt's windows. Ha.", 0);
            put_item_away(inventory_item, static_item);
        break;
        
        default:
            showManText("I don't see how this is possible", 0);
            add_item_to_inventory(inventory_item);     
        break;
    }
}

function complete_window_mission(){
    var delay_time = 100;
    
    if (first_visit['Pub']){
        showManText("I hope it was worth it...", 0); 
        suspend(total_text_time);

        mission_complete('window_mission');
        delay_time = total_text_time;
    }

    tween_black(1000, delay_time, "Pub", "Street");
}

function put_item_away(_item1, _item2){
    add_item_to_inventory(_item1); 
    _item2.alpha = 0;   
}
