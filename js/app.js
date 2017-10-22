(function (window) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: "#app",

		// 数据
		data: {
			datalist: [{
					id: 1,
					title: "抽烟",
					isCompleted: true
				},
				{
					id: 2,
					title: "喝酒",
					isCompleted: false
				},
				{
					id: 3,
					title: "烫头",
					isCompleted: false
				}
			],
			content: "",
			editId: "",
			checkall: "",
		},

		// 方法
		methods: {
			//增加数据功能实现--------------------------------------------------------------
			//实现原理。创建一个数据对象，与页面进行双向绑定，按回车的时候触发，将数据对象push到数据数组中
			add() {
				var id = this.datalist.length + 1
				data = {
						id,
						title: this.content,
						isCompleted: false
					},
					this.datalist.push(data);
				this.content = ""
			},


			//删除数据功能实现-----------------------------------------------------------------------
			//实现原理：用findIndex方法找到数据数组中与参数id相等的数据的下标并返回，最后从数据数组中删除该下标对应的数据对象
			del(id) {
				var index = this.datalist.findIndex(function (v, i) {
					return v.id == id
				})
				this.datalist.splice(index, 1)
			},


			//双击编辑功能实现-------------------------------------------------------------------------
			//原理：让声明的编辑Id和你选中的数据对象的id相等（通过传参），页面中判断如果编辑Id和对应的数据对象id相等，添加editing类
			edit(id) {
				this.editId = id;
			},

			//回车确定----------------------------------------------------------------------------
			sure() {
				this.editId = ""
			},

			// 任务的单选完成状态实现，只需要给checkbox做双向数据绑定即可！用v-bind--------------------------

			//任务的全选完成状态实现：---------------------------------------------------------
			//原理: 直接将所有的任务状态改成和全选按钮一样的状态！！
			toggleAll() {
				this.datalist.forEach((v, i) => {
					v.isCompleted = this.checkall
				});
			},



			//修改下面的来修改全选---------------------------------------------------
			//原理：//1. 只要有一个不选中，那么全选按钮就不选中，
			//2. 所有的都选中了，那么全选按钮才选中
			//arr.every只有所有都符合才返回true
			singleTaskCheck() {
				this.checkall = this.datalist.every(function (v) {
					return v.isCompleted
				})
			},
			//显示清除键功能实现
			//原理：有一个值的isCompleted值是true就返回true用filter方法判断，将isCompleted属性值为true的添加到新数组，新数组长度>0就是true
			isHideClrBtn() {
				var newArr = this.datalist.filter(function (v) {
					return v.isCompleted
				})
				if (newArr.length > 0) {
					return true
				}

			},

			//6. 清除所有已经完成的任务-----------------------
			clearAllComepleted() {
				// 将数组中所有isCompleted属性为true的元素删除即可
				for (var i = 0; i < this.datalist.length; i++) {
					if (this.datalist[i].isCompleted) {
						this.datalist.splice(i, 1);
						//因为每删除一个，数组本身的长度会减少，所以最后i要--
						i--;
					}
				}
			},


			//显示未完成事件数
			getLeftCount() {
				return this.datalist.filter((v) => {
					return !v.isCompleted 
				}).length;
			}





		}

	})


})(window);
