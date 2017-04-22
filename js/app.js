(function (Vue) {
  'use strict';

  const todos = [
    { id: 1, title: '吃饭', completed: false },
    { id: 2, title: '睡觉', completed: false },
    { id: 3, title: '敲代码', completed: true } 
  ]

  // Vue 实例对象默认代理其内部的 data 数据
  const vm = new Vue({
    el: '#app',
    data: {
      title: '番茄清单',
      todos,
      todoText: '',
      toggleAll: false,
      filter: {},
      visibility: 'all',
      editTodo: null
    },

    directives: {
    	// 自定义指令的名字规范：
    	// 		1. 所有自定义指令使用的时候必须是 v-xxx
    	// 		2. 如果是一个单词，直接小写即可
    	// 		3. 如果是多个单词，驼峰命名法
    	autoFocus: {
    		inserted (el, binding) {
    			// console.log(binding.name)
    			// console.log('value', binding.value)
    			// 如果你双击的当前项和编辑项是一致的，则获得焦点
    			el.focus()
    			// el.focus()
    		}
    	},
    	todoFocus: {
    		// update 表示当作用该指令的模板更新的时候，执行该钩子
    		update (el, binding) {
    			const value = binding.value
    			if (value) {
    				el.focus()
    			}
    		}
    	}
    },

    computed: {
    	unCompletedCount () {
    		// 当计算属性中的访问的模型数据发生变化的时候，计算属性会重新计算得到新的结果
    		let count = 0
    		this.todos.forEach(todo => (!todo.completed && count++))
    		return count
    	},

    	// 该计算属性根据不同的过滤条件，将源 todos 过滤出数据
    	// 计算属性中会自动监视使用到的模型数据成员，当使用到的数据模型数据发生变化的时候，计算属性重新执行
    	// 注意：计算属性无法监视模式对象上的引用类型数据的变化
    	// 			 计算属性只能监视到数据的 **完整** 改变（重新赋值）
    	// 			 所以在计算属性中如果使用到的数据要吗是普通数据（直接修改会响应计算）
    	// 			  要吗是引用类型，在外部修改的时候一定要重新赋值修改，否则不响应
    	filterTodos () {
    		// console.log('重新赋值了')
    		// if (this.filter.completed === undefined) {
    		// 	return this.todos
    		// } else if (this.filter.completed) {
    		// 	// return this.todos.filter(function (todo) {
    		// 	// 	// return todo.completed === filter.completed
    		// 	// 	return todo.completed
    		// 	// })
    		// 	return this.todos.filter(t => t.completed)
    		// } else {
    		// 	// return this.todos.filter(function (todo) {
    		// 	// 	return todo.completed === false
    		// 	// 	return !todo.completed
    		// 	// })
    		// 	return this.todos.filter(t => !t.completed)
    		// }
    		switch (this.visibility) {
    		  case 'all':
    		    return this.todos
    		    break
    		  case 'active':
    		  	return this.todos.filter(t => !t.completed)
    		  	break
    		 	case 'completed':
    		 		return this.todos.filter(t => t.completed)
    		 		break
    		}
    	}
    },

    filters: {
    	// 过滤器本质就是个函数
    	// 函数接收一个数据源，内部作一些处理
    	// 返回一个特定格式的数据，渲染到使用过滤器的位置
    	getAllUnCompletedCount (todos) {
    		console.log('过滤器被调用了')
    		let count = 0
    		todos.forEach(todo => (!todo.completed && count++))
    		return count
    	}
    },

    methods: {
      addTodo () {
        if (this.todoText.trim() === '') {
          return
        }
        var maxId = 0
        // this.todos.forEach(function (todo) {
        // 	if (todo.id > maxId) {
        // 		maxId = todo.id
        // 	}
        // })
           
        this.todos.forEach(todo => (todo.id > maxId) && (maxId = todo.id) )
        // methdos 中的函数，可以直接通过 this 访问 data 中的成员
        this.todos.push({
          id: maxId + 1,
          title: this.todoText,
          completed: false
        })
        this.todoText = ''
        console.log(vm.todos)
      },

      removeTodo (id) {
      	const index = this.todos.findIndex(todo => todo.id === id)
      	this.todos.splice(index, 1)
      },

      clearAllCompleted () {
      	// 不要在遍历的过程中删除数组元素，会导致下标混乱
      	// this.todos.forEach((todo, index) => {
      	// 	if (todo.completed) {
      	// 		this.todos.splice(index, 1)
      	// 	}
      	// })

      	for(let i = 0; i < this.todos.length; i++) {
      		this.todos[i].completed && (this.todos.splice(i, 1), i--)
      	}
      },

      makeToggleAll () {
      	this.todos.forEach(todo => todo.completed = this.toggleAll)
      }
    }
  })

  // vm 默认代理其中的 data
  // 也就说可以直接通过 vm 访问和修改内部的 data 数据
  // vm.title = 'haha'

  window.onhashchange = function () {
  	const hash = window.location.hash
  	console.log(hash)
  	switch (hash) {
  	  case '#/':
  	    // vm.filter = {}
  	    vm.visibility = 'all'
  	    break
  	  case '#/active':
  	  	// vm.filter.completed = false
  	  	// vm.filter = { completed: false }
  	  	vm.visibility = 'active'
  	  	break
  	  case '#/completed':
  	  	// vm.filter.completed = true
  	  	// vm.filter = { completed: true }
  	  	vm.visibility = 'completed'
  	  	break
  	  default:
  	    break
  	}
  }

  window.onhashchange()

})(window.Vue);
