
//开启局部作用域,自调用函数
(function(){
	//设置随机数方法
	var tool = {
		getRandom : function (max,min){
			return Math.floor(Math.random() * (max - min + 1) ) + min;
		}
	}
	var foodArr = []; //存储每个生成食物的数组
	var snakeArr = [];//创建一个空数组存储蛇的信息
	//构造函数随机生成食物
	function Food(value){
		value = value || {};
		//设置食物的预设值
		this.width = value.width || 20;
		this.height = value.height || 20;
		this.color = value.color || "red";
		this.x = value.x || 0;
		this.y = value.y || 0;
		this.score = 0;//分数
	}

	Food.prototype.rendering = function(map){
		//调用清除食物函数
		 foodReset(); 
		
		//在随机位置添加食物并设置食物样式
		var div = document.createElement("div");
		map.appendChild(div);
		//在数组中添加生成的div
		foodArr.push(div);
		
		this.x = tool.getRandom(0,map.offsetWidth / this.width - 1) * this.width;
		this.y = tool.getRandom(0,map.offsetHeight / this.height - 1) * this.height;
		
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		div.style.backgroundColor = this.color;
		div.style.position = "absolute";
	}
	//清除食物函数
	function foodReset(){
		for(var i = foodArr.length - 1; i >= 0; i--){
			//找到子节点的父元素删除子节点
			foodArr[i].parentNode.removeChild(foodArr[i]);
			//在数组中删除这个元素
			//第一个参数是从数组的第几位开始删除，第二个参数是删除几个元素
			foodArr.splice(i,1);
		}
	}
	
	//蛇的构造函数
	//蛇的属性 长度 宽高 颜色 运动方向 蛇的构成:身体和头部
	function Snake(parameter){
		parameter = parameter || {};
		this.width =  parameter.width || 20;
		this.height = parameter.height || 20;
		this.color = parameter.color || "red";
		this.position = parameter.position || "right";
		this.body = [
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'},
		];
	}
	
	Snake.prototype.render = function(value){
		
		snakeReset();
		
		for(var i = 0,len = this.body.length; i < len; i++){
			var obj = this.body[i];
			//添加DIV
			var div = document.createElement("div");
			value.appendChild(div);
			//将创建的蛇元素添加到空数组
			snakeArr.push(div);
			//设置蛇的样式
			div.style.position = "absolute";
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.backgroundColor = obj.color;
			div.style.left = obj.x * this.width + "px";
			div.style.top = obj.y * this.height + "px";
		}
		
	}
	//控制蛇的移动
	Snake.prototype.move = function(food,box){
		//控制蛇的每个身体从当前节点移动到上一个节点
		for(var i = this.body.length - 1; i > 0; i--){
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//控制蛇头的方向
		var head = this.body[0];
		//判断当前方向
		switch(this.position){
			case 'right':
				head.x += 1;
				break;
			case 'left':
				head.x -= 1;
				break;
			case 'top':
				head.y -= 1;
				break;
			case 'bottom':
				head.y += 1;
				break;
		}
		//获取蛇的位置
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		
		//判断蛇和食物是否重合，如果位置重合则蛇长度+1并且重新生成食物
		if(headX === food.x && headY === food.y){
			var last = this.body[this.body.length - 1];
			this.body.push({x: last.x, y: last.y, color: last.color})
			food.rendering(box);
			food.score++;//吃掉一次食物分数自加1
		}
	}
	function snakeReset(){
		for(var i = snakeArr.length - 1; i >= 0; i--){
			//找到子节点的父元素删除子节点
			snakeArr[i].parentNode.removeChild(snakeArr[i]);
			//在数组中删除这个元素
			//第一个参数是从数组的第几位开始删除，第二个参数是删除几个元素
			snakeArr.splice(i,1);
		}
	}
	window.Food = Food;
	window.Snake = Snake;
})()
