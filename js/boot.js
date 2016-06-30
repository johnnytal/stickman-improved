document.addEventListener("deviceready", start, false);
//window.onload = start;

function start(){
    WIDTH = 703; 
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
    game.state.add("Hall", hall);
    
    game.state.start("Boot");  
}

var boot = function(game){};
  
boot.prototype = {
    create: function(){
        font = 'Fontdiner Swanky';

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxWidth = w;
        this.scale.maxHeight = h;
        
        this.scale.forceOrientation(false, true);

        this.scale.setScreenSize(true);

        game.state.start('Preloader');
    }
};
