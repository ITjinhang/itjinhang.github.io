// 存活300s游戏
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
function move(obj,oD,json,options){
	/*
		options = {
			'duration':总时间,
			'type':运动方式,
			'complete':回调函数
		}
	*/

	/*
		json = {
			'left':200,
			'top':200,
			'width':300,
			'height':300
		}
	*/
	options = options || {};
	options.duration = options.duration || 800;
	options.type = options.type || 'linear';

	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration/10);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-a*a*a);
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*(a*a*a);
					break;
			}

			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity='+cur*1000+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}

		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}

	},30)
}
function rnd(m,n){
	return parseInt(Math.random()*(n-m)+m);
}
window.onload=function(){
	var oD=document.querySelector('.box');
	var oN=document.querySelector('.live');
	var oB=document.querySelectorAll('.moveB');
	var oSp=document.querySelector('.time span');
	var l=0;
	var t=0;
	
	var oDh=oD.offsetHeight+50;
	var timer=null;
	var bOk=true;
	var count=0;
	var N_timer=null;
	
	oN.onclick=start;
	function start(){
		 
		if(!bOk) return;
		N_timer=setInterval(function(){
			count++;
			oSp.innerHTML=count;
		},1000)
		bOk=false;
		oN.style.cursor='none';
		
		function changeDiv(){
			//创建球
			var oB=document.createElement('div');
			oB.className='moveB';
			oB.style.background='red';
			oB.style.borderRadius='50%';
			oD.appendChild(oB);
			// 上下左右 4个运动方向   每一个运动方向又有三个方向
			switch(rnd(1,5)){
				case 1:
					oB.style.top=-10+'px';
					oB.style.left=parseInt(Math.random()*480)+'px';	
					switch(rnd(1,4)){
						case 1:
							move(oB,oD,{
								left:-20,
								top:rnd(0,oDh)
							})
						break;
						
						case 2:
							move(oB,oD,{
								top:rnd(0,oDh),
								left:oDh+10
							})
						break;
						
						case 3:
							move(oB,oD,{
								left:rnd(0,oDh),
								top:oDh+10
							})
						break;
					}		
				break;
				
				case 2:
					oB.style.left=-10+'px';
					oB.style.top=rnd(0,oDh)+'px';
					switch(rnd(1,4)){
						case 1:
							move(oB,oD,{
								top:-20,
								left:rnd(0,oDh)
							})
						break;
						
						case 2:
							move(oB,oD,{
								top:rnd(0,oDh),
								left:oDh
							})
						break;
						
						case 3:
							move(oB,oD,{
								top:oDh,
								left:rnd(0,oDh)
							})
						break;
					}		
				break;
				
				case 3:
					oB.style.right=-10+'px';
					oB.style.top=rnd(0,oDh)+'px';
					switch(rnd(1,4)){
						case 1:
							move(oB,oD,{
								top:-20,
								right:rnd(0,oDh)
							})
						break;
						
						case 2:
							move(oB,oD,{
								top:rnd(0,oDh),
								right:oDh
							})
						break;
						
						case 3:
							move(oB,oD,{
								top:oDh,
								left:rnd(0,oDh)
							})
						break;
					}		
				break;
				
				case 4:
					oB.style.bottom=-10+'px';
					oB.style.left=rnd(0,oDh)+'px';	
					switch(rnd(1,4)){
						case 1:
							move(oB,oD,{
								bottom:oDh,
								left:rnd(0,oDh)
							})
						break;
						
						case 2:
							move(oB,oD,{
								bottom:rnd(0,oDh),
								left:-20
							})
						break;
						
						case 3:
							move(oB,oD,{
								left:oDh,
								bottom:rnd(0,oDh)
							})
						break;
					}		
				break;
				
			}
			
			//oB.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
			
		}
		
		function addBall(){
			for(var i=0;i<15;i++){
				changeDiv();
			}
		}
		
		oD.onmousemove=function(ev){
			oN.style.left=(ev.clientX-oD.offsetLeft)+'px';
			oN.style.top=(ev.clientY-oD.offsetTop)+'px';
			l=ev.clientX-oD.offsetLeft;
			t=ev.clientY-oD.offsetTop;
		}
			
		var timer=setInterval(function(){
			addBall();
		},2900)
		
		setInterval(function(){
			var oB=document.querySelectorAll('.moveB');
			for(var i=0;i<oB.length;i++){
				// 创建出来的球
				var oBl=oB[i].offsetLeft;
				var oBt=oB[i].offsetTop;
				var oBb=oBt+15;
				var oBr=oBl+15;
				
				// now的位置
				var oNl=l;
				var oNt=t;
				var oNr=l+25;
				var oNb=t+25;
				//  1球的右边> 2球的左边   1球的左边< 2球的右边  1球的下边小于>2球的上边 1球的上边<2球的下边
				if(oNr>oBl && oNl < oBr && oNb > oBt && oNt < oBb){
					alert('失败');
					clearInterval(N_timer);
					clearInterval(timer);
					oD.innerHTML='<div class="live"></div>';
				}
			}
		},30)
	}
}