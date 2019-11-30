<template>
	<view class="content">
 	<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!--	<view class="text-area">
		
			<text class="title"> {{userInfo.nickName||'无'}}</text>
			
		</view> -->
		<view class="talk-box">
			<view class="talk-item" v-for="item in talkList" :key="item._id" @click="toDetail(item)">
				<view class="name">
					<view class="header">
						{{item.title}}
					</view>
					<view class="bottom">
						
						{{handleTime(item.date)}}
					</view>
				</view>
				<view class="avatar">
					<image class="logo" :src="item.category.imgUrl"></image>
				</view>
			</view>
			
		</view>
		<!-- <view >
			<button type="primary" @click="getUserInfo">获取用户信息</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: {},
				userInfo:{},
				talkList:[]
			}
		},
		onLoad() {
			
			this.getTalkList()
		},
		methods: {
			handleTime(time){
				const date = new Date(time)
				return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			toDetail(row){
				console.log(row)
				uni.navigateTo({
				    url: '/pages/detail/detail?id='+row._id
				});
			},
			getTalkList() {
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:'http://111.231.59.56:5000/api/blog?nowpage=1&pagesize=10',
					method:'GET',
					success:(data,error)=> {
						// 
						// console.log(data.data.blogs,error)
						// this.talkList = data.data.blogs
					},
					complete:(data,err)=> {
						uni.hideLoading()
						uni.showModal({
							content: JSON.stringify(data),
							showCancel: false
						});
						this.talkList = data.data.blogs
						console.log(data,err)
					}
				})
			},
			getUserInfo() {
				uni.getUserInfo({
					provider: this.loginProvider,
					success: (result) => {
						console.log('getUserInfo success', result.userInfo);
						this.hasUserInfo = true;
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
			            // #ifndef APP-PLUS
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
			            // #endif
			            // #ifdef APP-PLUS
			            uni.showModal({
			            	title: '获取用户信息失败',
			            	content: '错误原因' + content,
			            	showCancel: false
			            });
			            // #endif
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.talk-box{
		.talk-item{
			padding: 0 20px 6px 20px;
			margin: 10px 0;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #eeeeee;
			.name{
				flex: 1;
				font-size: 14px;
				overflow: hidden;
				display: flex;
				
				flex-direction: column;
				justify-content: space-between;
				.header{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.bottom{
					color: #808080;
					font-size: 12px;
				}
			}
			.avatar{
				width: 100px;
				text-align: right;
				 image{
					 width: 60px;
					 height: 60px;
				 }
			}
		}
	}
</style>
