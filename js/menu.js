var menu = function(game){
   
};
 
menu.prototype = {
    preload: function(){ 

    },
    
    create: function(){  
        this.game.add.sprite(0, 0, 'opening');
        
        startBtn = this.game.add.sprite(70, 395, 'startBtn');
        contBtn = this.game.add.sprite(390, 395, 'contBtn');
        
        startBtn.inputEnabled = true;
        contBtn.inputEnabled = true;
        
        startBtn.events.onInputDown.add(function(){ 
            startBtn.tint = 0xc9a279;  
        }, this);
        
        startBtn.events.onInputUp.add(function(){ 
            place = "Street";
            this.game.state.start("Game");
        }, this);
        
        contBtn.events.onInputDown.add(function(){ 
            contBtn.tint = 0xc9a279;  
        }, this);
        
        contBtn.events.onInputUp.add(function(){ 
            try{
                interstitial.show();
            } catch(e){}
            this.game.state.start('Game');
        }, this);
    }, 
    
    update: function(){           
       
    }
};

