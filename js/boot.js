$(function(){
    $('#game').focus();
    $('#overlay').fadeTo(1000,0, function(){
        $('#overlay').css('z-index','1');
    });

    WIDTH = 850; 
    HEIGHT = 580;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;
    
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", game_main);
    
    game.state.add("Street", street);
    game.state.add("Pub", pub);
    game.state.add("Maze", maze);
    
    game.state.start("Boot");  
});

var boot = function(game){};
  
boot.prototype = {
    preload: function(){
        this.game.load.image("loading", "images/stickman/loading.png");
    },
    
    create: function(){
        game.stage.backgroundColor = '#002745';
        font = 'Fontdiner Swanky';
        //bannerNotCraeted = true;
        
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            this.scale.maxWidth = w; 
            this.scale.maxHeight = h; 
            
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.setScreenSize(true);
        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = w;
            this.scale.maxHeight = h;
            
            this.scale.forceOrientation(false, true);

            this.scale.setScreenSize(true);
        }

        game.state.start('Preloader');
    }
};
