<!--包含加入团体申请，以及加入项目申请-->
<template>
	<div>
		<managerHomeHeader></managerHomeHeader>
		<div>
			<el-col span="4" class="sideMenu">
				<el-menu default-active="2-2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-menu-item index="1" @click="check_apply_project()">
					<i class="el-icon-menu"></i>
					<span slot="title">项目申请</span>
				</el-menu-item>
				<el-menu-item index="2" @click="check_apply_member()">
					<i class="el-icon-menu"></i>
					<span slot="title">团队申请</span>
				</el-menu-item>
				</el-menu>
			</el-col>
			<!--申请加入列表-->
			<el-col span="18" class="project_apply_table" style="width:65%">
			<div>
				<el-button @click="change()">切换</el-button>
			</div>
				<el-table :data="in_applies" border v-show="this.isIn">
					<el-table-column prop="student_name" label="申请人姓名" width="150"></el-table-column>
					<el-table-column prop="team_name" label="申请加入团队" width="250"></el-table-column>
					<!--el-table-column prop="type" label="类别" width="100">
						<template slot-scope="scope">
							<el-tag :type="getType(scope.row.type)">{{scope.row.type}}</el-tag>
						</template>
					</el-table-column-->
					<el-table-column label="查看详情" width="350">
						<template slot-scope="scope">
							<el-button @click="getStudentInfo(scope.row.student_id)" type="text">查看申请人信息</el-button>
							<el-button @click="getProjectInfo(scope.row.team_id)" type="text">查看团队详情</el-button>
						</template>
					</el-table-column>
					<el-table-column label="审核申请" width="200">
						<template slot-scope="scope">
							<el-button @click="dealApply_in(scope.row.student_id, scope.row.team_id)" type="text">审核</el-button>
						</template>
					</el-table-column>
				</el-table>
			<!--申请退出列表-->
				<el-table :data="out_applies" border v-show="this.isOut">
					<el-table-column prop="student_name" label="申请人姓名" width="150"></el-table-column>
					<el-table-column prop="team_name" label="申请退出团队" width="250"></el-table-column>
					<!--el-table-column prop="type" label="类别" width="100">
						<template slot-scope="scope">
							<el-tag :type="getType(scope.row.type)">{{scope.row.type}}</el-tag>
						</template>
					</el-table-column-->
					<el-table-column label="查看详情" width="350">
						<template slot-scope="scope">
							<el-button @click="getStudentInfo(scope.row.student_id)" type="text">查看申请人信息</el-button>
							<el-button @click="getProjectInfo(scope.row.team_id)" type="text">查看团队详情</el-button>
						</template>
					</el-table-column>
					<el-table-column label="审核申请" width="200">
						<template slot-scope="scope">
							<el-button @click="dealApply_out(scope.row.student_id, scope.row.team_id)" type="text">审核</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</div>
		<!--审核加入结果dialog-->
		<div>
			<el-dialog title="审核结果反馈" :visible.sync="resultDialogVisible_in">
				<el-form :model="form" label-width="80px">
					<el-form-item label="审核结果">
						<el-radio-group v-model="form.result">
							<el-radio label="1">通过</el-radio>
							<el-radio label="0">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="原因">
						<el-input v-model="form.reason"></el-input>
					</el-form-item>
					<el-form-item>
						<div>
							<el-button @click="submitForm_in()">提交</el-button>
							<el-button @click="resultDialogVisible_in = flase">取消</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
		<!--审核退出结果dialog-->
		<div>
			<el-dialog title="审核结果反馈" :visible.sync="resultDialogVisible_out">
				<el-form :model="form" label-width="80px">
					<el-form-item label="审核结果">
						<el-radio-group v-model="form.result">
							<el-radio label="1">通过</el-radio>
							<el-radio label="0">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="原因">
						<el-input v-model="form.reason"></el-input>
					</el-form-item>
					<el-form-item>
						<div>
							<el-button @click="submitForm_out()">提交</el-button>
							<el-button @click="resultDialogVisible_out = flase">取消</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
		<!--用户信息dialog-->
		<div>
			<el-dialog title="申请人信息" :visible.sync="studentdialogVisible">
				<el-descriptions>
					<el-descriptions-item label="用户名">{{this.student_info.name}}</el-descriptions-item>
					<el-descriptions-item label="学号">{{this.student_info.student_id}}</el-descriptions-item>
					<el-descriptions-item label="电话号码">{{this.student_info.phone_num}}</el-descriptions-item>
				</el-descriptions>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import managerHomeHeader from "@/components/managerHomeHeader"
export default {
	components: {managerHomeHeader},
	async created() {
		await this.axios({
			method: 'post',
			url: 'http://localhost:8000/buaa_db/get_in_team/',
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res)=>{
			console.log(res)
			this.in_applies = res.data.applies
		})
		await this.axios({
			method: 'post',
			url: 'http://localhost:8000/buaa_db/get_out_team/',
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res)=>{
			console.log(res)
			this.out_applies = res.data.ids
		})
	},
	data() {
		return {
			isIn: true,
			isOut: false,
			deal_student_id: '',
			deal_team_id:'',
			result: '',
			in_applies: [],
			out_applies: [],
			student_info: {},
			studentdialogVisible: false,
			resultDialogVisible_in: false,
			resultDialogVisible_out: false,
			form: {
				result: '',
				reason: ''
			}
		}
	},
	methods: {
		change() {
			this.isIn = !this.isIn,
			this.isOut = !this.isOut
		},
		check_apply_project() {
			this.$router.push('/check_apply/');
		},
		check_apply_manager() {
			this.$router.push('/check_apply_manager/');
		},
		check_apply_member() {
			this.$router.push('/check_apply_member/');
		},
		getType(type) {
			if (type == '加入') {
				return 'success';
			}
			else {
				return 'danger';
			}
		},
		getStudentInfo(student_id) {
			this.axios({
				method: 'post',
				url: '',
				param: student_id
			}).then((res)=>{
				this.student_info = res.data.student_info
			})
			this.studentdialogVisible = true;
		},
		getProjectInfo(team_id) {
			this.$router.push('/project/' + team_id);
		},
		dealApply_in(student_id, team_id) {
			this.deal_student_id = student_id,
			this.deal_team_id = team_id,
			this.resultDialogVisible_in = true
		},
		dealApply_out(student_id, team_id) {
			this.deal_student_id = student_id,
			this.deal_team_id = team_id,
			this.resultDialogVisible_out = true
		},
		submitForm_in() {
			let data = {
				'receiver_id': this.deal_student_id,
				'team_id': this.deal_team_id,
				'result': this.form.result,
				'reason': this.form.reason
			}
			console.log(data)
			this.axios({
				method: 'post',
				url: 'http://localhost:8000/buaa_db/check_team_in/',
				headers: {'Content-Type': 'multipart/form-data'},
				data: data
			}).then((res)=>{
				if (res.data.status == 200) {
					this.$message({
						message: '审核结果已发送',
						type: 'success'
					})
				}
			})
		},
		submitForm_out() {
			let data = {
				'receiver_id': this.deal_student_id,
				'team_id': this.deal_team_id,
				'result': this.form.result,
				'reason': this.form.reason
			}
			console.log(data)
			this.axios({
				method: 'post',
				url: 'http://localhost:8000/buaa_db/check_team_out/',
				headers: {'Content-Type': 'multipart/form-data'},
				data: data
			}).then((res)=>{
				if (res.data.status == 200) {
					this.$message({
						message: '审核结果已发送',
						type: 'success'
					})
				}
			})
		}
	}
}
</script>

<style scoped>
	.sideMenu {
		margin-left: 120px;
	}
	.el-project_apply_table {
		margin-right: 120px;
	}
</style>