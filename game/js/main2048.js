// JavaScript Document
	//主逻辑
	//格子 4 * 4
	var board =new Array();
	//分数
	var score=0;
	
	
	$(document).ready(function(){
		newgame();
	})

	function newgame(){
		//初始化棋盘格
		init();
	
		//因为在new game中点击就有两数出来 所以调用两遍
		//在随机格子里生成数字. 
	    generateOneNumber();
   		generateOneNumber();
	}
	
	//生成数字
	function generateOneNumber(){
		// 判断是否还能在生成数字.
		if(nospace( board )) return false;
		
		//随机一个位置
		// 0 1 2 3的位置
		// math.random 0到1之前的随机数 * 4   在向下取整  就是0 1 2 3
		 var randx = parseInt(Math.floor( Math.random() * 4));
         var randy = parseInt(Math.floor( Math.random() * 4));
		
		//生成位置之后判断是否当前位置上有数字.
		while(true){
			//空白位置上是0 所以是0就不用生成 不是0就继续生成
			if(board[randx][randy]==0){
				break;
			}
			 randx = parseInt(Math.floor( Math.random() * 4));
        	 randy = parseInt(Math.floor( Math.random() * 4));
		}
		
		//随机一个数字  三目 如果小于0.5 就生成 2 大于0.5 就生成4
		var randNumber =Math.random() <0.5 ?2 :4;
		
		//在随机位置显示随机数字
		board[randx][randy] = randNumber;
		//显示加上动画效果  坐标x y  显示
		showNumberWithAnimation( randx , randy , randNumber );
		
		return true;
	}
	
	//给随机出来的数和块加上动画
	function showNumberWithAnimation( i , j , randNumber ){
		var numberCell = $('#number-cell-' + i + "-" + j );
		
		//通过当前随机出来的数加上背景颜色 和 color
		numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
		numberCell.css('color',getNumberColor( randNumber ) );
		numberCell.text( randNumber );
		
		//动画让其宽高出来left top
			numberCell.animate({
			width:"100",
			height:"100",
			top:getPosTop(i,j),
			left:getPosLeft(i,j)
		},50);
	}
	
	
	//判断有没有空位置
	function nospace(board){
		//循环棋盘格
		for(var i=0; i <4 ; i++){
			for(var j=0; j<4 ;j++){
				if(board[i][j]==0){
					return false;
				}
			}
		}
		return true;
	}
	
	
	// getPos  顶部20px;  盒子大小100px
	function getPosTop( i , j ){
		// 第一行20  140  260 
		return 20+ i*120;
	}
	function getPosLeft( i , j ){
		// 第一行20  140  260 
		return 20+ j*120;
	}
	
	
	// 在块里生成16个格子  每块盒子的坐标. 
	function init(){
		for(var i=0; i <4 ; i++){
			for(var j=0; j<4 ;j++){
				var gridCell = $('#grid-cell-'+i+"-"+j);
				
				gridCell.css('top',getPosTop( i , j ));
				gridCell.css('left',getPosLeft( i , j ));
			}
		}
		
			
		//初始化二维数组
		//二维数组,即包含数组的数组.
		for(var i=0;i<4 ;i++){
			board[i] = new Array();
			for( var j=0; j<4 ; j++){
				board[i][j]=0;
			}
		}
		updateBoardView();
	}
	
	// 当前数字发生变化的时候
	function updateBoardView(){
		$(".number-cell").remove();
   		for( var i = 0 ; i < 4 ; i ++ ){
        	for( var j = 0 ; j < 4 ; j ++ ){
				$("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
				var theNumberCell = $('#number-cell-'+i+'-'+j);
				//当为数字为0的时候  width/height 0 让他消失
				if( board[i][j] == 0 ){
					theNumberCell.css('width','0px');
					theNumberCell.css('height','0px');
					theNumberCell.css('top',getPosTop(i,j) + 50 );
					theNumberCell.css('left',getPosLeft(i,j) + 50 );
				}
				// 不为0的时候  让他显示出来同时 判断里面内容 内容不一样 字体和背景都不一样 当前的显示二维数组里面的值.
				else{
					theNumberCell.css('width','100px');
					theNumberCell.css('height','100px');
					theNumberCell.css('top',getPosTop(i,j));
					theNumberCell.css('left',getPosLeft(i,j));
					theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
					theNumberCell.css('color',getNumberColor( board[i][j] ) );
					theNumberCell.text( board[i][j] );
            	}
        	}
		}
	}
	
	// 根据内容不用更换不同背景色
	function getNumberBackgroundColor( number ){
		switch( number ){
			case 2:		return "#eee4da";break;
			case 4:		return "#ede0c8";break;
			case 8:		return "#f2b179";break;
			case 16:	return "#f59563";break;
			case 32:	return "#f67c5f";break;
			case 64:	return "#f65e3b";break;
			case 128:	return "#edcf72";break;
			case 256:	return "#edcc61";break;
			case 512:	return "#9c0";break;
			case 1024:	return "#33b5e5";break;
			case 2048:	return "#09c";break;
			case 4096:	return "#a6c";break;
			case 8192:	return "#93c";break;
		}
	
		return "black";
	}
	
	//根据内容换字体颜色
	function getNumberColor( number ){
    	if( number <= 4 ){
       	 	return "#776e65";
		}
    	return "white";
	}
	
	//按键
	$(document).keydown(function(ev){
		var oEvent =ev || event;
		
		// 判断是否能要想其要移动的方向
		switch(oEvent.keyCode){
			//← 
			case 37:
			if(moveLeft()){
				generateOneNumber();
			}
			break;
			
			//↑
			case 38:
			if(moveUp()){
				generateOneNumber();
			}
			break;
			
			//→
			case 39:
			if(moveRight()){
				generateOneNumber();
			}
			break;
			
			//↓
			case 40:
			if(moveDown()){
				generateOneNumber();
			}
			break;
		}
	});
	
	//左移动
	function moveLeft(){
		//判断是否还能往左移动
		if( !canMoveLeft( board ) )
        return false;
		 
		//moveLeft
	    for( var i = 0 ; i < 4 ; i ++ ){
       	   for( var j = 1 ; j < 4 ; j ++ ){
				// 最边上的是空的
				if( board[i][j] != 0 ){
					//过去的条件
					 for( var k = 0 ; k < j ; k ++ ){
						// 判断相邻的是否是空的 和 中间有没有障碍物
						if( board[i][k] == 0 && noBlock( i , k , j , board ) ){
							//就可以移动.
							//移动动画
							showMoveAnimation( i , j , i , k );
							//移动过去了 就把原来的值给到 当前移动到的k值上
							board[i][k] = board[i][j];
							//原来的值清0
						    board[i][j] = 0;
							continue;
						}
						// 数字是相等的 而且中间 没有障碍物.
						 else if( board[i][k] == board[i][j] && noBlock( i , k , j , board ) ){
							//可以移动 和叠加操作.
							//移动动画
							 showMoveAnimation( i , j , i , k );
							
							// 相加
							 board[i][k] += board[i][j];
                       		 board[i][j] = 0;
							
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
    	return true;
	}
	
	function moveRight(){
		if(!canMoveRight(board))return false;
		//moveRight
		for( var i = 0 ; i < 4 ; i ++ ){
			for( var j = 2 ; j >= 0 ; j -- ){
				if( board[i][j] != 0 ){
					for( var k = 3 ; k > j ; k -- ){	
						if( board[i][k] == 0 &&noBlock( i , j , k , board ) ){
							showMoveAnimation( i , j , i , k );
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if( board[i][k] == board[i][j] && noBlock( i , j , k , board ) ){
							showMoveAnimation( i , j , i , k);
							board[i][k] *= 2;
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
	}

	function moveUp(){
		if(!canMoveUp(board))return false;
		//moveUp
		for( var j = 0 ; j < 4 ; j ++ ){
			for( var i = 1 ; i < 4 ; i ++ ){
				if( board[i][j] != 0 ){
					for( var k = 0 ; k < i ; k ++ ){
						if( board[k][j] == 0 && noBlock( j , k , i , board ) ){
							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if( board[k][j] == board[i][j] && noBlock( j , k , i , board ) ){
							showMoveAnimation( i , j , k , j );
							board[k][j] *= 2;
							board[i][j] = 0;
	
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
	}

	function moveDown(){
		if(!canMoveDown(board))return false;
		//moveDown
		for( var j=0 ; j<4 ; j++ ){
			for( var i=2 ; i>= 0 ; i-- ){
				if( board[i][j]!= 0 ){
					for( var k=3 ; k>i ; k-- ){
						if( board[k][j]==0 && noBlock( j,i,k,board) ){
							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if( board[k][j]== board[i][j] && noBlock( j, i , k , board ) ){
							showMoveAnimation( i , j , k , j );
							board[k][j] *= 2;
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
	}
	
	//判断中间是否有障碍物
	function noBlock(row,coll,col2,board){
		for(var i= coll +1; i<col2 ; i++){
			//判断这个一行移动是否有障碍物. 不为0就是有 false;
			if(board[row][i] != 0){
				return false;
			}
		}
		return true;
	}
	
	//判断是否能向左移动
	function canMoveLeft( board ){
		for(var i=0; i <4 ; i++){
			for(var j=1; j<4 ;j++){
				//可以移动 前面的值不为0的时候
				if(board[i][j]!=0){
					//如果旁边是空的或者 现在和旁边的值相等 那么可以合并
					if( board[i][j-1] == 0 || board [i][j-1] == board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	
	function canMoveRight( board ){
		for( var i = 0 ; i < 4 ; i ++ ){
			for( var j = 2; j >= 0 ; j -- ){
				if( board[i][j] != 0 ){
					if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )return true;
				}
			}
		}
		return false;
	}
	
	function canMoveUp( board ){
		for( var j = 0 ; j < 4 ; j ++ ){
			for( var i = 1 ; i < 4 ; i ++ ){
				if( board[i][j] != 0 ){
					if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )return true;			}
			}
		}
		return false;
	}
	
	function canMoveDown( board ){
		for( var j = 0 ; j < 4 ; j ++ ){
			for( var i = 2 ; i >= 0 ; i -- ){
				if( board[i][j] != 0 ){
					if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )return true;	
					}
			}
		}
		return false;
	}
	
	// 按下键之后的移动动画
	function showMoveAnimation(formx,formy,tox,toy){
		var numberCell = $('#number-cell-' + formx + '-' + formy );
		numberCell.animate({
			top:getPosTop( tox ,toy),
			left:getPosLeft(tox,toy)
		},200)
	}
