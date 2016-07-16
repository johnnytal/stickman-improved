document.addEventListener("deviceready", start, false);
//window.onload = start;

function start(){
    var place;
    var interstitial;
    
    WIDTH = 703; 
    HEIGHT = 580;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Menu", menu);
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

        try{
            place = localStorage.getItem("stickman-location");
        }
        catch(e){
            place = 'Street';
        }

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
        this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
        
        this.scale.forceOrientation(false, true);

        this.scale.setScreenSize(true);

        game.state.start('Preloader');
    }
};
