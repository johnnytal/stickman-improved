//window.onload = start;
document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function start(){
    var place, thisPlace; 
    var interstitial;
    var first_visit, missions, inventory;
    var emitter, polyLine;

    WIDTH = 703; 
    HEIGHT = 580;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Menu", menu);
    game.state.add("Game", game_main);
    game.state.add("Street", street);
    game.state.add("Alley", alley);
    game.state.add("Pub", pub);
    game.state.add("Wc", wc);
    game.state.add("Maze", maze);
    game.state.add("Hall", hall);
    game.state.add("Password", password);
    game.state.add("Room", room);
    
    game.state.start("Boot");  
}

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}   
    }, 1000);
}

var boot = function(game){};
  
boot.prototype = {
    create: function(){
               
        font = 'Fontdiner Swanky';
        coming_from = null;

        try{
            place = store.get("stickman-location");
        }
        catch(e){}
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
        this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
        
        this.scale.forceOrientation(false, true);

        this.scale.updateLayout(true);

        game.state.start('Preloader');
    }
};
