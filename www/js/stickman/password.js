var password = function(game){
    PASSWORD = 'incorrect';
    PASS_LENGTH = 9;
    right_pass = [24, 14, 21, 10, 5, 5, 3, 21, 17];
    pass_validation = [];
    textLength = 0;
};

password.prototype = {
    preload: function(){},
    
    create: function(){
        textLength = 0;
        pass_validation = [];
        var letters = [];
        var num_of_letters = 27;
        var letter_to_number = {
          z:0, s:1, l:2, e:3, y:4, r:5, k:6, d:7, f:8, v:9, o:10, h:11, a:12, u:13, n:14, g:15, m:16, t:17, x:18, q:19, j:20, c:21, w:22, p:23, i:24, b:25
        };

        frame = game.add.sprite(0, 0, 'frame'); 

        game.add.text(85, 60, 'Enter 9 letter Password' , {font: "44px " + font, fill: "#ffffff", align:'center'});
        passText = game.add.text(150 + (textLength * 50), 165, '' , {font: "44px " + font, fill: "#ffffff", align:'center'});
        incorrectText = game.add.text(160, 230, 'Password is incorrect' , {font: "30px " + font, fill: "#ffffff", align:'center'});
        incorrectText.visible = false;
        
        for (n = 1; n < num_of_letters; n++){
    
            var letterSprite = 'letters';
            
            var space = 58;
            var y;
            
            if (n < 10) y = 0;
            else if (n >= 10 && n < 19) y = 63;
            else if (n >= 19) y = 126;

            letters[n] = game.add.sprite((80 + space * (n-1)) - (y*8), 350 + y, letterSprite);
            letters[n].frame = (n - 1);
            letters[n].scale.set(0.84, 0.84);
            letters[n].inputEnabled = true;
           
            letters[n].input.useHandCursor = true;
            letters[n].events.onInputDown.add(validate, this);
        }
    },
};

function validate(_letter){
    if (textLength < PASS_LENGTH - 1){
        passText.text = passText.text + "* ";
        textLength++;
        incorrectText.visible = false;
        
        pass_validation.push(_letter.frame);
        sfxType.play();
    }
    
    else if (textLength == PASS_LENGTH - 1){
        textLength++;
        passText.text = passText.text + "* ";
        sfxType.play();
        
        for(var i = pass_validation.length; i--;) {
            if(pass_validation[i] !== right_pass[i]){

                incorrectText.visible = true;
                sfxWrong.play();

                setTimeout(function(){
                    passText.text = '';
                    textLength = 0;
                    pass_validation = [];
                    tween_black(1000, 0, "Hall", "Password");    
                }, 2500);

                return false;
            }
            
            else{
                sfxRight.play();
                incorrectText.x += 40;
                incorrectText.text = "Password correct!";
                incorrectText.visible = true;  
                mission_complete('password_mission');
                
                tween_black(1000 ,1500, 'Hall', 'Password');
                
                return true;
            }
        }
    }
}