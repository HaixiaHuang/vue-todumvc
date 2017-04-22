# TodoMVC

- 列表展示
- 添加
- 删除单个
- 删除所有
- 全选
- 计数展示
	+ 过滤器

## 过滤器

将某个数据经过特定条件得到过滤之后的数据。

在 Vue 框架中，过滤器本质就是一个方法，目的是可以让你直接在 HTML 模板中调用过滤器方法。

定义：

```js
Vue.filter('uppercase', function (data) {
	// 把 data 转为大写再返回
})

new Vue({
	filters: {
		uppercase (data) {

		}
	}
})
```

使用：

```html
<div>
	<p>{{ 'hello' | uppercase }}</p>
</div>
```
