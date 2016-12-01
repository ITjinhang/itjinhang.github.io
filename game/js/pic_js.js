// JavaScript Document  拼图
function rnd(n,m){
		return Math.floor(Math.random()*(m-n)+n);
	}
	function toDub(n){
		return n>9?''+n:n+'0';
	}
	window.onload = function(){
		var oDiv = document.querySelector('div');
		var oSt = document.querySelector('.start');
		var oRe = document.querySelector('.reset');
		var oW = oDiv.offsetWidth-20;
		var oH = oDiv.offsetHeight-20;
		img_game();
		//复原
		oRe.onclick = function(){
			oDiv.innerHTML = '';
			img_game();
		}
		function img_game(){
			// 基础位置
			var count = 1;
			var cOk = 1;
			// 位置数组
			var pos_arr = [];
			//正确数组
			var r_arr = [];		
			//中间量
			var mid = 0;
			var R = 3;
			var C = 3;
			// 空位置的下标
			var null_Pos = R*C;
			// i<3
			for (var i = 0; i < R; i++) {
				for (var j = 0; j < C; j++) {
					if (i == R-1 && j == C-1) {continue;}
					var oSpan = document.createElement('span');
					oSpan.style.backgroundImage = "url(img/1.jpg)";
					// 每个span的宽
					oSpan.style.width = oW/C+'px';
					//每个span的高
					oSpan.style.height = oH/R+'px';
					//当前的个数* width 就是每个的left
					oSpan.style.left = j*oW/C+'px';
					// 当前的个数*height  就是每个的高
					oSpan.style.top = i*oH/R+'px';
					// 照片排列 横竖坐标
					oSpan.pos = count++;
					oSpan.oOk = cOk++;
					// 每个图片的坐标
					oSpan.style.backgroundPosition = -j*oW/C+'px '+(-i*oH/R)+'px';
					pos_arr.push(toDub(oSpan.oOk)+''+-j*oW/C+'px '+(-i*oH/R)+'px');
					r_arr.push(-j*oW/C+'px '+(-i*oH/R)+'px');
					oDiv.appendChild(oSpan);
				}
			}
			console.log(pos_arr,r_arr);
			var aSpan = oDiv.children;
			// 开始游戏
			oSt.onclick = function(){
				//数组排序
				
				pos_arr.sort(function(){
					return Math.random()-0.5;
				})
				// 数组随机排序
				for (var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.backgroundPosition = pos_arr[i].substring(2);
				}
			}
			//点击移动  判断点击当前的周围是否有最后一个
			//  继续判断是否过关
			for (var i = 0; i < aSpan.length; i++) {
				aSpan[i].onclick = function(){
					console.log(pos_arr);
					switch(this.pos-null_Pos){
						case -R:
							mid = this.pos;
							this.pos = null_Pos;
							null_Pos = mid;
							this.style.top = this.offsetTop+oH/R+'px';
						break;
						case -1:
							mid = this.pos;
							this.pos = null_Pos;
							null_Pos = mid;
							this.style.left = this.offsetLeft+oW/C+'px';
						break;
						case 1:
							mid = this.pos;
							this.pos = null_Pos;
							null_Pos = mid;
							this.style.left = this.offsetLeft-oW/C+'px';
						break;
						case R:
							mid = this.pos;
							this.pos = null_Pos;
							null_Pos = mid;
							this.style.top = this.offsetTop-oH/R+'px';
						break;
					}
					for (var j = 0; j < aSpan.length; j++) {
						if (toDub(aSpan[j].pos) != pos_arr[j].substring(0,2)) {
							return;
						}else{
							if (j == aSpan.length-1) {
								setTimeout(function(){
									alert('恭喜过关');
								},100)
							}
						}
					}
				}	
			}
		}
	}