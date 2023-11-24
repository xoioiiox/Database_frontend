<template>
	<div>
		<sysManagerHomeHeader></sysManagerHomeHeader>
		<div class="apply-list">
			<el-table :data="teams" border height="600px">
				<el-table-column prop="name" label="团队名称" width="300px"></el-table-column>
				<el-table-column prop="time" label="申请时间" width="250px"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="viewTeam(scope.row.id)">查看详情</el-button>
						<el-button type="text" @click="passApply(scope.row.id)">通过申请</el-button>
						<el-button type="text" @click="failApply(scope.row.id)">拒绝申请</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import sysManagerHomeHeader from "@/components/sysManagerHomeHeader/"
export default {
	components: {sysManagerHomeHeader},
	async create() {
		await this.axios({
			method: 'get',
			url: 'http://localhost:8000/buaa_db/admin_get_apply_team/'
		}).then((res)=>{
			this.teams = res.data.teams;
		})
	},
	data() {
		return {
			teams : [
				{id:1, name:"团体一", time:"2023-10-18"},
				{id:2, name:"团体二", time:"2023-10-21"},
				{id:3, name:"团体一", time:"2023-10-18"},
				{id:4, name:"团体二", time:"2023-10-21"},
				{id:5, name:"团体一", time:"2023-10-18"},
				{id:6, name:"团体二", time:"2023-10-21"},
				{id:7, name:"团体一", time:"2023-10-18"},
				{id:8, name:"团体二", time:"2023-10-21"},
			]
		}
	},
	methods: {
		viewTeam(id) {
			this.$router.push({
				path: '/team/' + id
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
	.apply-list {
		margin: 20px 120px 0 120px;
	}
</style>