<template>
  <div>
    <div>
      <homeHeader v-show="isNormal()"></homeHeader>
      <managerHomeHeader v-show="isManager()"></managerHomeHeader>
      <sysManagerHomeHeader v-show="isSys()"></sysManagerHomeHeader>
    </div>
    <div >
      <el-card class="message_card">
        <el-row>
          <el-col span="4">
            <!--div>{{this.$route.query.role}}</div-->
            <div class="card_title">消息中心</div>
          </el-col>
          <el-col span="2" offset="17">
            <el-button type="text" icon="el-icon-edit-outline" @click="toWriteMessage()">
              写通知
            </el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="card_content">
          <el-col span="6">
            <el-table
            :data="senders" height="500px" :show-header="false"
            highlight-current-row @current-change="handleCurrentChange">
              <el-table-column>
                <template slot-scope="scope">
                  <el-col span="6">
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                  </el-col>
                  <el-col span="16" @click="getNotices(scope.row.type, scope.row.id)">{{scope.row.name}}</el-col>
                  <el-col span="1">
                    <el-badge :is-dot="getIsHot(scope.row.hasUnRead)" class="item"></el-badge>
                  </el-col>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col span="1"><el-divider direction="vertical"></el-divider></el-col>
          <!--聊天框（越往上是越新的消息）-->
          <el-col span="17" class="custom-scrollbar">
            <div v-for="(item, index) in this.notices" :key="index">
              <el-card class="chat-card">
                <div class="chat-text">{{item.text}}</div>
                <div class="chat-time">{{item.time}}</div>
              </el-card>
            </div>
          </el-col>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import homeHeader from "@/components/homeHeader";
  import managerHomeHeader from "@/components/managerHomeHeader";
  import sysManagerHomeHeader from "@/components/sysManagerHomeHeader";
  export default {
    components: {homeHeader, managerHomeHeader, sysManagerHomeHeader},
    data() {
      return {
        role: '',
        senders: [
          {id: '1', type: '0', name: 'xxx志愿服务团队'},
          {id: '2', type: '0', name: 'xxx学院志愿团队'},
          {id: '3', type: '1', name: 'xxx志愿项目'},
        ],
        notices: [
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
          {time: '2023-11-24', text: 'This is a notice... Have a good day~'},
        ]
      }
    },
    async created() {
      this.role = this.$route.query.role; // 获取不到？？
      await this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/get_receive_notice_list/',
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res)=>{
        this.senders = res.data.senders;
      })
    },
    methods: {
      isNormal() {
        console.log(this.$route.query.role);
        if (this.$route.query.role === "normal_user") {
          return true;
        }
        else {
          return false;
        }
      },
      isManager() {
        if (this.$route.query.role === 'manager') {
          return true;
        }
        return false
      },
      isSys() {
        if (this.$route.query.role === 'sysManager') {
          return true;
        }
        return false
      },
      getIsHot(type) {
        if (type == 'false') {
          return false;
        }
        else {
          return true;
        }
      },
      getType(has_read) {
        if (has_read=="true") return '已读';
        else return '未读';
      },
      getColor(has_read) {
        if (has_read=="true") return '';
        else return 'primary';
      },
      readMessage(item) { //todo
        item.has_read="true"
        let data = {
          "id": item.id,
          "has_read": item.has_read
        }
        console.log(data)
        this.axios({
          method: 'post',
          url: '/check_message/',
          data: data
        })
      },
      handleCurrentChange(val) {
        val;
      },
      toWriteMessage() {
        this.$router.push({path: '/new_message/', query:{role:this.$route.query.role}});
      },
      getNotices(type, id) {
        this.axios({
          method: 'post',
          url: 'http://localhost:8000/buaa_db/get_receive_notice/',
          headers: {'Content-Type': 'multipart/form-data'},
          data: {
            'type': type,
            'id': id
          }
        }).then((res)=>{
          this.notices = res.data.notices
        })
      }
    }
  }
</script>

<style scoped>
  .message_card {
    margin-top: 15px;
    margin-left: 200px;
    margin-right: 200px;
    height: 620px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin-bottom: 20px;
  }
  .card_title {
    margin-left: 30px;
    margin-top: 8px;
    font-size: large;
  }
  .card_content {
    height: 500px;
  }
  .el-divider--horizontal{
    margin: 10px;
  }
  .el-divider--vertical{
    display:inline-block;
    width:1px;
    height:500px;
    margin:0 8px;
    vertical-align:middle;
    position:relative;
  }
  .el-badge {
    margin-bottom: 0;
    padding: 0;
  }
  .chat-card {
    margin-bottom: 20px;
    margin-right: 100px;
    border-radius: 10px;  
  }
  .chat-text {
    color:rgba(0, 0, 0, 0.813);
  }
  .chat-time {
    margin-top: 10px;
    margin-bottom: 10px;
    float: right;
    font-size: small;
    color: darkgrey;
  }
  /*聊天框滚动条*/
  .custom-scrollbar {
    width: 700px; /* 定义容器的宽度 */
    height: 500px; /* 定义容器的高度 */
    overflow-y: auto; /* 启用垂直滚动条 */
    overflow-x: hidden; /* 禁用水平滚动条 */
  }

  /* 自定义滚动条样式 */
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
</style>