<template>
  <div>
    <div>
      <homeHeader></homeHeader>
    </div>
    <el-col span="15">
      <div class="content1">
        <el-descriptions title="项目信息" column="1">
          <el-descriptions-item label="项目名称">{{project_name}}</el-descriptions-item>
          <el-descriptions-item label="项目时间">{{time}}</el-descriptions-item>
          <el-descriptions-item label="项目地点">{{place}}</el-descriptions-item>
          <el-descriptions-item label="项目描述">{{profile}}</el-descriptions-item>
        </el-descriptions>
        <div>
          <el-divider></el-divider>
          <!--添加讨论-->
          <div>
            <!--el-col span="2">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-col-->
            <el-col span="20">
              <el-input v-model="input" placeholder="留下你的评论吧..." ></el-input>
            </el-col>
            <el-col span="2" offset="1">
              <el-button type="primary" @click="submit_discussion()">提交</el-button>
            </el-col>
          </div>
          <!--讨论列表-->
          <el-table :data="discussions" border :show-header=false class="commentTable">
            <el-table-column>
              <template slot-scope="scope">
                <projectComment :content="scope.row"></projectComment>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col span="9">
      <el-card class="sideContent" shadow="never" v-show="this.isManager">
      <div class="member-table">
        <div class="table_head">成员信息</div>
        <el-table :data="students" border size="small">
          <el-table-column prop="name" label="姓名" width="80" sortable></el-table-column>
          <!--el-table-column prop="type" label="身份" width="100" sortable>
            <template slot-scope="scope">
              <el-tag :type="getType(scope.row.type)">{{scope.row.type}}</el-tag>
            </template>
          </el-table-column-->
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="preview(scope.row)" type="text">详情</el-button>
              <el-button @click="preview(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="Feedback" width="100">
            <template slot-scope="scope">
              <!--el-button @click="preview(scope.row)" type="text">查看</el-button-->
              <el-button @click="getFeedbackList(scope.row)" type="text">下载</el-button>
              
              </template>
          </el-table-column>
        </el-table>
      </div>
      </el-card>
    </el-col>
    <div>
      <el-dialog :visible.sync="feedbackVisible">
        <el-table :data="this.feedbacks">
          <el-table-column prop="id" label="文件id"></el-table-column>
          <el-table-column prop="profile" label="描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="download(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import homeHeader from "@/components/homeHeader"
  import projectComment from "@/components/projectComment" //todo
  export default {
    components: {homeHeader, projectComment},
    async created(){
      let id = this.$route.params.id
      await this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/get_project_profile/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: {
          'project_id': id //project_id
        }
      }).then((res) => {
        /*项目基本信息*/
        this.project_name = res.data.name
        this.time = res.data.time
        this.place = res.data.place
        this.profile = res.data.profile
        this.state = res.data.state //项目状态
        this.check = res.data.check //审核是否通过
        this.private = res.data.private
        this.team_name = res.data.team_name
        this.tags = res.data.tags
        this.students = res.data.students
        this.managers = res.data.managers
        //还需要获取角色权限
        this.role = res.data.role
      })
      await this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/get_discussion/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: {
          'project_id': this.$route.params.id
        }
      }).then((res)=>{
        console.log(res)
        this.discussions = res.data.discussions
      })
    },
    data() {
      return {
        isManager: true,
        project_name: '',
        time: '',
        place: '',
        profile: '',
        state: '',
        check: '',
        private: '',
        team_name: '',
        tags: [],
        students: [],
        managers: [],
        input: '',
        discussions: [
          {id: '1', student_id: '123', student_name: '张三', time:'2023-11-21', text: '我有一个问题'},
          {id: '2', student_id: '456', student_name: '李四', time:'2023-11-22', text: '我也有一个问题'},
          {id: '3', student_id: '789', student_name: '王五', time:'2023-11-23', text: 'I have a question'},
        ],
        feedbacks: [],
        feedbackVisible: false,
        file_profile: {}
      }
    },
    methods: {
      submit_discussion() {
        let data = {
          project_id: this.$route.params.id,
          profile: this.input,
          type: '',
          title: this.input,
        }
        console.log(data)
        this.axios({
          method: 'post',
          url: 'http://localhost:8000/buaa_db/create_discussion/',
          headers: {'Content-Type': 'multipart/form-data'},
          data: data
        }).then((res)=>{
          if (res.data.status == 200) {
            this.$message({
              type: 'success',
              message: '创建讨论成功'
            })
          }
        })
      },
      getFeedbackList() {
        this.axios({
          method: 'post',
          url: 'http://localhost:8000/buaa_db/man_get_project_feedback/',
          headers: {'Content-Type': 'multipart/form-data'},
          data: {
            'project_id': this.$route.params.id,
          }
        }).then((res)=>{
          console.log(res)
          this.feedbacks = res.data.feedbacks
        })
        this.feedbackVisible = true
      },
      download(feedback_id) {
        this.axios({
          method: 'post',
          url: 'http://localhost:8000/buaa_db/get_feedback_profile/',
          headers: {'Content-Type': 'multipart/form-data'},
          data: {
            'feedback_id': feedback_id
          }
        }).then((res)=>{
          console.log(res)
          this.file_profile = res.data.file_profile[0]
        })
        window.open(this.file_profile['url'])
      },
    }
  }
</script>

<style scoped>
  .commentTable {
    margin-top: 80px;
  }
  .content1 {
    margin-left: 120px;
    margin-top: 20px;
  }
  .sideContent {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 120px;
  }
  .table_head {
    margin-bottom: 10px;
    font-weight: bolder;
  }
</style>