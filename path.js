"use strict";

var carheight = 90;
var wheelradius = 40;
var backwheeldistance = 150;
var pathradius = 200;
var mergelengthrate = 4/7;    // the mergeline in straight line is 4/7 * backwheeldistance
var mergeanglerate = 3/4;     // the mergeangle in arc is 3/4 * mergelength / pathradius;

function arcradius(pr, wr, h, l){
   return ( Math.sqrt( (pr+wr) * (pr+wr) - l * l ) + h - wr );
}

function mergelinetoarc(x1, y1, x2, y2, cx, cy, r1, r2, ml, ma){
   var points = [];
   var lineangle = Math.atan( (y2-y1) / (x2-x1) );
   if(x2 < x1) lineangle += Math.PI;
   var mx1 = x2 - ml * Math.cos(lineangle) + r1 * Math.cos(lineangle - Math.PI / 2);
   var my1 = y2 - ml * Math.sin(lineangle) + r1 * Math.sin(lineangle - Math.PI / 2);
   var mx2 = cx + r2 * Math.cos(lineangle + ma - Math.PI/2);
   var my2 = cy + r2 * Math.sin(lineangle + ma - Math.PI/2);
   var as = ma / Math.sqrt( (mx2 - mx1) * (mx2 - mx1) + (my2 - my1) * (my2 - my1) );
   points.push(mx1, my1, mx2, my2, as);
   return points;
}

function mergearctoline(x1, y1, x2, y2, cx, cy, r1, r2, ml, ma){
   var points = [];
   var lineangle = Math.atan( (y1-y2) / (x1-x2) );
   if(x1 < x2) lineangle += Math.PI;
   var mx1 = cx + r2 * Math.cos(lineangle - ma - Math.PI/2);
   var my1 = cy + r2 * Math.sin(lineangle - ma - Math.PI/2);
   var mx2 = x2 + ml * Math.cos(lineangle) + r1 * Math.cos(lineangle - Math.PI / 2);
   var my2 = y2 + ml * Math.sin(lineangle) + r1 * Math.sin(lineangle - Math.PI / 2);
   var as = ma / Math.sqrt( (mx2 - mx1) * (mx2 - mx1) + (my2 - my1) * (my2 - my1) );
   points.push(mx1, my1, mx2, my2, as);
   return points;
}

function drawpath(context, num){
   if(num == 1){
      context.save();
      context.translate(700, 500);
      context.moveTo(-250, -pathradius);
      context.lineTo(250, -pathradius);
      context.arc(250, 0 , pathradius, Math.PI*3/2, Math.PI*1/2, false);
      context.lineTo(-250, pathradius);
      context.arc(-250, 0, pathradius, Math.PI*1/2, Math.PI*3/2, false);
      context.closePath();
      var regra = context.createRadialGradient(0, 0, 5, 0, 0, 400);
      regra.addColorStop(0, "#00ccff");
      regra.addColorStop(1, "#6666ff");
      context.fillStyle = regra;
      context.fill();
      context.restore();
   }
   if(num == 2){
      context.save();
      context.translate(700, 750);
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
      var regra = context.createRadialGradient(0, 0, 5, 0, 0, 500);
      regra.addColorStop(0, "#00ccff");
      regra.addColorStop(1, "#6666ff");
      context.fillStyle = regra;
      context.fill();
      context.restore();
   }
   if(num == 3){
      context.save();
      var x1 = 250 + 200 * Math.cos( Math.PI / 6 );
      var y1 = 200 * Math.sin( Math.PI / 6 );
      var x2 = x1 + 500 * Math.cos( Math.PI * 2 / 3 );
      var y2 = y1 + 500 * Math.sin( Math.PI * 2 / 3 );
      var x3 = -x2;
      var y3 = y2;
      var x4 = -x1;
      var y4 = y1;
      var cy = 500 / 2 * Math.sqrt(3);
      context.translate(700, 500);
      context.moveTo(-250, -200);
      context.lineTo(250, -200);
      context.arc(250, 0, pathradius, Math.PI * 3 / 2, Math.PI / 6, false);
      context.lineTo( x2, y2 );
      context.arc( 0, cy, pathradius, Math.PI / 6, Math.PI * 5 / 6, false);
      context.lineTo( x4, y4);
      context.arc( -250, 0, pathradius, Math.PI * 5 / 6, Math.PI * 3 / 2, false);
      context.closePath();
      var regra = context.createRadialGradient(0, 250/Math.sqrt(3), 5, 0,250/Math.sqrt(3), 500);
      regra.addColorStop(0, "#00ccff");
      regra.addColorStop(1, "#6666ff");
      context.fillStyle = regra;
      context.fill();
      context.restore();
   }
}

path.prototype.setuppath1 = function (size){
   var ar = arcradius(pathradius, wheelradius * size, carheight*size, backwheeldistance*size);
   // IMPORTANT XXX
   var mergelength = mergelengthrate * backwheeldistance * size;
   var mergeangle = mergelength * mergeanglerate / pathradius;
   var mergepoints = [];
   
   mergepoints.push(new mergelinetoarc(700, 300, 950, 300, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(700, 700, 950, 700, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(700, 700, 450, 700, 450, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(700, 300, 450, 300, 450, 500, carheight*size, ar, mergelength, mergeangle));
   var p1 = new subpath(0, mergepoints[3][2], mergepoints[3][3], mergepoints[0][0], mergepoints[0][1], 0, 0, 0, 0, 0, 0);
   var p2 = new subpath(0, mergepoints[0][0], mergepoints[0][1], mergepoints[0][2], mergepoints[0][3], 0, 0, 0, 0, 0, mergepoints[0][4]);
   var p3 = new subpath(1, 0, 0, 0, 0, 950, 500, ar, Math.PI*3/2 + mergeangle, Math.PI*5/2 - mergeangle, 0);
   var p4 = new subpath(0, mergepoints[1][0], mergepoints[1][1], mergepoints[1][2], mergepoints[1][3], 0, 0, 0, 0, 0, mergepoints[1][4]);
   var p5 = new subpath(0, mergepoints[1][2], mergepoints[1][3], mergepoints[2][0], mergepoints[2][1], 0, 0, 0, 0, 0, 0);
   var p6 = new subpath(0, mergepoints[2][0], mergepoints[2][1], mergepoints[2][2], mergepoints[2][3], 0, 0, 0, 0, 0, mergepoints[2][4]);
   var p7 = new subpath(1, 0, 0, 0, 0, 450, 500, ar, Math.PI*1/2 + mergeangle, Math.PI*3/2 - mergeangle, 0);
   var p8 = new subpath(0, mergepoints[3][0], mergepoints[3][1], mergepoints[3][2], mergepoints[3][3], 0, 0, 0, 0, 0, mergepoints[3][4]);
   this.subpath.push(p1, p2, p3, p4, p5, p6, p7, p8);
   this.starting_x = mergepoints[3][2];
   this.starting_y = mergepoints[3][3];
   this.currentpathnum = 0;
   this.currentpath = this.subpath[0];
   this.pathdistance = 0;
   this.distanceleft = p1.distance - this.pathdistance;
}


path.prototype.setuppath2 = function (size){
   var ar = arcradius(pathradius, wheelradius * size, carheight*size, backwheeldistance*size);
   // IMPORTANT XXX
   var mergelength = mergelengthrate * backwheeldistance * size;
   var mergeangle = mergelength * mergeanglerate / pathradius;
   var mergepoints = [];
   
   mergepoints.push(new mergelinetoarc(700, 300, 950, 300, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(1150, 750, 1150, 500, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(1150, 750, 1150, 1000, 950, 1000, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(700, 1200, 950, 1200, 950, 1000, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(700, 1200, 450, 1200, 450, 1000, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(250, 750, 250, 1000, 450, 1000, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(250, 750, 250, 500, 450, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(700, 300, 450, 300, 450, 500, carheight*size, ar, mergelength, mergeangle));
   var p1 = new subpath(0, mergepoints[7][2], mergepoints[7][3], mergepoints[0][0], mergepoints[0][1], 0, 0, 0, 0, 0, 0);
   var p2 = new subpath(0, mergepoints[0][0], mergepoints[0][1], mergepoints[0][2], mergepoints[0][3], 0, 0, 0, 0, 0, mergepoints[0][4]);
   var p3 = new subpath(1, 0, 0, 0, 0, 950, 500, ar, Math.PI*3/2 + mergeangle, Math.PI* 2 - mergeangle, 0);
   var p4 = new subpath(0, mergepoints[1][0], mergepoints[1][1], mergepoints[1][2], mergepoints[1][3], 0, 0, 0, 0, 0, mergepoints[1][4]);
   var p5 = new subpath(0, mergepoints[1][2], mergepoints[1][3], mergepoints[2][0], mergepoints[2][1], 0, 0, 0, 0, 0, 0);
   var p6 = new subpath(0, mergepoints[2][0], mergepoints[2][1], mergepoints[2][2], mergepoints[2][3], 0, 0, 0, 0, 0, mergepoints[2][4]);
   var p7 = new subpath(1, 0, 0, 0, 0, 950, 1000, ar, mergeangle, Math.PI / 2 - mergeangle, 0);
   var p8 = new subpath(0, mergepoints[3][0], mergepoints[3][1], mergepoints[3][2], mergepoints[3][3], 0, 0, 0, 0, 0, mergepoints[3][4]);
   var p9 = new subpath(0, mergepoints[3][2], mergepoints[3][3], mergepoints[4][0], mergepoints[4][1], 0, 0, 0, 0, 0, 0);
   var p10 = new subpath(0, mergepoints[4][0], mergepoints[4][1], mergepoints[4][2], mergepoints[4][3], 0, 0, 0, 0, 0, mergepoints[4][4]);
   var p11 = new subpath(1, 0, 0, 0, 0, 450, 1000, ar, Math.PI / 2 + mergeangle, Math.PI - mergeangle, 0);
   var p12 = new subpath(0, mergepoints[5][0], mergepoints[5][1], mergepoints[5][2], mergepoints[5][3], 0, 0, 0, 0, 0, mergepoints[5][4]);
   var p13 = new subpath(0, mergepoints[5][2], mergepoints[5][3], mergepoints[6][0], mergepoints[6][1], 0, 0, 0, 0, 0, 0);
   var p14 = new subpath(0, mergepoints[6][0], mergepoints[6][1], mergepoints[6][2], mergepoints[6][3], 0, 0, 0, 0, 0, mergepoints[6][4]);
   var p15 = new subpath(1, 0, 0, 0, 0, 450, 500, ar, Math.PI + mergeangle, Math.PI * 3 / 2 - mergeangle, 0);
   var p16 = new subpath(0, mergepoints[7][0], mergepoints[7][1], mergepoints[7][2], mergepoints[7][3], 0, 0, 0, 0, 0, mergepoints[7][4]);
   this.subpath.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16);
   this.starting_x = mergepoints[7][2];
   this.starting_y = mergepoints[7][3];
   this.currentpathnum = 0;
   this.currentpath = this.subpath[0];
   this.pathdistance = 0;
   this.distanceleft = p1.distance - this.pathdistance;
}

path.prototype.setuppath3 = function (size){
   var ar = arcradius(pathradius, wheelradius * size, carheight*size, backwheeldistance*size);
   // IMPORTANT XXX
   var mergelength = mergelengthrate * backwheeldistance * size;
   var mergeangle = mergelength * mergeanglerate / pathradius;
   var mergepoints = [];
   
      var x1 = 950 + 200 * Math.cos( Math.PI / 6 );
      var y1 = 500 + 200 * Math.sin( Math.PI / 6 );
      var x2 = x1 + 500 * Math.cos( Math.PI * 2 / 3 );
      var y2 = y1 + 500 * Math.sin( Math.PI * 2 / 3 );
      var x3 = 1400 - x2;
      var y3 = y2;
      var x4 = 1400 - x1;
      var y4 = y1;
      var cy = 500 + 500 / 2 * Math.sqrt(3);
   mergepoints.push(new mergelinetoarc(700, 300, 950, 300, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(x2, y2, x1, y1, 950, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(x1, y1, x2, y2, 700, cy, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(x4, y4, x3, y3, 700, cy, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergelinetoarc(x3, y3, x4, y4, 450, 500, carheight*size, ar, mergelength, mergeangle));
   mergepoints.push(new mergearctoline(700, 300, 450, 300, 450, 500, carheight*size, ar, mergelength, mergeangle));
   var p1 = new subpath(0, mergepoints[5][2], mergepoints[5][3], mergepoints[0][0], mergepoints[0][1], 0, 0, 0, 0, 0, 0);
   var p2 = new subpath(0, mergepoints[0][0], mergepoints[0][1], mergepoints[0][2], mergepoints[0][3], 0, 0, 0, 0, 0, mergepoints[0][4]);
   var p3 = new subpath(1, 0, 0, 0, 0, 950, 500, ar, Math.PI*3/2 + mergeangle, Math.PI * 13 / 6 - mergeangle, 0);
   var p4 = new subpath(0, mergepoints[1][0], mergepoints[1][1], mergepoints[1][2], mergepoints[1][3], 0, 0, 0, 0, 0, mergepoints[1][4]);
   var p5 = new subpath(0, mergepoints[1][2], mergepoints[1][3], mergepoints[2][0], mergepoints[2][1], 0, 0, 0, 0, 0, 0);
   var p6 = new subpath(0, mergepoints[2][0], mergepoints[2][1], mergepoints[2][2], mergepoints[2][3], 0, 0, 0, 0, 0, mergepoints[2][4]);
   var p7 = new subpath(1, 0, 0, 0, 0, 700, cy, ar, Math.PI / 6 + mergeangle, Math.PI * 5 / 6 - mergeangle, 0);
   var p8 = new subpath(0, mergepoints[3][0], mergepoints[3][1], mergepoints[3][2], mergepoints[3][3], 0, 0, 0, 0, 0, mergepoints[3][4]);
   var p9 = new subpath(0, mergepoints[3][2], mergepoints[3][3], mergepoints[4][0], mergepoints[4][1], 0, 0, 0, 0, 0, 0);
   var p10 = new subpath(0, mergepoints[4][0], mergepoints[4][1], mergepoints[4][2], mergepoints[4][3], 0, 0, 0, 0, 0, mergepoints[4][4]);
   var p11 = new subpath(1, 0, 0, 0, 0, 450, 500, ar, Math.PI * 5 / 6 + mergeangle, Math.PI * 3 / 2 - mergeangle, 0);
   var p12 = new subpath(0, mergepoints[5][0], mergepoints[5][1], mergepoints[5][2], mergepoints[5][3], 0, 0, 0, 0, 0, mergepoints[5][4]);
   this.subpath.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
   this.starting_x = mergepoints[5][2];
   this.starting_y = mergepoints[5][3];
   this.currentpathnum = 0;
   this.currentpath = this.subpath[0];
   this.pathdistance = 0;
   this.distanceleft = p1.distance - this.pathdistance;
}


// pathtype:
// 0: straight          with: distance, direction, x1, y1, x2, y2
// 1: circle outside    with: distance, cx, cy, radius, a1, a2
//
function subpath(p, x_1, y_1, x_2, y_2, c_x, c_y, r, a_1, a_2, as){
   this.pathtype = p;
   this.distance = 0;
   this.direction = 0;
   this.anglespeed = as;      // for the mergeline
   this.x1 = x_1;
   this.y1 = y_1;
   this.x2 = x_2;
   this.y2 = y_2;
   this.cx = c_x;
   this.cy = c_y;
   this.radius = r;
   this.a1 = a_1;
   this.a2 = a_2;
   

   if(p == 0){
      this.distance = Math.sqrt( (x_2 - x_1) * ( x_2 - x_1 ) + ( y_2 - y_1 ) * ( y_2 - y_1 ) );
      this.direction = Math.atan( (y_2 - y_1) / (x_2 - x_1) );
      if(x_2 < x_1) this.direction += Math.PI;
   }
   else if (p == 1){
      this.distance = r * ( a_2 - a_1 );
   }
}


function path(num, size){
   this.subpath = [];
   this.starting_x = 0;
   this.starting_y = 0;
   this.currentpath = 0; 
   this.currentpathnum = 0;
   this.pathdistance = 0;
   this.distanceleft = 0;
   if(num == 1)this.setuppath1(size);        //simplest
   else if(num == 2)this.setuppath2(size);   //square
   else if(num == 3)this.setuppath3(size);   //triangle
}

path.prototype.changesubpath = function(d){
   ++ this.currentpathnum;
   if(this.currentpathnum == this.subpath.length)this.currentpathnum = 0;
   this.currentpath = this.subpath[this.currentpathnum];
   this.pathdistance = d;
   this.distanceleft = this.currentpath.distance - this.pathdistance;
}
