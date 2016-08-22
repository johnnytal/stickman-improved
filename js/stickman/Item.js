Item = function (game, name, isLayered, isTakeable, x_cor, y_cor, visible, isTaken) {
    this.game = game;
    this.name = name;
    this.isLayered = isLayered;
    this.isTakeable = isTakeable;    
    this.x = x_cor;
    this.y = y_cor;
    this.visible = visible;
    
    this.sprite = game.add.sprite(x_cor, y_cor, name);
    sprite = this.sprite;

    sprite.inputEnabled = true;
    sprite.visible = visible;
    sprite.isTaken = isTaken;
    
    sprite.events.onInputOver.add(function(){ walkingIcon.frame = 1; });
    sprite.events.onInputOut.add(function(){ walkingIcon.frame = 0; });
    sprite.events.onInputDown.add(this.interact, this);
  
    if (isTaken){
        add_item_to_inventory(sprite, true);
    }
    
    if (!isLayered){ // an image similar to the bg element only tinted
        sprite.alpha = 0;
    }
    
    else{
        sprite.events.onInputDown.add(function(){ // an image different from the bg elemnt, not tinted unless clicked
            if (!suspended){
                this.sprite.tint = 0xc9a279;
            }
        }, this);
    }
};

Item.prototype.interact = function(){   
    if (!suspended){
        if (this.isTakeable){
            itemToTake = this.sprite;
        }

        else{
            for(var i = 0; i < items.length; i++) { // if 2 items were pressed before interaction with the 1st, cancel the 1st
                if (items[i].sprite.alpha == 0.9 && !items[i].isLayered){
                    items[i].sprite.alpha = 0;
                }
            }
            static_item_clicked = this.sprite;
            this.sprite.alpha = 0.9;
            this.sprite.tint = 0xffffff;  
        }
    }
};
