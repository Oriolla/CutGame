var gameState;
var canvasSize;
var hits;
var misses;

function init()
{	
	
	canvasSize = 500;
	gameState={
				currPol:[], 
				startPol:null, 
				maxSides: 12, 
				maxCut: 4,
				gameContext :document.getElementById('gameCanvas').getContext('2d'),
				gameCanvas :document.getElementById('gameCanvas') ,
				cutStart : null,
				currTemp: null,
				templates: getTemplate(),
				answPol:[],
				pat:null};
	hits = document.getElementById('hits');
	misses = document.getElementById('misses');
	$('#gameCanvas').css('width',canvasSize).css('height',canvasSize).attr('width', canvasSize).attr('height',canvasSize);

	//document.getElementById('options').style.display = 'none';
	gameDiv = document.getElementById('content');
	////document.getElementById('controls').children[0].style.display='none';
	document.getElementById('controls').children[1].style.display='none';
	document.getElementById('controls').children[2].style.display='none';
	document.getElementById('controls').children[3].style.display='none';
	//document.getElementById('controls').children[4].style.display='none';
	//document.getElementById('controls').children[3].style.display='none';
	//var a = new Polygon(5);	
	var img=document.getElementById("cake");
       gameState.pat=gameState.gameContext.createPattern(img,"repeat");
	//console.dir(gameState.gameContext.strokeStyle);
	gameState.gameContext.strokeStyle = '#bbba8c';//d2691e
	//console.dir(gameState.gameContext.strokeStyle);
	//gameState.gameContext.fillStyle = "#FFCC00";
	gameState.gameContext.lineWidth=5;
	/*
	gameState.startPol = new Polygon(4, [100,100, 100, 200, 200,200,200,100]);
	gameState.currPol.push(gameState.startPol);
	//console.dir(gameState.templates[2][0]);
	//generate();
	//console.dir(isMatchTemplate(gameState.templates[2][1],cutResult({x:133, y:50}, {x:133, y:250})));
	//generate();
	//var res = generateCut(gameState.templates[2][2]);
	//cutResult({x:133, y:50}, {x:133, y:250});
	//gameState.currPol = [new Polygon(10, [411,336,298,290,260,296,157,399,84,302,159,222,231,199,196,58,291,214,379,179])];
	//console.dir(isMatchTemplate(gameState.templates[3][0],cutResult({x:166, y:50}, {x:166, y:250})));
	//var res = generateCut(gameState.templates[4][0]);
	//console.dir(res);
	//gameState.currPol[0].highlight(gameState.gameContext);
	//drawCanvas();	
	//drawLine({x:160,y:10},{x:490,y:450},gameState.gameContext);
	//console.dir(PolyK.GetArea(res[0].array));
	//console.dir(PolyK.GetArea(res[1].array));
	//gameState.currPol[0]=res[0];
	//gameState.currPol[1]=res[1];
	//	gameState.currPol[2]=res[2];
	//	gameState.currPol[3]=res[3];*/
	
	
}
function Point(x, y)
{
	this.x=x;
	this.y=y;
}

 function clearCanvas()
 {
	gameState.gameContext.clearRect(0, 0, gameState.gameCanvas.width, gameState.gameCanvas.height);
 }
 function drawCanvas()
 {
	//gameState.gameContext.rect(0, 0, gameState.gameCanvas.width, gameState.gameCanvas.height);
	//gameState.gameContext.fillStyle =  '#C8A165';
	//gameState.gameContext.fill();
	gameState.gameContext.fillStyle = gameState.pat;
	gameState.currPol.forEach(function (item, i, arr){item.draw(gameState.gameContext)});
	
//	console.dir(gameState.currPol.length);
 }
function Polygon(n, baseArray)
{
	if (!baseArray)
	{		
		var angles = [];
		for (i=0; i<n;i++)
		{
			angles[i]=(Math.random()*Math.PI/n*2)%(Math.PI/n*2)+i*Math.PI/n*2;
		}
		var radiuses =[];
		for (i=0; i<n; i++)
		{
			radiuses[i] = Math.random()*200%(canvasSize/2-80)+40;
		}
		//console.dir(angles);
		this.array = [];
		for (i=0; i<2*n;i+=2)
		{
			this.array[i]=Math.round(Math.cos(angles[i/2])*radiuses[i/2])+canvasSize/2;
			this.array[i+1]= Math.round(Math.sin(angles[i/2])*radiuses[i/2])+canvasSize/2;
		}
	}
	else this.array = baseArray;
	this.draw = function(context){
		context.beginPath();
		context.moveTo(this.array[0], this.array[1]);
		for (i=2; i<this.array.length;i+=2)
		{
			context.lineTo(this.array[i], this.array[i+1]);
		}
		context.closePath();
		context.stroke();
		context.fill();
       }
	this.highlight = function(context)
	{
		var width = context.lineWidth;
		var style = context.strokeStyle;
		context.lineWidth +=2;
		context.strokeStyle= '#006400';
		this.draw(context);
		context.lineWidth=width;
		context.strokeStyle=style;
	}

	
	this.toText = function ()
	{
		var res;
		res = 'Многоугольник, состоящий из точек:';
		for(i=0; i<this.array.length;i+=2)
		{
			res+= ' ('+this.array[i].toFixed(0)+', '+this.array[i+1].toFixed(0)+')';
			if(i<this.array.length-2) res+=',';
		}
		res+='. Площадь - '+(PolyK.GetArea(this.array)).toFixed(0)+'.';
		return res;
	}
	/*
	if(this.points.length==3) this.type='triangle';
	else this.type='polygon';*/
}

function drawLine(a, b, context)
{
	    context.beginPath();
		context.moveTo(a.x, a.y);
		context.lineTo(b.x, b.y);
		context.closePath();
		context.stroke();
		
}
function highlight(e)
{
	clearCanvas();
	drawCanvas();
	console.dir(e.target);
	e.target.pol.highlight(gameState.gameContext);
	e.target.style.border='1px solid green';
}
function unhighlight(e)
{
	clearCanvas();
	drawCanvas();
	e.target.style.border='1px solid transparent';
}
 function generate()
 {
		document.getElementById('controls').children[1].style.display='inline-block';
		document.getElementById('controls').children[3].style.display='inline-block';
		document.getElementById('controls').children[2].style.display='none';
		//document.getElementById('controls').children[0].style.display='none';
		gameState.gameCanvas.style.borderColor = 'black';
		clearCanvas();
		var sides = Math.floor(Math.random()*gameState.maxSides)+3;
		 gameState.startPol = new Polygon(sides);
		 gameState.currPol = [];
		gameState.currPol.push(gameState.startPol);
		gameCanvas.onmousedown = mouseDown;
		drawCanvas();
		var temp;
		//console.dir(temp);
		do{
			temp = Math.round(Math.random()*(gameState.templates.length-1));
		}
		while(gameState.templates[temp].length>gameState.maxCut)
		gameState.currTemp = gameState.templates[temp];
		var text = 'Торт сгенерирован. Разрежьте его на '+gameState.currTemp.length+' куска, в отношении площадей ';
		text+=gameState.currTemp[0];
		for (i=1; i< gameState.currTemp.length; i++)
		{
			text+=':'+gameState.currTemp[i];
		}
		text+='.';
		document.getElementById('stats').children[0].innerText=text;
		//console.dir(document.getElementById('stats').children[0]);
		/*var tempNum = Math.round(Math.random()*2);
		var currCut = generateCut(gameState.templates[2][tempNum]);
		gameState.answPol =  currCut;
		var flg = Math.random()*3;
		//console.dir(flg);
		
		 if((tempNum==2)) 
			{
				//console.dir(flg);
				gameState.currCut = currCut;
				currCut = generateCut(gameState.templates[4][0]);
				gameState.answPol =  currCut;
			}
			else 
			{
				//console.dir(flg);
				gameState.currCut = currCut;
				currCut = generateCut(gameState.templates[3][0]);
				gameState.answPol =  currCut;
			}
		
		
		gameState.currCut = [gameState.startPol]
		shift(gameState.answPol);
	//	console.dir(tempNum);
		drawAnswer();*/
		 return 0;
	
	 }
	//catch (err) {
		
	//	generate();
	//}
	
 
 function drawAnswer()
 {
	 gameState.answPol.forEach(function (item, i, arr){item.draw(gameState.gameContext)});
 }
 function shift(pol)
 {
	 for(i=0; i<pol.length; i++)
	 {
		 for(j = 0; j<pol[i].array.length; j+=2)
		 {
			 pol[i].array[j]+=canvasSize;
		 }
	 }
	 return pol;
 }
function details()
{
	var detailsDiv = document.getElementById('details');
	detailsDiv.innerHTML='<p>Наведите на описание многоугольника и он будет выделен.</p>';
	console.dir(gameState.currPol.length);
	for (j = 0; j<gameState.currPol.length; j++)
	{
		var p = document.createElement('p');
		p.innerHTML=gameState.currPol[j].toText();
		p.onmouseover=highlight;
		p.onmouseout=unhighlight;
		//console.dir(gameState.currPol[i]);
		p.pol = gameState.currPol[j];
		p.style.border='1px solid transparent';
		detailsDiv.appendChild(p);
	}
	//detailsDiv.id = '#dialog-message';
	//document.body.appendChild(detailsDiv);
	//console.dir($('#details'));
/*	*/$('#details').dialog({
	maxHeight: 600,
     modal: true,
    buttons: {
        Ok: function() {
          $('#details').dialog( 'close' );
        }
      }
    });
}
function options()
{
	var optionDiv = document.getElementById('options');
	/*if(gameConfig.shapeType =='particular' ) optionDiv.children[0].checked=true;
	else optionDiv.children[2].checked=true;
	console.dir(optionDiv.children[4]);
	if(gameConfig.isSame==true) optionDiv.children[4].checked=true;
	else optionDiv.children[4].checked=false;*/
	$( function() {
	$( "#slider-range-max" ).slider({
		range: "max",
		min: 3,
		max: 25,
		value: gameState.maxSides+3,
		slide: function( event, ui ) {
			$( "#sides" ).val( ui.value );
			gameState.maxSides=ui.value-3;
		}
	});
       $( "#sides" ).val( $( "#slider-range-max" ).slider( "value" ) );
		} );
		
	$( function() {
	$( "#slider-range-max2" ).slider({
		range: "max",
		min: 2,
		max: 4,
		value: gameState.maxCut,
		slide: function( event, ui ) {
			$( "#fig" ).val( ui.value );
			gameState.maxCut=ui.value;
		}
	});
    $( "#fig" ).val( $( "#slider-range-max2" ).slider( "value" ) );
		} );
		
		
	$('#options').dialog({
      modal: true,
      buttons: {     
        'Закрыть': function() {
          $('#options').dialog( 'close' );
        }
	 
      }
	});
}

function buttonCheck()
{
	//document.getElementById('controls').children[0].style.display='none';
	gameCanvas.onmousedown= null;
	document.getElementById('controls').children[1].style.display='none';
	document.getElementById('controls').children[2].style.display='inline-block';
	var res = isMatchTemplate(gameState.currTemp, gameState.currPol);
	if (res)
	{
		gameState.gameCanvas.style.borderColor = 'green';
		document.getElementById('controls').children[3].style.display='none';
		document.getElementById('stats').children[0].innerHTML='Вы разрезали торт правильно. Нажмите "Подробности" для большей информации. Нажмите "Cгенерировать" для генерации нового торта.';
	}
	else
	{
		gameState.gameCanvas.style.borderColor = 'red';
		document.getElementById('stats').children[0].innerHTML='Вы разрезали торт неправильно. Нажмите "Подробности" для большей информации. Нажмите "Восстановить", чтобы попытаться снова.';
	}
	
}

function mouseDown(e)
{
	if(e.which==1)
	{
		gameState.cutStart = {x:e.offsetX, y : e.offsetY};
		gameState.gameCanvas.onmousemove = cutLine;
		gameState.gameCanvas.onmouseup= endCut;
	}
	
	
}
function mouseOut(e)
{
	gameState.cutStart = null;
	gameState.gameCanvas.onmousemove =null;
	gameState.gameCanvas.onmouseup= null;
	clearCanvas();
	drawCanvas();
	
}
function cutLine(e)
{
	clearCanvas();
	drawCanvas();
	drawLine(gameState.cutStart, {x:e.offsetX, y : e.offsetY}, gameState.gameContext);
}

function endCut(e)
{
	if(e.which==1)
	{
		
		var newPolys = cutResult(
				{x:gameState.cutStart.x, y:gameState.cutStart.y}, 
				{x:e.offsetX, y:e.offsetY}
		);
		
		gameState.currPol = newPolys;
		gameState.gameCanvas.onmousemove = null;
		//console.dir(gameState.currPol);
		gameState.cutStart = null;
		clearCanvas();
		drawCanvas();
	}
}

function generateCut(template)
{
	/*var cutPol = [gameState.startPol];
	loop1:
	for (for i = 1; i<2; i++)
	{
		amount = i+1+(i-1)*Math.round(Math.random()+1);
		currTemplate = gameState.templates[amount]
										[Math.round(Math.random*gameState.templates[amount].length)];*/
	
	var ya = 10;
	var yb = 490;
	var xa = 250;
	var step = 5;
	var xb = 250;
	var point1;
	var point2;
	var res ;
	for(xa = 250; xa>10; xa-=step)
	{
		for(xb = 250; xb<canvasSize; xb+=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		xb = 490;
		for(yb = 490; yb>10; yb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		yb = 10;
		for(xb = 490; xb>250; xb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
	}
	
	xa = 10;
	for(ya = 10; ya<canvasSize; ya+=step)
	{
		for(xb = 250; xb<canvasSize; xb+=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		xb = 490;
		for(yb = 490; yb>10; yb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		yb = 10;
		for(xb = 490; xb>250; xb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
	}
	
	ya = 490;
	for (xa = 10; xa<250; xa+=step)
	{
		for(xb = 250; xb<canvasSize; xb+=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		xb = 490;
		for(yb = 490; yb>10; yb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
		yb = 10;
		for(xb = 490; xb>250; xb-=step)
		{
			point1 = {x:xa, y:ya};
			point2 = {x:xb, y:yb};
			res = cutResult(point1, point2);
			if ( isMatchTemplate(template, res)) return res;
		}
	}
	
	
	delete point1;
	delete point2;
	/*
		for(xa=10; xa<canvasSize/2; xa+=20)
		{
			loop3:
			for(ya=10; ya<canvasSize-10; ya+=20)
			{
				loop4:
				for(xb = canvasSize-10; xb>canvasSize/2; xb-=20)
				{
					loop5:
					for(yb = canvasSize-10; yb > 10; yb-=20)
					{
						//..console.dir(xa+' '+ya+' '+xb+' '+yb);
						
						//console.dir(res);
						//if(res.length == cutPol.length) continue loop5;
						var res = cutResult({x:xa, y:ya}, {x:xb, y:yb});
						if ( isMatchTemplate(template, res)) return res;
					}
				}
			}
				
		}*/
	return null;
}
function isMatchTemplate(temp, pol)
{
	if(!pol) return false;
	pol.sort(function (a, b)
	{
		var as = Math.abs(PolyK.GetArea(a.array));
		var bs =  Math.abs(PolyK.GetArea(b.array));
		if(as>bs) return 1;
		if(as<bs) return -1;
		return 0;
	});
	//console.dir(pol);
	if (temp.length!=pol.length) return false;
	var sum = 0;
	for (j=0; j<temp.length; j++) sum+=temp[j];
	for (i = 0; i<pol.length; i++)
	{
		var part = Math.abs( PolyK.GetArea(pol[i].array)/PolyK.GetArea(gameState.startPol.array))*sum;
	//	console.dir(part);
	//	console.dir(pol);
		if(Math.abs(Math.abs(part)-Math.abs(temp[i]))>Math.abs(temp[i]/6)) return false;
	}
	return true;
	
	
}
function cutResult(a, b)
{
	var newPolys = [];
		for (i=0; i<gameState.currPol.length; i++)
		{
			var cutRes = PolyK.Slice(gameState.currPol[i].array, a.x, a.y, b.x, b.y);
			for (j=0; j<cutRes.length; j++)
			{
				var newPolygon= new Polygon(cutRes[j].length/2,cutRes[j]);
				newPolys.push(newPolygon);
			}
		}
	return newPolys;
}

	
function refresh()
{
	document.getElementById('controls').children[1].style.display='inline-block';
	document.getElementById('controls').children[2].style.display='none';
	gameCanvas.onmousedown = mouseDown;
	var text = 'Разрежьте торт на '+gameState.currTemp.length+' куска, в отношении площадей ';
		text+=gameState.currTemp[0];
		for (i=1; i< gameState.currTemp.length; i++)
		{
			text+=':'+gameState.currTemp[i];
		}
	text+='.';
	document.getElementById('stats').children[0].innerText=text;
	//document.getElementById('controls').children[0].style.display='inline-block';
	gameState.gameCanvas.style.borderColor = 'black';
	gameState.currPol = [gameState.startPol];
	clearCanvas();
	drawCanvas();
	
}

function getTemplate()
{
var res = [[1,2],[1,3], [1,1], [1,1,1],[1,1,2],[1,1,1,1]];
	
	return res;
}