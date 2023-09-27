
const shuffle = function(array){ 
    return array.sort(() => Math.random() - 0.5); 
}; 


window.onload = function(){
    var START = "Start";
    var END = "One More Chance";
    var TIMEOUT = "Oops!\n Time runs out!";
    var FINISH = "Congrats!\n Wanna go next?";
    var ALLPASS = "All Pass!\n You kill it!";
    var stagenum = 0;
    var score = 0;
    var timecount = 0;
    
    var startBtn = document.getElementById("btn1");
    var nextBtn = document.getElementById("btn2");
    var shotBtn = document.getElementById("btn3");

    shotBtn.onclick = function(){
        html2canvas(document.body).then(
            function (canvas) {
            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");

            link.download = "screenshot.png";
            link.href = image;
            link.click();})
    }
  
    

    startBtn.value = START;

    startBtn.onclick = function() {
        if (startBtn.value == START) {
            var j = 0;
            var list = shuffle(stage[stagenum]);
            var position = shuffle(position_array);
            for(let i = 0;i <= position.length-1;i++){
                document.getElementById(position[i]).src=list[j];
                i++; 
                document.getElementById(position[i]).src=list[j];
                j++;
            };
            start()
        } else {
            end()
        }
    }

    nextBtn.onclick = function(){
        startBtn.style.display="initial";
        nextBtn.style.display="none";
        stagenum = stagenum+1;
        document.getElementById("stagecount").innerHTML=stagenum+1;
        end();
    }
    
    function start() {
        startBtn.value = END;
        document.querySelectorAll('.img2').forEach(item=>{
            item.hidden = ""
        });
        
        startBtn.disabled = true;

        setTimeout(()=>{
            startBtn.disabled = false;
            document.querySelectorAll('.img2').forEach(item=>{
                item.hidden = "hidden"
            });
            document.querySelectorAll('.img3').forEach(item=>{
                item.hidden = ""
            });
            document.querySelectorAll('.flip').forEach(item=>{
                item.value=0
            });

            document.getElementById("moveobj").src = "icon/runtimebar.gif";
            barpos = 0;
            timerbar = setInterval(timebarmove, 100);

            timer = setTimeout(()=>{
                document.getElementById("overlay").style.display = "initial";
                document.getElementById("warningmsg").innerHTML = TIMEOUT;
                document.getElementById("img4").src = noticebg[0];
                document.querySelectorAll('.flip').forEach(item=>{
                    item.value=2
                })
            },30000)

            // click 2 then immediate determine
            document.querySelectorAll('.grid').forEach(item=>{
                item.addEventListener('click', event=>{
                    if(event.currentTarget.querySelector('.flip').value!=2){
                        if(document.querySelectorAll('.flip[value = "1"]').length==0){
                            event.currentTarget.querySelector('.flip').value = 1;
                            event.currentTarget.querySelector('.img3').hidden = "hidden";
                            event.currentTarget.querySelector('.img2').hidden = "";
                        }
                        else if(document.querySelectorAll('.flip[value = "1"]').length==1){
                            event.currentTarget.querySelector('.flip').value = 1;
                            event.currentTarget.querySelector('.img3').hidden = "hidden";
                            event.currentTarget.querySelector('.img2').hidden = "";
                            setTimeout(()=>{
                                checkformatch();
                            },500)
                            if(document.querySelectorAll('.flip[value = "0"]').length==0 & stagenum<5){
                                score += 1;
                                document.getElementById("scorecount").innerHTML = score;
                                clearInterval(timer);
                                document.getElementById("img4").src = noticebg[1];
                                clearInterval(timerbar);
                                if(document.getElementById("timeuse").innerHTML==0){
                                    document.getElementById("timeuse").innerHTML = timecount/10
                                }
                                else if(timecount/10 < document.getElementById("timeuse").innerHTML){
                                    document.getElementById("timeuse").innerHTML = timecount/10};
                                document.getElementById("warningmsg").innerHTML = FINISH;
                                document.getElementById("overlay").style.display = "initial";
                                document.querySelectorAll('.flip').forEach(item=>{
                                    item.value=2})
                                nextBtn.style.display="initial";
                                startBtn.style.display="none";
                                document.cookie = "score=" + score;
                                document.cookie = "metric=" + timecount/10;
                                
                            }
                            else if(document.querySelectorAll('.flip[value = "0"]').length==0 & stagenum==5){
                                score += 1;
                                document.getElementById("scorecount").innerHTML = score;
                                clearInterval(timer);
                                clearInterval(timerbar);
                                if(timecount/10 < document.getElementById("timeuse").innerHTML){
                                    document.getElementById("timeuse").innerHTML = timecount/10};
                                document.getElementById("overlay").style.display = "initial";
                                document.getElementById("warningmsg").innerHTML = ALLPASS;
                                document.getElementById("img4").src = noticebg[2];
                                document.querySelectorAll('.flip').forEach(item=>{
                                    item.value=2})
                                startBtn.style.display="none";
                                document.cookie = "score=" + score;
                                document.cookie = "metric=" + timecount/10;
                            };
                    };
                }});
            
        });
        },5000);   
    }
    
    function end() {
        clearInterval(timerbar);
        clearInterval(timer);
        startBtn.value = START;
        timecount = 0;
        document.getElementById("overlay").style.display = "none";
        document.querySelectorAll('.img2').forEach(item=>{
            item.hidden = "hidden";
            item.src = ""
        });
        document.querySelectorAll('.img3').forEach(item=>{
            item.hidden = "hidden"
        });
        document.querySelectorAll('.flip').forEach(item=>{
            item.value=2
        });
        s2.clearRect(0,0,canvasbg2.width,canvasbg2.height);
        s1.fillStyle='#ff6161';
	    s1.fillRect(0, 25, canvasbg1.width, 8);
        s1.fill();
        document.getElementById("moveobj").src = "icon/runbarstatic.png";
        document.getElementById("moveobj").style.transform= 'translate(' + 375 + 'px,' + 0 + 'px)';
    }

    function checkformatch(){
      if(typeof(document.querySelectorAll('.flip[value = "1"]')[0]) !='undefined' & 
         typeof(document.querySelectorAll('.flip[value = "1"]')[1]) !='undefined'){
        var pick1 = document.querySelectorAll('.flip[value = "1"]')[0].nextElementSibling;
        var pick2 = document.querySelectorAll('.flip[value = "1"]')[1].nextElementSibling;
        if(pick1.src != pick2.src){
            pick1.previousElementSibling.value = 0;
            pick2.previousElementSibling.value = 0;
            pick1.hidden = "hidden";
            pick2.hidden = "hidden";
            pick1.nextElementSibling.hidden = "";
            pick2.nextElementSibling.hidden = "";
        }
        else{
            score += 1;
            document.getElementById("scorecount").innerHTML = score;
            pick1.previousElementSibling.value = 2;
            pick2.previousElementSibling.value = 2;
        };
      }
    }

    var canvasbg1 = document.getElementById("basebar");
    var s1 = canvasbg1.getContext("2d");
    var canvasbg2 = document.getElementById("movebar");
    var s2 = canvasbg2.getContext("2d");
    s1.fillStyle='#ff6161';
	s1.fillRect(0, 25, canvasbg1.width, 8);
    s1.fill();
    document.getElementById("moveobj").style.transform= 'translate(' + 375 + 'px,' + 0 + 'px)';

    var timebarmove = function() {
        if(barpos<=canvasbg2.width){
            s2.fillStyle = "#9c9c9cf6";
            s2.fillRect(canvasbg2.width-barpos,25,barpos,8)
            s2.fill();
            var x = 375-barpos;
            document.getElementById("moveobj").style.transform= 'translate(' + x + 'px,' + 0 + 'px)';
            barpos=barpos+canvasbg2.width/300;
            timecount += 1;
        }
	};


}
 


var position_array=["pic1","pic2","pic3","pic4","pic5","pic6","pic7","pic8",
                    "pic9","pic10","pic11","pic12","pic13","pic14","pic15","pic16"];

var noticebg=['icon/notice1.webp',
              'icon/notice2.webp',
              'icon/notice3.webp'];

var matchimg_array1=['roundgrp/avatar1/anime1.png','roundgrp/avatar1/anime2.png','roundgrp/avatar1/anime3.png','roundgrp/avatar1/anime4.png',
                     'roundgrp/avatar1/anime5.png','roundgrp/avatar1/anime6.png','roundgrp/avatar1/anime7.png','roundgrp/avatar1/anime8.png',
                     'roundgrp/avatar1/anime9.png','roundgrp/avatar1/anime10.png','roundgrp/avatar1/anime11.png','roundgrp/avatar1/anime12.png',
                     'roundgrp/avatar1/anime13.png','roundgrp/avatar1/anime14.png','roundgrp/avatar1/anime15.png','roundgrp/avatar1/anime16.png'];

var matchimg_array2= ['roundgrp/avatar2/round1.webp','roundgrp/avatar2/round2.webp','roundgrp/avatar2/round3.webp','roundgrp/avatar2/round4.webp',
                      'roundgrp/avatar2/round5.webp','roundgrp/avatar2/round6.webp','roundgrp/avatar2/round7.webp','roundgrp/avatar2/round8.webp',
                      'roundgrp/avatar2/round9.webp','roundgrp/avatar2/round10.webp','roundgrp/avatar2/round11.webp','roundgrp/avatar2/round12.webp',];

var matchimg_array3= ['roundgrp/avatar3/blueyellow1.jpg','roundgrp/avatar3/blueyellow2.jpg','roundgrp/avatar3/blueyellow3.jpg','roundgrp/avatar3/blueyellow4.jpg',
                      'roundgrp/avatar3/blueyellow5.jpg','roundgrp/avatar3/blueyellow6.jpg','roundgrp/avatar3/blueyellow7.jpg','roundgrp/avatar3/blueyellow8.jpg',
                      'roundgrp/avatar3/blueyellow9.jpg','roundgrp/avatar3/blueyellow10.jpg','roundgrp/avatar3/blueyellow11.jpg','roundgrp/avatar3/blueyellow12.jpg'];

var matchimg_array4= ['roundgrp/avatar4/pink1.jpg','roundgrp/avatar4/pink2.jpg','roundgrp/avatar4/pink3.jpg','roundgrp/avatar4/pink4.jpg',
                      'roundgrp/avatar4/pink5.jpg','roundgrp/avatar4/pink6.jpg','roundgrp/avatar4/pink7.jpg','roundgrp/avatar4/pink8.jpg',
                      'roundgrp/avatar4/pink9.jpg','roundgrp/avatar4/pink10.jpg','roundgrp/avatar4/pink11.jpg','roundgrp/avatar4/pink12.jpg'];

var matchimg_array5= ['roundgrp/avatar5/bkwt1.jpg','roundgrp/avatar5/bkwt2.jpg','roundgrp/avatar5/bkwt3.jpg','roundgrp/avatar5/bkwt4.jpg',
                      'roundgrp/avatar5/bkwt5.jpg','roundgrp/avatar5/bkwt6.jpg','roundgrp/avatar5/bkwt7.jpg','roundgrp/avatar5/bkwt8.jpg',
                      'roundgrp/avatar5/bkwt9.jpg','roundgrp/avatar5/bkwt10.jpg','roundgrp/avatar5/bkwt11.jpg'];
    
var matchimg_array6=['roundgrp/avatar6/peep1.png','roundgrp/avatar6/peep2.png','roundgrp/avatar6/peep3.png','roundgrp/avatar6/peep4.png',
                     'roundgrp/avatar6/peep5.png','roundgrp/avatar6/peep6.png','roundgrp/avatar6/peep7.png','roundgrp/avatar6/peep8.png',
                     'roundgrp/avatar6/peep9.png','roundgrp/avatar6/peep10.png','roundgrp/avatar6/peep11.png','roundgrp/avatar6/peep12.png',
                     'roundgrp/avatar6/peep13.png'];


var stage=[matchimg_array1, matchimg_array2, matchimg_array3, matchimg_array4, matchimg_array5, matchimg_array6];



