function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function domReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn && fn();
		});
	}else{
		addEvent(document,'readystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}