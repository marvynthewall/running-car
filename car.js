"use strict";

function car(context, sz, num, s){
   this.size = sz || 0.5;
   this.mypath = new path(num, this.size);
   this.pos_x = this.mypath.starting_x;
   this.pos_y = this.mypath.starting_y;
   this.speed = s || 2;
   this.direction = this.mypath.currentpath.direction;
   this.remlen = 0;
   this.wheelangle = 0;
   this.context = context;
}
car.prototype.update = function(){
   var dealdistance;
   var dx;
   var dy;
   var da = 0;
   var newx;
   var newy;
   var newa;

   if(this.mypath.distanceleft >= this.speed){
      this.mypath.distanceleft -= this.speed;
      this.mypath.pathdistance += this.speed;
      dealdistance = this.speed;
   }
   else{    // change to next subpath!!
      dealdistance = Math.ceil(this.speed - this.mypath.distanceleft);
      if(this.mypath.currentpath.pathtype == 0){   //straight to ...
         this.pos_x = this.mypath.currentpath.x2;
         this.pos_y = this.mypath.currentpath.y2;
         this.direction += this.mypath.currentpath.anglespeed * this.mypath.distanceleft;
         this.mypath.changesubpath(dealdistance); 
         if(this.mypath.currentpath.pathtype == 1){   // change to arc
            this.direction = this.mypath.currentpath.a1 + Math.PI / 2;
         }
      }
      else{   //arc to straight
         this.mypath.changesubpath(dealdistance); 
         this.pos_x = this.mypath.currentpath.x1;
         this.pos_y = this.mypath.currentpath.y1;
      }
   }
   // the modify in mypath is done
   
   if(this.mypath.currentpath.pathtype == 0){      // straight line
      if(this.mypath.currentpath.anglespeed == 0)
         this.direction = this.mypath.currentpath.direction;
      dx = dealdistance * Math.cos(this.mypath.currentpath.direction);
      dy = dealdistance * Math.sin(this.mypath.currentpath.direction);
      newx = this.pos_x + dx;
      newy = this.pos_y + dy;
      this.direction += this.mypath.currentpath.anglespeed * this.speed;
   }
   else{ // arc path
      da = dealdistance / this.mypath.currentpath.radius;
      this.direction += da;
      if(this.direction > 2* Math.PI) this.direction -= 2 * Math.PI;
      newa = this.direction + Math.PI * 3 / 2;

      newx = this.mypath.currentpath.cx + this.mypath.currentpath.radius * Math.cos(newa);
      newy = this.mypath.currentpath.cy + this.mypath.currentpath.radius * Math.sin(newa);
   }
   
   this.pos_x = newx;
   this.pos_y = newy;
   this.wheelangle = this.wheelangle + this.speed / (40 * this.size) + da;  
}


car.prototype.draw = function(p){
   // draw the shape
   drawpath(this.context, p);

   // draw the car
   this.context.save();
   this.context.translate(this.pos_x, this.pos_y);
   this.context.rotate(this.direction);
   this.context.scale(this.size, this.size);
   this.drawbody();

   this.context.save();
   this.context.translate(-150, 50);
   this.context.rotate(this.wheelangle);
   this.drawwheel();
   this.context.restore();

   this.context.save();
   this.context.translate(150, 50);
   this.context.rotate(this.wheelangle);
   this.drawwheel();
   this.context.restore();
   
   this.context.restore();
}


car.prototype.drawbody = function(){
   var grd = this.context.createLinearGradient(20, -100, 0, 100);
   grd.addColorStop(0, "#89c23f");
   grd.addColorStop(1, "#096837");
   
   this.context.beginPath();
   this.context.moveTo(-195, 60);
   this.context.bezierCurveTo(-270, 10, -130, -220, 100, -50);
   this.context.quadraticCurveTo(182, -45, 190, -25);
   this.context.bezierCurveTo(220, 30, 210, 60, 195, 65);
   this.context.lineTo(195, 50);
   this.context.arc(150, 50, 45, 0, Math.PI, true);
   this.context.lineTo(105, 65);
   this.context.lineTo(-105, 65);
   this.context.lineTo(-105, 50);
   this.context.arc(-150,50, 45, 0, Math.PI, true);
   this.context.lineTo(-195, 60);
   
   this.context.closePath();
   this.context.fillStyle = grd;
   this.context.fill();

   this.context.beginPath();
   this.context.arc(-150, 50, 40, 0, 2*Math.PI, true);
   this.context.closePath();
   this.context.fillStyle = grd;
   this.context.fill();
   this.context.beginPath();
   this.context.arc(150, 50, 40, 0, 2*Math.PI, true);
   this.context.closePath();
   this.context.fillStyle = grd;
   this.context.fill();
}
car.prototype.drawwheel = function(){
   this.context.beginPath();
   this.context.arc(0, 0, 35, 0, Math.PI*2/3, false);
   this.context.bezierCurveTo(-35, 0, -8, -9, 0, 0);
   this.context.bezierCurveTo(-3.79, 11.4, 17.5, 30.3, 35, 0);
   this.context.closePath();
   this.context.fillStyle = "#ff7ceb";
   this.context.fill();

   this.context.beginPath();
   this.context.arc(0, 0, 35, Math.PI*2/3, Math.PI*4/3, false);
   this.context.bezierCurveTo(17.5, -30.3, 11.8, -2.34, 0, 0);
   this.context.bezierCurveTo(-8, -9, -35, 0, -17.5, 30.3);
   this.context.closePath();
   this.context.fillStyle = "#f1eb3d";
   this.context.fill();

   this.context.beginPath();
   this.context.arc(0, 0, 35, Math.PI*4/3 ,Math.PI*2 ,false);
   this.context.bezierCurveTo(17.5, 30.3, -3.79, 11.4, 0, 0);
   this.context.bezierCurveTo(11.8, -2.34, 17.5, -30.3, -17.5, -30.3);
   this.context.closePath();
   this.context.fillStyle = "#749fff";
   this.context.fill();

   /*
   //drawing the guide line!!
   this.context.beginPath();
   this.context.moveTo(0,0);
   this.context.lineTo(0, 40);
   this.context.lineWidth = 3;
   this.context.stroke();
   */
};
