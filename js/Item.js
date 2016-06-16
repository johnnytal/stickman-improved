Item = function (game, name, isLayered, isTakeable, x_cor, y_cor, visible) {
    this.game = game;
    this.name = name;
    this.isLayered = isLayered;
    this.isTakeable = isTakeable;    
    this.x = x_cor;
    this.y = y_cor;
    this.isAlive = true;
    this.isTaken = false;

    this.sprite = game.add.sprite(x_cor, y_cor, name);
    sprite = this.sprite;

    sprite.inputEnabled = true;
    sprite.visible = visible;
    
    sprite.events.onInputOver.add(function(){ walkingIcon.frame = 1; });
    sprite.events.onInputOut.add(function(){ walkingIcon.frame = 0; });
    sprite.events.onInputDown.add(this.interact, this);
    
    if (isLayered || isTakeable){
        sprite.events.onInputOver.add(function(_obj){ _obj.tint = 0xfb925e; });
        sprite.events.onInputOut.add(function(_obj){ _obj.tint = 0xffffff;  });
    }
    
    if (!isLayered){
        sprite.alpha = 0;
        sprite.events.onInputOver.add(function(_obj){if (static_item_clicked == null) _obj.alpha = 0.4;});
        sprite.events.onInputOut.add(function(_obj){if (static_item_clicked == null) _obj.alpha = 0;});
    }
};

Item.prototype.look = function() {

};

Item.prototype.interact = function() {    
    if (this.isTakeable){
        itemToTake = this.sprite;
    }
    else{
        static_item_clicked = this.sprite;
        this.sprite.alpha = 0.9;
    }
};

Item.prototype.use = function() {

};
