(function () {
	var record;//获取move
	function move(box){
		this.food = new Food();
		this.snake = new Snake();
		this.box = box;
		record = this;//记录move
	}
	move.prototype.start = function(){
		//在地图中渲染食物与蛇对象
		this.food.rendering(this.box);
		this.snake.render(this.box);
		ranSnake();
		direction();
	}
	//1.让蛇运动
	function ranSnake(){
		//使用定时器让蛇重复渲染
		var timerId = setInterval(function(){
			// 要获取游戏对象中的蛇属性
			record.snake.move(record.food,record.box);
			record.snake.render(record.box);
			
			//计算最大边界
			var maxWidth = record.box.offsetWidth  / record.snake.width;
			var maxHeight = record.box.offsetHeight / record.snake.height;
			//蛇的位置
			var snakeWidth = record.snake.body[0].x;
			var snakeHeight = record.snake.body[0].y;
			//1.1 让蛇在触碰到地图边界的时候停止
			if(snakeWidth < 0 || snakeWidth >= maxWidth){
				alert("游戏结束！分数为：" + record.food.score);
				clearInterval(timerId);
			}
			if(snakeHeight < 0 || snakeHeight >= maxHeight){
				alert("游戏结束！分数为：" + record.food.score);
				clearInterval(timerId);
			}
			//1.2 让蛇在碰到自己身体的时候停止
			//思路：遍历body中存储的蛇身，计算得到它们的位标，判断跟蛇头位置是否重合，如果重合，游戏结束。
			//可以通过判断分数来设置定时器的快慢，调节游戏难度
			for(var i = 1; i < record.snake.body.length; i++){
				//遍历每个蛇身的位标
				var x = record.snake.body[i].x;
				var y = record.snake.body[i].y;
				if(snakeWidth == x && snakeHeight == y){
					alert("游戏结束！分数为：" + record.food.score);
					clearInterval(timerId);
				}
			}
		},150)
	}
	//添加按键事件改编蛇的运动方向
	//通过获取到键盘的key值来解决
	function direction(){
		document.addEventListener("keydown",function(e){
			/* console.log(e.keyCode); */
			switch (e.keyCode){
				case 37:
					record.snake.position = "left";
					break;
				case 38:
					record.snake.position = "top";	
					break;
				case 39:
					record.snake.position = "right";	
					break;
				case 40:
					record.snake.position = "bottom";	
					break;
			}
		})
	}
	window.move = move;
})()
//运行函数
var box = document.getElementById("game");
var game = new move(box);
game.start();