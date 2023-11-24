<template>
	<div>
		<sysManagerHomeHeader></sysManagerHomeHeader>
		<div class="team_table">
			<el-table :data="projects" border style="width: 100%" height="600">
			<!--el-table-column fixed prop="id" label="项目id" width="100"></el-table-column-->
			<el-table-column fixed prop="project_name" label="项目名称" width="150"></el-table-column>
			<el-table-column fixed prop="time" label="时间" width="200"></el-table-column>
			<el-table-column fixed prop="position" label="地点" width="150"></el-table-column>
			<el-table-column fixed prop="description" label="描述" width="300"></el-table-column>
			<el-table-column fixed="right" label="操作" width="300">
				<template slot-scope="scope">
				<!--scope.row可以获取当前行的信息-->
				<el-button @click="viewProject(scope.row.id)" type="text">查看详情</el-button>
				<el-button @click="checkPass(scope.row.id)" type="text">pass</el-button>
				<el-button @click="checkFail(scope.row.id)" type="text">fail</el-button>
				</template>
			</el-table-column>
			</el-table>
		</div>
		<!--div class="list">
			<div v-for="(item, index) in projects" :key="index" class="project">
				<el-card class="box-card">
					<div class="text item">
						<el-col offset="2" span="3">{{ item.project_name }}</el-col>
						<el-col span="3">{{ item.position }}</el-col>
						<el-col span="8">{{ item.time }}</el-col>
						<el-button @click="viewProject(item.id)" type="primary">查看详情</el-button>
						<el-button @click="checkPass(item.id)" type="success">pass</el-button>
						<el-button @click="checkFail(item.id)" type="danger">fail</el-button>
					</div>
				</el-card>
			</div>
		</div-->
	</div>
</template>

<script>
import sysManagerHomeHeader from "@/components/sysManagerHomeHeader/"
export default {
	components: {sysManagerHomeHeader},
	async create() {
		await this.axios({
		method: 'get',
		url: '/sysManagerHome/'
		}).then((res)=>{
			this.projects = res.data.projects;
		})
	},
	data() {
		return {
		projects : [
			{id:1, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:2, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:3, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:4, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:5, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:6, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:7, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:8, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:1, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:2, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:3, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:4, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:5, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:6, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
			{id:7, project_name:"活动一",position:"操场", time:"2023-10-18", description: "...", status: ""},
			{id:8, project_name:"活动二",position:"主楼", time:"2023-10-21", description: "...", status: ""},
		]
		}
	},
	methods: {
		viewProject(id) {
			this.$router.push({
				path: '/project/' + id
			})
		},
		checkPass(id) {
			this.axios({
				method: 'post',
				url: '',
				data: id
			})
		},
		checkFail(id) {
			this.axios({
				method: 'post',
				url: '',
				data: id
			})
		}
	}
}
</script>

<style scoped>
	.el-card {
		width: 100%;
	}
	.list {
		margin-right: 120px;
	}
	.team_table {
		margin-top: 20px;
		margin-left: 120px;
		margin-right: 120px;
	}
</style>