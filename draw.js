"use strict";

var VisibleMenu = '';

function switchmenu(mainmenu, submenu, e){
   var ss = document.getElementById(submenu);
   if(ss.style.display == "none"){
      ss.style.display = "block";
      VisibleMenu = submenu;
   }
   else{
      if(e != 'MouseOver' || VisibleMenu != submenu){
         ss.style.display = 'none';
         VisibleMenu = '';
      }
   }
}
function hidemenu(){
   if(VisibleMenu != ''){
      var aa = document.getElementById(VisibleMenu);
      aa.style.display = "none";
   }
   VisibleMenu = '';
}


function drawlist(){
   var ccc = document.getElementById("shape-list1");
   var context = ccc.getContext('2d');
   var pathradius = 200;
   context.save();
   context.translate(ccc.width / 2, ccc.height / 2);
   context.scale(0.08, 0.08);
   context.moveTo(-250, -pathradius);
   context.lineTo(250, -pathradius);
   context.arc(250, 0 , pathradius, Math.PI*3/2, Math.PI*1/2, false);
   context.lineTo(-250, pathradius);
   context.arc(-250, 0, pathradius, Math.PI*1/2, Math.PI*3/2, false);
   context.closePath();
   context.fillStyle = "black";
   context.fill();
   context.restore();

   ccc = document.getElementById("shape-list2");
   context = ccc.getContext('2d');
   context.save();
   context.translate(ccc.width/2, ccc.height/2);
   context.scale(0.06, 0.06);
   context.moveTo(-250, -450);
   context.lineTo(250, -450);
   context.arc(250, -250, pathradius, Math.PI*3/2, 0, false);
   context.lineTo(450, 250);
   context.arc(250, 250, pathradius, 0, Math.PI / 2, false);
   context.lineTo(-250, 450);
   context.arc(-250, 250, pathradius, Math.PI /2, Math.PI, false);
   context.lineTo(-450, -250);
   context.arc(-250, -250, pathradius, Math.PI, Math.PI*3/2, false);
   context.closePath();
   context.fillStyle = "black";
   context.fill();
   context.restore();

   ccc = document.getElementById("shape-list3");
   context = ccc.getContext('2d');
   context.save();
   context.translate(ccc.width/2, ccc.height * 0.3);
   context.scale(0.06, 0.06);
   var x1 = 250 + 200 * Math.cos( Math.PI / 6 );
   var y1 = 200 * Math.sin( Math.PI / 6 );
   var x2 = x1 + 500 * Math.cos( Math.PI * 2 / 3 );
   var y2 = y1 + 500 * Math.sin( Math.PI * 2 / 3 );
   var x3 = -x2;
   var y3 = y2;
   var x4 = -x1;
   var y4 = y1;
   var cy = 500 / 2 * Math.sqrt(3);
   context.moveTo(-250, -200);
   context.lineTo(250, -200);
   context.arc(250, 0, pathradius, Math.PI * 3 / 2, Math.PI / 6, false);
   context.lineTo( x2, y2 );
   context.arc( 0, cy, pathradius, Math.PI / 6, Math.PI * 5 / 6, false);
   context.lineTo( x4, y4);
   context.arc( -250, 0, pathradius, Math.PI * 5 / 6, Math.PI * 3 / 2, false);
   context.closePath();
   context.fillStyle = "black";
   context.fill();
   context.restore();
}

function movingcar () {
   drawlist();
   var marvyncanvas;
   var marvyncontext;
   var slider;
   var sizeslider;
   var mycar;
   var path = 1;
   var ch = 0;
   var size = 4;
   function draw(){
      if(sizeslider.value!=size){
         size = sizeslider.value;
         ch = 0;
         mycar = new car(marvyncontext, size * 0.09, path);
      }
      if(ch == 1){
         ch = 0;
         mycar = new car(marvyncontext, size * 0.09 , path);
      }
      marvyncontext.clearRect(0, 0, marvyncanvas.width, marvyncanvas.height);
      mycar.speed = slider.value*2;
      mycar.update();
      mycar.draw(path);
      window.requestAnimationFrame(draw);
   }
   marvyncanvas = document.getElementById("marvyncanvas");
   marvyncontext = marvyncanvas.getContext('2d');
   slider = document.getElementById("slider");
   sizeslider = document.getElementById("sizeslider");
   
   /* for the board
   marvyncontext.beginPath();
   marvyncontext.rect(0,0,marvyncanvas.width, marvyncanvas.height);
   marvyncontext.stroke();
   alert("123");
   */


   document.getElementById("list1").onclick = function (){
      path = 1;
      ch = 1;
   }
   document.getElementById("list2").onclick = function (){
      path = 2;
      ch = 1;
   }
   document.getElementById("list3").onclick = function (){
      path = 3;
      ch = 1;
   }
   sizeslider.onclick = function (){
      size = sizeslider.value;
      ch = 1;
   }
   mycar = new car(marvyncontext, size * 0.09, path);
   draw();
}

window.onload = movingcar;
