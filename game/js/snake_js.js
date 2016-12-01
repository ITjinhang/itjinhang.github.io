// JavaScript Document   2016 10 30 贪吃蛇 js
window.onload = function () {
	var oBox = document.getElementById("Box");
	
	//比例随机设定 走一次是20 width/20 height/20 
	var h=15;
	var w=30;
	
	// 存属性
	var SnakeAttr = [];
	
	// 速度
	var speed = 150;
	
	//创建div 
	var oDiv = document.createElement("div");
	oDiv.style.background='#fff';
	// 数组里面push   l  是随机的   t是随机的   目标值  od   属性d 方向
	SnakeAttr.push({ x: Math.floor(Math.random() * w), y: Math.floor(Math.random() * h), div: oDiv, Dir: "l" });
	
	// 添加div
	oBox.appendChild(oDiv);
	
	//设定位置 选择数组的第一项
	setPosition(SnakeAttr[0]);
	
	//设定数组函数
	function setPosition(obj) {
		obj.div.style.left = obj.x * 20 + "px";
		obj.div.style.top = obj.y * 20 + "px";
	}
	//创建变量
	var aEat = null;
	
	//方向
	var Dir = "l";
	
	//创建吃的
	function createEat() {
		// 吃的随机位置
		var x = Math.floor(Math.random() * w);
		var y = Math.floor(Math.random() * h);
		
		// 判断是否在数组里面
		var atBok = false;
		
	   //判断吃的位置和蛇的位置是否重叠位置了
		for (var i = 0; i < SnakeAttr.length; i++) {
			// 如果的随机数l  等于 数组里面的任意l   并且 t 等于数组的任意t
			if (x ==  SnakeAttr[i].x && y ==  SnakeAttr[i].y) {
				// 这个值为真
				atBok = true;
				//跳出循环
				break;
			}
		}
		
		///重叠了 如果位置重叠了重新生成一个吃的  
		if (atBok) {
			createEat();           
			return;
		}
		// 吃完之后建新蛇
		var newDiv = document.createElement("div");
		
		//div 的class名
		newDiv.className = "snake";
		
		// //新蛇的属性
		aEat = { x: x, y: y, div: newDiv, Dir: "l" };
		
		//在页面加新蛇
		oBox.appendChild(newDiv);
		
		//新蛇也跑起来
		setPosition(aEat);
	}
	//执行
	createEat();

	
	var oBtn = document.querySelector('input');
	
	var oTimer = null;
	var BgType= true;
	
	oBtn.onclick = function () {
		//如果为游戏暂停了 那么开关为关 执行判断 清除定时器和改变value 开关为开 不执行下面return掉.
		if (!BgType) {
			clearInterval(oTimer);
			oBtn.value = "继续游戏";
			BgType= true;
			return;
		}
		oBtn.value = "暂停游戏";
		setSnke();
		BgType = false;
	}
	var count=0;
	var count_T=1;
	var oTy=document.querySelector('.type');
	var oTy_s=oTy.children[0];
	var oNum=document.querySelector('.number');
	var oNum_s=oNum.children[0];
	// 创建蛇
	function setSnke() {

		oTimer = setInterval(function () {
			for (var i = SnakeAttr.length - 1; i > 0; i--) {
				
				SnakeAttr[i].x = SnakeAttr[i - 1].x;
				
				SnakeAttr[i].y = SnakeAttr[i - 1].y;
				
				SnakeAttr[i].Dir = SnakeAttr[i - 1].Dir;
			}
			//判断上下左右方向
			switch (Dir) {
				case "l":
					SnakeAttr[0].x--;
				break;
				
				case "r":
					SnakeAttr[0].x++;
				break;
				
				case "t":
					SnakeAttr[0].y--;
				break;
				
				case "b":
					SnakeAttr[0].y++;
				   break;
			}
			//判断蛇是否撞墙了   w h  是移动的次数
			if(SnakeAttr[0].x <0 || SnakeAttr[0].x >= w	|| SnakeAttr[0].y <0 ||SnakeAttr[0].y >= h){
				alert('Game over!');
				clearInterval(oTimer);
				return ;
			}
			//判断蛇是否撞到自己了
			for (var n = 1; n < SnakeAttr.length; n++) {
				if (SnakeAttr[0].x == SnakeAttr[n].x && SnakeAttr[0].y == SnakeAttr[n].y) {
					alert("Game over!");
					clearInterval(oTimer);
					return;
				}
			}
			//判断蛇是否吃到东西了
			if (SnakeAttr[0].x == aEat.x && SnakeAttr[0].y == aEat.y) {
				count+=10;
				if(count>100){
					count_T=2;
					speed=100;
				}
				if(count>200){
					count_T=3;
					speed=50;
				}
				if(count>400){
					count_T=4;
					speed=30;
				}
				oTy_s.innerHTML=count_T;
				oNum_s.innerHTML=count;
				aEat.div.className = "";
				// 吃到的属性存到数组里然后变成新的蛇
				SnakeAttr.push(aEat);
				createEat();
			}
			//给新老蛇设定位置
			for (var j = 0; j < SnakeAttr.length; j++) {
				setPosition(SnakeAttr[j]);
			}
		}, speed);
	}

	//键盘改变蛇的方向
	document.onkeydown = function (ev) {
		var oEvent = ev || event;
		var oCode = oEvent.keyCode;
		switch (oCode) {
			case 37:
				Dir = "l";
				break;
			case 38:
				Dir = "t";
				break;
			case 39:
				Dir = "r";
				break;
			case 40:
				Dir = "b";
				break;
		}
	}
}
