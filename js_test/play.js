/*! 一叶孤舟 | qq:28701884 | 欢迎指教 */

var play = play||{};

play.init = function (){
	
	play.my				=	1;				//valeur 1 -1 1 -1, quand play.my=play.myUser, le joueur peut bouger
	play.map 			=	com.arr2Clone (com.initMap);		//initialiser echiquier
	play.nowManKey		=	false;			//la pièce en train d être manipulé
	play.pace 			=	[];				//enregistre chaque coup
	play.isPlay 		=	true ;			//possible à bouger une pièce?
	play.mans 			=	com.mans;
	play.bylaw 			= 	com.bylaw;
	play.show 			= 	com.show;
	play.showPane 		= 	com.showPane;
	// play.isOffensive	=	true;			//iniative
	// play.depth			=	play.depth || 3;				//depth de recherche AI
	
	play.isFoul			=	false;	//Perpetual check

	play.idPartie		=	false;	//getMax(partie.id)
	play.idUser 		=   false;	//hash => idUser
	play.myUser			=   false;  //1 ou -1

	
	
	
	com.pane.isShow		=	 false;			//隐藏方块
	
	//初始化棋子
	for (var i=0; i<play.map.length; i++){
		for (var n=0; n<play.map[i].length; n++){
			var key = play.map[i][n];
			if (key){
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.mans[key].isShow = true;
			}
		}
	}
	play.show();
	
	//绑定点击事件
	com.canvas.addEventListener("click",play.clickCanvas)
	//clearInterval(play.timer);
	//com.get("autoPlay").addEventListener("click", function(e) {
		//clearInterval(play.timer);
		//play.timer = setInterval("play.AIPlay()",1000);
	//	play.AIPlay()
	//})

	// com.get("offensivePlay").addEventListener("click", function(e) {
	// 	play.isOffensive=true;
	// 	play.isPlay=true ;
	// 	com.get("chessRight").style.display = "none";
	// 	play.init();
	//
	//
	// })
	//
	// com.get("defensivePlay").addEventListener("click", function(e) {
	// 	play.isOffensive=false;
	// 	play.isPlay=true ;
	// 	com.get("chessRight").style.display = "none";
	// 	play.init();
	//
	// 	play.isPlay=true ;
	// 	com.get("chessRight").style.display = "none";
	// 	com.get("moveInfo").style.display = "block";
	// 	com.get("moveInfo").innerHTML="";
	// 	play.depth = 3;
	// 	play.init();
	// })

	
	
	com.get("regretBn").addEventListener("click", function(e) {
		play.regret();
	})
	
	/*
	var initTime = new Date().getTime();
	for (var i=0; i<=100000; i++){
		
		var h=""
		var h=play.map.join();
		//for (var n in play.mans){
		//	if (play.mans[n].show) h+=play.mans[n].key+play.mans[n].x+play.mans[n].y
		//}
	}
	var nowTime= new Date().getTime();
	z([h,nowTime-initTime])
	*/
	
}



//悔棋
play.regret = function (){
	play.pace.pop();
	play.sendMove();
	play.pace.pop();
	play.sendMove();
	console.log(play.pace);
}



//event -- click sur echiquier
play.clickCanvas = function (e){
	if (!play.isPlay) return false;
	var key = play.getClickMan(e);
	var point = play.getClickPoint(e);
	
	var x = point.x;
	var y = point.y;
	
	if (key){
		play.clickMan(key,x,y);	
	}else {
		play.clickPoint(x,y);	
	}
	play.isFoul = play.checkFoul();//检测是不是长将
}

//点击棋子，两种情况，选中或者吃子
// cliquer sur une pièce => 2 cas :
// 1. choose
// 2. eat
play.clickMan = function (key,x,y){
	var man = com.mans[key];
	//mange
	if (play.nowManKey&&play.nowManKey != key && man.my != com.mans[play.nowManKey ].my){
		//man为被吃掉的棋子
		if (play.indexOfPs(com.mans[play.nowManKey].ps,[x,y])){
			man.isShow = false;
			var pace=com.mans[play.nowManKey].x+""+com.mans[play.nowManKey].y
			//z(bill.createMove(play.map,man.x,man.y,x,y))
			delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
			play.map[y][x] = play.nowManKey;
			com.showPane(com.mans[play.nowManKey].x ,com.mans[play.nowManKey].y,x,y)
			com.mans[play.nowManKey].x = x;
			com.mans[play.nowManKey].y = y;
			com.mans[play.nowManKey].alpha = 1
			
			play.pace.push(pace+x+y);
			play.nowManKey = false;
			com.pane.isShow = false;
			com.dot.dots = [];
			com.show()

			play.sendMove();

			//改成玩家2操作

			if (key == "j0") play.showWin (-1);
			if (key == "J0") play.showWin (1);
		}
	// 选中棋子
	}else{
		 if ((man.my==play.myUser) && (play.my ==play.myUser)) {
			if (com.mans[play.nowManKey]) com.mans[play.nowManKey].alpha = 1 ;
			man.alpha = 0.6;
			com.pane.isShow = false;
			play.nowManKey = key;
			com.mans[key].ps = com.mans[key].bl(); //获得所有能着点
			com.dot.dots = com.mans[key].ps
			com.show();
			//com.get("selectAudio").start(0);
			// com.get("selectAudio").play();
		 }
	}
}

//cliquer sur un point => pour bouger
play.clickPoint = function (x,y){
	var key=play.nowManKey;
	var man=com.mans[key];
	if (play.nowManKey){
		if (play.indexOfPs(com.mans[key].ps,[x,y])){
			var pace=man.x+""+man.y
			//z(bill.createMove(play.map,man.x,man.y,x,y))
			delete play.map[man.y][man.x];
			play.map[y][x] = key;
			com.showPane(man.x ,man.y,x,y)
			man.x = x;
			man.y = y;
			man.alpha = 1;
			play.pace.push(pace+x+y);
			play.nowManKey = false;
			com.dot.dots = [];
			com.show();

			console.log("pace actuelle = " + play.pace);
			play.sendMove();
			// play.sendMove();
			// play.getPartie();
			// console.log(play.my);
			// play.getPartie(); //

			// com.get("clickAudio").play();
			//setTimeout("play.AIPlay()",500);
		}else{
			//alert("不能这么走哦！")	
		}
	}
	
}

play.sendMove = function(x,y,newX,newY){
	play.my = -play.my;
	pace=play.pace;
	idPartie = play.idPartie;
	console.log("sendingMove");
	$.ajax({
		type: "GET",
		url: "./data"+"/sendMove.php",
		//headers: {"debug-data":true},
		// data: {"hash":hash},
		data: {"idPartie":idPartie,"pace":pace,"playerMy": play.my},
		success: function(oRep){
			console.log("sendMove succes");
			console.log(oRep);
		}
	});

	// pace=play.pace[play.pace.length - 1];
	// console.log(JSON.stringify(play.pace));    //afficher le dernier coup
}

// play.getHash = function(){
//
// }

//fonction qui permet d'occuper toutes les paces et puis initialiser le map avec ces paces
play.getPartie = function(hash){
	idPartie = play.idPartie;
	$.ajax({
		type: "GET",
		url: "./data"+"/getPartie.php",
		//headers: {"debug-data":true},
		// data: {"hash":hash},
		data: {"idPartie":idPartie},
		success: function(oRep){
			console.log(oRep);
			play.pace=oRep;
			// console.log(play.pace);
		},
		dataType: "json"
	});


}





//fonction qui permet de replace le map sachant les paces
play.place = function(pace){
	var map  = com.arr2Clone(com.initMap);
	play.my=1;
	for (var i=0; i<pace.length; i++){
		var p= pace[i].split("")
		var x = parseInt(p[0], 10);
		var y = parseInt(p[1], 10);
		var newX = parseInt(p[2], 10);
		var newY = parseInt(p[3], 10);
		var key=map[y][x];

		var cMan=map[newY][newX];
		if (cMan) com.mans[map[newY][newX]].isShow = false;
		com.mans[key].x = newX;
		com.mans[key].y = newY;
		map[newY][newX] = key;
		delete map[y][x];
		play.my=-play.my
		if (i==pace.length-1){
			com.showPane(newX ,newY,x,y)
		}

	}
	play.map = map;
	play.isPlay=true;
	com.show();

}


//fonction qui permet de refresh et afficher l echiquier
play.refresh = function(){
	play.getPartie();
	play.place(play.pace);
}

// play.getMove = function(url,my,callback){
// 		var XMLHttpRequestObject=false;
// 		if(window.XMLHttpRequest)
// 			XMLHttpRequestObject=new XMLHttpRequest();
// 		if(XMLHttpRequestObject){
// 			XMLHttpRequestObject.open("GET",url);
// 			XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
// 			XMLHttpRequestObject.onreadystatechange=function (){
// 				if(XMLHttpRequestObject.readyState==4 && XMLHttpRequestObject.status==200){
// 					callback(XMLHttpRequestObject.responseText);
// 					//return XMLHttpRequestObject.responseText;
// 				}
// 			}
// 			XMLHttpRequestObject.send(null);
// 			play.pace=rep.pace;
// 			pace=play.pace[play.pace.length - 1];

// }

//Ai自动走棋
play.AIPlay = function (){
	//return
	play.my = -1 ;
	var pace=AI.init(play.pace.join(""))
	if (!pace) {
		play.showWin (1);
		return ;
	}
	play.pace.push(pace.join(""));
	var key=play.map[pace[1]][pace[0]]
		play.nowManKey = key;
	
	var key=play.map[pace[3]][pace[2]];
	if (key){
		play.AIclickMan(key,pace[2],pace[3]);	
	}else {
		play.AIclickPoint(pace[2],pace[3]);	
	}
	// com.get("clickAudio").play();
	
	
}

//检查是否长将
play.checkFoul = function(){
	var p=play.pace;
	var len=parseInt(p.length,10);
	if (len>11&&p[len-1] == p[len-5] &&p[len-5] == p[len-9]){
		return p[len-4].split("");
	}
	return false;
}



play.AIclickMan = function (key,x,y){
	var man = com.mans[key];
	//吃子
	man.isShow = false;
	delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
	play.map[y][x] = play.nowManKey;
	play.showPane(com.mans[play.nowManKey].x ,com.mans[play.nowManKey].y,x,y)
	
	com.mans[play.nowManKey].x = x;
	com.mans[play.nowManKey].y = y;
	play.nowManKey = false;
	
	com.show()
	if (key == "j0") play.showWin (-1);
	if (key == "J0") play.showWin (1);
}

play.AIclickPoint = function (x,y){
	var key=play.nowManKey;
	var man=com.mans[key];
	if (play.nowManKey){
		delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
		play.map[y][x] = key;
		
		com.showPane(man.x,man.y,x,y)
		
	
		man.x = x;
		man.y = y;
		play.nowManKey = false;
		
	}
	com.show();
}


play.indexOfPs = function (ps,xy){
	for (var i=0; i<ps.length; i++){
		if (ps[i][0]==xy[0]&&ps[i][1]==xy[1]) return true;
	}
	return false;
	
}

//获得点击的着点
play.getClickPoint = function (e){
	var domXY = com.getDomXY(com.canvas);
	var domXY = com.getDomXY(com.canvas);
	var x=Math.round((e.pageX-domXY.x-com.pointStartX-20)/com.spaceX)
	var y=Math.round((e.pageY-domXY.y-com.pointStartY-20)/com.spaceY)
	return {"x":x,"y":y}
}

//获得棋子
play.getClickMan = function (e){
	var clickXY=play.getClickPoint(e);
	var x=clickXY.x;
	var y=clickXY.y;
	if (x < 0 || x>8 || y < 0 || y > 9) return false;
	return (play.map[y][x] && play.map[y][x]!="0") ? play.map[y][x] : false;
}

play.showWin = function (my){
	play.isPlay = false;
	if (my==play.myUser){
		alert("congratulations, u win！");
	}else{
		alert("what a pity, u loss！");
	}
}






//idPartie CheckUser = false
// play.js:474 initialiser idPartie = 3
// play.js:492 player est =wrong hash


//en appuyant sur le btn start, on cree une partie.
//Ici on récupère l'id du partie
play.setIdPartie = function(hash){

	$.ajax({
		type: "GET",
		url: "./data"+"/setIdPartie.php",
		data: {"idPartie":"1"},
		success: function(oRep){
			console.log("initialiser idPartie = " + oRep);
			play.idPartie=oRep;
			play.checkMyUser(hash);

		}
	});

	return play.idPartie;
}

//permet de savoir on est User 1 ou User 2 de la partie
play.checkMyUser = function(hash){

	// idPartie=play.setIdPartie();
	idPartie=play.idPartie;
	console.log("idPartie CheckUser = " + idPartie);

	$.ajax({
		type: "GET",
		url: "./data"+"/checkMyUser.php",
		//data: {"idPartie":idPartie,"hash":"0b527ad35a7983fa5c9abdf31825c3cb"},
		data: {"idPartie":"3","hash":hash},
		success: function(oRep){
			console.log("player est =" + oRep);
			play.myUser = oRep;
		}
	});
}