есть следующий код, доработай в нём дизайн. Опирайся на восточные тематики (КНР, Япония, Китай, Корея) и используй тематику ГО (вейци, бадук)
В дизайне вдохновляйся игрой го, гобаном (доска для игры го), камнями (фишки для игры го), азиатским искусством (китайская живопись и т.п.), также можешь использовать современную парадигму го, связь с AI (AlphaGo, KataGo etc.), в любом случае используй те или иные формы доски для го (гобана) и камней 

---

## Code 

public/vite.svg
public/wgo.min.js
```
/*! MIT license, more info: wgo.waltheri.net */(function(v,q){var m=document.getElementsByTagName("script"),g={version:"2.3.1",B:1,W:-1,ERROR_REPORT:!0,DIR:m[m.length-1].src.split("?")[0].split("/").slice(0,-1).join("/")+"/",lang:"en",i18n:{en:{}}};g.opera=-1!=navigator.userAgent.search(/(opera)(?:.*version)?[ \/]([\w.]+)/i);g.webkit=-1!=navigator.userAgent.search(/(webkit)[ \/]([\w.]+)/i);g.msie=-1!=navigator.userAgent.search(/(msie) ([\w.]+)/i);g.mozilla=-1!=navigator.userAgent.search(/(mozilla)(?:.*? rv:([\w.]+))?/i)&&!g.webkit&&!g.msie;g.t=
function(a){var b=g.i18n[g.lang][a]||g.i18n.en[a];if(b){for(var c=1;c<arguments.length;c++)b=b.replace("$",arguments[c]);return b}return a};g.extendClass=function(a,b){b.prototype=Object.create(a.prototype);b.prototype.constructor=b;b.prototype.super=a;return b};g.abstractMethod=function(){throw Error("unimplemented abstract method");};g.clone=function(a){if(a&&"object"==typeof a){var b=a.constructor==Array?[]:{},c;for(c in a)b[c]=a[c]==a?a:g.clone(a[c]);return b}return a};g.filterHTML=function(a){return a&&
"string"==typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;"):a};var h=function(a,b){b=b||{};for(var c in b)this[c]=b[c];for(c in g.Board.default)this[c]===q&&(this[c]=g.Board.default[c]);for(c in h.themes.default)this.theme[c]===q&&(this.theme[c]=h.themes.default[c]);this.tx=this.section.left;this.ty=this.section.top;this.bx=this.size-1-this.section.right;this.by=this.size-1-this.section.bottom;this.init();a.appendChild(this.element);this.pixelRatio=v.devicePixelRatio||1;this.width&&this.height?
this.setDimensions(this.width,this.height):this.width?this.setWidth(this.width):this.height&&this.setHeight(this.height)};h.themes={};h.themes.old={shadowColor:"rgba(32,32,32,0.5)",shadowTransparentColor:"rgba(32,32,32,0)",shadowBlur:0,shadowSize:function(a){return a.shadowSize},markupBlackColor:"rgba(255,255,255,0.8)",markupWhiteColor:"rgba(0,0,0,0.8)",markupNoneColor:"rgba(0,0,0,0.8)",markupLinesWidth:function(a){return a.autoLineWidth?a.stoneRadius/7:a.lineWidth},gridLinesWidth:1,gridLinesColor:function(a){return"rgba(0,0,0,"+
Math.min(1,a.stoneRadius/15)+")"},starColor:"#000",starSize:function(a){return a.starSize*(a.width/300+1)},stoneSize:function(a){return a.stoneSize*Math.min(a.fieldWidth,a.fieldHeight)/2},coordinatesColor:"rgba(0,0,0,0.7)",font:function(a){return a.font},linesShift:.5};h.themes.default={shadowColor:"rgba(62,32,32,0.5)",shadowTransparentColor:"rgba(62,32,32,0)",shadowBlur:function(a){return.1*a.stoneRadius},shadowSize:1,markupBlackColor:"rgba(255,255,255,0.9)",markupWhiteColor:"rgba(0,0,0,0.7)",markupNoneColor:"rgba(0,0,0,0.7)",
markupLinesWidth:function(a){return a.stoneRadius/8},gridLinesWidth:function(a){return a.stoneRadius/15},gridLinesColor:"#654525",starColor:"#531",starSize:function(a){return a.stoneRadius/8+1},stoneSize:function(a){return Math.min(a.fieldWidth,a.fieldHeight)/2},coordinatesColor:"#531",variationColor:"rgba(0,32,128,0.8)",font:"calibri",linesShift:.25};var k=function(a,b){return"function"==typeof b.theme[a]?b.theme[a](b):b.theme[a]},m={draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;
this.beginPath();var f=k("shadowBlur",b),d=Math.max(0,d-.5),n=this.createRadialGradient(c-b.ls,e-b.ls,d-1-f,c-b.ls,e-b.ls,d+f);n.addColorStop(0,k("shadowColor",b));n.addColorStop(1,k("shadowTransparentColor",b));this.fillStyle=n;this.arc(c-b.ls,e-b.ls,d+f,0,2*Math.PI,!0);this.fill()},clear:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.clearRect(c-1.1*d-b.ls,e-1.1*d-b.ls,2.2*d,2.2*d)}},p=function(a,b,c){return a.obj_arr[b][c][0].c==g.B?k("markupBlackColor",a):a.obj_arr[b][c][0].c==
g.W?k("markupWhiteColor",a):k("markupNoneColor",a)},D=function(a,b,c){return a.obj_arr[b][c][0]&&a.obj_arr[b][c][0].c==g.W||a.obj_arr[b][c][0].c==g.B},w,y=function(a){for(var b=a.angle,c=a.angle,e=0;e<a.lines.length;e++){var b=b+a.lines[e],c=c-a.lines[e],d=a.ctx,f=a.x,n=a.y,g=a.radius,h=b,k=c,m=a.factor,l=a.thickness;d.strokeStyle="rgba(64,64,64,0.2)";d.lineWidth=g/30*l;d.beginPath();var g=g-Math.max(1,d.lineWidth),l=f+g*Math.cos(h*Math.PI),h=n+g*Math.sin(h*Math.PI),f=f+g*Math.cos(k*Math.PI),n=n+
g*Math.sin(k*Math.PI),r=k=void 0,r=k=void 0;f>l?(k=(n-h)/(f-l),r=Math.atan(k)):f==l?r=Math.PI/2:(k=(n-h)/(f-l),r=Math.atan(k)-Math.PI);g*=m;k=Math.sin(r)*g;r=Math.cos(r)*g;g=l+k;m=h-r;k=f+k;r=n-r;d.moveTo(l,h);d.bezierCurveTo(g,m,k,r,f,n);d.stroke()}};h.drawHandlers={NORMAL:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius,f;a.c==g.W?(f=this.createRadialGradient(c-2*d/5,e-2*d/5,d/3,c-d/5,e-d/5,5*d/5),f.addColorStop(0,"#fff"),f.addColorStop(1,"#aaa")):(f=this.createRadialGradient(c-
2*d/5,e-2*d/5,1,c-d/5,e-d/5,4*d/5),f.addColorStop(0,"#666"),f.addColorStop(1,"#000"));this.beginPath();this.fillStyle=f;this.arc(c-b.ls,e-b.ls,Math.max(0,d-.5),0,2*Math.PI,!0);this.fill()}},shadow:m},PAINTED:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius,f;a.c==g.W?(f=this.createRadialGradient(c-2*d/5,e-2*d/5,2,c-d/5,e-d/5,4*d/5),f.addColorStop(0,"#fff"),f.addColorStop(1,"#ddd")):(f=this.createRadialGradient(c-2*d/5,e-2*d/5,1,c-d/5,e-d/5,4*d/5),f.addColorStop(0,"#111"),
f.addColorStop(1,"#000"));this.beginPath();this.fillStyle=f;this.arc(c-b.ls,e-b.ls,Math.max(0,d-.5),0,2*Math.PI,!0);this.fill();this.beginPath();this.lineWidth=d/6;a.c==g.W?(this.strokeStyle="#999",this.arc(c+d/8,e+d/8,d/2,0,Math.PI/2,!1)):(this.strokeStyle="#ccc",this.arc(c-d/8,e-d/8,d/2,Math.PI,1.5*Math.PI));this.stroke()}},shadow:m},GLOW:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius,f;a.c==g.W?(f=this.createRadialGradient(c-2*d/5,e-2*d/5,d/3,c-d/5,e-d/5,8*d/5),f.addColorStop(0,
"#fff"),f.addColorStop(1,"#666")):(f=this.createRadialGradient(c-2*d/5,e-2*d/5,1,c-d/5,e-d/5,3*d/5),f.addColorStop(0,"#555"),f.addColorStop(1,"#000"));this.beginPath();this.fillStyle=f;this.arc(c-b.ls,e-b.ls,Math.max(0,d-.5),0,2*Math.PI,!0);this.fill()}},shadow:m},SHELL:{stone:{draw:function(a,b){var c,e,d=b.stoneRadius;w=w||Math.ceil(9999999*Math.random());c=b.getX(a.x);e=b.getY(a.y);var f;f=a.c==g.W?"#aaa":"#000";this.beginPath();this.fillStyle=f;this.arc(c-b.ls,e-b.ls,Math.max(0,d-.5),0,2*Math.PI,
!0);this.fill();if(a.c==g.W){f=w%(3+a.x*b.size+a.y)%3;var n=b.size*b.size+a.x*b.size+a.y,n=2/n*(w%n);0==f?y({ctx:this,x:c,y:e,radius:d,angle:n,lines:[.1,.12,.11,.1,.09,.09,.09,.09],factor:.25,thickness:1.75}):1==f?y({ctx:this,x:c,y:e,radius:d,angle:n,lines:[.1,.09,.08,.07,.06,.06,.06,.06,.06,.06,.06],factor:.2,thickness:1.5}):y({ctx:this,x:c,y:e,radius:d,angle:n,lines:[.12,.14,.13,.12,.12,.12],factor:.3,thickness:2});f=this.createRadialGradient(c-2*d/5,e-2*d/5,d/3,c-d/5,e-d/5,5*d/5);f.addColorStop(0,
"rgba(255,255,255,0.9)");f.addColorStop(1,"rgba(255,255,255,0)")}else f=this.createRadialGradient(c+.4*d,e+.4*d,0,c+.5*d,e+.5*d,d),f.addColorStop(0,"rgba(32,32,32,1)"),f.addColorStop(1,"rgba(0,0,0,0)"),this.beginPath(),this.fillStyle=f,this.arc(c-b.ls,e-b.ls,Math.max(0,d-.5),0,2*Math.PI,!0),this.fill(),f=this.createRadialGradient(c-.4*d,e-.4*d,1,c-.5*d,e-.5*d,1.5*d),f.addColorStop(0,"rgba(64,64,64,1)"),f.addColorStop(1,"rgba(0,0,0,0)");this.beginPath();this.fillStyle=f;this.arc(c-b.ls,e-b.ls,Math.max(0,
d-.5),0,2*Math.PI,!0);this.fill()}},shadow:m},MONO:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius,f=k("markupLinesWidth",b)||1;this.fillStyle=a.c==g.W?"white":"black";this.beginPath();this.arc(c,e,Math.max(0,d-f),0,2*Math.PI,!0);this.fill();this.lineWidth=f;this.strokeStyle="black";this.stroke()}}},CR:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.strokeStyle=a.c||p(b,a.x,a.y);this.lineWidth=a.lineWidth||k("markupLinesWidth",b)||1;this.beginPath();
this.arc(c-b.ls,e-b.ls,d/2,0,2*Math.PI,!0);this.stroke()}}},LB:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius,f=a.font||k("font",b)||"";this.fillStyle=a.c||p(b,a.x,a.y);this.font=1==a.text.length?Math.round(1.5*d)+"px "+f:2==a.text.length?Math.round(1.2*d)+"px "+f:Math.round(d)+"px "+f;this.beginPath();this.textBaseline="middle";this.textAlign="center";this.fillText(a.text,c,e,2*d)}},grid:{draw:function(a,b){if(!D(b,a.x,a.y)&&!a._nodraw){var c=b.getX(a.x),e=b.getY(a.y),
d=b.stoneRadius;this.clearRect(c-d,e-d,2*d,2*d)}},clear:function(a,b){if(!D(b,a.x,a.y)){a._nodraw=!0;var c;b.grid.clear();b.grid.draw(b);for(var e=0;e<b.size;e++)for(var d=0;d<b.size;d++)for(var f=0;f<b.obj_arr[e][d].length;f++){var g=b.obj_arr[e][d][f];c=g.type?"string"==typeof g.type?h.drawHandlers[g.type]:g.type:b.stoneHandler;c.grid&&c.grid.draw.call(b.grid.getContext(g),g,b)}for(e=0;e<b.obj_list.length;e++)g=b.obj_list[e],c=g.handler,c.grid&&c.grid.draw.call(b.grid.getContext(g.args),g.args,
b);delete a._nodraw}}}},SQ:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=Math.round(b.stoneRadius);this.strokeStyle=a.c||p(b,a.x,a.y);this.lineWidth=a.lineWidth||k("markupLinesWidth",b)||1;this.beginPath();this.rect(Math.round(c-d/2)-b.ls,Math.round(e-d/2)-b.ls,d,d);this.stroke()}}},TR:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.strokeStyle=a.c||p(b,a.x,a.y);this.lineWidth=a.lineWidth||k("markupLinesWidth",b)||1;this.beginPath();this.moveTo(c-b.ls,
e-b.ls-Math.round(d/2));this.lineTo(Math.round(c-d/2)-b.ls,Math.round(e+d/3)+b.ls);this.lineTo(Math.round(c+d/2)+b.ls,Math.round(e+d/3)+b.ls);this.closePath();this.stroke()}}},MA:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.strokeStyle=a.c||p(b,a.x,a.y);this.lineCap="round";this.lineWidth=2*(a.lineWidth||k("markupLinesWidth",b)||1)-1;this.beginPath();this.moveTo(Math.round(c-d/2),Math.round(e-d/2));this.lineTo(Math.round(c+d/2),Math.round(e+d/2));this.moveTo(Math.round(c+
d/2)-1,Math.round(e-d/2));this.lineTo(Math.round(c-d/2)-1,Math.round(e+d/2));this.stroke();this.lineCap="butt"}}},SL:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.fillStyle=a.c||p(b,a.x,a.y);this.beginPath();this.rect(c-d/2,e-d/2,d,d);this.fill()}}},SM:{stone:{draw:function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.strokeStyle=a.c||p(b,a.x,a.y);this.lineWidth=2*(a.lineWidth||k("markupLinesWidth",b)||1);this.beginPath();this.arc(c-d/3,e-d/3,d/6,0,2*
Math.PI,!0);this.stroke();this.beginPath();this.arc(c+d/3,e-d/3,d/6,0,2*Math.PI,!0);this.stroke();this.beginPath();this.moveTo(c-d/1.5,e);this.bezierCurveTo(c-d/1.5,e+d/2,c+d/1.5,e+d/2,c+d/1.5,e);this.stroke()}}},outline:{stone:{draw:function(a,b){this.globalAlpha=a.alpha?a.alpha:.3;a.stoneStyle?h.drawHandlers[a.stoneStyle].stone.draw.call(this,a,b):b.stoneHandler.stone.draw.call(this,a,b);this.globalAlpha=1}}},mini:{stone:{draw:function(a,b){b.stoneRadius/=2;a.stoneStyle?h.drawHandlers[a.stoneStyle].stone.draw.call(this,
a,b):b.stoneHandler.stone.draw.call(this,a,b);b.stoneRadius*=2}}}};h.coordinates={grid:{draw:function(a,b){var c,e,d,f,g,h;this.fillStyle=k("coordinatesColor",b);this.textBaseline="middle";this.textAlign="center";this.font=b.stoneRadius+"px "+(b.font||"");d=b.getX(-.75);f=b.getX(b.size-.25);g=b.getY(-.75);h=b.getY(b.size-.25);for(var l=0;l<b.size;l++)c=l+65,73<=c&&c++,e=b.getY(l),this.fillText(b.size-l,d,e),this.fillText(b.size-l,f,e),e=b.getX(l),this.fillText(String.fromCharCode(c),e,g),this.fillText(String.fromCharCode(c),
e,h);this.fillStyle="black"}}};h.CanvasLayer=function(){this.element=document.createElement("canvas");this.context=this.element.getContext("2d");this.pixelRatio=v.devicePixelRatio||1;1<this.pixelRatio&&this.context.scale(this.pixelRatio,this.pixelRatio)};h.CanvasLayer.prototype={constructor:h.CanvasLayer,setDimensions:function(a,b){this.element.width=a;this.element.style.width=a/this.pixelRatio+"px";this.element.height=b;this.element.style.height=b/this.pixelRatio+"px"},appendTo:function(a,b){this.element.style.position=
"absolute";this.element.style.zIndex=b;a.appendChild(this.element)},removeFrom:function(a){a.removeChild(this.element)},getContext:function(){return this.context},draw:function(a){},clear:function(){this.context.clearRect(0,0,this.element.width,this.element.height)}};h.GridLayer=g.extendClass(h.CanvasLayer,function(){this.super.call(this)});h.GridLayer.prototype.draw=function(a){var b;this.context.beginPath();this.context.lineWidth=k("gridLinesWidth",a);this.context.strokeStyle=k("gridLinesColor",
a);var c=Math.round(a.left),e=Math.round(a.top),d=Math.round(a.fieldWidth*(a.size-1)),f=Math.round(a.fieldHeight*(a.size-1));this.context.strokeRect(c-a.ls,e-a.ls,d,f);for(var g=1;g<a.size-1;g++)b=Math.round(a.getX(g))-a.ls,this.context.moveTo(b,e),this.context.lineTo(b,e+f),b=Math.round(a.getY(g))-a.ls,this.context.moveTo(c,b),this.context.lineTo(c+d,b);this.context.stroke();this.context.fillStyle=k("starColor",a);if(a.starPoints[a.size])for(var h in a.starPoints[a.size])this.context.beginPath(),
this.context.arc(a.getX(a.starPoints[a.size][h].x)-a.ls,a.getY(a.starPoints[a.size][h].y)-a.ls,k("starSize",a),0,2*Math.PI,!0),this.context.fill()};h.MultipleCanvasLayer=g.extendClass(h.CanvasLayer,function(){this.init(4)});h.MultipleCanvasLayer.prototype.init=function(a){var b,c;this.layers=a;this.elements=[];this.contexts=[];this.pixelRatio=v.devicePixelRatio||1;for(var e=0;e<a;e++)b=document.createElement("canvas"),c=b.getContext("2d"),1<this.pixelRatio&&c.scale(this.pixelRatio,this.pixelRatio),
this.elements.push(b),this.contexts.push(c)};h.MultipleCanvasLayer.prototype.appendTo=function(a,b){for(var c=0;c<this.layers;c++)this.elements[c].style.position="absolute",this.elements[c].style.zIndex=b,a.appendChild(this.elements[c])};h.MultipleCanvasLayer.prototype.removeFrom=function(a){for(var b=0;b<this.layers;b++)a.removeChild(this.elements[b])};h.MultipleCanvasLayer.prototype.getContext=function(a){return a.x%2?a.y%2?this.contexts[0]:this.contexts[1]:a.y%2?this.contexts[2]:this.contexts[3]};
h.MultipleCanvasLayer.prototype.clear=function(a,b){for(var c=0;c<this.layers;c++)this.contexts[c].clearRect(0,0,this.elements[c].width,this.elements[c].height)};h.MultipleCanvasLayer.prototype.setDimensions=function(a,b){for(var c=0;c<this.layers;c++)this.elements[c].width=a,this.elements[c].style.width=a/this.pixelRatio+"px",this.elements[c].height=b,this.elements[c].style.height=b/this.pixelRatio+"px"};h.ShadowLayer=g.extendClass(h.MultipleCanvasLayer,function(a,b,c){this.init(2);this.shadowSize=
b===q?1:b;this.board=a});h.ShadowLayer.prototype.getContext=function(a){return a.x%2&&a.y%2||!(a.x%2||a.y%2)?this.contexts[0]:this.contexts[1]};h.ShadowLayer.prototype.setDimensions=function(a,b){this.super.prototype.setDimensions.call(this,a,b);for(var c=0;c<this.layers;c++)this.contexts[c].setTransform(1,0,0,1,Math.round(this.shadowSize*this.board.stoneRadius/7),Math.round(this.shadowSize*this.board.stoneRadius/7))};var E=function(a,b){var c=b.getX(a.x),e=b.getY(a.y),d=b.stoneRadius;this.clearRect(c-
2*d-b.ls,e-2*d-b.ls,4*d,4*d)},z=function(){return 3*this.width/(4*(this.bx+1-this.tx)+2)-this.fieldWidth*this.tx},A=function(){return 3*this.height/(4*(this.by+1-this.ty)+2)-this.fieldHeight*this.ty},B=function(a,b){for(var c,e=0;e<this.obj_arr[a][b].length;e++){var d=this.obj_arr[a][b][e];c=d.type?"string"==typeof d.type?h.drawHandlers[d.type]:d.type:this.stoneHandler;for(var f in c)c[f].clear?c[f].clear.call(this[f].getContext(d),d,this):E.call(this[f].getContext(d),d,this)}},x=function(a,b){for(var c,
e=0;e<this.obj_arr[a][b].length;e++){var d=this.obj_arr[a][b][e];c=d.type?"string"==typeof d.type?h.drawHandlers[d.type]:d.type:this.stoneHandler;for(var f in c)c[f].draw.call(this[f].getContext(d),d,this)}},F=function(a){var b;b=a.layerX*this.pixelRatio;b-=this.left;b/=this.fieldWidth;b=Math.round(b);a=a.layerY*this.pixelRatio;a-=this.top;a/=this.fieldHeight;a=Math.round(a);return{x:b>=this.size?-1:b,y:a>=this.size?-1:a}},C=function(){this.element.style.width=this.width/this.pixelRatio+"px";this.element.style.height=
this.height/this.pixelRatio+"px";this.stoneRadius=k("stoneSize",this);this.ls=k("linesShift",this);for(var a=0;a<this.layers.length;a++)this.layers[a].setDimensions(this.width,this.height)};h.prototype={constructor:h,init:function(){this.obj_arr=[];for(var a=0;a<this.size;a++){this.obj_arr[a]=[];for(var b=0;b<this.size;b++)this.obj_arr[a][b]=[]}this.obj_list=[];this.layers=[];this.listeners=[];this.element=document.createElement("div");this.element.className="wgo-board";this.element.style.position=
"relative";this.background&&("#"==this.background[0]?this.element.style.backgroundColor=this.background:this.element.style.backgroundImage="url('"+this.background+"')");this.grid=new h.GridLayer;this.shadow=new h.ShadowLayer(this,k("shadowSize",this));this.stone=new h.MultipleCanvasLayer;this.addLayer(this.grid,100);this.addLayer(this.shadow,200);this.addLayer(this.stone,300)},setWidth:function(a){this.width=a;this.width*=this.pixelRatio;this.fieldHeight=this.fieldWidth=4*this.width/(4*(this.bx+1-
this.tx)+2);this.left=z.call(this);this.height=(this.by-this.ty+1.5)*this.fieldHeight;this.top=A.call(this);C.call(this);this.redraw()},setHeight:function(a){this.height=a;this.height*=this.pixelRatio;this.fieldWidth=this.fieldHeight=4*this.height/(4*(this.by+1-this.ty)+2);this.top=A.call(this);this.width=(this.bx-this.tx+1.5)*this.fieldWidth;this.left=z.call(this);C.call(this);this.redraw()},setDimensions:function(a,b){this.width=a||parseInt(this.element.style.width,10);this.width*=this.pixelRatio;
this.height=b||parseInt(this.element.style.height,10);this.height*=this.pixelRatio;this.fieldWidth=4*this.width/(4*(this.bx+1-this.tx)+2);this.fieldHeight=4*this.height/(4*(this.by+1-this.ty)+2);this.left=z.call(this);this.top=A.call(this);C.call(this);this.redraw()},getSection:function(){return this.section},setSection:function(a,b,c,e){this.section="object"==typeof a?a:{top:a,right:b,bottom:c,left:e};this.tx=this.section.left;this.ty=this.section.top;this.bx=this.size-1-this.section.right;this.by=
this.size-1-this.section.bottom;this.setDimensions()},setSize:function(a){a=a||19;if(a!=this.size){this.size=a;this.obj_arr=[];for(a=0;a<this.size;a++){this.obj_arr[a]=[];for(var b=0;b<this.size;b++)this.obj_arr[a][b]=[]}this.bx=this.size-1-this.section.right;this.by=this.size-1-this.section.bottom;this.setDimensions()}},redraw:function(){try{for(var a=0;a<this.layers.length;a++)this.layers[a].clear(this),this.layers[a].draw(this);for(a=0;a<this.size;a++)for(var b=0;b<this.size;b++)x.call(this,a,
b);for(a=0;a<this.obj_list.length;a++){var c=this.obj_list[a],e=c.handler,d;for(d in e)e[d].draw.call(this[d].getContext(c.args),c.args,this)}}catch(f){console.log("WGo board failed to render. Error: "+f.message)}},getX:function(a){return this.left+a*this.fieldWidth},getY:function(a){return this.top+a*this.fieldHeight},addLayer:function(a,b){a.appendTo(this.element,b);a.setDimensions(this.width,this.height);this.layers.push(a)},removeLayer:function(a){var b=this.layers.indexOf(a);0<=b&&(this.layers.splice(b,
1),a.removeFrom(this.element))},update:function(a){var b;if(a.remove&&"all"==a.remove)this.removeAllObjects();else if(a.remove)for(b=0;b<a.remove.length;b++)this.removeObject(a.remove[b]);if(a.add)for(b=0;b<a.add.length;b++)this.addObject(a.add[b])},addObject:function(a){if(a.constructor==Array)for(var b=0;b<a.length;b++)this.addObject(a[b]);else try{B.call(this,a.x,a.y);for(var b=this.obj_arr[a.x][a.y],c=0;c<b.length;c++)if(b[c].type==a.type){b[c]=a;x.call(this,a.x,a.y);return}a.type?b.push(a):b.unshift(a);
x.call(this,a.x,a.y)}catch(e){console.log("WGo board failed to render. Error: "+e.message)}},removeObject:function(a){if(a.constructor==Array)for(var b=0;b<a.length;b++)this.removeObject(a[b]);else try{for(var c=0;c<this.obj_arr[a.x][a.y].length;c++)if(this.obj_arr[a.x][a.y][c].type==a.type){b=c;break}b!==q&&(B.call(this,a.x,a.y),this.obj_arr[a.x][a.y].splice(b,1),x.call(this,a.x,a.y))}catch(e){console.log("WGo board failed to render. Error: "+e.message)}},removeObjectsAt:function(a,b){this.obj_arr[a][b].length&&
(B.call(this,a,b),this.obj_arr[a][b]=[])},removeAllObjects:function(){this.obj_arr=[];for(var a=0;a<this.size;a++){this.obj_arr[a]=[];for(var b=0;b<this.size;b++)this.obj_arr[a][b]=[]}this.redraw()},addCustomObject:function(a,b){this.obj_list.push({handler:a,args:b});this.redraw()},removeCustomObject:function(a,b){for(var c=0;c<this.obj_list.length;c++){var e=this.obj_list[c];if(e.handler==a&&e.args==b)return this.obj_list.splice(c,1),this.redraw(),!0}return!1},addEventListener:function(a,b){var c=
this,e={type:a,callback:b,handleEvent:function(a){var e=F.call(c,a);b(e.x,e.y,a)}};this.element.addEventListener(a,e,!0);this.listeners.push(e)},removeEventListener:function(a,b){for(var c=0;c<this.listeners.length;c++){var e=this.listeners[c];if(e.type==a&&e.callback==b)return this.element.removeEventListener(e.type,e,!0),this.listeners.splice(c,1),!0}return!1},getState:function(){return{objects:g.clone(this.obj_arr),custom:g.clone(this.obj_list)}},restoreState:function(a){this.obj_arr=a.objects||
this.obj_arr;this.obj_list=a.custom||this.obj_list;this.redraw()}};h.default={size:19,width:0,height:0,font:"Calibri",lineWidth:1,autoLineWidth:!1,starPoints:{19:[{x:3,y:3},{x:9,y:3},{x:15,y:3},{x:3,y:9},{x:9,y:9},{x:15,y:9},{x:3,y:15},{x:9,y:15},{x:15,y:15}],13:[{x:3,y:3},{x:9,y:3},{x:3,y:9},{x:9,y:9}],9:[{x:4,y:4}]},stoneHandler:h.drawHandlers.SHELL,starSize:1,shadowSize:1,stoneSize:1,section:{top:0,right:0,bottom:0,left:0},background:g.DIR+"wood1.jpg",theme:{}};g.Board=h;var s=function(a){this.size=
a||19;this.schema=[];for(a=0;a<this.size*this.size;a++)this.schema[a]=0};s.prototype={constructor:g.Position,get:function(a,b){return 0>a||0>b||a>=this.size||b>=this.size?q:this.schema[a*this.size+b]},set:function(a,b,c){this.schema[a*this.size+b]=c;return this},clear:function(){for(var a=0;a<this.size*this.size;a++)this.schema[a]=0;return this},clone:function(){var a=new s(this.size);a.schema=this.schema.slice(0);return a},compare:function(a){for(var b=[],c=[],e=0;e<this.size*this.size;e++)this.schema[e]&&
!a.schema[e]?c.push({x:Math.floor(e/this.size),y:e%this.size}):this.schema[e]!=a.schema[e]&&b.push({x:Math.floor(e/this.size),y:e%this.size,c:a.schema[e]});return{add:b,remove:c}}};g.Position=s;var m=function(a,b,c,e){this.size=a||19;this.repeating=b===q?"KO":b;this.allow_rewrite=c||!1;this.allow_suicide=e||!1;this.stack=[];this.stack[0]=new s(this.size);this.stack[0].capCount={black:0,white:0};this.turn=g.B;Object.defineProperty(this,"position",{get:function(){return this.stack[this.stack.length-
1]},set:function(a){this.stack[this.stack.length-1]=a}})},t=function(a,b,c,e,d){0<=c&&c<a.size&&0<=e&&e<a.size&&a.get(c,e)==d&&(a.set(c,e,0),b.push({x:c,y:e}),t(a,b,c,e-1,d),t(a,b,c,e+1,d),t(a,b,c-1,e,d),t(a,b,c+1,e,d))},u=function(a,b,c,e,d){if(0>c||c>=a.size||0>e||e>=a.size)return!0;if(0==a.get(c,e))return!1;if(!0==b.get(c,e)||a.get(c,e)==-d)return!0;b.set(c,e,!0);return u(a,b,c,e-1,d)&&u(a,b,c,e+1,d)&&u(a,b,c-1,e,d)&&u(a,b,c+1,e,d)},l=function(a,b,c,e){var d=[];if(0<=b&&b<a.size&&0<=c&&c<a.size&&
a.get(b,c)==e){var f=new s(a.size);u(a,f,b,c,e)&&t(a,d,b,c,e)}return d};m.prototype={constructor:m,getPosition:function(){return this.stack[this.stack.length-1]},play:function(a,b,c,e){if(!this.isOnBoard(a,b))return 1;if(!this.allow_rewrite&&0!=this.position.get(a,b))return 2;c||(c=this.turn);var d=this.position.clone();d.set(a,b,c);var f=c,h=l(d,a-1,b,-c).concat(l(d,a+1,b,-c),l(d,a,b-1,-c),l(d,a,b+1,-c));if(!h.length){var k=new s(this.size);if(u(d,k,a,b,c))if(this.allow_suicide)f=-c,t(d,h,a,b,c);
else return 3}if(k=this.repeating){a:{var m;if("KO"==this.repeating&&0<=this.stack.length-2)m=this.stack.length-2;else if("ALL"==this.repeating)m=0;else{a=!0;break a}for(var p=this.stack.length-2;p>=m;p--)if(this.stack[p].get(a,b)==d.get(a,b)){for(var k=!0,q=0;q<this.size*this.size;q++)if(this.stack[p].schema[q]!=d.schema[q]){k=!1;break}if(k){a=!1;break a}}a=!0}k=!a}if(k)return 4;if(e)return!1;d.color=c;d.capCount={black:this.position.capCount.black,white:this.position.capCount.white};f==g.B?d.capCount.black+=
h.length:d.capCount.white+=h.length;this.pushPosition(d);this.turn=-c;return h},pass:function(a){this.pushPosition();a?(this.position.color=a,this.turn=-a):(this.position.color=this.turn,this.turn=-this.turn)},isValid:function(a,b,c){return"number"!=typeof this.play(a,b,c,!0)},isOnBoard:function(a,b){return 0<=a&&0<=b&&a<this.size&&b<this.size},addStone:function(a,b,c){return this.isOnBoard(a,b)&&0==this.position.get(a,b)?(this.position.set(a,b,c||0),!0):!1},removeStone:function(a,b){return this.isOnBoard(a,
b)&&0!=this.position.get(a,b)?(this.position.set(a,b,0),!0):!1},setStone:function(a,b,c){return this.isOnBoard(a,b)?(this.position.set(a,b,c||0),!0):!1},getStone:function(a,b){return this.isOnBoard(a,b)?this.position.get(a,b):0},pushPosition:function(a){a||(a=this.position.clone(),a.capCount={black:this.position.capCount.black,white:this.position.capCount.white},a.color=this.position.color);this.stack.push(a);a.color&&(this.turn=-a.color);return this},popPosition:function(){var a=null;0<this.stack.length&&
(a=this.stack.pop(),this.turn=0==this.stack.length?g.B:this.position.color?-this.position.color:-this.turn);return a},firstPosition:function(){this.stack=[];this.stack[0]=new s(this.size);this.stack[0].capCount={black:0,white:0};this.turn=g.B;return this},getCaptureCount:function(a){return a==g.B?this.position.capCount.black:this.position.capCount.white},validatePosition:function(){for(var a,b,c=0,e=0,d=[],f=this.position.clone(),h=0;h<this.size;h++)for(var k=0;k<this.size;k++)if(a=this.position.get(h,
k))b=d.length,d=d.concat(l(f,h-1,k,-a),l(f,h+1,k,-a),l(f,h,k-1,-a),l(f,h,k+1,-a)),a==g.B?e+=d-b:c+=d-b;this.position.capCount.black+=e;this.position.capCount.white+=c;this.position.schema=f.schema;return d}};g.Game=m;v.WGo=g})(window);
```
public/wgo.player.css
```
/*--- Icons ------------------------------------------------------------------------*/

@font-face {
  font-family: 'wgo-icons';
  src: url('data:application/font-woff;base64,d09GRgABAAAAAA7AAA4AAAAAF/gAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABRAAAAEQAAABWPeFIaGNtYXAAAAGIAAAAUwAAAWqgWeonY3Z0IAAAAdwAAAAUAAAAHAZL/5RmcGdtAAAB8AAABPkAAAmRigp4O2dhc3AAAAbsAAAACAAAAAgAAAAQZ2x5ZgAABvQAAATOAAAHOkwwDxtoZWFkAAALxAAAADUAAAA2/xq8WmhoZWEAAAv8AAAAIAAAACQHWgNcaG10eAAADBwAAAApAAAAMCQrAABsb2NhAAAMSAAAABoAAAAaDNEK1G1heHAAAAxkAAAAIAAAACAA6wn3bmFtZQAADIQAAAFqAAACjoKZ70Fwb3N0AAAN8AAAAHgAAACk4zP/3HByZXAAAA5oAAAAVgAAAFaSoZr/eJxjYGRmYZzAwMrAwVTFtIeBgaEHQjM+YDBkZGJgYGJgZWbACgLSXFMYHF4wvJBmDvqfxRDFzMPgDxRmBMkBAL9aCsd4nGNgYGBmgGAZBkYGEEgB8hjBfBYGDyDNx8DBwMTAxsDwgvEFzwv+F+IvpP//Byl8wQDmC7+QAvElGMW/i38V/yT+AWoOEmBkQxcZeQAAVo0S/wB4nGNgQANGDEbMPP83gjAAEL4D43icnVXZdtNWFJU8ZHASOmSgoA7X3DhQ68qEKRgwaSrFdiEdHAitBB2kDHTkncc+62uOQrtWH/m07n09JLR0rbYsls++R1tn2DrnRhwjKn0aiGvUoZKXA6msPZZK90lc13Uvj5UMBnFdthJPSZuonSRKat3sUC7xWOsqWSdYJ+PlIFZPVZ5noAziFB5lSUQbRBuplyZJ4onjJ4kWZxAfJUkgJaMQp9LIUEI1GsRS1aFM6dCr1xNx00DKRqMedVhU90PFJ8c1p9SsA0YqVznCFevVRr4bpwMve5DEOsGzrYcxHnisfpQqkIqR6cg/dkpOlIaBVHHUoVbi6DCTX/eRTCrNQKaMYkWl7oG43f102xYxPXQ6vi5KlUaqurnOKJrt0fGogygP2cbppNzQ2fbw5RlTVKtdcbPtQGYNXErJbHSfRAAdJlLj6QFONZwCqRn1R8XZ588BEslclKo8VTKHegOZMzt7cTHtbiersnCknwcyb3Z2452HQ6dXh3/R+hdM4cxHj+Jifj5C+lBqfiJOJKVGWMzyp4YfcVcgQrkxiAsXyuBThDl0RdrZZl3jtTH2hs/5SqlhPQna6KP4fgr9TiQrHGdRo/VInM1j13Wt3GdQS7W7Fzsyr0OVIu7vCwuuM+eEYZ4WC1VfnvneBTT/Bohn/EDeNIVL+5YpSrRvm6JMu2iKCu0SVKVdNsUU7YoppmnPmmKG9h1TzNKeMzLj/8vc55H7HN7xkJv2XeSmfQ+5ad9HbtoPkJtWITdtHblpLyA3rUZu2lWjOnYEGgZpF1IVQdA0svph3Fab9UDWjDR8aWDyLmLI+upER521tcofxX914gsHcmmip7siF5viLq/bFj483e6rj5pG3bDV+MaR8jAeRnocmtBZ+c3hv+1N3S6a7jKqMugBFUwKwABl7UAC0zrbCaT1mqf48gdgXIZ4zkpDtVSfO4am7+V5X/exOfG+x+3GLrdcd3kJWdYNcmP28N9SZKrrH+UtrVQnR6wrJ49VaxhDKrwour6SlHu0tRu/KKmy8l6U1srnk5CbPYMbQlu27mGwI0xpyiUeXlOlKD3UUo6yQyxvKco84JSLC1qGxLgOdQ9qa8TpoXoYGwshhqG0vRBwSCldFd+0ynfxHqtr2Oj4xRXh6XpyEhGf4ir7UfBU10b96A7avGbdMoMpVaqn+4xPsa/b9lFZaaSOsxe3VAfXNOsaORXTT+Rr4HRvOGjdAz1UfDRBI1U1x+jGKGM0ljXl3wR0MVZ+w2jVYvs93E+dpFWsuUuY7JsT9+C0u/0q+7WcW0bW/dcGvW3kip8jMb8tCvw7B2K3ZA3UO5OBGAvIWdAYxhYmdxiug23EbfY/Jqf/34aFRXJXOxq7eerD1ZNRJXfZ8rjLTXZZ16M2R9VOGvsIjS0PN+bY4XIstsRgQbb+wf8x7gF3aVEC4NDIZZiI2nShnurh6h6rsW04VxIBds2x43QAegAuQd8cu9bzCYD13CPnLsB9cgh2yCH4lByCz8i5BfA5OQRfkEMwIIdgl5w7AA/IIXhIDsEeOQSPyNkE+JIcgq/IIYjJIUjIuQ3wmByCJ+QQfE0OwTdGrk5k/pYH2QD6zqKbQKmdGhzaOGRGrk3Y+zxY9oFFZB9aROqRkesT6lMeLPV7i0j9wSJSfzRyY0L9iQdL/dkiUn+xiNRnxpeZIymvDp7zjg7+BJfqrV4AAAAAAQAB//8AD3icnVVNaBtXEJ6Ztz/ySlr97T7JsrKyVtIqROAk+rGDg521LWqIDylWIHZijGmTkBACaUjaHgKlPZVQktJA6MGHnkopFBJKLiXQQ4PJIYdQQk49hRJ67CGU9BC5sysZKbSnitXMvJn93sybNzMLtLu7+1B8T7uQhiq87xsGKoiLBVSOrdzz3l3zJSGqrFNOaQggujoKYUBnwt/HEqtQwBl+RVHwBDNUuuHLy+u+tDIExX0T45mqVYlHx3RIUzqSqGPJ1eyUJY+iPVNqTLdTLa/WkKzRyiW9XXY91kw3RfzNbXty0t4ewycBX9jYWOhtbbcDTncdu3fHnhwbm7Txsu1cZNOdhY3t7Y0FvLywAcGZ/sZzIgoOTMERv10rkqrl00QiAsQRL4IAQkFn+KgACKdAVbUuaJqhdjyv7JVkRZf1qm1pesn1au3W9EwziKwvNWQ2xUQE5hElnpNm70XCQmlWKiF7zpSld6R5O1wzPbscSgF93mcM+lnS9UuhGFIOiH/4ir6CKGg/Girur6O0dNTC1GTxpWn2TuZcN4cfG47R+ytpOUSOlQxgAmD3vljnsydgBjrg+3MzSRIKLoJCghRxAYRKQj0PKvtQgbNFehd03VgCRO0kJyGqdWznaMautpuRbL3abnl1dLV9GFxZYzrTmsKyq2tFlI2ZeeSb4zSYuGdut+bVWtYycYpa8+QgvjIilyJGSG7Pbxz+fDkSO64kVad65ICcKM+Ghlwl7SaT+Ozqzh87V0Oyuocx8JPDJ6c+ihtHhO7lnbSdjyV9zwqsUdeOFfIHcpevP7pGVx6/fHyFrj0KchDc/2vxjYjBQc7AzoM5VHVcXLlncDlPQwQFRjgNJHRBW6CrQg+yoQlVOw+aIjTlPCjAzxoIgV3OiiE6Eyv3oow+zGjCCF0AnVTS1QuMoz6OhjiBRH0gcZ/8T4/r637Uyspau+G1m2O5OnKea1yNM0EJlBpZBxOold2aVx70U5ObaQ5bx3C62chKO4OaexC9YN0oYkikJdKbS71Di1u4uYRPy05E0Sc0nUQ81jtUbbWq+LTaUiuaLpTop73ZuBf/Mx6fY3YHLzKdi+PK/QGWmamkGY2iVe2Db+kMJSWGSYYyMgCEyGCLwZ1k+E4SUISKX+IqJ6RTSjhUIJwpBM6EzBg6JCihDgdFczAlsqm3MiDpg2HUrRsjB1vcol/2ogqM6yMW3Awafq9HYpD2E0G+l7hsotCxM5Sq47B6xfqwJHHzX3UW7nM63Gccan5leJigmajLvRWlDkJWppK6BjGMBcdyTbQcbMwjd9KIL/yhe3N19ea3AcHTQ790a6Bk0nv6HzGwzyt0g8PPQuSBTBkq9eeFOpgX+ogs3uPZ8YV0HLnKwtfW5KSFHxqFyGszWcAXhaT5enSxtz+t0We8vwVFv0A88hF41nMeuVQBl+OxVDJmxS2ReMtttcGX57KI2+zqriwUJP52/C67yxu/m+k8/pRPm/tne1Ozs/jr7GB2sa+HtBaepQwL/jwIHQl4UgcfH1QAz0RQUVXlBDNF7YKqqMvjuXgMoVjIlcfdTDKWjUtdgSgaYxxPQwafFdfjL0o7pKVQkxrR001ZcKw331lOQQZ/WgvWQx1+6ex3+DnbZ71nff4P1mMzzwAAeJxjYGRgYABinX0v98fz23xl4GZ+ARRhOKcZUQOhFWz+//+/kXkVMw+Qy8HABBIFAGrpDLwAAAB4nGNgZGBgDvqfxRDF/IKB4f9f5tUMQBEUwAMAjKIFvHicY37BwMC8ioGBMRWIvwDZkUC8AIgFoWwQLmBgYIoA4j0MDACthQZKAAAAAAAAAABqAMoA6AFqAjQCegKeAuADEANGA50AAAABAAAADABFAAMAAAAAAAIAEgAfAG4AAABbCZEAAAAAeJx1j8tOwkAYhc8gaIDEGPUBJi4MxFCg0Q0LQ0KEjXHBQhN3pZS2pHTIdIDwAL6Dax/G5/K0nRDjpc3MfP/57wDO8AmB8rvjKVmgTqvkCk5wb/mI+oPlKvnJco2eF8sN3ODVchMXeKNPVOu0lni3LHAuKpYrOBWXlo+oX1mukm8t13AsxpYbeBaPlpu4Fh8jtd7rOIyMbI3a0u31XTnbS0UpTr1EehsTKZ3JoVyo1ARJohxfrXah6sS+SrNpEG4STx/sA/Sd3iRIA+2ZYJ4XzLaha8xCLrRaybEtJddaLQPfOJEx60G3+70FRlBYYw+NGCEiGEi0qLb5uuihz1tixgjJyDIqRgoPCRUPG2ZEhSejPeRZ0EqpBoxIyA583ivsmKnQYbZfRGSYMiZkhYR19B/+30qf1XqYMC/l0czL+8wPE2bYMselajhHPosuekuMf0wluXXuW1LxqTvF7obqAF3+/2zxBVzeduQAAHicbYzbCsMgEER3WzVpYj9lofkk0ZVIvWEsJX/fUl97HmbgDAxcYLDAfzQAXlGgRIUTznjDBVfUeJehc3pMtqTEuYuQfVE1mpM2vXOsZEOzkZ20O9vn+kviVPupxqJHDae9OTr50t6mubkX4uxoE9/nF8AH4bUk2Eu4AMhSWLEBAY5ZuQgACABjILABI0SwAyNwsgQoCUVSRLIKAgcqsQYBRLEkAYhRWLBAiFixBgNEsSYBiFFYuAQAiFixBgFEWVlZWbgB/4WwBI2xBQBEAAA=') format('woff'),
       url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxtZXRhZGF0YT5Db3B5cmlnaHQgKEMpIDIwMTIgYnkgb3JpZ2luYWwgYXV0aG9ycyBAIGZvbnRlbGxvLmNvbTwvbWV0YWRhdGE+CjxkZWZzPgo8Zm9udCBpZD0id2dvLWljb25zIiBob3Jpei1hZHYteD0iMTAwMCIgPgo8Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJ3Z28taWNvbnMiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc3RyZXRjaD0ibm9ybWFsIiB1bml0cy1wZXItZW09IjEwMDAiIGFzY2VudD0iODUwIiBkZXNjZW50PSItMTUwIiAvPgo8bWlzc2luZy1nbHlwaCBob3Jpei1hZHYteD0iMTAwMCIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImZhc3QtZm9yd2FyZCIgdW5pY29kZT0iJiN4ZTgxNzsiIGQ9Ik04NjYgMzc0cTE0LTEwIDE0LTI0dC0xNC0yMmwtMzcyLTI0OHEtMjItMTQtMzctNnQtMTUgMzZsMCA0ODJxMCAyOCAxNSAzNnQzNy02eiBtLTQ1NCAwcTE0LTEwIDE0LTI0dC0xNC0yMmwtMzYwLTI0OHEtMjAtMTQtMzYtNnQtMTYgMzZsMCA0ODJxMCAyOCAxNiAzNnQzNi02eiIgaG9yaXotYWR2LXg9Ijg4MCIgLz4KPGdseXBoIGdseXBoLW5hbWU9InRvLWVuZC0xIiB1bmljb2RlPSImI3hlODFhOyIgZD0iTTQxMiAzNzRxMTQtMTAgMTQtMjQgMC0xMi0xNC0yMmwtMzYyLTIyOHEtMjItMTQtMzYtNXQtMTQgMzVsMCA0NDJxMCAyNiAxNCAzNXQzNi01eiBtMTE0IDI2OHE3NCAwIDc0LTU4bDAtNDY2cTAtNTgtNzQtNTgtNzYgMC03NiA1OGwwIDQ2NnEwIDU4IDc2IDU4eiIgaG9yaXotYWR2LXg9IjYwMCIgLz4KPGdseXBoIGdseXBoLW5hbWU9InBsYXktMSIgdW5pY29kZT0iJiN4ZTgwYzsiIGQ9Ik00ODYgMzc2cTE0LTEwIDE0LTI2IDAtMTQtMTQtMjRsLTQyOC0yNjZxLTI0LTE2LTQxLTZ0LTE3IDQwbDAgNTE0cTAgMzAgMTcgNDB0NDEtNnoiIGhvcml6LWFkdi14PSI1MDAiIC8+CjxnbHlwaCBnbHlwaC1uYW1lPSJjaGVjayIgdW5pY29kZT0iJiN4ZTgxMzsiIGQ9Ik03ODYgMzMxbDAtMTc3cTAtNjYtNDctMTE0dC0xMTQtNDdsLTQ2NCAwcS02NiAwLTExNCA0N3QtNDcgMTE0bDAgNDY0cTAgNjYgNDcgMTE0dDExNCA0N2w0NjQgMHEzNSAwIDY1LTE0IDgtNCAxMC0xM3QtNS0xNmwtMjctMjdxLTYtNi0xMy02LTIgMC01IDEtMTMgMy0yNSAzbC00NjQgMHEtMzcgMC02My0yNnQtMjYtNjNsMC00NjRxMC0zNyAyNi02M3Q2My0yNmw0NjQgMHEzNyAwIDYzIDI2dDI2IDYzbDAgMTQycTAgNyA1IDEybDM2IDM2cTYgNiAxMyA2IDMgMCA3LTIgMTEtNCAxMS0xNnogbTEyOSAyNzNsLTQ1NC00NTRxLTEzLTEzLTMyLTEzdC0zMiAxM2wtMjQwIDI0MHEtMTMgMTMtMTMgMzJ0MTMgMzJsNjEgNjFxMTMgMTMgMzIgMTN0MzItMTNsMTQ3LTE0NyAzNjEgMzYxcTEzIDEzIDMyIDEzdDMyLTEzbDYxLTYxcTEzLTEzIDEzLTMydC0xMy0zMnoiIGhvcml6LWFkdi14PSI5MjguNTcxIiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0ibWVudSIgdW5pY29kZT0iJiN4ZTgxYjsiIGQ9Ik02NTAgNDAwcTIyIDAgMzYtMTV0MTQtMzUtMTUtMzUtMzUtMTVsLTYwMCAwcS0yMCAwLTM1IDE1dC0xNSAzNSAxNCAzNSAzNiAxNWw2MDAgMHogbS02MDAgMTAwcS0yMCAwLTM1IDE1dC0xNSAzNSAxNCAzNSAzNiAxNWw2MDAgMHEyMiAwIDM2LTE1dDE0LTM1LTE1LTM1LTM1LTE1bC02MDAgMHogbTYwMC0zMDBxMjIgMCAzNi0xNXQxNC0zNS0xNS0zNS0zNS0xNWwtNjAwIDBxLTIwIDAtMzUgMTV0LTE1IDM1IDE0IDM1IDM2IDE1bDYwMCAweiIgaG9yaXotYWR2LXg9IjcwMCIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImNvbW1lbnQiIHVuaWNvZGU9IiYjeGU4MDA7IiBkPSJNNzgxIDY2MmwtNjI1IDBxLTIxIDAtMzctMTV0LTE2LTM2bDAtMzY1cTAtMjEgMTYtMzd0MzctMTZsMTU2IDAgMC05IDkgOSA0NjAgMHEyMSAwIDM3IDE2dDE2IDM3bDAgMzY1cTAgMjEtMTYgMzZ0LTM3IDE1eiBtMCAxMDVxNjUgMCAxMTEtNDZ0NDYtMTExbDAtMzY1cTAtNjUtNDYtMTExdC0xMTEtNDZsLTQxNiAwLTE1Ni0xNTYgMCAxNTYtNTMgMHEtNjUgMC0xMTEgNDZ0LTQ2IDExMWwwIDM2NXEwIDY1IDQ2IDExMXQxMTEgNDZsNjI1IDB6IiBob3Jpei1hZHYteD0iOTM4IiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iaGVscC1jaXJjbGVkIiB1bmljb2RlPSImI3hlODBmOyIgZD0iTTUwMCA4MmwwIDEwN3EwIDgtNSAxM3QtMTMgNWwtMTA3IDBxLTggMC0xMy01dC01LTEzbDAtMTA3cTAtOCA1LTEzdDEzLTVsMTA3IDBxOCAwIDEzIDV0NSAxM3ogbTE0MyAzNzVxMCA0OS0zMSA5MXQtNzcgNjUtOTUgMjNxLTEzNiAwLTIwNy0xMTktOC0xMyA0LTIzbDc0LTU2cTQtMyAxMS0zIDkgMCAxNCA3IDMwIDM4IDQ4IDUxIDE5IDEzIDQ4IDEzIDI3IDAgNDgtMTV0MjEtMzNxMC0yMS0xMS0zNHQtMzgtMjVxLTM1LTE2LTY0LTQ4dC0yOS03MGwwLTIwcTAtOCA1LTEzdDEzLTVsMTA3IDBxOCAwIDEzIDV0NSAxM3EwIDExIDEyIDI4dDMwIDI4cTE4IDEwIDI3IDE2dDI2IDIwIDI1IDI3IDE2IDM0IDcgNDV6IG0yMTQtMTA3cTAtMTE3LTU3LTIxNXQtMTU2LTE1Ni0yMTUtNTctMjE1IDU3LTE1NiAxNTYtNTcgMjE1IDU3IDIxNSAxNTYgMTU2IDIxNSA1NyAyMTUtNTcgMTU2LTE1NiA1Ny0yMTV6IiBob3Jpei1hZHYteD0iODU3LjE0MyIgLz4KPGdseXBoIGdseXBoLW5hbWU9ImNoZWNrLWVtcHR5IiB1bmljb2RlPSImI3hlODE0OyIgZD0iTTYyNSA3MDdsLTQ2NCAwcS0zNyAwLTYzLTI2dC0yNi02M2wwLTQ2NHEwLTM3IDI2LTYzdDYzLTI2bDQ2NCAwcTM3IDAgNjMgMjZ0MjYgNjNsMCA0NjRxMCAzNy0yNiA2M3QtNjMgMjZ6IG0xNjEtODlsMC00NjRxMC02Ni00Ny0xMTR0LTExNC00N2wtNDY0IDBxLTY2IDAtMTE0IDQ3dC00NyAxMTRsMCA0NjRxMCA2NiA0NyAxMTR0MTE0IDQ3bDQ2NCAwcTY2IDAgMTE0LTQ3dDQ3LTExNHoiIGhvcml6LWFkdi14PSI3ODUuNzE0IiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iY2lyY2xlLWVtcHR5IiB1bmljb2RlPSImI3hlODE2OyIgZD0iTTQyOSA2NTRxLTgzIDAtMTUyLTQxdC0xMTAtMTEwLTQxLTE1MiA0MS0xNTIgMTEwLTExMCAxNTItNDEgMTUyIDQxIDExMCAxMTAgNDEgMTUyLTQxIDE1Mi0xMTAgMTEwLTE1MiA0MXogbTQyOS0zMDRxMC0xMTctNTctMjE1dC0xNTYtMTU2LTIxNS01Ny0yMTUgNTctMTU2IDE1Ni01NyAyMTUgNTcgMjE1IDE1NiAxNTYgMjE1IDU3IDIxNS01NyAxNTYtMTU2IDU3LTIxNXoiIGhvcml6LWFkdi14PSI4NTcuMTQzIiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iY2lyY2xlIiB1bmljb2RlPSImI3hlODE1OyIgZD0iTTg1NyAzNTBxMC0xMTctNTctMjE1dC0xNTYtMTU2LTIxNS01Ny0yMTUgNTctMTU2IDE1Ni01NyAyMTUgNTcgMjE1IDE1NiAxNTYgMjE1IDU3IDIxNS01NyAxNTYtMTU2IDU3LTIxNXoiIGhvcml6LWFkdi14PSI4NTcuMTQzIiAvPgo8Z2x5cGggZ2x5cGgtbmFtZT0iaW5mbyIgdW5pY29kZT0iJiN4ZTgwMTsiIGQ9Ik0zNTcgMTAwbDAtNzFxMC0xNS0xMS0yNXQtMjUtMTFsLTI4NiAwcS0xNSAwLTI1IDExdC0xMSAyNWwwIDcxcTAgMTUgMTEgMjV0MjUgMTFsMzYgMCAwIDIxNC0zNiAwcS0xNSAwLTI1IDExdC0xMSAyNWwwIDcxcTAgMTUgMTEgMjV0MjUgMTFsMjE0IDBxMTUgMCAyNS0xMXQxMS0yNWwwLTMyMSAzNiAwcTE1IDAgMjUtMTF0MTEtMjV6IG0tNzEgNjQzbDAtMTA3cTAtMTUtMTEtMjV0LTI1LTExbC0xNDMgMHEtMTUgMC0yNSAxMXQtMTEgMjVsMCAxMDdxMCAxNSAxMSAyNXQyNSAxMWwxNDMgMHExNSAwIDI1LTExdDExLTI1eiIgaG9yaXotYWR2LXg9IjM1Ny4xNDMiIC8+CjwvZm9udD4KPC9kZWZzPgo8L3N2Zz4=') format('svg');
  font-weight: normal;
  font-style: normal;
}

/* Available icons: */
.wgo-icon-fast-forward:before { content: '\e817'; }
.wgo-icon-to-end:before { content: '\e81a'; }
.wgo-icon-play:before { content: '\e80c'; }
.wgo-icon-check:before { content: '\e813'; }
.wgo-icon-menu:before { content: '\e81b'; }
.wgo-icon-comment:before { content: '\e800'; }
.wgo-icon-help-circled:before { content: '\e80f'; }
.wgo-icon-check-empty:before { content: '\e814'; }
.wgo-icon-circle-empty:before { content: '\e816'; }
.wgo-icon-circle:before { content: '\e815'; }
.wgo-icon-info:before { content: '\e801'; }

/*--- /Icons -----------------------------------------------------------------------*/

/*--- Basic ------------------------------------------------------------------------*/

.wgo-player-main {
	font-family: Calibri, Tahoma, Arial;
	color: black;
	margin: 0 auto;
	width: 100%;
	height: 100%;
	line-height: normal;
	font-size: 16px;
	position: relative;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-tap-highlight-color: transparent; /* For some Androids */
}

.wgo-player-main:after {
	content: "";
	clear: both;
	display: block;
}

/*--- /Basic -----------------------------------------------------------------------*/

/*--- Regions ----------------------------------------------------------------------*/

.wgo-player-left, .wgo-player-center, .wgo-player-right  {
	float: left;
}

.wgo-player-center {
	width: 100%;
}

.wgo-player-left-wrapper, .wgo-player-right-wrapper  {
	height: 100%;
	position: relative;
}

/*--- /Regions ----------------------------------------------------------------------*/

/*--- Two columns modificatons ------------------------------------------------------*/

.wgo-twocols .wgo-player-left, .wgo-twocols  .wgo-player-right  {
	width: 30%;
}

.wgo-twocols .wgo-player-center {
	width: 70%;
}

/*--- /Two columns modificatons ------------------------------------------------------*/

/*--- Board --------------------------------------------------------------------------*/

.wgo-player-board {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}

.wgo-board {
	margin: 0 auto;
    background-color: #CEB053;
    border-top: #F0E7A7 solid 1px;
    border-right: #D1A974 solid 1px;
    border-left: #CCB467 solid 1px;
    border-bottom: #665926 solid 3px;
    /*border-right: #665926 solid 3px;*/
    border-radius: 3px;
}

/*--- /Board --------------------------------------------------------------------------*/

/*--- Box styles ----------------------------------------------------------------------*/

.wgo-box-wrapper {
	background: rgba(226,226,226,0.5);
	border: 1px solid rgba(200,200,200,0.5);
	box-sizing: border-box;
	-moz-box-sizing: border-box;
}

.wgo-box-title {
	margin: 0 10px;
	line-height: 40px;
	font-weight: bold;
	font-size: 20px;
	height: 40px;
	overflow: hidden;
}

/*--- /Box styles ----------------------------------------------------------------------*/

/*--- Player box -----------------------------------------------------------------------*/

.wgo-player-wrapper .wgo-box-title::after {
	content: ' ';
	float: right;
	margin-top: 10px;
	margin-right: 2px;
	width: 18px;
	height: 18px;
	border-radius: 9px;
	box-shadow: 1px 1px 1px 1px rgba(127, 127, 127, 0.3);
}

.wgo-player-wrapper.wgo-black .wgo-box-title::after {
	background: rgb(35,36,39);
	background: -moz-linear-gradient(-45deg,  rgba(35,36,39,1) 0%, rgba(0,0,0,1) 100%);
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(35,36,39,1)), color-stop(100%,rgba(0,0,0,1)));
	background: -webkit-linear-gradient(-45deg,  rgba(35,36,39,1) 0%,rgba(0,0,0,1) 100%);
	background: -o-linear-gradient(-45deg,  rgba(35,36,39,1) 0%,rgba(0,0,0,1) 100%);
	background: -ms-linear-gradient(-45deg,  rgba(35,36,39,1) 0%,rgba(0,0,0,1) 100%);
	background: linear-gradient(135deg,  rgba(35,36,39,1) 0%,rgba(0,0,0,1) 100%);
}

.wgo-player-wrapper.wgo-white .wgo-box-title::after {
	background: rgb(255,255,255);
	background: -moz-linear-gradient(-45deg,  rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(47%,rgba(246,246,246,1)), color-stop(100%,rgba(237,237,237,1)));
	background: -webkit-linear-gradient(-45deg,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
	background: -o-linear-gradient(-45deg,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
	background: -ms-linear-gradient(-45deg,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
	background: linear-gradient(135deg,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
}

.wgo-player-info {
	padding: 0 2%;
}

.wgo-player-info-box-wrapper {
	width: 33.3%;
	display: inline-block;
}

.wgo-player-info-box {
	padding: 0px 1px;
	margin: 0 3%;
	border: 1px solid rgba(200,200,200,0.3);
	background-color: rgba(255,255,255,0.3);
	border-radius: 2px;
	font-size: 12px;
	text-align: center;
}

.wgo-player-info-title {
	font-size: 11px;
	overflow: hidden;
}

/* right and left modifications*/

.wgo-player-left .wgo-infobox, .wgo-player-right .wgo-infobox {
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
	left: 10px;
}

.wgo-player-right .wgo-player-wrapper, .wgo-player-left .wgo-player-wrapper {
	height: 85px;
	border-bottom: 0;
}

/* top and bottom modifications */

.wgo-player-top .wgo-player-info, .wgo-player-bottom .wgo-player-info {
	position: absolute;
	width: 40%;
	right: 0;
	top: 4px;
	bottom: 4px;
	overflow: hidden;
	text-align: right;
}

.wgo-player-top .wgo-player-wrapper, .wgo-player-bottom .wgo-player-wrapper {
	height: 40px;
	display: inline-block;
	width: 50%;
	margin: 0;
	position: relative;
}

.wgo-player-top .wgo-player-wrapper.wgo-black {
	border-left-width: 0;
}

.wgo-player-top .wgo-infobox .wgo-box-title, .wgo-player-bottom .wgo-infobox .wgo-box-title {
	position: absolute;
	right: 40%;
	left: 0;
	margin: 0 5px;
	z-index: 500;
}

.wgo-player-top .wgo-player-wrapper .wgo-box-title::after {
	float: left;
	margin-right: 7px;
}

/* S modification */

.wgo-small .wgo-player-top .wgo-player-info, .wgo-small .wgo-player-bottom .wgo-player-info,
.wgo-xsmall .wgo-player-top .wgo-player-info, .wgo-xsmall .wgo-player-bottom .wgo-player-info  {
	width: 30%;	
}

.wgo-small .wgo-player-top .wgo-infobox .wgo-box-title, .wgo-small  .wgo-player-bottom .wgo-infobox .wgo-box-title,
.wgo-xsmall .wgo-player-top .wgo-infobox .wgo-box-title, .wgo-xsmall  .wgo-player-bottom .wgo-infobox .wgo-box-title {
	right: 30%;
}

.wgo-small .wgo-player-info-box-wrapper,
.wgo-xsmall .wgo-player-info-box-wrapper {
	width: 50%;
}

.wgo-small .wgo-player-info-box-wrapper:last-child,
.wgo-xsmall .wgo-player-info-box-wrapper:last-child {
	display: none;
}

/* XS modification */

.wgo-xsmall .wgo-player-info-title {
	display: none;
}

.wgo-xsmall .wgo-player-wrapper { 
	display: block;
	height: 30px;
	width: 100%;
}

.wgo-xsmall .wgo-infobox{ 
	margin-bottom: 4px;
}

.wgo-xsmall .wgo-box-title { 
	font-size: 15px;
	height: 30px;
	line-height: 30px;
}

.wgo-xsmall .wgo-player-wrapper.wgo-black {
	border-top: 0;
	border-left-width: 1px;
}

.wgo-xsmall .wgo-player-wrapper .wgo-box-title::after {
	content: ' ';
	margin-top: 7px;
	width: 14px;
	height: 14px;
	border-radius: 7px;
}

/*--- /Player box -----------------------------------------------------------------------*/

/*--- Comments box ----------------------------------------------------------------------*/

.wgo-comments-wrapper {
	overflow: auto;
	margin: 0 0 0 0;
	height: 100%;
	position: relative;
	box-sizing: border-box;
}

.wgo-comments-content {
	padding: 3px 5px;
	border: 1px solid rgba(200,200,200,0.3);
	background-color: rgba(255,255,255,0.3);
	border-radius: 2px;
	overflow-y: auto;
}

.wgo-comments-content p {
	font-size: 0.9em;
	margin: 0.5em 0;
}

.wgo-help { 
	background-color: rgba(236, 226, 216, 0.90);
	padding: 1px 7px;
	margin-bottom: 5px;
}

.wgo-notification { 
	background-color: rgba(16, 16, 16, 0.95);
	color: white;
	padding: 1px 7px;
	margin-bottom: 5px;
}

.wgo-commentbox .wgo-box-title {	
	background-repeat: no-repeat;
	background-position: right center;
	background-size: 24px;
}

.wgo-commentbox .wgo-box-title::after {
	content: '\e800';
	font-family: "wgo-icons";
	float: right;
	font-weight: normal;
	font-size: 0.9em;
	padding-top: 4px;
	width: 22px;
	text-align: center;
}

.wgo-commentbox.wgo-gameinfo .wgo-box-title::after {
	content: '\e801';
	padding-top: 2px;
}

.wgo-comments-nick {
	color: rgba(0,0,0,0.75);
}

a.wgo-move-link { 
	text-decoration: none; 
	border-bottom:1px dotted; 
}

/* right and left modifications */

.wgo-player-right .wgo-comments-content, .wgo-player-left .wgo-comments-content {
	position: absolute;
	left: 10px;
	right: 10px;
	bottom: 10px;
	top: 40px;
}

.wgo-player-right .wgo-commentbox, .wgo-player-left .wgo-commentbox {
	position: absolute;
	bottom: 0;
	right: 0;
	left: 10px;
	top: 170px;
}

/* top and bottom modifications */

.wgo-player-top .wgo-comments-content, .wgo-player-bottom .wgo-comments-content {
	position: absolute;
	left: 40px;
	right: 0;
	top: 0;
	bottom: 0;
	
}

/* TODO: handle too long title */
.wgo-player-top .wgo-commentbox .wgo-box-title, .wgo-player-bottom .wgo-commentbox .wgo-box-title { 
	transform: rotate(-90deg);
	-ms-transform: rotate(-90deg);
	-webkit-transform: rotate(-90deg);
	position: absolute;
	left: -50px;
	top: 55px;
}

.wgo-player-top .wgo-comments-wrapper, .wgo-player-bottom .wgo-comments-wrapper {
	margin-top: 10px;
	height: 150px;
}

/* game info table */

.wgo-commentbox .wgo-info-list {
	display: table;
	width: 100%;
}

.wgo-commentbox .wgo-info-title {
	display: table-caption;
	font-weight: 600;
	border-bottom: 2px solid rgba(200, 200, 200, 0.3);
	padding: 2px 0;
}

.wgo-commentbox .wgo-info-item {
	display: table-row;
}

.wgo-commentbox .wgo-info-label, .wgo-commentbox .wgo-info-value {
	display: table-cell;
	border-bottom: 1px solid rgba(200, 200, 200, 0.3);
	padding: 2px 15px 2px 0;
}

.wgo-commentbox .wgo-info-label {
	color: #000;
}

.wgo-commentbox .wgo-info-value {
	color: #4c4c4c;
}

/* in gameinfo, last row is without border*/
.wgo-commentbox.wgo-gameinfo .wgo-info-item:last-child .wgo-info-label, .wgo-commentbox.wgo-gameinfo .wgo-info-item:last-child .wgo-info-value {
	border-bottom: 0;
}

/*--- /Comments box ----------------------------------------------------------------------*/

/*--- Control box ------------------------------------------------------------------------*/

.wgo-player-control {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}

.wgo-control-wrapper {
	width: 100%;
	text-align: center;
}

.wgo-ctrlgroup-left {
	float: left;
}

.wgo-ctrlgroup-right {
	float: right;
}

.wgo-ctrlgroup-control {
	margin: 0 auto;
}

/* button widget */

button.wgo-button {
	border: 1px solid rgba(200,200,200,0.3);
	border-radius: 2px;
	background-color: rgba(255,255,255,0.3);
	width: 44px;
	height: 44px;
	margin: 0 3px;
	vertical-align: middle;
}

button.wgo-button:not([disabled]):hover, 
input[type="text"].wgo-player-mn-value:focus {
	background-color: rgba(255,255,255,0.45);
	border: 1px solid rgba(100,100,100,0.3);
	box-shadow: 0 0 20px 0 rgba(150,150,150,0.5);
}

button.wgo-button.wgo-selected {
	background-color: rgba(255,255,255,0.6);
	border: 1px solid rgba(0,0,0,0.5);
}

button.wgo-button.wgo-selected:hover {
	background-color: rgba(255,255,255,0.7);
	border: 1px solid rgba(0,0,0,0.7);
}

.wgo-button::before {
	font-family: "wgo-icons";
	font-size: 36px;
	display: inline-block;
}

.wgo-button[disabled]::before, input[type="text"].wgo-player-mn-value[disabled] {
	color: rgba(64,64,64,0.5);
}

.wgo-button:not([disabled]):active::before {
	position: relative;
	top: 1px;
	left: 1px;
}

.wgo-button-first::before, .wgo-button-multiprev::before, .wgo-button-previous::before  {
	transform: scaleX(-1);
	-moz-transform: scaleX(-1);
	-webkit-transform: scaleX(-1);
	-ms-transform: scaleX(-1);
}

.wgo-button-first::before {
	content: '\e81a';
}

.wgo-button-multiprev::before {
	content: '\e817';
	margin-left: -5px;
}

.wgo-button-previous::before {
	content: '\e80c';
}

.wgo-button-next::before {
	content: '\e80c';
}

.wgo-button-multinext::before {
	content: '\e817';
}

.wgo-button-last::before {
	content: '\e81a';
}

.wgo-button-menu::before  {
	content: '\e81b';
	font-size: 25px;
	font-weight: normal;
	padding-top: 5px;
}
.wgo-button-about::before  {
	content: '\e80f';
	font-size: 30px;
	font-weight: normal;
}

/* move number widget */

input[type="text"].wgo-player-mn-value  {
	border: 1px solid rgba(200,200,200,0.3);
	border-radius: 2px;
	background-color: rgba(255,255,255,0.3);
	width: 28px;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	outline: 0;
}

.wgo-player-mn-wrapper {
	display: inline-block;
	width: 38px;
	text-align: center;
}

/* top and bottom modifications */

.wgo-player-top .wgo-player-control {
	padding-bottom: 5px;
}

.wgo-player-bottom .wgo-player-control {
	padding-top: 5px;
}

/* display less buttons */

.wgo-440 .wgo-button-multiprev, 
.wgo-440 .wgo-button-multinext {
	display: none;
}

.wgo-340 .wgo-button-multiprev, 
.wgo-340 .wgo-button-multinext, 
.wgo-340 .wgo-button-first, 
.wgo-340 .wgo-button-last {
	display: none;
}

/*--- /Control box ------------------------------------------------------------------------*/

/*--- Control menu -------------------------------------------------------------------------*/

.wgo-player-menu {
	border: 1px solid rgba(0,0,0,0.5);
	z-index: 900;
	margin-top: -1px;
	box-shadow: 0 0 20px 0 rgba(127,127,127,0.5);
	font-weight: bold;
	color: #292929;
	text-align: left;
}

.wgo-menu-item {
	padding: 5px 10px 5px 5px;
	background-color: rgba(255,255,255,0.85);
	cursor: pointer;
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 25px;
}

.wgo-menu-item:not(.wgo-disabled):hover {
	background-color: rgba(225,225,225,0.85);
}

.wgo-menu-item::before {
	content: ' ';
	font-family: "wgo-icons";
	color: #000;
	width: 20px;
	display: inline-block;
	font-weight: normal;
}

.wgo-menu-item.wgo-selected::before {
	content: '\e813';
}

.wgo-menu-item.wgo-disabled {
	color: #888;
	cursor: Default;
}

.wgo-menu-item.wgo-disabled::before {
	color: #888;
}

/*--- /Control menu -------------------------------------------------------------------------*/

/*--- Overlay window ----------------------------------------------------------------------*/

.wgo-info-overlay {
	position: absolute;
	z-index: 1000;
}

.wgo-info-message {
	margin: 15% auto;
	min-height: 50%;
	max-height: 70%;
	min-width: 50%;
	max-width: 70%;
	background-color: rgba(0,0,0,0.95);
	overflow: auto;
	padding: 20px;
	box-sizing:border-box;
	-moz-box-sizing:border-box;
	-webkit-box-sizing:border-box;
	color: #d9d9d9;
	box-shadow: 0px 0px 50px 5px rgb(0,0,0);
	border: 1px solid #333;
	position: relative;
}

.wgo-info-message a {
	color: #fff !important;
}

.wgo-info-message h1 {
	font-size: 2em !important;
	color: #fff !important;
	font-weight: bold !important;
	margin: 0 0 20px 0 !important;
	padding: 0 !important;
}

.wgo-info-close {
	position: absolute;
	top: 5px;
	right: 10px;
	font-size: 10px;
}

/*--- /Overlay window ----------------------------------------------------------------------*/

/*--- Permalinks ---------------------------------------------------------------------------*/

input[type="text"].wgo-permalink {
	padding: 7px 10px !important;
	border: 1px solid white !important;
	color: white !important;
	width: 100% !important;
	background-color: rgba(0,0,0,0) !important;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}

/*--- /Permalinks ---------------------------------------------------------------------------*/
```
public/wgo.player.min.js
```
/*! MIT license, more info: wgo.waltheri.net */(function(b,p){var g=function(u){var a=new r(JSON.parse(JSON.stringify(u.getProperties()))),c;for(c in u.children)a.appendChild(g(u.children[c]));return a},f=function(u,a){var c;if(a[u]!==p)return a[u];for(var h in a.children)if(c=f(u,a.children[h]))return c;return!1},l=function(a,c){a.push(JSON.parse(JSON.stringify(c.getProperties())));if(1<c.children.length){for(var h=[],e=0;e<c.children.length;e++){var d=[];l(d,c.children[e]);h.push(d)}a.push(h)}else c.children.length&&l(a,c.children[0])},d=function(c,
a){for(var h=a,e,b=1;b<c.length;b++)if(c[b].constructor==Array)for(var k=0;k<c[b].length;k++)e=new r(c[b][k][0]),h.appendChild(e),d(c[b][k],e);else e=new r(c[b]),h.insertAfter(e),h=e},k=function(c){return"string"==typeof c?c.replace(/\\/g,"\\\\").replace(/]/g,"\\]"):c},a=function(c,a){return String.fromCharCode(97+c)+String.fromCharCode(97+a)},h=function(c,a,h){if(a.length){h.sgf+=c;for(var e in a)h.sgf+="["+a[e]+"]"}},n=function(c,e){if(c.move){var d="";c.move.pass||(d=a(c.move.x,c.move.y));e.sgf=
c.move.c==b.B?e.sgf+("B["+d+"]"):e.sgf+("W["+d+"]")}if(c.setup){var d=[],m=[],f=[],q;for(q in c.setup)c.setup[q].c==b.B?d.push(a(c.setup[q].x,c.setup[q].y)):c.setup[q].c==b.W?m.push(a(c.setup[q].x,c.setup[q].y)):f.push(a(c.setup[q].x,c.setup[q].y));h("AB",d,e);h("AW",m,e);h("AE",f,e)}if(c.markup){d={};for(q in c.markup)d[c.markup[q].type]=d[c.markup[q].type]||[],"LB"==c.markup[q].type?d.LB.push(a(c.markup[q].x,c.markup[q].y)+":"+k(c.markup[q].text)):d[c.markup[q].type].push(a(c.markup[q].x,c.markup[q].y));
for(var g in d)h(g,d[g],e)}q=c.getProperties();for(g in q)"object"!=typeof q[g]&&(e.sgf="turn"==g?e.sgf+("PL["+(q[g]==b.B?"B":"W")+"]"):"comment"==g?e.sgf+("C["+k(q[g])+"]"):e.sgf+(g+"["+k(q[g])+"]"));if(1==c.children.length)e.sgf+="\n;",n(c.children[0],e);else if(1<c.children.length)for(g in c.children)q=c.children[g],d=e,d.sgf+="(\n;",n(q,d),d.sgf+="\n)"},m=function(){this.size=19;this.info={};this.root=new r;this.propertyCount=this.nodeCount=0};m.prototype={constructor:m,clone:function(){var c=
new m;c.size=this.size;c.info=JSON.parse(JSON.stringify(this.info));c.root=g(this.root);c.nodeCount=this.nodeCount;c.propertyCount=this.propertyCount;return c},hasComments:function(){return!!f("comment",this.root)}};m.fromSgf=function(c){return b.SGF.parse(c)};m.fromJGO=function(c){c="string"==typeof c?JSON.parse(c):c;var a=new m;a.info=JSON.parse(JSON.stringify(c.info));a.size=c.size;a.nodeCount=c.nodeCount;a.propertyCount=c.propertyCount;a.root=new r(c.game[0]);d(c.game,a.root);return a};m.prototype.toSgf=
function(){var c={sgf:"(\n;"},a={},e;for(e in this.info)"black"==e?(this.info.black.name&&(a.PB=k(this.info.black.name)),this.info.black.rank&&(a.BR=k(this.info.black.rank)),this.info.black.team&&(a.BT=k(this.info.black.team))):"white"==e?(this.info.white.name&&(a.PW=k(this.info.white.name)),this.info.white.rank&&(a.WR=k(this.info.white.rank)),this.info.white.team&&(a.WT=k(this.info.white.team))):a[e]=k(this.info[e]);this.size&&(a.SZ=this.size);a.AP||(a.AP="WGo.js:2");a.FF||(a.FF="4");a.GM||(a.GM=
"1");a.CA||(a.CA="UTF-8");for(e in a)a[e]&&(c.sgf+=e+"["+a[e]+"]");n(this.root,c);c.sgf+=")";return c.sgf};m.prototype.toJGO=function(c){var a={};a.size=this.size;a.info=JSON.parse(JSON.stringify(this.info));a.nodeCount=this.nodeCount;a.propertyCount=this.propertyCount;a.game=[];l(a.game,this.root);return c?JSON.stringify(a):a};var e=function(c){var a;c.name?(a=b.filterHTML(c.name),c.rank&&(a+=" ("+b.filterHTML(c.rank)+")"),c.team&&(a+=", "+b.filterHTML(c.team))):(c.team&&(a=b.filterHTML(c.team)),
c.rank&&(a+=" ("+b.filterHTML(c.rank)+")"));return a};m.infoFormatters={black:e,white:e,TM:function(c){if(0==c)return b.t("none");var a,e=Math.floor(c/60);1==e?a="1 "+b.t("minute"):1<e&&(a=e+" "+b.t("minutes"));e=c%60;1==e?a+=" 1 "+b.t("second"):1<e&&(a+=" "+e+" "+b.t("seconds"));return a},RE:function(c){return'<a href="javascript: void(0)" onclick="this.parentNode.innerHTML = \''+b.filterHTML(c)+'\'" title="'+b.t("res-show-tip")+'">'+b.t("show")+"</a>"}};m.infoList="black white AN CP DT EV GN GC HA ON OT RE RO RU SO TM US PC KM".split(" ");
b.Kifu=m;var c=function(c,a,e){for(var h=0;h<c.length;h++)if(c[h].x==a.x&&c[h].y==a.y){c[h][e]=a[e];return}c.push(a)},q=function(c,a){if(c)for(var e=0;e<c.length;e++)if(c[e].x==a.x&&c[e].y==a.y){c.splice(e,1);break}},r=function(c,a){this.parent=a||null;this.children=[];if(c)for(var e in c)this[e]=c[e]};r.prototype={constructor:r,getChild:function(c){c=c||0;return this.children[c]?this.children[c]:null},addSetup:function(a){this.setup=this.setup||[];c(this.setup,a,"c");return this},removeSetup:function(c){q(this.setup,
c);return this},addMarkup:function(a){this.markup=this.markup||[];c(this.markup,a,"type");return this},removeMarkup:function(c){q(this.markup,c);return this},remove:function(){var c=this.parent;if(!c)throw new Exception("Root node cannot be removed");for(var a in c.children)if(c.children[a]==this){c.children.splice(a,1);break}c.children=c.children.concat(this.children);this.parent=null;return c},insertAfter:function(c){for(var a in this.children)this.children[a].parent=c;c.children=c.children.concat(this.children);
c.parent=this;this.children=[c];return c},appendChild:function(c){c.parent=this;this.children.push(c);return c},getProperties:function(){var c={},a;for(a in this)this.hasOwnProperty(a)&&"children"!=a&&"parent"!=a&&"_"!=a[0]&&(c[a]=this[a]);return c}};b.KNode=r;var y=function(c,a){for(var e=c.size,h=[],d=[],b=0;b<e*e;b++)c.schema[b]&&!a.schema[b]?d.push({x:Math.floor(b/e),y:b%e}):c.schema[b]!=a.schema[b]&&h.push({x:Math.floor(b/e),y:b%e,c:a.schema[b]});return{add:h,remove:d}},e=function(c,a,e){this.kifu=
c;this.node=this.kifu.root;this.allow_illegal=e||!1;this.game=new b.Game(this.kifu.size,this.allow_illegal?"NONE":"KO",this.allow_illegal,this.allow_illegal);this.path={m:0};this.kifu.info.HA&&1<this.kifu.info.HA&&(this.game.turn=b.W);this.change=v(this.game,this.node,!0);this.rememberPath=a?!0:!1},w=function(c,a){var e=[],h,d;for(d in c){h=!0;for(var b in a)if(c[d].x==a[b].x&&c[d].y==a[b].y){h=!1;break}h&&e.push(c[d])}return e},v=function(c,a,e){a.parent&&(a.parent._last_selected=a.parent.children.indexOf(a));
if(a.move!=p){if(a.move.pass)return c.pass(a.move.c),{add:[],remove:[]};c=c.play(a.move.x,a.move.y,a.move.c);if("number"==typeof c)throw new x(c,a);for(var h in c)if(c[h].x==a.move.x&&c[h].y==a.move.y)return{add:[],remove:c};return{add:[a.move],remove:c}}e||c.pushPosition();e=[];var d=[];if(a.setup!=p)for(h in a.setup)a.setup[h].c?(c.setStone(a.setup[h].x,a.setup[h].y,a.setup[h].c),e.push(a.setup[h])):(c.removeStone(a.setup[h].x,a.setup[h].y),d.push(a.setup[h]));a.turn&&(c.turn=a.turn);return{add:e,
remove:d}},z=function(c){c===p&&this.rememberPath&&(c=this.node._last_selected);c=c||0;var a=this.node.children[c];if(!a)return!1;var e=v(this.game,a);this.path.m++;1<this.node.children.length&&(this.path[this.path.m]=c);this.node=a;return e},A=function(){if(!this.node.parent)return!1;this.node=this.node.parent;this.game.popPosition();this.node.turn&&(this.game.turn=this.node.turn);this.path[this.path.m]!==p&&delete this.path[this.path.m];this.path.m--;return!0},B=function(){this.game.firstPosition();
this.node=this.kifu.root;this.path={m:0};this.kifu.info.HA&&1<this.kifu.info.HA&&(this.game.turn=b.W);this.change=v(this.game,this.node,!0)};e.prototype={constructor:e,next:function(c){this.change=z.call(this,c);return this},last:function(){var c;for(this.change={add:[],remove:[]};c=z.call(this);){var a=this.change;a.add=w(a.add,c.remove).concat(c.add);a.remove=w(a.remove,c.add).concat(c.remove)}return this},previous:function(){var c=this.game.getPosition();A.call(this);this.change=y(c,this.game.getPosition());
return this},first:function(){var c=this.game.getPosition();B.call(this);this.change=y(c,this.game.getPosition());return this},goTo:function(c){if(c===p)return this;var a=this.game.getPosition();B.call(this);for(var e=0;e<c.m&&z.call(this,c[e+1]);e++);this.change=y(a,this.game.getPosition());return this},previousFork:function(){for(var c=this.game.getPosition();A.call(this)&&1==this.node.children.length;);this.change=y(c,this.game.getPosition());return this},getPosition:function(){return this.game.getPosition()},
allowIllegalMoves:function(c){c?(this.game.allow_rewrite=!0,this.game.allow_suicide=!0,this.repeating="NONE"):(this.game.allow_rewrite=!1,this.game.allow_suicide=!1,this.repeating="KO")}};b.KifuReader=e;var x=function(c,a){this.name="InvalidMoveError";this.message="Invalid move in kifu detected. ";if(a.move&&a.move.c!==p&&a.move.x!==p&&a.move.y!==p){var e=a.move.x;7<a.move.x&&e++;String.fromCharCode(e+65);this.message+="Trying to play "+(a.move.c==b.WHITE?"white":"black")+" move on "+String.fromCharCode(a.move.x+
65)+""+(19-a.move.y)}else this.message+="Move object doesn't contain arbitrary attributes.";if(c)switch(c){case 1:this.message+=", but these coordinates are not on board.";break;case 2:this.message+=", but there already is a stone.";break;case 3:this.message+=", but this move is a suicide.";break;case 4:this.message+=", but this position already occured."}else this.message+="."};x.prototype=Error();x.prototype.constructor=x;b.InvalidMoveError=x;b.i18n.en.show="show";b.i18n.en["res-show-tip"]="Click to show result."})(WGo);(function(b,p){b.SGF={};var g=function(a,d,b,e,c,k){d=k==d?"black":"white";b.info[d]=b.info[d]||{};b.info[d][a]=c[0]},f=b.SGF.properties={};f.B=f.W=function(a,d,k,e){d.move=!k[0]||19>=a.size&&"tt"==k[0]?{pass:!0,c:"B"==e?b.B:b.W}:{x:k[0].charCodeAt(0)-97,y:k[0].charCodeAt(1)-97,c:"B"==e?b.B:b.W}};f.AB=f.AW=function(a,d,k,e){for(var c in k)d.addSetup({x:k[c].charCodeAt(0)-97,y:k[c].charCodeAt(1)-97,c:"AB"==e?b.B:b.W})};f.AE=function(a,d,b){for(var e in b)d.addSetup({x:b[e].charCodeAt(0)-97,y:b[e].charCodeAt(1)-
97})};f.PL=function(a,d,k){d.turn="b"==k[0]||"B"==k[0]?b.B:b.W};f.C=function(a,d,b){d.comment=b.join()};f.LB=function(a,d,b){for(var e in b)d.addMarkup({x:b[e].charCodeAt(0)-97,y:b[e].charCodeAt(1)-97,type:"LB",text:b[e].substr(3)})};f.CR=f.SQ=f.TR=f.SL=f.MA=function(a,d,b,e){for(var c in b)d.addMarkup({x:b[c].charCodeAt(0)-97,y:b[c].charCodeAt(1)-97,type:e})};f.SZ=function(a,d,b){a.size=parseInt(b[0])};f.BR=f.WR=g.bind(this,"rank","BR");f.PB=f.PW=g.bind(this,"name","PB");f.BT=f.WT=g.bind(this,"team",
"BT");f.TM=function(a,d,b,e){a.info[e]=b[0];d.BL=b[0];d.WL=b[0]};var l=/\(|\)|(;(\s*[A-Z]+(\s*((\[\])|(\[(.|\s)*?([^\\]\]))))+)*)/g,d=/[A-Z]+(\s*((\[\])|(\[(.|\s)*?([^\\]\]))))+/g,k=/[A-Z]+/,a=/(\[\])|(\[(.|\s)*?([^\\]\]))/g;b.SGF.parse=function(h){var f=[],g,e,c,q=new b.Kifu,r=null;h=h.match(l);for(var p in h)if("("==h[p])f.push(r);else if(")"==h[p])r=f.pop();else{r&&q.nodeCount++;r=r?r.appendChild(new b.KNode):q.root;g=h[p].match(d)||[];q.propertyCount+=g.length;for(var w in g){c=k.exec(g[w])[0];
e=g[w].match(a);for(var v in e)e[v]=e[v].substring(1,e[v].length-1).replace(/\\(?!\\)/g,"");if(b.SGF.properties[c])b.SGF.properties[c](q,r,e,c);else 1>=e.length&&(e=e[0]),r.parent?r[c]=e:q.info[c]=e}}return q}})(WGo);(function(b){var p=function(c,a){this.name="FileError";this.message=1==a?"File '"+c+"' is empty.":2==a?"Network error. It is not possible to read '"+c+"'.":"File '"+c+"' hasn't been found on server."};p.prototype=Error();p.prototype.constructor=p;b.FileError=p;var g=b.loadFromUrl=function(c,a){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState)if(200==e.status){if(0==e.responseText.length)throw new p(c,1);a(e.responseText)}else throw new p(c);};try{e.open("GET",c,!0),e.send()}catch(d){throw new p(c,
2);}},f=function(c){c.change&&this.board.update(c.change);this.temp_marks&&this.board.removeObject(this.temp_marks);var a=[];this.notification();c.node.move&&this.config.markLastMove&&(c.node.move.pass?this.notification(b.t((c.node.move.c==b.B?"b":"w")+"pass")):a.push({type:"CR",x:c.node.move.x,y:c.node.move.y}));if(1<c.node.children.length&&this.config.displayVariations)for(var e=0;e<c.node.children.length;e++)c.node.children[e].move&&!c.node.children[e].move.pass&&a.push({type:"LB",text:String.fromCharCode(65+
e),x:c.node.children[e].move.x,y:c.node.children[e].move.y,c:this.board.theme.variationColor||"rgba(0,32,128,0.8)"});if(c.node.markup){for(e in c.node.markup)for(var d=0;d<a.length;d++)c.node.markup[e].x==a[d].x&&c.node.markup[e].y==a[d].y&&(a.splice(d,1),d--);a=a.concat(c.node.markup)}this.temp_marks=a;this.board.addObject(a)},l=function(c){this.board.setSize(c.kifu.size);this.board.removeAllObjects();this.config.enableWheel&&this.setWheel(!0)},d=function(c,a){return c==a.element||c==a.element?!1:
c._wgo_scrollable||c.scrollHeight>c.offsetHeight&&"auto"==window.getComputedStyle(c).overflow?!0:d(c.parentNode,a)},k=function(c){var a=c.wheelDelta||-1*c.detail;return d(c.target,this)?!0:0>a?(this.next(),this.config.lockScroll&&c.preventDefault&&c.preventDefault(),!this.config.lockScroll):0<a?(this.previous(),this.config.lockScroll&&c.preventDefault&&c.preventDefault(),!this.config.lockScroll):!0},a=function(c){if(document.querySelector("input:focus, textarea:focus"))return!0;switch(c.keyCode){case 39:this.next();
break;case 37:this.previous();break;default:return!0}this.config.lockScroll&&c.preventDefault&&c.preventDefault();return!this.config.lockScroll},h=function(c,a){if(!this.kifuReader||!this.kifuReader.node)return!1;for(var e in this.kifuReader.node.children)if(this.kifuReader.node.children[e].move&&this.kifuReader.node.children[e].move.x==c&&this.kifuReader.node.children[e].move.y==a){this.next(e);break}},n=function(c){this.config=c;for(var a in n.default)void 0===this.config[a]&&void 0!==n.default[a]&&
(this.config[a]=n.default[a]);this.element=document.createElement("div");this.board=new b.Board(this.element,this.config.board);this.init();this.initGame()};n.prototype={constructor:n,init:function(){this.kifu=null;this.listeners={kifuLoaded:[l.bind(this)],update:[f.bind(this)],frozen:[],unfrozen:[]};this.config.kifuLoaded&&this.addEventListener("kifuLoaded",this.config.kifuLoaded);this.config.update&&this.addEventListener("update",this.config.update);this.config.frozen&&this.addEventListener("frozen",
this.config.frozen);this.config.unfrozen&&this.addEventListener("unfrozen",this.config.unfrozen);this.board.addEventListener("click",h.bind(this));this.element.addEventListener("click",this.focus.bind(this));this.focus()},initGame:function(){this.config.sgf?this.loadSgf(this.config.sgf,this.config.move):this.config.json?this.loadJSON(this.config.json,this.config.move):this.config.sgfFile&&this.loadSgfFromFile(this.config.sgfFile,this.config.move)},update:function(c){this.kifuReader&&this.kifuReader.change&&
(c={type:"update",op:c,target:this,node:this.kifuReader.node,position:this.kifuReader.getPosition(),path:this.kifuReader.path,change:this.kifuReader.change},this.dispatchEvent(c))},loadKifu:function(c,a){this.kifu=c;this.kifuReader=new b.KifuReader(this.kifu,this.config.rememberPath,this.config.allowIllegalMoves);this.dispatchEvent({type:"kifuLoaded",target:this,kifu:this.kifu});this.update("init");a&&this.goTo(a)},loadSgf:function(c,a){try{this.loadKifu(b.Kifu.fromSgf(c),a)}catch(e){this.error(e)}},
loadJSON:function(c,a){try{this.loadKifu(b.Kifu.fromJGO(c),a)}catch(e){this.error(e)}},loadSgfFromFile:function(a,e){var d=this;try{g(a,function(a){d.loadSgf(a,e)})}catch(b){this.error(b)}},addEventListener:function(a,e){this.listeners[a]=this.listeners[a]||[];this.listeners[a].push(e)},removeEventListener:function(a,e){if(this.listeners[a]){var d=this.listeners[a].indexOf(e);-1!=d&&this.listeners[a].splice(d,1)}},dispatchEvent:function(a){if(this.listeners[a.type])for(var e in this.listeners[a.type])this.listeners[a.type][e](a)},
notification:function(a){console&&a&&console.log(a)},help:function(a){console&&console.log(a)},error:function(a){if(!b.ERROR_REPORT)throw a;console&&console.log(a)},next:function(a){if(!this.frozen&&this.kifu)try{this.kifuReader.next(a),this.update()}catch(e){this.error(e)}},previous:function(){if(!this.frozen&&this.kifu)try{this.kifuReader.previous(),this.update()}catch(a){this.error(a)}},last:function(){if(!this.frozen&&this.kifu)try{this.kifuReader.last(),this.update()}catch(a){this.error(a)}},
first:function(){if(!this.frozen&&this.kifu)try{this.kifuReader.first(),this.update()}catch(a){this.error(a)}},goTo:function(a){if(!this.frozen&&this.kifu){var e;"function"==typeof a&&(a=a.call(this));"number"==typeof a?(e=b.clone(this.kifuReader.path),e.m=a||0):e=a;try{this.kifuReader.goTo(e),this.update()}catch(d){this.error(d)}}},getGameInfo:function(){if(!this.kifu)return null;var a={},e;for(e in this.kifu.info)-1!=b.Kifu.infoList.indexOf(e)&&(b.Kifu.infoFormatters[e]?a[b.t(e)]=b.Kifu.infoFormatters[e](this.kifu.info[e]):
a[b.t(e)]=b.filterHTML(this.kifu.info[e]));return a},setFrozen:function(a){this.frozen=a;this.dispatchEvent({type:this.frozen?"frozen":"unfrozen",target:this})},appendTo:function(a){a.appendChild(this.element)},focus:function(){this.config.enableKeys&&this.setKeys(!0)},setKeys:function(c){document.onkeydown=c?a.bind(this):null},setWheel:function(a){!this._wheel_listener&&a?(this._wheel_listener=k.bind(this),a=void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",this.element.addEventListener(a,
this._wheel_listener)):this._wheel_listener&&!a&&(a=void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",this.element.removeEventListener(a,this._wheel_listener),delete this._wheel_listener)},setCoordinates:function(a){!this.coordinates&&a?(this.board.setSection(-.5,-.5,-.5,-.5),this.board.addCustomObject(b.Board.coordinates)):this.coordinates&&!a&&(this.board.setSection(0,0,0,0),this.board.removeCustomObject(b.Board.coordinates));this.coordinates=a}};n.default={sgf:void 0,json:void 0,sgfFile:void 0,
move:void 0,board:{},enableWheel:!0,lockScroll:!0,enableKeys:!0,rememberPath:!0,kifuLoaded:void 0,update:void 0,frozen:void 0,unfrozen:void 0,allowIllegalMoves:!1,markLastMove:!0,displayVariations:!0};b.Player=n;var m={"about-text":"<h1>WGo.js Player 2.0</h1><p>WGo.js Player is extension of WGo.js, HTML5 library for purposes of game of go. It allows to replay go game records and it has many features like score counting. It is also designed to be easily extendable.</p><p>WGo.js is open source licensed under <a href='http://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>. You can use and modify any code from this project.</p><p>You can find more information at <a href='http://wgo.waltheri.net/player' target='_blank'>wgo.waltheri.net/player</a></p><p>Copyright &copy; 2013 Jan Prokop</p>",
black:"Black",white:"White",DT:"Date",KM:"Komi",HA:"Handicap",AN:"Annotations",CP:"Copyright",GC:"Game comments",GN:"Game name",ON:"Fuseki",OT:"Overtime",TM:"Basic time",RE:"Result",RO:"Round",RU:"Rules",US:"Recorder",PC:"Place",EV:"Event",SO:"Source",none:"none",bpass:"Black passed.",wpass:"White passed."},e;for(e in m)b.i18n.en[e]=m[e]})(WGo);(function(b){var p=0,g=function(d,b,a){var h={};h.element=document.createElement("div");h.element.className="wgo-player-"+d;h.wrapper=document.createElement("div");h.wrapper.className="wgo-player-"+d+"-wrapper";h.element.appendChild(h.wrapper);b.appendChild(h.element);a||(h.element.style.display="none");return h},f=function(d){var b;if(b=this.currentLayout.layout?this.currentLayout.layout[d]:this.currentLayout[d]){this.regions[d].element.style.display="block";b.constructor!=Array&&(b=[b]);for(var a in b)this.components[b[a]]||
(this.components[b[a]]=new l.component[b[a]](this)),this.components[b[a]].appendTo(this.regions[d].wrapper),this.components[b[a]]._detachFromPlayer=!1}else this.regions[d].element.style.display="none"},l=b.extendClass(b.Player,function(d,k){this.config=k;for(var a in l.default)void 0===this.config[a]&&void 0!==l.default[a]&&(this.config[a]=l.default[a]);for(a in b.Player.default)void 0===this.config[a]&&void 0!==b.Player.default[a]&&(this.config[a]=b.Player.default[a]);this.element=d;this.element.innerHTML=
"";this.classes=(this.element.className?this.element.className+" ":"")+"wgo-player-main";this.element.className=this.classes;this.element.id||(this.element.id="wgo_"+p++);this.dom={};this.dom.center=document.createElement("div");this.dom.center.className="wgo-player-center";this.dom.board=document.createElement("div");this.dom.board.className="wgo-player-board";this.regions={};this.regions.left=g("left",this.element);this.element.appendChild(this.dom.center);this.regions.right=g("right",this.element);
this.regions.top=g("top",this.dom.center);this.dom.center.appendChild(this.dom.board);this.regions.bottom=g("bottom",this.dom.center);this.board=new b.Board(this.dom.board,this.config.board);this.init();this.components={};window.addEventListener("resize",function(){this.noresize||this.updateDimensions()}.bind(this));this.updateDimensions();this.initGame()});l.prototype.appendTo=function(d){d.appendChild(this.element);this.updateDimensions()};l.prototype.updateDimensions=function(){for(var d=window.getComputedStyle(this.element),
b=[];this.element.firstChild;)b.push(this.element.firstChild),this.element.removeChild(this.element.firstChild);for(var a=parseInt(d.width),h=parseInt(d.height),n=parseInt(d.maxHeight)||0,d=0;d<b.length;d++)this.element.appendChild(b[d]);if(a!=this.width||h!=this.height||n!=this.maxHeight){this.width=a;this.height=h;this.maxHeight=n;a:if(b=this.config.layout,b.constructor==Array){a=this.height||this.maxHeight;for(h=0;h<b.length;h++)if(!b[h].conditions||!(b[h].conditions.minWidth&&!(b[h].conditions.minWidth<=
this.width)||b[h].conditions.minHeight&&a&&!(b[h].conditions.minHeight<=a)||b[h].conditions.maxWidth&&!(b[h].conditions.maxWidth>=this.width)||b[h].conditions.maxHeight&&a&&!(b[h].conditions.maxHeight>=a)||b[h].conditions.custom&&!b[h].conditions.custom.call(this))){b=b[h];break a}b=void 0}if((this.currentLayout=b)&&this.lastLayout!=this.currentLayout){this.element.className=this.currentLayout.className?this.classes+" "+this.currentLayout.className:this.classes;for(var g in this.components)this.components[g]._detachFromPlayer=
!0;f.call(this,"left");f.call(this,"right");f.call(this,"top");f.call(this,"bottom");for(g in this.components)this.components[g]._detachFromPlayer&&this.components[g].element.parentNode&&this.components[g].element.parentNode.removeChild(this.components[g].element);this.lastLayout=this.currentLayout}b=this.dom.board.clientWidth;(g=this.height||this.maxHeight)&&(g-=this.regions.top.element.offsetHeight+this.regions.bottom.element.offsetHeight);g&&g<b?g!=this.board.height&&this.board.setHeight(g):b!=
this.board.width&&this.board.setWidth(b);b=g-b;0<b?(this.dom.board.style.height=g+"px",this.dom.board.style.paddingTop=b/2+"px"):(this.dom.board.style.height="auto",this.dom.board.style.paddingTop="0");this.regions.left.element.style.height=this.dom.center.offsetHeight+"px";this.regions.right.element.style.height=this.dom.center.offsetHeight+"px";for(d in this.components)this.components[d].updateDimensions&&this.components[d].updateDimensions()}};l.prototype.showMessage=function(d,f,a){this.info_overlay=
document.createElement("div");this.info_overlay.style.width=this.element.offsetWidth+"px";this.info_overlay.style.height=this.element.offsetHeight+"px";this.info_overlay.className="wgo-info-overlay";this.element.appendChild(this.info_overlay);var h=document.createElement("div");h.className="wgo-info-message";h.innerHTML=d;d=document.createElement("div");d.className="wgo-info-close";a||(d.innerHTML=b.t("BP:closemsg"));h.appendChild(d);this.info_overlay.appendChild(h);f?this.info_overlay.addEventListener("click",
function(a){f(a)}):a||this.info_overlay.addEventListener("click",function(a){this.hideMessage()}.bind(this));this.setFrozen(!0)};l.prototype.hideMessage=function(){this.element.removeChild(this.info_overlay);this.setFrozen(!1)};l.prototype.error=function(d){if(!b.ERROR_REPORT)throw d;switch(d.name){case "InvalidMoveError":this.showMessage("<h1>"+d.name+"</h1><p>"+d.message+'</p><p>If this message isn\'t correct, please report it by clicking <a href="#">here</a>, otherwise contact maintainer of this site.</p>');
break;case "FileError":this.showMessage("<h1>"+d.name+"</h1><p>"+d.message+"</p><p>Please contact maintainer of this site. Note: it is possible to read files only from this host.</p>");break;default:this.showMessage("<h1>"+d.name+"</h1><p>"+d.message+"</p><pre>"+d.stacktrace+'</pre><p>Please contact maintainer of this site. You can also report it <a href="#">here</a>.</p>')}};l.component={};l.layouts={one_column:{top:[],bottom:[]},no_comment:{top:[],bottom:[]},right_top:{top:[],right:[]},right:{right:[]},
minimal:{bottom:[]}};l.dynamicLayout=[{conditions:{minWidth:650},layout:l.layouts.right_top,className:"wgo-twocols wgo-large"},{conditions:{minWidth:550,minHeight:600},layout:l.layouts.one_column,className:"wgo-medium"},{conditions:{minWidth:350},layout:l.layouts.no_comment,className:"wgo-small"},{layout:l.layouts.no_comment,className:"wgo-xsmall"}];l.default={layout:l.dynamicLayout};b.i18n.en["BP:closemsg"]="click anywhere to close this window";l.attributes={"data-wgo":function(b){b&&("("==b[0]?
this.sgf=b:this.sgfFile=b)},"data-wgo-board":function(b){this.board=eval("({"+b+"})")},"data-wgo-onkifuload":function(b){this.kifuLoaded=new Function(b)},"data-wgo-onupdate":function(b){this.update=new Function(b)},"data-wgo-onfrozen":function(b){this.frozen=new Function(b)},"data-wgo-onunfrozen":function(b){this.unfrozen=new Function(b)},"data-wgo-layout":function(b){this.layout=eval("({"+b+"})")},"data-wgo-enablewheel":function(b){"false"==b.toLowerCase()&&(this.enableWheel=!1)},"data-wgo-lockscroll":function(b){"false"==
b.toLowerCase()&&(this.lockScroll=!1)},"data-wgo-enablekeys":function(b){"false"==b.toLowerCase()&&(this.enableKeys=!1)},"data-wgo-rememberpath":function(b){"false"==b.toLowerCase()&&(this.rememberPath=!1)},"data-wgo-allowillegal":function(b){"false"!=b.toLowerCase()&&(this.allowIllegalMoves=!0)},"data-wgo-move":function(b){var f=parseInt(b);this.move=f?f:eval("({"+b+"})")},"data-wgo-marklastmove":function(b){"false"==b.toLowerCase()&&(this.markLastMove=!1)},"data-wgo-diagram":function(b){b&&("("==
b[0]?this.sgf=b:this.sgfFile=b,this.enableWheel=this.enableKeys=this.markLastMove=!1,this.layout={top:[],right:[],left:[],bottom:[]})}};b.BasicPlayer=l;window.addEventListener("load",function(){for(var b=document.querySelectorAll("[data-wgo],[data-wgo-diagram]"),f=0;f<b.length;f++){for(var a=b[f],h=void 0,g=void 0,h=void 0,g={},m=0;m<a.attributes.length;m++)h=a.attributes[m],l.attributes[h.name]&&l.attributes[h.name].call(g,h.value,h.name);h=new l(a,g);a._wgo_player=h}})})(WGo);(function(b,p){var g=function(){this.element=document.createElement("div")};g.prototype={constructor:g,appendTo:function(b){b.appendChild(this.element)},getWidth:function(){var b=window.getComputedStyle(this.element);return parseInt(b.width)},getHeight:function(){var b=window.getComputedStyle(this.element);return parseInt(b.height)},updateDimensions:function(){}};b.BasicPlayer.component.Component=g})(WGo);(function(){var b=function(a){this[a]={};var b=this[a];b.box=document.createElement("div");b.box.className="wgo-box-wrapper wgo-player-wrapper wgo-"+a;b.name=document.createElement("div");b.name.className="wgo-box-title";b.name.innerHTML=a;b.box.appendChild(b.name);a=document.createElement("div");a.className="wgo-player-info";b.box.appendChild(a);b.info={};b.info.rank=p("rank");b.info.rank.val.innerHTML="-";b.info.caps=p("caps");b.info.caps.val.innerHTML="0";b.info.time=p("time");b.info.time.val.innerHTML=
"--:--";a.appendChild(b.info.rank.wrapper);a.appendChild(b.info.caps.wrapper);a.appendChild(b.info.time.wrapper)},p=function(a){var b={};b.wrapper=document.createElement("div");b.wrapper.className="wgo-player-info-box-wrapper";b.box=document.createElement("div");b.box.className="wgo-player-info-box";b.wrapper.appendChild(b.box);b.title=document.createElement("div");b.title.className="wgo-player-info-title";b.title.innerHTML=WGo.t(a);b.box.appendChild(b.title);b.val=document.createElement("div");b.val.className=
"wgo-player-info-value";b.box.appendChild(b.val);return b},g=function(a){a=a.kifu.info||{};a.black?(this.black.name.innerHTML=WGo.filterHTML(a.black.name)||WGo.t("black"),this.black.info.rank.val.innerHTML=WGo.filterHTML(a.black.rank)||"-"):(this.black.name.innerHTML=WGo.t("black"),this.black.info.rank.val.innerHTML="-");a.white?(this.white.name.innerHTML=WGo.filterHTML(a.white.name)||WGo.t("white"),this.white.info.rank.val.innerHTML=WGo.filterHTML(a.white.rank)||"-"):(this.white.name.innerHTML=WGo.t("white"),
this.white.info.rank.val.innerHTML="-");this.black.info.caps.val.innerHTML="0";this.white.info.caps.val.innerHTML="0";a.TM?(this.setPlayerTime("black",a.TM),this.setPlayerTime("white",a.TM)):(this.black.info.time.val.innerHTML="--:--",this.white.info.time.val.innerHTML="--:--");this.updateDimensions()},f=function(a){var b,d;a.style.fontSize?(d=parseInt(a.style.fontSize),a.style.fontSize="",b=window.getComputedStyle(a),b=parseInt(b.fontSize),a.style.fontSize=d+"px"):(b=window.getComputedStyle(a),b=
d=parseInt(b.fontSize));if(!(d==b&&a.scrollHeight<=a.offsetHeight))if(a.scrollHeight>a.offsetHeight)for(d-=2;a.scrollHeight>a.offsetHeight&&1<d;)a.style.fontSize=d+"px",d-=2;else if(d<b){for(d+=2;a.scrollHeight<=a.offsetHeight&&d<=b;)a.style.fontSize=d+"px",d+=2;a.scrollHeight>a.offsetHeight&&(a.style.fontSize=d-4+"px")}},l=function(a){a.node.BL&&this.setPlayerTime("black",a.node.BL);a.node.WL&&this.setPlayerTime("white",a.node.WL);void 0!==a.position.capCount.black&&(this.black.info.caps.val.innerHTML=
a.position.capCount.black);void 0!==a.position.capCount.white&&(this.white.info.caps.val.innerHTML=a.position.capCount.white)},d=WGo.extendClass(WGo.BasicPlayer.component.Component,function(a){this.super(a);this.element.className="wgo-infobox";b.call(this,"white");b.call(this,"black");this.element.appendChild(this.white.box);this.element.appendChild(this.black.box);a.addEventListener("kifuLoaded",g.bind(this));a.addEventListener("update",l.bind(this))});d.prototype.setPlayerTime=function(a,b){var d=
Math.floor(b/60),f=Math.round(b)%60;this[a].info.time.val.innerHTML=d+":"+(10>f?"0"+f:f)};d.prototype.updateDimensions=function(){f(this.black.name);f(this.white.name)};var k=WGo.BasicPlayer.layouts;k.right_top.right.push("InfoBox");k.right.right.push("InfoBox");k.one_column.top.push("InfoBox");k.no_comment.top.push("InfoBox");WGo.i18n.en.rank="Rank";WGo.i18n.en.caps="Caps";WGo.i18n.en.time="Time";WGo.BasicPlayer.component.InfoBox=d})(WGo);(function(b,p){var g=function(a){var b,d;b=a.charCodeAt(0)-97;0>b&&(b+=32);7<b&&b--;d=a.charCodeAt(1)-48;2<a.length&&(d=10*d+(a.charCodeAt(2)-48));d=this.kifuReader.game.size-d;this._tmp_mark={type:"MA",x:b,y:d};this.board.addObject(this._tmp_mark)},f=function(){this.board.removeObject(this._tmp_mark);delete this._tmp_mark},l=function(a,b){for(var d in a)a[d].className&&"wgo-move-link"==a[d].className?(a[d].addEventListener("mouseover",g.bind(b,a[d].innerHTML)),a[d].addEventListener("mouseout",f.bind(b))):
a[d].childNodes&&a[d].childNodes.length&&l(a[d].childNodes,b)},d=function(a,d){var f='<div class="wgo-info-list">';d&&(f+='<div class="wgo-info-title">'+b.t("gameinfo")+"</div>");for(var g in a)f+='<div class="wgo-info-item"><span class="wgo-info-label">'+g+'</span><span class="wgo-info-value">'+a[g]+"</span></div>";return f+"</div>"},k=b.extendClass(b.BasicPlayer.component.Component,function(a){this.super(a);this.player=a;this.element.className="wgo-commentbox";this.box=document.createElement("div");
this.box.className="wgo-box-wrapper wgo-comments-wrapper";this.element.appendChild(this.box);this.comments_title=document.createElement("div");this.comments_title.className="wgo-box-title";this.comments_title.innerHTML=b.t("comments");this.box.appendChild(this.comments_title);this.comments=document.createElement("div");this.comments.className="wgo-comments-content";this.box.appendChild(this.comments);this.help=document.createElement("div");this.help.className="wgo-help";this.help.style.display="none";
this.comments.appendChild(this.help);this.notification=document.createElement("div");this.notification.className="wgo-notification";this.notification.style.display="none";this.comments.appendChild(this.notification);this.comment_text=document.createElement("div");this.comment_text.className="wgo-comment-text";this.comments.appendChild(this.comment_text);a.addEventListener("kifuLoaded",function(h){h.kifu.hasComments()?(this.comments_title.innerHTML=b.t("comments"),this.element.className="wgo-commentbox",
this._update=function(a){this.setComments(a)}.bind(this),a.addEventListener("update",this._update)):(this.comments_title.innerHTML=b.t("gameinfo"),this.element.className="wgo-commentbox wgo-gameinfo",this._update&&(a.removeEventListener("update",this._update),delete this._update),this.comment_text.innerHTML=d(h.target.getGameInfo()))}.bind(this));a.notification=function(a){a?(this.notification.style.display="block",this.notification.innerHTML=a,this.is_notification=!0):(this.notification.style.display=
"none",this.is_notification=!1)}.bind(this);a.help=function(a){a?(this.help.style.display="block",this.help.innerHTML=a,this.is_help=!0):(this.help.style.display="none",this.is_help=!1)}.bind(this)});k.prototype.setComments=function(a){this.player._tmp_mark&&f.call(this.player);var b="";a.node.parent||(b=d(a.target.getGameInfo(),!0));this.comment_text.innerHTML=b+this.getCommentText(a.node.comment,this.player.config.formatNicks,this.player.config.formatMoves);this.player.config.formatMoves&&this.comment_text.childNodes&&
this.comment_text.childNodes.length&&l(this.comment_text.childNodes,this.player)};k.prototype.getCommentText=function(a,d,f){return a?(a="<p>"+b.filterHTML(a).replace(/\n/g,"</p><p>")+"</p>",d&&(a=a.replace(/(<p>)([^:]{3,}:)\s/g,'<p><span class="wgo-comments-nick">$2</span> ')),f&&(a=a.replace(/\b[a-zA-Z]1?\d\b/g,'<a href="javascript:void(0)" class="wgo-move-link">$&</a>')),a):""};b.BasicPlayer.default.formatNicks=!0;b.BasicPlayer.default.formatMoves=!0;b.BasicPlayer.attributes["data-wgo-formatnicks"]=
function(a){"false"==a.toLowerCase()&&(this.formatNicks=!1)};b.BasicPlayer.attributes["data-wgo-formatmoves"]=function(a){"false"==a.toLowerCase()&&(this.formatMoves=!1)};b.BasicPlayer.layouts.right_top.right.push("CommentBox");b.BasicPlayer.layouts.right.right.push("CommentBox");b.BasicPlayer.layouts.one_column.bottom.push("CommentBox");b.i18n.en.comments="Comments";b.i18n.en.gameinfo="Game info";b.BasicPlayer.component.CommentBox=k})(WGo);(function(b,p){var g=b.extendClass(b.BasicPlayer.component.Component,function(a){this.super(a);this.widgets=[];this.element.className="wgo-player-control";this.iconBar=document.createElement("div");this.iconBar.className="wgo-control-wrapper";this.element.appendChild(this.iconBar);var b,d;for(d in g.widgets)b=new g.widgets[d].constructor(a,g.widgets[d].args),b.appendTo(this.iconBar),this.widgets.push(b)});g.prototype.updateDimensions=function(){this.element.className=340>this.element.clientWidth?
"wgo-player-control wgo-340":440>this.element.clientWidth?"wgo-player-control wgo-440":"wgo-player-control"};var f=b.BasicPlayer.control={},l=function(a){a.node.parent||this.disabled?a.node.parent&&this.disabled&&this.enable():this.disable()},d=function(a){a.node.children.length||this.disabled?a.node.children.length&&this.disabled&&this.enable():this.disable()},k=function(a){(this._disabled=this.disabled)||this.disable()},a=function(a){this._disabled||this.enable();delete this._disabled};f.Widget=
function(a,b){this.element=this.element||document.createElement(b.type||"div");this.element.className="wgo-widget-"+b.name;this.init(a,b)};f.Widget.prototype={constructor:f.Widget,init:function(a,b){b&&(b.disabled&&this.disable(),b.init&&b.init.call(this,a))},appendTo:function(a){a.appendChild(this.element)},disable:function(){this.disabled=!0;-1==this.element.className.search("wgo-disabled")&&(this.element.className+=" wgo-disabled")},enable:function(){this.disabled=!1;this.element.className=this.element.className.replace(" wgo-disabled",
"");this.element.disabled=""}};f.Group=b.extendClass(f.Widget,function(a,b){this.element=document.createElement("div");this.element.className="wgo-ctrlgroup wgo-ctrlgroup-"+b.name;var d,f;for(f in b.widgets)d=new b.widgets[f].constructor(a,b.widgets[f].args),d.appendTo(this.element)});f.Clickable=b.extendClass(f.Widget,function(a,b){this.super(a,b)});f.Clickable.prototype.init=function(a,b){var d,f=this;d=b.togglable?function(){f.disabled||(b.click.call(f,a)?f.select():f.unselect())}:function(){f.disabled||
b.click.call(f,a)};this.element.addEventListener("click",d);this.element.addEventListener("touchstart",function(a){a.preventDefault();d();b.multiple&&(f._touch_i=0,f._touch_int=window.setInterval(function(){500<f._touch_i&&d();f._touch_i+=100},100));return!1});b.multiple&&this.element.addEventListener("touchend",function(a){window.clearInterval(f._touch_int)});b.disabled&&this.disable();b.init&&b.init.call(this,a)};f.Clickable.prototype.select=function(){this.selected=!0;-1==this.element.className.search("wgo-selected")&&
(this.element.className+=" wgo-selected")};f.Clickable.prototype.unselect=function(){this.selected=!1;this.element.className=this.element.className.replace(" wgo-selected","")};f.Button=b.extendClass(f.Clickable,function(a,c){var d=this.element=document.createElement("button");d.className="wgo-button wgo-button-"+c.name;d.title=b.t(c.name);this.init(a,c)});f.Button.prototype.disable=function(){f.Button.prototype.super.prototype.disable.call(this);this.element.disabled="disabled"};f.Button.prototype.enable=
function(){f.Button.prototype.super.prototype.enable.call(this);this.element.disabled=""};f.MenuItem=b.extendClass(f.Clickable,function(a,c){var d=this.element=document.createElement("div");d.className="wgo-menu-item wgo-menu-item-"+c.name;d.title=b.t(c.name);d.innerHTML=d.title;this.init(a,c)});f.MoveNumber=b.extendClass(f.Widget,function(a){this.element=document.createElement("form");this.element.className="wgo-player-mn-wrapper";var b=this.move=document.createElement("input");b.type="text";b.value=
"0";b.maxlength=3;b.className="wgo-player-mn-value";this.element.appendChild(b);this.element.onsubmit=b.onchange=function(a){a.goTo(this.getValue());return!1}.bind(this,a);a.addEventListener("update",function(a){this.setValue(a.path.m)}.bind(this));a.addEventListener("kifuLoaded",this.enable.bind(this));a.addEventListener("frozen",this.disable.bind(this));a.addEventListener("unfrozen",this.enable.bind(this))});f.MoveNumber.prototype.disable=function(){f.MoveNumber.prototype.super.prototype.disable.call(this);
this.move.disabled="disabled"};f.MoveNumber.prototype.enable=function(){f.MoveNumber.prototype.super.prototype.enable.call(this);this.move.disabled=""};f.MoveNumber.prototype.setValue=function(a){this.move.value=a};f.MoveNumber.prototype.getValue=function(){return parseInt(this.move.value)};var h=function(a){if(a._menu_tmp)delete a._menu_tmp;else{if(!a.menu){a.menu=document.createElement("div");a.menu.className="wgo-player-menu";a.menu.style.position="absolute";a.menu.style.display="none";this.element.parentElement.appendChild(a.menu);
var b,d;for(d in g.menu)b=new g.menu[d].constructor(a,g.menu[d].args,!0),b.appendTo(a.menu)}if("none"!=a.menu.style.display)return a.menu.style.display="none",document.removeEventListener("click",a._menu_ev),delete a._menu_ev,this.unselect(),!1;a.menu.style.display="block";b=this.element.offsetTop;d=this.element.offsetLeft;this.element.parentElement.parentElement.parentElement.parentElement==a.regions.bottom.wrapper?(a.menu.style.left=d+"px",a.menu.style.top=b-a.menu.offsetHeight+1+"px"):(a.menu.style.left=
d+"px",a.menu.style.top=b+this.element.offsetHeight+"px");a._menu_ev=h.bind(this,a);a._menu_tmp=!0;document.addEventListener("click",a._menu_ev);return!0}};g.menu=[{constructor:f.MenuItem,args:{name:"switch-coo",togglable:!0,click:function(a){a.setCoordinates(!a.coordinates);return a.coordinates},init:function(a){a.coordinates&&this.select()}}}];g.widgets=[{constructor:f.Group,args:{name:"left",widgets:[{constructor:f.Button,args:{name:"menu",togglable:!0,click:h}}]}},{constructor:f.Group,args:{name:"right",
widgets:[{constructor:f.Button,args:{name:"about",click:function(a){a.showMessage(b.t("about-text"))}}}]}},{constructor:f.Group,args:{name:"control",widgets:[{constructor:f.Button,args:{name:"first",disabled:!0,init:function(b){b.addEventListener("update",l.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){a.first()}}},{constructor:f.Button,args:{name:"multiprev",disabled:!0,multiple:!0,init:function(b){b.addEventListener("update",
l.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){var c=b.clone(a.kifuReader.path);c.m-=10;a.goTo(c)}}},{constructor:f.Button,args:{name:"previous",disabled:!0,multiple:!0,init:function(b){b.addEventListener("update",l.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){a.previous()}}},{constructor:f.MoveNumber},{constructor:f.Button,args:{name:"next",disabled:!0,multiple:!0,
init:function(b){b.addEventListener("update",d.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){a.next()}}},{constructor:f.Button,args:{name:"multinext",disabled:!0,multiple:!0,init:function(b){b.addEventListener("update",d.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){var c=b.clone(a.kifuReader.path);c.m+=10;a.goTo(c)}}},{constructor:f.Button,args:{name:"last",
disabled:!0,init:function(b){b.addEventListener("update",d.bind(this));b.addEventListener("frozen",k.bind(this));b.addEventListener("unfrozen",a.bind(this))},click:function(a){a.last()}}}]}}];var n=b.BasicPlayer.layouts;n.right_top.top.push("Control");n.right.right.push("Control");n.one_column.top.push("Control");n.no_comment.bottom.push("Control");n.minimal.bottom.push("Control");var n={about:"About",first:"First",multiprev:"10 moves back",previous:"Previous",next:"Next",multinext:"10 moves forward",
last:"Last","switch-coo":"Display coordinates",menu:"Menu"},m;for(m in n)b.i18n.en[m]=n[m];b.BasicPlayer.component.Control=g})(WGo);(function(b){var p=function(b,g){this.player.frozen||this._lastX==b&&this._lastY==g||(this._lastX=b,this._lastY=g,this._last_mark&&this.board.removeObject(this._last_mark),-1!=b&&-1!=g&&this.player.kifuReader.game.isValid(b,g)?(this._last_mark={type:"outline",x:b,y:g,c:this.player.kifuReader.game.turn},this.board.addObject(this._last_mark)):delete this._last_mark)},g=function(){this._last_mark&&(this.board.removeObject(this._last_mark),delete this._last_mark,delete this._lastX,delete this._lastY)};
b.Player.Editable={};b.Player.Editable=function(b,g){this.player=b;this.board=g;this.editMode=!1};b.Player.Editable.prototype.set=function(f){if(!this.editMode&&f)this.originalReader=this.player.kifuReader,this.player.kifuReader=new b.KifuReader(this.player.kifu.clone(),this.originalReader.rememberPath,this.originalReader.allow_illegal,this.originalReader.allow_illegal),this.player.kifuReader.goTo(this.originalReader.path),this._ev_click=this._ev_click||this.play.bind(this),this._ev_move=this._ev_move||
p.bind(this),this._ev_out=this._ev_out||g.bind(this),this.board.addEventListener("click",this._ev_click),this.board.addEventListener("mousemove",this._ev_move),this.board.addEventListener("mouseout",this._ev_out),this.editMode=!0;else if(this.editMode&&!f){this.originalReader.goTo(this.player.kifuReader.path);f=this.originalReader;for(var l=this.player.kifuReader.getPosition(),d=this.originalReader.getPosition(),k=l.size,a=[],h=[],n=0;n<k*k;n++)l.schema[n]&&!d.schema[n]?h.push({x:Math.floor(n/k),
y:n%k}):l.schema[n]!=d.schema[n]&&a.push({x:Math.floor(n/k),y:n%k,c:d.schema[n]});f.change={add:a,remove:h};this.player.kifuReader=this.originalReader;this.player.update(!0);this.board.removeEventListener("click",this._ev_click);this.board.removeEventListener("mousemove",this._ev_move);this.board.removeEventListener("mouseout",this._ev_out);this.editMode=!1}};b.Player.Editable.prototype.play=function(f,g){!this.player.frozen&&this.player.kifuReader.game.isValid(f,g)&&(this.player.kifuReader.node.appendChild(new b.KNode({move:{x:f,
y:g,c:this.player.kifuReader.game.turn},_edited:!0})),this.player.next(this.player.kifuReader.node.children.length-1))};b.BasicPlayer&&b.BasicPlayer.component.Control&&b.BasicPlayer.component.Control.menu.push({constructor:b.BasicPlayer.control.MenuItem,args:{name:"editmode",togglable:!0,click:function(f){this._editable=this._editable||new b.Player.Editable(f,f.board);this._editable.set(!this._editable.editMode);return this._editable.editMode},init:function(b){var g=this;b.addEventListener("frozen",
function(b){(g._disabled=g.disabled)||g.disable()});b.addEventListener("unfrozen",function(b){g._disabled||g.enable();delete g._disabled})}}});b.i18n.en.editmode="Edit mode"})(WGo);(function(b){var p=function(b,f,a,g){this.originalPosition=b;this.position=b.clone();this.board=f;this.komi=a;this.output=g},g=p.state={UNKNOWN:0,BLACK_STONE:1,WHITE_STONE:-1,BLACK_CANDIDATE:2,WHITE_CANDIDATE:-2,BLACK_NEUTRAL:3,WHITE_NEUTRAL:-3,NEUTRAL:4},f=function(b,g,a,h,n){var m=b.get(g,a);void 0!==m&&m!=h&&m!=n&&(b.set(g,a,h),f(b,g-1,a,h,n),f(b,g,a-1,h,n),f(b,g+1,a,h,n),f(b,g,a+1,h,n))},l=function(b,g,a,f,n){var m=g.get(a,f);b.get(a,f)!=m&&(b.set(a,f,m),l(b,g,a-1,f,n),l(b,g,a,f-1,n),l(b,g,a+
1,f,n),l(b,g,a,f+1,n))};p.prototype.start=function(){this.calculate();this.saved_state=this.board.getState();this.displayScore();this._click=function(d,k){var a=this.originalPosition.get(d,k);a==b.W?this.position.get(d,k)==g.WHITE_STONE?f(this.position,d,k,g.BLACK_CANDIDATE,g.BLACK_STONE):(l(this.position,this.originalPosition,d,k,g.BLACK_STONE),this.calculate()):a==b.B?this.position.get(d,k)==g.BLACK_STONE?f(this.position,d,k,g.WHITE_CANDIDATE,g.WHITE_STONE):(l(this.position,this.originalPosition,
d,k,g.WHITE_STONE),this.calculate()):(a=this.position.get(d,k),a==g.BLACK_CANDIDATE?this.position.set(d,k,g.BLACK_NEUTRAL):a==g.WHITE_CANDIDATE?this.position.set(d,k,g.WHITE_NEUTRAL):a==g.BLACK_NEUTRAL?this.position.set(d,k,g.BLACK_CANDIDATE):a==g.WHITE_NEUTRAL&&this.position.set(d,k,g.WHITE_CANDIDATE));this.board.restoreState({objects:b.clone(this.saved_state.objects)});this.displayScore()}.bind(this);this.board.addEventListener("click",this._click)};p.prototype.end=function(){this.board.restoreState({objects:b.clone(this.saved_state.objects)});
this.board.removeEventListener("click",this._click)};p.prototype.displayScore=function(){for(var d=[],f=[],a=[],h=[],n=[],m=0;m<this.position.size;m++)for(var e=0;e<this.position.size;e++)s=this.position.get(m,e),t=this.originalPosition.get(m,e),s==g.BLACK_CANDIDATE?d.push({x:m,y:e,type:"mini",c:b.B}):s==g.WHITE_CANDIDATE?f.push({x:m,y:e,type:"mini",c:b.W}):s==g.NEUTRAL&&a.push({x:m,y:e}),t==b.W&&s!=g.WHITE_STONE?n.push({x:m,y:e,type:"outline",c:b.W}):t==b.B&&s!=g.BLACK_STONE&&h.push({x:m,y:e,type:"outline",
c:b.B});for(m=0;m<h.length;m++)this.board.removeObjectsAt(h[m].x,h[m].y);for(m=0;m<n.length;m++)this.board.removeObjectsAt(n[m].x,n[m].y);this.board.addObject(n);this.board.addObject(h);this.board.addObject(d);this.board.addObject(f);a="<p style='font-weight: bold;'>"+b.t("RE")+"</p>";m=d.length+n.length+this.originalPosition.capCount.black;e=f.length+h.length+this.originalPosition.capCount.white+parseFloat(this.komi);a+="<p>"+b.t("black")+": "+d.length+" + "+(n.length+this.originalPosition.capCount.black)+
" = "+m+"</br>";a+=b.t("white")+": "+f.length+" + "+(h.length+this.originalPosition.capCount.white)+" + "+this.komi+" = "+e+"</p>";a=m>e?a+("<p style='font-weight: bold;'>"+b.t("bwin",m-e)+"</p>"):a+("<p style='font-weight: bold;'>"+b.t("wwin",e-m)+"</p>");this.output(a)};p.prototype.calculate=function(){var b,f,a,h,n,m;b=this.position;for(m=!0;m;){m=!1;for(var e=0;e<b.size;e++)for(var c=0;c<b.size;c++)if(f=b.get(c,e),f==g.UNKNOWN||f==g.BLACK_CANDIDATE||f==g.WHITE_CANDIDATE){a=[b.get(c-1,e),b.get(c,
e-1),b.get(c+1,e),b.get(c,e+1)];n=h=!1;for(var l=0;4>l;l++)a[l]==g.BLACK_STONE||a[l]==g.BLACK_CANDIDATE?h=!0:a[l]==g.WHITE_STONE||a[l]==g.WHITE_CANDIDATE?n=!0:a[l]==g.NEUTRAL&&(n=h=!0);a=!1;h&&n?a=g.NEUTRAL:h?a=g.BLACK_CANDIDATE:n&&(a=g.WHITE_CANDIDATE);a&&f!=a&&(m=!0,b.set(c,e,a))}}};b.ScoreMode=p;b.BasicPlayer&&b.BasicPlayer.component.Control&&b.BasicPlayer.component.Control.menu.push({constructor:b.BasicPlayer.control.MenuItem,args:{name:"scoremode",togglable:!0,click:function(d){if(this.selected)return d.setFrozen(!1),
this._score_mode.end(),delete this._score_mode,d.notification(),d.help(),!1;d.setFrozen(!0);d.help("<p>"+b.t("help_score")+"</p>");this._score_mode=new b.ScoreMode(d.kifuReader.game.position,d.board,d.kifu.info.KM||.5,d.notification);this._score_mode.start();return!0}}});b.i18n.en.scoremode="Count score";b.i18n.en.score="Score";b.i18n.en.bwin="Black wins by $ points.";b.i18n.en.wwin="White wins by $ points.";b.i18n.en.help_score="Click on stones to mark them dead or alive. You can also set and unset territory points by clicking on them. Territories must be completely bordered."})(WGo);(function(b,p){var g={active:!0,query:{}},f=function(b){try{g.query=JSON.parse('{"'+window.location.hash.substr(1).replace("=",'":')+"}")}catch(f){g.query={}}};window.addEventListener("hashchange",function(){if(""!=window.location.hash&&g.active){f();for(var b in g.query){var k=document.getElementById(b);k&&k._wgo_player&&k._wgo_player.goTo(l)}}});window.addEventListener("DOMContentLoaded",function(){""!=window.location.hash&&g.active&&f()});window.addEventListener("load",function(){if(""!=window.location.hash&&
g.active)for(var b in g.query){var f=document.getElementById(b);if(f&&f._wgo_player){f.scrollIntoView();break}}});var l=function(){if(g.query[this.element.id])return g.query[this.element.id].goto};b.Player.default.move=l;b.BasicPlayer&&b.BasicPlayer.component.Control&&b.BasicPlayer.component.Control.menu.push({constructor:b.BasicPlayer.control.MenuItem,args:{name:"permalink",click:function(d){var f=location.href.split("#")[0]+"#"+d.element.id+'={"goto":'+JSON.stringify(d.kifuReader.path)+"}";d.showMessage("<h1>"+
b.t("permalink")+'</h1><p><input class="wgo-permalink" type="text" value=\''+f+'\' onclick="this.select(); event.stopPropagation()"/></p>')}}});b.Player.permalink=g;b.i18n.en.permalink="Permanent link"})(WGo);
```
src/assets/react.svg
src/components/ArchiveGameCard/ArchiveGameCard.jsx
```
import React from "react";
import styles from "./ArchiveGameCard.module.css";

function ArchiveGameCard({ game }) {
    const {
        blackPlayer,
        blackRank,
        whitePlayer,
        whiteRank,
        date,
        result,
        event,
        boardSize,
        komi,
        moves,
        sgf
    } = game;

    return (
        <div className={styles.gameCard}>
            <div className={styles.players}>
                <div>
                    <strong>Чёрные:</strong> {blackPlayer} ({blackRank})
                </div>
                <div>
                    <strong>Белые:</strong> {whitePlayer} ({whiteRank})
                </div>
            </div>
            <div className={styles.info}>
                <div>
                    <strong>Событие:</strong> {event}
                </div>
                <div>
                    <strong>Дата:</strong> {date}
                </div>
                <div>
                    <strong>Размер доски:</strong> {boardSize}
                </div>
                <div>
                    <strong>Коми:</strong> {komi}
                </div>
            </div>
            <div className={styles.result}>
                <strong>Результат:</strong>{" "}
                {result?.winColor === "B" ? "Чёрные" : "Белые"} +
                {result?.pointDiff} очков
            </div>

            {sgf && (
                <a href={sgf} target="_blank" rel="noreferrer">
                    Скачать SGF
                </a>
            )}

        </div>
    );
}

export default ArchiveGameCard;
```
src/components/ArchiveGameCard/ArchiveGameCard.module.css
```
.gameCard {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    background-color: #fafafa;
}

.players, .info, .result {
    margin-bottom: 6px;
}
```
src/components/AuthForm/AuthForm.jsx
```
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const AuthForm = ({ onSubmit, error, isLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2>Авторизация</h2>
            <label>
                Username:
                <input
                    type="Username"
                    placeholder="Введите username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Пароль:
                <input
                    type="Password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Войти"}
            </button>
        </form>
    );
};

export default AuthForm;
```
src/components/AuthForm/AuthForm.module.css
```
.authForm {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 40px auto;
}

.authForm h2 {
    text-align: center;
}

.authForm label {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.authForm input {
    padding: 8px;
    margin-top: 5px;
}

.error {
    color: red;
    margin: 5px 0;
}
```
src/components/GoPlayers/GoPlayerAI.jsx
```
import React, { useEffect, useRef } from "react";
import { callAIMove } from "../../services/API/aiApi";
import { parseCoords, extractMoves } from "../../utils/conversionUtils";

const GoPlayerAI = ({ width = 800, height = 800, sgf = "(;FF[4]GM[1]SZ[19])", options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            let playerOptions = { width, height, sgf, ...options };
            playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);

            // Переопределяем play для интеграции хода ИИ
            const originalPlay = editable.play;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== "b") {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);

                const currentSgf = player.kifuReader.kifu.toSgf();
                const moves = extractMoves(currentSgf, player.kifu.size);
                console.log(moves);

                callAIMove(moves)
                    .then((response) => {
                        const { bot_move } = response.data;
                        if (!bot_move) {
                            console.error("Сервер не вернул bot_move");
                            return;
                        }
                        const { x: botX, y: botY } = parseCoords(bot_move.coordinates, player.kifu.size);
                        originalPlay.call(this, botX, botY);
                    })
                    .catch((err) => {
                        console.error("Ошибка получения хода от ИИ:", err);
                    });
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);

            playerRef.current = player;
        }
    }, [width, height, sgf, options]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayerAI;
```
src/components/GoPlayers/GoPlayerMultiplayer.jsx
```
import React, { useEffect, useRef } from "react";
import { convertCoords, parseCoords } from "../../utils/conversionUtils";
import {useGame} from "../../contexts/GameContext.jsx";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 onSendMove,
                                 incomingMove,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const editableRef = useRef(null);
    const originalPlayRef = useRef(null);
    const { playerColor } = useGame();

    useEffect(() => {
        if (window.WGo && window.WGo.Player && containerRef.current) {
            containerRef.current.innerHTML = "";
            let playerOptions = {
                width,
                height,
                sgf: initialSgf,
                ...options,
            };
            playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
            editableRef.current = editable;
            const originalPlay = editable.play;
            originalPlayRef.current = originalPlay;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== playerColor) {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);
                const moveStr = convertCoords(x, y, player.kifu.size);
                const message = {
                    color: playerColor === "b" ? "black" : "white",
                    coordinates: moveStr,
                };
                onSendMove?.(message);
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);
            setTimeout(() => {
                player.last();
            }, 0);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current = null;
            }
        };
    }, [initialSgf]);

    useEffect(() => {
        if (!incomingMove) return;
        if (!editableRef.current || !originalPlayRef.current) return;

        const { color, coordinates } = incomingMove;
        const size = playerRef.current?.kifu?.size || 19;
        const { x, y } = parseCoords(coordinates, size);
        const wgoColor = color === "black" ? window.WGo.B : window.WGo.W;
        originalPlayRef.current.call(editableRef.current, x, y, wgoColor);
    }, [incomingMove]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
```
src/components/GoPlayers/GoPlayerOffline.jsx
```
import React, { useEffect, useRef } from "react";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayerOffline = ({ width = 800, height = 800, sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { width, height, sgf, ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
        }
    }, [width, height, sgf, options]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayerOffline;
```
src/components/RegisterForm/RegisterForm.jsx
```
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onSubmit, error, isLoading }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // переименовано из nickname
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirm) {
            alert("Пароли не совпадают");
            return;
        }
        onSubmit({ email, username, password });
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <label>
                Email:
                <input
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Никнейм:
                <input
                    type="text"
                    placeholder="Введите никнейм"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Пароль:
                <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Повторите пароль:
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
        </form>
    );
};

export default RegisterForm;
```
src/components/RegisterForm/RegisterForm.module.css
```
.registerForm {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 40px auto;
}

.registerForm h2 {
    text-align: center;
}

.registerForm label {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.registerForm input {
    padding: 8px;
    margin-top: 5px;
}

.error {
    color: red;
    margin: 5px 0;
}
```
src/components/header/Header.jsx
```
import React from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import {useAuth} from "../../contexts/AuthContext";
import {logout as apiLogout} from "../../services/API/authApi";

const Header = () => {
    const {user, logout: contextLogout} = useAuth();

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        } finally {
            contextLogout();
        }
    };

    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <div className={styles.left}>
                    <Typography variant="h6" component="div" className={styles.title}>
                        <Link to="/" className={styles.link}>
                            Go Game
                        </Link>
                    </Typography>
                    <Link to="/offline" className={styles.link}>
                        Offline
                    </Link>
                    <Link to="/create" className={styles.link}>
                        Create
                    </Link>
                    <Link to="/join" className={styles.link}>
                        Join
                    </Link>
                    <Link to="/ai" className={styles.link}>
                        AI
                    </Link>
                    <Link to="/archive" className={styles.link}>
                        Archive
                    </Link>
                </div>
                <div className={styles.right}>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" className={styles.link}>
                                {user.nickname}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.link}>
                                Login
                            </Link>
                            <Link to="/register" className={styles.link}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
```
src/components/header/Header.module.css
```
/* Стили для Toolbar */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}

.left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Стили для заголовка */
.title {
    font-weight: bold;
}

/* Стили для ссылок */
.link {
    color: inherit;
    text-decoration: none;
}

.link:hover,
.link:focus,
.link:visited,
.link:active {
    text-decoration: none;
    color: inherit;
}
```
src/contexts/AuthContext.jsx
```
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
```
src/contexts/GameContext.jsx
```
import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameInfo, setGameInfo] = useState(null);

    const [sgf, setSgf] = useState(() => {
        const storedSgf = localStorage.getItem("game_sgf");
        return storedSgf || "(;FF[4]GM[1]SZ[19])";
    });
    const [playerColor, setPlayerColor] = useState(() => {
        return localStorage.getItem("player_color") || null;
    });

    useEffect(() => {
        localStorage.setItem("game_sgf", sgf);
    }, [sgf]);

    useEffect(() => {
        if (playerColor !== null) {
            localStorage.setItem("player_color", playerColor);
        }
    }, [playerColor]);

    const updateSgf = (newSgf) => {
        setSgf(newSgf);
    };

    return (
        <GameContext.Provider
            value={{
                gameInfo,
                setGameInfo,
                sgf,
                updateSgf,
                playerColor,
                setPlayerColor,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => useContext(GameContext);
```
src/pages/AI/AI.jsx
```
import GoPlayerAI from "../../components/GoPlayers/GoPlayerAI.jsx";

function AI() {
    const playerColor = "b";

    return (
        <div>
            <h2 style={{ textAlign: 'center'}}>Игра с KataGo</h2>
            <GoPlayerAI mode="ai" playerColor={playerColor} />
        </div>
    );
}

export default AI;
```
src/pages/Archive/Archive.jsx
```
import React, { useEffect, useState } from "react";
import { getNamesInArchive, getYearsInArchive, getArchive } from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);
    const [yearsLocalPage, setYearsLocalPage] = useState(0);
    const [yearsPerPage] = useState(10);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(0);
    const [namesTotalPages, setNamesTotalPages] = useState(0);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(0);
    const [archiveTotalPages, setArchiveTotalPages] = useState(0);

    useEffect(() => {
        getYearsInArchive()
            .then((response) => {
                setYears(response.data.years);
            })
            .catch((err) => console.error(err));
        loadNames(1);
    }, []);

    const loadNames = (page) => {
        getNamesInArchive(page)
            .then((response) => {
                const { names, page, pages_total } = response.data;
                setNames(names);
                setNamesPage(page);
                setNamesTotalPages(pages_total);
            })
            .catch((err) => console.error(err));
    };

    const handleNamesPrev = () => {
        if (namesPage > 0) {
            loadNames(namesPage - 1);
        }
    };
    const handleNamesNext = () => {
        if (namesPage < namesTotalPages - 1) {
            loadNames(namesPage + 1);
        }
    };

    const handleYearsPrev = () => {
        if (yearsLocalPage > 0) {
            setYearsLocalPage(yearsLocalPage - 1);
        }
    };
    const handleYearsNext = () => {
        const maxLocalPages = Math.ceil(years.length / yearsPerPage);
        if (yearsLocalPage < maxLocalPages - 1) {
            setYearsLocalPage(yearsLocalPage + 1);
        }
    };
    const visibleYears = years.slice(
        yearsLocalPage * yearsPerPage,
        yearsLocalPage * yearsPerPage + yearsPerPage
    );

    const loadArchiveGames = (page = 0) => {
        if (!selectedYear && !selectedName) {
            alert("Выберите год или имя игрока!");
            return;
        }

        getArchive(selectedYear, selectedName, page)
            .then((response) => {
                const { games, page, pages_total } = response.data;
                setGames(games);
                setArchivePage(page);
                setArchiveTotalPages(pages_total);
            })
            .catch((err) => console.error(err));
    };

    const handleArchivePrev = () => {
        if (archivePage > 0) {
            loadArchiveGames(archivePage - 1);
        }
    };
    const handleArchiveNext = () => {
        if (archivePage < archiveTotalPages - 1) {
            loadArchiveGames(archivePage + 1);
        }
    };

    const handleShowGames = () => {
        setArchivePage(0);
        loadArchiveGames(0);
    };

    return (
        <div className={styles.archiveContainer}>
            <h2>Архив профессиональных игр</h2>

            <div className={styles.filters}>
                <div className={styles.filterBlock}>
                    <label>Год:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Не выбрано</option>
                        {visibleYears.map((y) => (
                            <option key={y.year} value={y.year}>
                                {y.year} (игр: {y.count_of_games})
                            </option>
                        ))}
                    </select>
                    <div>
                        <button onClick={handleYearsPrev}>Предыдущие</button>
                        <button onClick={handleYearsNext}>Следующие</button>
                    </div>
                </div>

                <div className={styles.filterBlock}>
                    <label>Имя игрока:</label>
                    <select
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    >
                        <option value="">Не выбрано</option>
                        {names.map((player) => (
                            <option key={player.name} value={player.name}>
                                {player.name} (игр: {player.count_of_games})
                            </option>
                        ))}
                    </select>
                    <div>
                        <button onClick={handleNamesPrev} disabled={namesPage <= 0}>
                            ←
                        </button>
                        <span>{namesPage + 1} / {namesTotalPages}</span>
                        <button
                            onClick={handleNamesNext}
                            disabled={namesPage >= namesTotalPages - 1}
                        >
                            →
                        </button>
                    </div>
                </div>

                <button onClick={handleShowGames}>Показать игры</button>
            </div>

            <div className={styles.gamesContainer}>
                {games.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>

            {games.length > 0 && (
                <div className={styles.gamesPagination}>
                    <button onClick={handleArchivePrev} disabled={archivePage <= 0}>
                        Предыдущая
                    </button>
                    <span>
            Страница {archivePage + 1} из {archiveTotalPages}
          </span>
                    <button
                        onClick={handleArchiveNext}
                        disabled={archivePage >= archiveTotalPages - 1}
                    >
                        Следующая
                    </button>
                </div>
            )}
        </div>
    );
}

export default ArchivePage;
```
src/pages/Archive/Archive.module.css
```
.archiveContainer {
    margin: 20px auto;
    max-width: 1200px;
    padding: 10px;
}

.filters {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
}

.filterBlock {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.gamesContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* 2 столбца */
    gap: 20px;
}

.gamesPagination {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}
```
src/pages/CreateGame/CreateGame.jsx
```
import React, { useEffect } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";

function CreateGame() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleCreate = async () => {
        try {
            const response = await newGame();
            navigate(`/game/${response.data.Body.public_key}`);
        } catch (error) {
            console.error("Ошибка создания игры", error);
            navigate("/game");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Создать игру</h2>
            <button onClick={handleCreate} className={styles.createButton}>
                Создать игру
            </button>
        </div>
    );
}

export default CreateGame;
```
src/pages/CreateGame/CreateGame.module.css
```
.container {
    text-align: center;
    margin-top: 50px;
}

.inputField {
    width: 200px;
    font-size: 16px;
    padding: 8px;
    margin-right: 10px;
}

.createButton {
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
}
```
src/pages/Game/Game.jsx
```
import { useParams, useNavigate } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import React, { useEffect, useRef, useCallback, useState } from "react";
import styles from "../Game/Game.module.css";
import { getGameInfo, leaveGame } from "../../services/API/gameApi.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {fixSgfFormat} from "../../utils/conversionUtils.js";

const WS_URL_BASE = "ws://localhost:8080/api/startGame";

function GameContent() {
    const { gameKey } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Достаём из контекста:
    const {
        gameInfo,
        setGameInfo,
        sgf,
        updateSgf,
        playerColor,
        setPlayerColor
    } = useGame();

    const [incomingMove, setIncomingMove] = useState(null);
    const unmountedRef = useRef(false);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!playerColor) {
            setPlayerColor("b");
        }
    }, [playerColor, setPlayerColor]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getGameInfo(gameKey);
                if (response.data?.Status === 200) {
                    const body = response.data.Body;
                    setGameInfo(body);

                    const rawSgf = (body?.sgf || "").trim();
                    const cleanedSgf = fixSgfFormat(rawSgf || "(;FF[4]GM[1]SZ[19])");

                    if (cleanedSgf !== sgf) {
                        updateSgf(cleanedSgf);
                    }
                }
            } catch (error) {
                console.error("Ошибка getGameInfo:", error);
            }
        })();
    }, [gameKey]);

    const connectSocket = useCallback(() => {
        const socketUrl = `${WS_URL_BASE}?game_id=${gameKey}`;
        let ws;
        try {
            ws = new WebSocket(socketUrl);
        } catch (err) {
            console.error("Ошибка создания WebSocket", err);
            return;
        }
        ws.onopen = () => {
            console.log("WS-соединение установлено");
            socketRef.current = ws;
        };
        ws.onmessage = (event) => {
            console.log("WS сообщение:", event.data);
            try {
                const trimmed = event.data.trim();
                if (!trimmed.startsWith("{")) {
                    console.log("Получено уведомление:", event.data);
                    return;
                }
                const data = JSON.parse(event.data);

                if (data.move) {
                    setIncomingMove(data.move);
                }
            } catch (err) {
                console.error("Ошибка обработки WS сообщения", err);
            }
        };
        ws.onerror = (err) => {
            console.error("WS ошибка", err);
        };
        ws.onclose = (event) => {
            console.warn("WS закрыт", event);
            socketRef.current = null;
            if (!unmountedRef.current) {
                setTimeout(() => {
                    connectSocket();
                }, 3000);
            }
        };
    }, [gameKey]);

    useEffect(() => {
        connectSocket();
        return () => {
            unmountedRef.current = true;
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectSocket]);

    const sendMove = useCallback(
        (message) => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(message));
            } else {
                console.warn("WS-соединение не установлено для отправки хода");
            }
        },
        []
    );

    const handleLeave = async () => {
        try {
            await leaveGame(gameKey);
            navigate(`/`);
        } catch (error) {
            console.error("Ошибка выхода из игры", error);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer
                onSendMove={sendMove}
                incomingMove={incomingMove}
                initialSgf={sgf}
            />

            <button onClick={handleLeave} className={styles.leaveButton}>
                Выйти
            </button>
        </div>
    );
}

function Game() {
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    );
}

export default Game;
```
src/pages/Game/Game.module.css
```
.container {
    text-align: center;
    margin-top: 20px;
}

.leaveButton {
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
}
```
src/pages/Home/Home.jsx
```
import React from "react";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles["home-container"]}>
            <h1>Добро пожаловать в Go Game!</h1>
            <p>
                Здесь вы можете сыграть партию в го с другими игроками,
                ознакомиться с учебными материалами и улучшить своё мастерство. А также ниже можно пообщаться в чате :)
            </p>
            <iframe
                src="http://176.99.133.223:8000/"
                style={{ width: "100%", height: "600px", border: "none" }}
                title="Chat"
            />
        </div>
    );
}

export default Home;
```
src/pages/Home/Home.module.css
```
.home-container {
    padding: 2rem;
    margin: 0 auto;
    max-width: 800px;
}

/* Отступы для абзацев */
.home-container p {
    margin-bottom: 1rem;
}

/* Небольшой отступ для заголовка */
.home-container h1 {
    margin-bottom: 1.5rem;
}
``` 
src/pages/JoinGame/JoinGame.jsx
```
import React, { useEffect, useState } from "react";
import { joinGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./JoinGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";

function JoinGameContent() {
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setPlayerColor } = useGame();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleJoin = async () => {
        try {
            await joinGame(gameCode);
            setPlayerColor("w");
            navigate(`/game/${gameCode}`);
        } catch (error) {
            console.error("Ошибка подключения к игре", error);
            navigate("/game");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Подключиться к игре</h2>
            <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Введите код"
                className={styles.inputField}
            />
            <button onClick={handleJoin} className={styles.joinButton}>
                Подключиться
            </button>
        </div>
    );
}

function JoinGame() {
    return (
        <GameProvider>
            <JoinGameContent />
        </GameProvider>
    );
}

export default JoinGame;
```
src/pages/JoinGame/JoinGame.module.css
```
.container {
    text-align: center;
    margin-top: 50px;
}

.inputField {
    width: 200px;
    font-size: 16px;
    padding: 8px;
    margin-right: 10px;
}

.joinButton {
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
}
```
src/pages/Login/Login.jsx
```
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login as apiLogin } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: ({ username, password }) => apiLogin(username, password),
        onSuccess: (response, variables) => {
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username });
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка авторизации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при авторизации", error);
        }
    });

    const handleLogin = (formData) => {
        mutate({
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <div>
            <AuthForm
                onSubmit={handleLogin}
                error={error?.message}
                isLoading={isLoading}
                formType="login"
            />
        </div>
    );
};

export default Login;
``` 
src/pages/Offline/Offline.jsx
```
import GoPlayerOffline from "../../components/GoPlayers/GoPlayerOffline.jsx";

function Offline() {
    return (
        <div>
            <GoPlayerOffline width={865} height={865} options={{}}/>
        </div>
    );
}

export default Offline;
```
src/pages/Offline/Offline.module.css
```
```
src/pages/Register/Register.jsx
```
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { register as apiRegister } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const mutation = useMutation({
        mutationFn: ({ username, password, email }) =>
            apiRegister(username, password, email),
        onSuccess: (response, variables) => {
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username });
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка регистрации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при регистрации", error);
        }
    });

    const handleRegister = (formData) => {
        mutation.mutate({
            username: formData.username,
            password: formData.password,
            email: formData.email,
        });
    };

    return (
        <div>
            <RegisterForm
                onSubmit={handleRegister}
                error={mutation.error?.message}
                isLoading={mutation.isLoading}
            />
        </div>
    );
};

export default Register;
```
src/routes/AppRouter.jsx
```
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Offline from "../pages/Offline/Offline.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import JoinGame from "../pages/JoinGame/JoinGame.jsx";
import Game from "../pages/Game/Game.jsx";
import AI from "../pages/AI/AI.jsx";
import CreateGame from "../pages/CreateGame/CreateGame.jsx";
import ArchivePage from "../pages/Archive/Archive.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/offline" element={<Offline/>}/>
            <Route path="/join" element={<JoinGame />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/game/:gameKey" element={<Game />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="*" element={<div>Страница не найдена</div>}/>
        </Routes>
    );
}
```
src/services/API/aiApi.js
```
import api from '../api';

/**
 * Передача хода боту
 * @param moves
 */
export function callAIMove(moves) {
    return api.post('/autoBotGenerateMove', {
        moves: moves
    });
}
```
src/services/API/archiveApi.js
```
import api from "../api";

/**
 * Массив имен из архива
 * @param page
 */
export function getNamesInArchive(page) {
    return api.get(`/getNamesInArchive?page=${page}`)
}

/**
 * Массив лет из архива
 */
export function getYearsInArchive() {
    return api.get(`/getYearsInArchive`)
}

/**
 * Возвращает архив игр с постраничной разбивкой,
 * с возможностью фильтрации по году или имени игрока.
 * Обязательно необходимо указать хотя бы один из параметров: год (year) или имя (name).
 * @param year
 * @param name
 * @param page
 */
export function getArchive(year, name, page) {
    return api.get(`/getArchive?year=${year}&name=${name}&page=${page}`)
}
```
src/services/API/authApi.js
```
import api from "../api";

/**
 * Логин
 * @param username
 * @param password
 */
export function login(username, password) {
    return api.post("/login", {
        Username: username,
        Password: password,
    })
}

/**
 * Выход из аккаунта
 */
export function logout() {
    return api.delete("/logout");
}

/**
 * Регистрация
 * @param username
 * @param password
 * @param email
 */
export function register(username, password, email) {
    return api.post("/register", {
        Username: username,
        Password: password,
        Email: email,
    })
}
```
src/services/API/gameApi.js
```
import api from "../api";

/**
 * Создание новой игры
 */
export function newGame() {
    return api.post("/NewGame", {
        "board_size": 19,
        "is_creator_black": true,
        "komi": 3.5,
    });
}

/**
 * Присоединение к новой игре по коду
 * @param gameCode
 */
export function joinGame(gameCode) {
    return api.post("/JoinGame", {
        public_key: gameCode,
        role: "player",
    });
}

/**
 * Получение информации об игре
 * @param gameCode
 */
export function getGameInfo(gameCode) {
    return api.post("/getGameByPublicKey", {
        game_key: gameCode,
    });
}

/**
 * Выход из игры
 * @param gameCode
 */
export function leaveGame(gameCode) {
    return api.post("/leaveGame", {
        public_key: gameCode,
    });
}
```
src/services/api.js
```
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 5000,
    withCredentials: true,
});

export default api;
```
src/utils/conversionUtils.js
```
export const convertCoords = (x, y, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = letters[x] || "";
    const number = boardSize - y;
    return letter + number;
};

export const parseCoords = (moveStr, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = moveStr[0];
    const num = parseInt(moveStr.slice(1), 10);
    const x = letters.indexOf(letter);
    const y = boardSize - num;
    return { x, y };
};

export const extractMoves = (sgf, boardSize) => {
    const moves = [];
    const regex = /;([BW])\[([a-z]{2})\]/gi;
    let match;
    while ((match = regex.exec(sgf)) !== null) {
        const colorChar = match[1];
        const coord = match[2];
        const x = coord.charCodeAt(0) - "a".charCodeAt(0);
        const y = coord.charCodeAt(1) - "a".charCodeAt(0);
        const coordinates = convertCoords(x, y, boardSize);
        const color = colorChar.toLowerCase();
        moves.push({ color, coordinates });
    }
    return moves;
};

const coordToSgf = (coord) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = coord[0].toUpperCase();
    const number = parseInt(coord.slice(1), 10);

    const x = letters.indexOf(letter);
    const y = 19 - number;
    if (x < 0 || y < 0 || x >= 19 || y >= 19) return "";

    const sgfX = String.fromCharCode("a".charCodeAt(0) + x);
    const sgfY = String.fromCharCode("a".charCodeAt(0) + y);
    return sgfX + sgfY;
};

export const fixSgfFormat = (sgfRaw) => {
    return sgfRaw.replace(/;(black|white)\[([A-T]\d{1,2})\]/gi, (_, color, coord) => {
        const sgfCoord = coordToSgf(coord);
        const sgfColor = color.toLowerCase() === "black" ? "B" : "W";
        return `;${sgfColor}[${sgfCoord}]`;
    });
};
```
src/App.css
```
```
src/App.jsx
```
import React from "react";
import AppRouter from "./routes/AppRouter";
import Header from "./components/header/Header";

function App() {
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
}

export default App;
```
src/index.css
```
:root {
  /* Шрифты */
  --font-family-base: system-ui, Avenir, Helvetica, Arial, sans-serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /* Цвета для светлой темы */
  --color-primary: #646cff;
  --color-primary-hover: #535bf2;
  --color-secondary: #213547;
  --color-background: #ffffff;
  --color-text: rgba(0, 0, 0, 0.87);
}

/* Глобальные стили для документа */
body {
  font-family: var(--font-family-base), serif;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

/* Заголовки */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

/* Стилизация ссылок */
a {
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
}
a:hover {
  color: var(--color-primary-hover);
}

/* Универсальные стили для кнопок */
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  background-color: var(--color-secondary);
  color: var(--color-background);
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: var(--color-primary);
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/* Поддержка тёмной темы */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #242424;
    --color-text: rgba(255, 255, 255, 0.87);
  }
}
```
src/main.jsx
```
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from "./contexts/AuthContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
);
```
README.md
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
eslint.config.js
```
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Go Game</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <script type="text/javascript" src="/wgo.min.js"></script>
    <script type="text/javascript" src="/wgo.player.min.js"></script>
    <link type="text/css" href="/wgo.player.css" rel="stylesheet" />
</head>
<body>
<div id="root"></div>

<script type="module" src="/src/main.jsx"></script>
</body>
</html>
```