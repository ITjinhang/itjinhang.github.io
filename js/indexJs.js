// index Js
// 随机数
	function rnd(n,m){
		return  parseInt(Math.random()*(m-n)+n);
	}
	
	//兼容
	function getStyle(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj,false)[name];
		}
	}
	
	//运动
	function move(obj,json,options){
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
		options.type = options.type || 'ease-out';
	
		var start = {};
		var dis = {};
		for(var name in json){
			start[name] = parseFloat(getStyle(obj,name));
			dis[name] = json[name] - start[name];
		}
		var count = Math.floor(options.duration/30);
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
					obj.style.filter = 'alpha(opacity='+cur*100+')';
				}
				else{
					obj.style[name] = cur+'px';
				}
				
			}
	
			if(n == count){
				clearInterval(obj.timer);
				options.complete && options.complete();
			}
	
		},30)
	}
	
	
	domReady(function(){
		var oBody=document.querySelector('.body');
		var oLoading=document.getElementById('Loading');
		var oL_left=document.querySelector('.Loading .load_left');
		var oL_right=document.querySelector('.Loading .load_right');
		var oLoad=document.getElementById('load');
		var oMask=document.getElementById('mask');
		var oLog=document.getElementById('log');
		var oCatalog=document.getElementById('Catalog');
		var oContents=document.getElementById('contents');
		var oCont_li=oContents.getElementsByTagName('li');
		var oCont_span=oContents.getElementsByTagName('span');
		var oTranslate=document.getElementById('translate');
		var oWorks=document.getElementById('for_work');
		var oWorks_c=oWorks.querySelectorAll('div');
		var oWorks_p=oWorks.querySelectorAll('p');
		var oWorks_a=oWorks.querySelectorAll('a');
		var oWorks_show=document.querySelectorAll('.show_w');
		var oCont_a=oContents.getElementsByTagName('a');
		var oMoment_r=document.getElementById('A_moment_relief');
		var oMoment_d=oMoment_r.querySelectorAll('div');
		var oMoment_l=oMoment_r.querySelectorAll('span');
		var oMoment_m=oMoment_r.querySelectorAll('.fM');
		var oAbout_m=document.getElementById('About_me');
		var oMsk=document.querySelectorAll('.Mask');
		var oA_M=document.querySelectorAll('.Ma_m');
		var oA_a=document.querySelectorAll('.bFA');
		var oThe_e=document.getElementById('The_end');
		var oEnd_l=document.querySelector('.M_line');
		
		//事件预加载
		var oLoad_num=0;
		oLoad.innerHTML='0%';
		for(var i=1;i<6;i++){
			var oI=new Image();
				//https://jiaweiaa.github.io/img/bg1.jpg
			oI.src= 'https://jiaweiaa.github.io/img/bg'+i+'.jpg';
			oI.onload=function(){
				oLoad_num++;
				oLoad.innerHTML=(oLoad_num*100/5)+'%';
				if(oLoad_num==5){
					oLoad.style.display='none';
					oMask.style.display='none';
					move(oLog,{
						opacity:1
					},{
						complete:function(){
							//加载页动画
							oL_left.style.transformOrigin='left center';
							oL_left.style.transform='rotateX(180deg)';
							oL_right.style.transformOrigin='center center';		
							oL_right.style.transform='rotateX(-180deg)';
							move(oLoading,{
								'opacity':0
						},{
							complete:function(){
								oCatalog.style.display='block';
								oWorks.style.display='block';
								oMoment_r.style.display='block';
								oAbout_m.style.display='block';
								oThe_e.style.display='block';
								move(oContents,{
									'top':90
								},{
									duration:1000,
									complete:function(){
										oContents.style.transition='1s all ease';	
										}
									})
								}
							})
						}
					});
				}
			}
		}


		var oTranslate_arr=['Welcome to my personal station!','Project is the ladder to success.','Sometimes its okay to relax!','My ability time will prove!','Thank you for giving me a chance to show myself!'];
		
		for(var i=0;i<oCont_li.length;i++){
			oCont_li[i].index=i;
			oCont_li[i].onmouseover=function(){
				oCont_span[this.index].style.width=0;
				oCont_span[this.index].style.display='block';
				move(oCont_span[this.index],{
					width:this.offsetWidth
				},{
					complete:(function(i){
						oTranslate.style.display='block';
						oTranslate.innerHTML='<span class="left"></span><span class="right"></span><span class="bottom"></span><span class="top"></span>'+oTranslate_arr[i];
						var oTranslate_c1=oTranslate.children[0];
						var oTranslate_c2=oTranslate.children[1];
						var oTranslate_c3=oTranslate.children[2];
						var oTranslate_c4=oTranslate.children[3];			
						move(oTranslate_c1,{'height':232});
						move(oTranslate_c2,{'height':220});
						move(oTranslate_c3,{'width':424});
						move(oTranslate_c4,{'width':414});
					})(this.index)
				});
			};
			oCont_li[i].onmouseout=function(){
				oCont_span[this.index].style.display='none';
				oTranslate.style.display='none';
			}
		}
		//标题栏 下横线
		//事件滚动
		document.onscroll=function(){
			
			// 导航栏动画 标题跟随  模拟锚点
			var oH=document.documentElement.scrollTop||document.body.scrollTop;
			if(oH>0){
				oContents.style.position='fixed';
				oContents.style.background='black';
				oContents.style.opacity=0.3;
				oContents.style.width='100%';
				oContents.style.margin=0;
				oContents.style.left=0;
				oContents.style.top=0;
				oContents.onmouseover=function(){
					move(oContents,{
						'opacity':1
					})
				};
				oContents.onmouseout=function(){
					move(oContents,{
						'opacity':0.3
					})
				};
				
				//导航栏 变动
				for(var i=0;i<oCont_li.length;i++){
				oCont_li[i].style.cssFloat='left';
				oCont_li[i].style.width='20%';
				oCont_li[i].style.height='80px';
				oCont_li[i].style.margin=0;
				oCont_a[i].style.lineHeight='80px';
				oCont_li[i].onmouseover=function(){
					oCont_span[this.index].style.width=0;
					oCont_span[this.index].style.display='block';
					move(oCont_span[this.index],{
						width:this.offsetWidth,
						top:70
						})
					};
				}
			}
			
			//回到顶部  标题栏回到起始状态  下面的
			if(oH<=0){
				oContents.style.position='absolute';
				oContents.style.background='none';
				oContents.style.opacity=1;
				oContents.style.width='300px';
				oContents.style.marginLeft='-250px';
				oContents.style.left='50%';
				oContents.style.top='90px';
				oContents.onmouseout='';
				oContents.animation='2s out infinite linear';
				for(var i=0;i<oCont_li.length;i++){
					oCont_li[i].style.cssFloat='none';
					oCont_li[i].style.width='240px';
					oCont_li[i].index=i;
					oCont_li[i].onmouseover=function(){
					oCont_span[this.index].style.width=0;
					oCont_span[this.index].style.display='block';
					move(oCont_span[this.index],{
						width:this.offsetWidth
					},{
						complete:(function(i){
								oTranslate.style.display='block';
								oTranslate.innerHTML='<span class="left"></span><span class="right"></span><span class="bottom"></span><span class="top"></span>'+oTranslate_arr[i];
								var oTranslate_c1=oTranslate.children[0];
								var oTranslate_c2=oTranslate.children[1];
								var oTranslate_c3=oTranslate.children[2];
								var oTranslate_c4=oTranslate.children[3];			
								move(oTranslate_c1,{'height':232});
								move(oTranslate_c2,{'height':220});
								move(oTranslate_c3,{'width':424});
								move(oTranslate_c4,{'width':414});
							})(this.index)
						});
					}
				}		
			}
			
			// 标题跟随 移入那块 当前标题变大
			//全部内容高度  class名根据scrolltop添加
			var oBh=oBody.offsetHeight-100;
			//1/5的高度
			var fH=oBh/oCont_li.length;
			if(fH>=oH){
				for(var j=1;j<oCont_li.length;j++){
					oCont_li[j].className='';
				}
			}
			if(oH>=fH){
				for(var j=1;j<oCont_li.length;j++){
					oCont_li[j].className='';
				}
				oCont_li[1].className='on';
			}
			if(oH>=(fH*2)){
				for(var j=1;j<oCont_li.length;j++){
					oCont_li[j].className='';
				}
				oCont_li[2].className='on';
			}
			if(oH>=(fH*3)){
				for(var j=1;j<oCont_li.length;j++){
					oCont_li[j].className='';
				}
				oCont_li[3].className='on';
			}
			if(oH>=(fH*4)){
				for(var j=1;j<oCont_li.length;j++){
					oCont_li[j].className='';
				}
				oCont_li[4].className='on';
			}
			
			//work 动画
			if(oH>=400){
				oWorks_c[0].style.left='20%';
				oWorks_c[2].style.left='20%';
				oWorks_c[1].style.left='50%';
				oWorks_c[1].style.transition='1s all cubic-bezier(0.68, 0.84, 0, 0.22) 0.5s';
				move(oWorks_p[0],{
					height:266
				});
				move(oWorks_p[2],{
					height:266
				});
				setTimeout(function(){
					move(oWorks_p[1],{
						width:350
					})		
				},1000)
				setTimeout(function(){
					move(oWorks_p[4],{
						height:272
					})			
				},1000)
				move(oWorks_p[3],{
					width:350
				})
			}
			
			//game 动画
			if(oH>=1300){
				oMoment_m[0].style.transform='translateY(0px)';
				oMoment_m[1].style.transform='translateY(0px)';
				oMoment_m[2].style.transform='translateY(0px)';
				oMoment_m[3].style.transform='translateY(0px)';
				move(oMoment_l[1],{
					opacity:1
				},{
					duration:2000
				})
				move(oMoment_l[0],{
					opacity:1
				},{
					duration:2000
				})
			}		
			
			// skil 4个球运动动画
			if(oH>=2100){
				for(var i=0;i<oMsk.length;i++){
					oMsk[i].style.transform='translate(0,0)';
					oMsk[i].style.transition='1.5s all cubic-bezier(0.96, 1.52, 0, 0.9)';
				}
			}
		};
		
		//展示里的技能 百分比
		oMsk[1].addEventListener('transitionend',function(){
			oA_M[0].style.top='-160px';
			oA_M[1].style.top='-150px';
			oA_M[2].style.top='-160px';
			oA_M[3].style.top='-170px';
			
			oA_M[0].addEventListener('transitionend',function(){
				for(var i=0;i<oA_a.length;i++){
					oA_a[i].style.opacity=1;
					oA_a[i].style.fontSize='14px';
					oA_a[i].style.left='46%';
					oA_a[i].style.top='19%';
				}
			});
		})

		var oMoment_a_p=document.querySelectorAll('.A_moment_relief .moment_div .fM .head');
		// game 移入效果
		for(var i=0;i<oMoment_a_p.length;i++){
			oMoment_a_p[i].index=i;
			oMoment_a_p[i].onmouseover=function(){
				this.style.transform='rotateY(180deg)';
			}
			 oMoment_a_p[i].onmouseout=function(){
				this.style.transform='rotateY(0deg)';
			}
		}
		
		//  锚点动画
		var Move_num=0;
		var Move_bOk=true;
		var oH=document.documentElement.scrollTop||document.body.scrollTop;
		oCont_li[0].onclick=function(){
			document.documentElement.scrollTop=document.body.scrollTop=0;
		};
		for(var i=1;i<oCont_li.length;i++){
			oCont_li[i].index=i		
			oCont_li[i].onclick=function(){
				if(!Move_bOk) return;
				Move_bOk=false;
				var _this=this.index;
				timer=setInterval(function(){
					Move_num++;
					document.documentElement.scrollTop+=Move_num;
					document.body.scrollTop+=Move_num;
					var scT=_this*oWorks.offsetHeight;
					if(document.body.scrollTop>=_this*730 || document.documentElement.scrollTop >= _this *730){
						document.documentElement.scrollTop=document.body.scrollTop=_this*800;
						clearInterval(timer);
						Move_bOk=true;
					}
				},30);
			}
		}
		
		//最后的线	
		var oEndN=0;
		var oE_timer=null;
		oE_timer=setInterval(function(){
		oEndN+=5;
		oEnd_l.style.width=oEndN+'px';
			if(oEnd_l.offsetWidth>=document.body.clientWidth){
				oEndN=0;
				oEnd_l.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
			}
		},30)
		
		//work  移入当前其他加上蒙版
		for(var j=0;j<oWorks_a.length;j++){
			oWorks_a[j].onmouseover=function(){
				for(var i=0;i<oWorks_a.length;i++){
					oWorks_a[i].style.filter='blur(6px)';
				}
				this.style.filter='none';
				this.children[0].style.opacity='1';
			}
			oWorks_a[j].onmouseout=function(){
				for(var i=0;i<oWorks_a.length;i++){
					oWorks_a[i].style.filter='none';
				}
				this.children[0].style.opacity='0';
			}
		}
	})