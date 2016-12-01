// JavaScript Document
$(document).ready(function(){
	var timer=null;
	 $('.second .box-1 .bot .bt-2 .bg').html(' <div class="f1">4月8日大版本开启 新职业术士魔神天降</div>'+
		  '<ul>'+
			  '<li><a href="javascripy:;">【新闻】决战开启！6月4日全新Raid本“暗黑城<span>02/24</span></a></li>'+
			  '<li><a href="javascripy:;">【新闻】竞技场上线！进入PVP激斗时代！<span>02/24</span></a></li>'+
			  '<li><a href="javascripy:;">【新闻】揭秘术士进化史 多张设计稿曝光<span>02/24</span></a></li>'+
			  '<li><a href="javascripy:;">【新闻】两大满级副本特色揭秘 终极BOSS曝光<span>02/24</span></a></li>'+
			  '<li><a href="javascripy:;">【新闻】新版4.8上线 全新竞技场玩法揭秘<span>02/24</span></a></li>'+
			  '<li><a href="javascripy:;">【新闻】年度大版今日开启 新职业新战场震撼上线<span>02/24</span></a></li>'+
			'</ul>'+
		   '<p><span></span>更多信息</p>')
	$.ajax({
		url:'NewG.js',
		success:function(str){
			var arr=eval('('+str+')');
			var html='';
			var html2='';
			var html3='';
			var html4='';
			$.each(arr,function(index,val) {
				html+='<a href="'+val.newG[3]+'" class="'+val.newG[4]+'">'+val.newG[0]+'<span style="color:#f00000;">'+val.newG[1]+'</span>'+val.newG[2]+'</a>';
				html2+='<a href="'+val.newG1[3]+'" class="'+val.newG1[4]+'">'+val.newG1[0]+'<span style="color:#f00000;">'+val.newG1[1]+'</span>'+val.newG1[2]+'</a>';
				html3+='<span>距您上次访问有<a href="'+val.count[1]+'">'+val.count[0]+'</a>条更新<i></i><p>关注:</p></span> ';
				html4+='<p><span></span>活动中心</p>'+
						'<ul>'+
						'<li><a href="'+val.play[0].name1_herf+'">'+val.play[0].name1+'</a><span>'+val.play[0].name1_show+'</span></li>'+
						'<li><a href="'+val.play[0].game1_herf+'">'+val.play[0].game1+'</a><span>'+val.play[0].game1_show+'</span></li>'+
						'<li><a href="'+val.play[0].game2_herf+'">'+val.play[0].game2+'</a><span>'+val.play[0].game2_show+'</span></li>'+
						'<li><a href="'+val.play[0].game3_herf+'">'+val.play[0].game3+'</a><span>'+val.play[0].game3_show+'</span></li>'+
						'<li><a href="'+val.play[0].game4_herf+'">'+val.play[0].game4+'</a><span>'+val.play[0].game4_show+'</span></li>'+
						'<li><a href="'+val.play[0].game5_herf+'">'+val.play[0].game5+'</a><span>'+val.play[0].game5_show+'</span></li></ul>';
			});
			$('.second .box-1 .b-t .t-2-1').append(html);
			$('.second .box-1 .b-t .t-2-1').append(html2);
			$('.second .box-1 .b-t .t-2-2').append(html3);
			$('.second .zs .yb').append(html4);
			$('.second .zs .yb ul li').mouseover(function(){
				$('.second .zs .yb ul li').removeClass('active');
				$(this).addClass('active');
				
			})
		}
	});
	var timer=null;
	var iNow=0;
	var oD=document.getElementById('bOxx');
	oD.innerHTML+=oD.innerHTML;
	var  fW= $('.second .box-1 .bot .bt-1 .box li').length*$('.second .box-1 .bot .bt-1 .box li').eq(0).width();
	$('.second .box-1 .bot .bt-1 .box').css('width',fW);
	$('.second .box-1 .bot .bt-1 .change li').mouseover(function(){
		if(iNow==5){
			iNow=0;
			$('.second .box-1 .bot .bt-1 .box').css('left','0');
		}
		$('.second .box-1 .bot .bt-1 .change li').removeClass('active');
		$(this).addClass('active');
		var n=$(this).index();
		iNow=n;
		$('.second .box-1 .bot .bt-1 .box').stop().animate({
			'left':-n*$('.second .box-1 .bot .bt-1 .box li').eq(0).width()
		});
	});
	$('.second .box-1 .bot .bt-1 .box').mouseover(function(){
		clearInterval(timer);
	});
	$('.second .box-1 .bot .bt-1 .box').mouseout(function(){
		timer=setInterval(function(){
			iNow++;
			if(iNow==6){
				iNow=1;
				$('.second .box-1 .bot .bt-1 .box').css('left','0');
			}
			$('.second .box-1 .bot .bt-1 .change li').removeClass('active');
			$('.second .box-1 .bot .bt-1 .change li').eq(iNow%5).addClass('active');
			$('.second .box-1 .bot .bt-1 .box').stop().animate({
				'left':-iNow*$('.second .box-1 .bot .bt-1 .box li').eq(0).width()
			});
		},2000)
	});

	timer=setInterval(function(){
		iNow++;
		if(iNow==6){
			iNow=1;
			$('.second .box-1 .bot .bt-1 .box').css('left','0');
		}
		$('.second .box-1 .bot .bt-1 .change li').removeClass('active');
		$('.second .box-1 .bot .bt-1 .change li').eq(iNow%5).addClass('active');
		$('.second .box-1 .bot .bt-1 .box').stop().animate({
			'left':-iNow*$('.second .box-1 .bot .bt-1 .box li').eq(0).width()
		});
	},2000);
	$('.second .box-1 .bot .bt-2 div:lt(4)').click(function(){
		$('.second .box-1 .bot .bt-2 .bg').html('');
		$('.second .box-1 .bot .bt-2 div:lt(4)').removeClass('active');
		$(this).addClass('active');
		var i=$(this).index();
		$.ajax({
			'url':'News.js',
			'success':function(str){
				var arr=eval('('+str+')');
				var html='<div class="f1">'+arr[i].Title+'</div>'+
						'<ul>'+
						'<li><a href="'+arr[i].forD+'">'+arr[i].new+'<span>'+arr[i].time+'</span></a></li>'+
						'<li><a href="'+arr[i].forD1+'">'+arr[i].new1+'<span>'+arr[i].time1+'</span></a></li>'+
						'<li><a href="'+arr[i].forD2+'">'+arr[i].new2+'<span>'+arr[i].time2+'</span></a></li>'+
						'<li><a href="'+arr[i].forD3+'">'+arr[i].new3+'<span>'+arr[i].time3+'</span></a></li>'+
						'<li><a href="'+arr[i].forD4+'">'+arr[i].new4+'<span>'+arr[i].time4+'</span></a></li>'+
						'<li><a href="'+arr[i].forD5+'">'+arr[i].new5+'<span>'+arr[i].time5+'</span></a></li>'+
						'</ul>'+
						'<p><span></span>更多信息</p>';
				$('.second .box-1 .bot .bt-2 .bg').append(html);
			}
		})
	});
	$('.second .zs .le .s div').click(function(){
		$('.second .zs .le .s div').removeClass('active');
		$(this).addClass('active');
		var n=$(this).index()+1;
		$('.second .zs .le .n img').attr('src','img/img/f'+n+'.jpg')
	});
	$('.end .jl ul').html('<li><a href="#">·生活技能之烹饪技能详细解读</a></li>'+
		'<li><a href="#">·称号：发现森立之秘 任务全程攻略</a></li>'+
		'<li><a href="#">·屌丝逆袭 大神成长计划开启</a></li>'+
		'<li><a href="#">·生活技能之烹饪技能详细解读</a></li>'+
		'<li><a href="#">·阻止科萨特复活【英雄】成就攻略！</a></li>'+
		'<li><a href="#">·独家攻略！灵魂回响效率冲级攻略！</a></li>'+
		'<li><a href="#">·灵魂回响生活技能玩法介绍（二）</a></li>'+
		'<li><a href="#">·灵魂回响生活技能玩法介绍（一）</a></li>');
	$('.end .j2 ul').html('<li><a href="#">·生活技能之烹饪技能详细解读</a></li>'+
		'<li><a href="#">·称号：发现森立之秘 任务全程攻略</a></li>'+
		'<li><a href="#">·屌丝逆袭 大神成长计划开启</a></li>'+
		'<li><a href="#">·生活技能之烹饪技能详细解读</a></li>'+
		'<li><a href="#">·阻止科萨特复活【英雄】成就攻略！</a></li>'+
		'<li><a href="#">·独家攻略！灵魂回响效率冲级攻略！</a></li>'+
		'<li><a href="#">·灵魂回响生活技能玩法介绍（二）</a></li>'+
		'<li><a href="#">·灵魂回响生活技能玩法介绍（一）</a></li>');
	$('.end .jl .neir div:lt(3)').click(function(){
		$('.end .jl .neir div:lt(3)').removeClass('active');
		$(this).addClass('active');
		var num=$(this).index()+1;
		$.ajax({
			'url':'News2.js',
			'success':function(str){
				var arr=eval('('+str+')');
				var html='';
				$.each(arr,function(index,val){
					html='<li><a href="'+val['news'+num].a_h+'">'+val['news'+num].a+'</a></li>'+
						 '<li><a href="'+val['news'+num].b_h+'">'+val['news'+num].b+'</a></li>'+
						 '<li><a href="'+val['news'+num].c_h+'">'+val['news'+num].c+'</a></li>'+
						 '<li><a href="'+val['news'+num].d_h+'">'+val['news'+num].d+'</a></li>'+
						 '<li><a href="'+val['news'+num].e_h+'">'+val['news'+num].e+'</a></li>'+
						 '<li><a href="'+val['news'+num].f_h+'">'+val['news'+num].f+'</a></li>'+
						 '<li><a href="'+val['news'+num].g_h+'">'+val['news'+num].g+'</a></li>'+
						 '<li><a href="'+val['news'+num].h_h+'">'+val['news'+num].h+'</a></li>'
				});
				$('.end .jl ul').html(html);
			}
		})
	});
	$('.end .j2 .neir div:lt(3)').click(function(){
		$('.end .j2 .neir div:lt(3)').removeClass('active');
		$(this).addClass('active');
		var num=$(this).index()+1;
		$.ajax({
			'url':'News2.js',
			'success':function(str){
				var arr=eval('('+str+')');
				var html='';
				$.each(arr,function(index,val){
					html='<li><a href="'+val['news'+num].a_h+'">'+val['news'+num].a+'</a></li>'+
						 '<li><a href="'+val['news'+num].b_h+'">'+val['news'+num].b+'</a></li>'+
						 '<li><a href="'+val['news'+num].c_h+'">'+val['news'+num].c+'</a></li>'+
						 '<li><a href="'+val['news'+num].d_h+'">'+val['news'+num].d+'</a></li>'+
						 '<li><a href="'+val['news'+num].e_h+'">'+val['news'+num].e+'</a></li>'+
						 '<li><a href="'+val['news'+num].f_h+'">'+val['news'+num].f+'</a></li>'+
						 '<li><a href="'+val['news'+num].g_h+'">'+val['news'+num].g+'</a></li>'+
						 '<li><a href="'+val['news'+num].h_h+'">'+val['news'+num].h+'</a></li>'
				});
				$('.end .j2 ul').html(html);
			}
		})
	});
	$('.end .sj .neir .n1').click(function(){
		$('.end .sj .neir .n1').removeClass('active');
		$(this).addClass('active');
	})
})