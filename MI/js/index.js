// JavaScript Document
window.onload=function(){
	var oP=document.querySelectorAll('.Move_p');
	var oB=document.querySelectorAll('.btn');
	var oF=document.querySelector('.nav .nav-r .column');
	var num=0;
	var timer=null;
	
	oF.onmouseover=function(){
		clearInterval(timer);
	}
	oF.onmouseout=function(){
		time();
	}
	for(var i=0;i<oB.length;i++){
		oB[i].index=i;
		oB[i].onmouseover=function(ev){
			num=this.index;
			for(var j=0;j<oB.length;j++){
				oB[j].className='';
				move(oP[j],{
					opacity:0
				})
			}
			oB[num].className='active';
			move(oP[num],{
				opacity:1
			})
		}
	}
	time();
	function time(){
		timer=setInterval(function(){
			num++;
			for(var i=0;i<oP.length;i++){
				oP[i].style.opacity=0;
			}
			move(oP[num%5],{
				opacity:1
			})
			for(var i=0;i<oB.length;i++){
				oB[i].className='';
			}
			oB[num%5].className='active';
		},4000)
	}
}