<template>
	<view>
		 <u-parse :content="content" @preview="preview" @navigate="navigate" ></u-parse>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import marked from 'marked'
	export default {
		data() {
			return {
				id:'',
				blog:{},
				content:'正在加载...',
				text:'## 23232'
			}
		},
		components: {
		    uParse
		  },
		onLoad(param) {
			this.id = param.id
			this.getBlogDetail()
		},
		methods: {
			preview(src, e) {
			  // do something
			},
			navigate(href, e) {
			  // do something
			},
			getBlogDetail(){
				uni.request({
					url:'http://111.231.59.56:5000/api/blog/getblog/'+this.id,
					method:'GET',
					success:data=> {
						
						console.log(data.data)
						this.blog = data.data
						this.content = marked(data.data.content)
					},
					
				})
			}
		}
	}
</script>

<style>
@import url("../../components/u-parse/u-parse.css");
</style>
