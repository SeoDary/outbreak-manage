<template>
	<div class="manage">
		<el-container>
			<el-header>
				<span>疫情管理系统</span>
				<el-button  @click="loginOut">退出</el-button>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						default-active="3"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b">
						<el-menu-item index="1"  @click="$router.push({path:'/homePage'})">
							<i class="el-icon-s-promotion"></i>
							<span slot="title">楼栋数据</span>
						</el-menu-item>
						<el-menu-item index="2"  @click="$router.push({path:'/article'})">
							<i class="el-icon-s-promotion"></i>
							<span slot="title">公告管理</span>
						</el-menu-item>
						<el-menu-item index="4"  @click="$router.push({path:'/message'})">
							<i class="el-icon-s-promotion"></i>
							<span slot="title">求助消息通知</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
						<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: "Manage",
	data() {
		return {
		
		}
	},
	methods: {
		loginOut(){
			// localStorage.removeItem("token");
			this.$router.push("/login");
		}
	}
}
</script>

<style lang="scss" scoped>
	*{
		margin: 0;
		padding: 0;
	}
.manage {
	width: 100%;
	height: 100%;
	.el-header {
		/*background-color: #ccc;*/
		box-shadow:2px 5px  6px #dddddd;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30px;
		span{
			font-size: 1.5rem;
			font-weight: 700;
			color: rgba(50,50,50,.6);
		}
	}
	.el-container {
		width: 100%;
		height: 100%;
		
	}
	.el-aside {
		/deep/.el-menu {
			height: 100%;
			.el-menu-item{
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}
	.el-main{
		padding: 0;
	}
}
</style>
