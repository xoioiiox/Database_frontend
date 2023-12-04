<template>
  <div>
    <managerHomeHeader></managerHomeHeader>
    <div class="list">
			<el-table :data="this.projects" border :default-sort = "{prop: 'name', order: 'descending'}">
				<el-table-column sortable prop="name" label="项目名称"></el-table-column>
				<el-table-column sortable prop="place" label="地点"></el-table-column>
				<el-table-column sortable prop="time" label="时间"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-tag :type="getType(scope.row.isCheck)">{{getStatus(scope.row.isCheck)}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button @click="viewProject(scope.row.id)" type="text">查看项目</el-button>
						<el-button @click="deleteProject(scope.row.id)" type="text">删除项目</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
  </div>
</template>

<script>
import managerHomeHeader from "@/components/managerHomeHeader/"
export default {
  components: {managerHomeHeader},
  async created() {
    await this.axios({
      method: 'post',
      url: 'http://localhost:8000/buaa_db/get_manage_projects/',
      headers: {'Content-Type': 'multipart/form-data'},
    }).then((res)=>{
      this.projects = res.data.projects;
    })
  },
  data() {
    return {
      projects : [],
    }
  },
  methods: {
		getType(status) {
			if (status == '1') {
				return 'warning'
			}
			else {
				return 'success'
			}
		},
		getStatus(status) {
			if (status == '1') {
				return '审核中'
			}
			else {
				return '审核通过'
			}
		},
		viewProject(project_id) {
			this.$router.push('/project/' + project_id)
		},
		deleteProject(project_id) {
      this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/man_delete_project/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: {
          'project_id': project_id
        }
      }).then((res)=>{
        if (res.data.status == 200) {
          this.$message({
            type: 'success',
            message: '删除项目成功'
          })
        }
        else {
          this.$message.error('删除项目失败')
        }
      })
    },
  }
}
</script>

<style scoped>
	.list {
		margin-left: 150px;
		margin-right: 150px;
		margin-top: 20px;
	}
</style>