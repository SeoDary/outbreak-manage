<template>
	<div class="login">
		<div class="inner-box">
			<el-form :model="form"  ref="form" >
				<p>管理员登录</p>
				<el-form-item prop="identity">
					<el-input prefix-icon="el-icon-user" autocomplete="false" v-model="form.admin" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input prefix-icon="el-icon-lock" type="password" autocomplete="false" v-model="form.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<div class="submit-login" @click="onLogin">登录</div>
			</el-form>
			<div class="log-right">
				<i class="el-icon-s-custom"></i>
				<p>社区疫情管理系统</p>
			</div>
		</div>
	</div>
</template>

<script>
import models from "../../interface/Models.js";

export default {
	name: "Login",
	data() {
		return {
			form: {
				admin: '',
				password: ''
			},
			rules: {
				identity: [
					{ required: true, message: "请输入用户名", trigger: "change" }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "change" }
				]
			}
		}
	},
	
	mounted() {
	
	},
	methods: {
		onLogin(){
					models.getModel("login").post({
						admin: this.form.admin,
						password: this.form.password
					}).then(info=>{
						if(info.data.code == 200){
							// localStorage.setItem("token", info.data.result.user.token);
							this.$router.push("/manage");
						}else {
							this.$message.error('账户密码错误')
						}
					})
		}
	}
}
</script>

<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	background: linear-gradient(45deg,#feac5e,#c779d0,#4bc0c8);
	display: flex;
	justify-content: center;
	align-items: center;
	.inner-box{
		width: 60%;
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: stretch;
		box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
	/deep/ .el-form {
		border-radius: 20px 0 0 20px;
		width: 60%;
		height: 100%;
		background: linear-gradient(to right,#feac5e,rgba(199,121,208,.7));
		background: rgba(199,121,208,1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		p{
			width: 60%;
			text-align: left;
			margin-bottom: 30px;
			letter-spacing: 2px;
			font-size: 24px;
			color: #fff;
		}
		.el-form-item{
			width: 60%;
			margin-bottom: 5%;
		}
		.submit-login {
			letter-spacing: 10px;
			font-weight: 700;
			cursor: pointer;
			border-radius: 15px;
			font-size: 20px;
			padding: 10px 42px 10px 50px;
			color: rgba(180,121,208,1);
			background: rgba(255,255,255,1);
			transition: all 2s;
			&:hover{
				color: floralwhite;
				background: rgba(199,121,208,.2);
				box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
			}
		}
	}
	.log-right{
		width: 40%;
		height: 100%;
		background: rgba(199,121,208,.3);
		border-radius:  0 20px 20px 0 ;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-weight: 700;
		i{
			font-size: 200px;
			color: #ffffff;
		}
		p{
			letter-spacing: 2px;
			margin-top: 30px;
			font-size: 34px;
			color: #ffffff;
		}
	}
}
</style>
