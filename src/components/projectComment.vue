<template>
  <div>
    <el-col span="2">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </el-col>
    <el-col span="20">
      <div>
        <el-row>
          <el-col span="8">
            <span style="font-weight: bolder;" @click="viewMemberInfo(content.author_id)">{{this.content.author_name}}  </span>
            <span>{{this.content.time}}</span>
          </el-col>
          <el-col span="8">
            <!--这里不能加this-->
            <el-button type="text" class="el-button-text" 
            @click="replyMainVisible=!replyMainVisible">回复</el-button>
            <el-button type="text" class="el-button-text" 
            @click="deleteMainVisible=true" v-show="checkVisible(this.content.author_id)">删除</el-button>
            <el-button type="text" class="el-button-text" 
            @click="getReplies(content.id)">展开回复</el-button>
            <!--el-dialog width="30%" title="删除确认" :visible.sync="deleteMainVisible" append-to-body>
              <span>您确认要删除该评论吗</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteMainVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deleteProjectMember(this.content.comment_id)">确 定</el-button>
              </span>
            </el-dialog-->
          </el-col>
        </el-row>
        <el-row>
          <div>{{this.content.title}}</div>
        </el-row>
        <!--对于讨论回复-->
        <el-row v-show="replyMainVisible">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_text" maxlength="100"></el-input>
          <el-button type="primary" class="submit_button" size="small" @click="submitReplytoDiscussion(content.id, content.author_id)">提交</el-button>
        </el-row>
        <!--回复列表-->
        <div v-for="(item, index) in this.replies" :key="index" v-show="repliesVisible">
          <el-row>
            <el-col span="2">
              <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
            </el-col>
            <el-col span="20">
              <div>
                <el-row>
                  <el-col span="13">
                    <span style="font-weight:bolder" @click="viewMemberInfo(item.from_id)">{{item.from_name}}</span>
                    <span> 回复 </span>
                    <span style="font-weight:bolder" @click="viewMemberInfo(item.to_id)">{{item.to_name}} </span>
                    <span>{{item.post_time}}</span>
                  </el-col>
                  <el-col span="4">
                    <el-button type="text" class="el-button-text" 
                    @click="item.visible=!item.visible">回复</el-button>
                    <el-button type="text" class="el-button-text"
                     @click="item.deleteMainVisible=true" v-show="checkVisible()">删除</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <div>{{item.text}}</div>
                </el-row>
                <el-row v-show="item.visible">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_text" maxlength="100"></el-input>
                  <el-button type="primary" class="submit_button" size="small" @click="submitReplytoReply(item.from_id)">提交</el-button>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-dialog title="成员信息" :visible.sync="otherInfoVisible">
          <el-descriptions>
            <el-descriptions-item label="学号">{{username}}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{name}}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{real_name}}</el-descriptions-item>
            <el-descriptions-item label="电话号码">{{phone_id}}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{id_number}}</el-descriptions-item>
            <el-descriptions-item label="微信号">{{wx_id}}</el-descriptions-item>
            <el-descriptions-item label="学院">{{faculty_id}}</el-descriptions-item>
          </el-descriptions>
        </el-dialog>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'projectComment',
  props: ['content'],
  data() {
    return {
      name: '',
      username: '',
      real_name: '',
      phone_id: '',
      wx_id: '',
      id_number: '',
      faculty_id: '',
      replies: [
        {student_id: '123', student_name: 'Viola', reply_to_name: 'Xoioiiox',time: '2023-11-24', text: '这是一个很好的问题'}
      ],
      replyMainVisible: false,
      deleteMainVisible: false,
      repliesVisible: false,
      reply_text: '',
      curDiscussionId: '',
      otherInfoVisible: false
    }
  },
  methods: {
    getReplies(discussion_id) {
      this.axios({
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        url: 'http://localhost:8000/buaa_db/get_discussion_replies/',
        data: {'discussion_id': discussion_id},
      }).then((res)=>{
        console.log(res)
        this.replies = res.data.messages
      })
      this.repliesVisible = !this.repliesVisible
      this.curDiscussionId = discussion_id
    },
    checkVisible(id) { //todo
      id
      return true
    },
    submitReplytoDiscussion(discussion_id, author_id) { // 发布回复
      let data = {
        receiver_id: author_id,
        discussion_id: discussion_id,
        text: this.reply_text,
        images: '',
        files: ''
      }
      console.log(data)
      this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/pub_message/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data
      }).then((res)=>{
        if (res.data.status == 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
        }
        else {
          this.$message.error('评论失败')
        }
      })
      this.reply_text = '';
    },
    submitReplytoReply(receiver_id) {
      let data = {
        receiver_id: receiver_id,
        discussion_id: this.curDiscussionId,
        text: this.reply_text,
        images: '',
        files: ''
      }
      this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/pub_message/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data
      }).then((res)=>{
        if (res.data.status == 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: '发布成功',
            type: 'error'
          })
        }
      })
      this.reply_text = '';
    },
    viewMemberInfo(id) {
      console.log(id)
      this.axios({
        method: 'post',
        url: 'http://localhost:8000/buaa_db/get_other_profile/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: {'username': id}
      }).then((res)=>{
        this.name = res.data.name,
        this.username = res.data.username,
        this.real_name = res.data.real_name,
        this.phone_id = res.data.phone_id,
        this.wx_id = res.data.wx_id,
        this.id_number = res.data.id_number,
        this.faculty_id = res.data.faculty_id
      })
      this.otherInfoVisible = true
    }
  }
}
</script>

<style scoped>
  .el-button-text {
    padding: 0;
  }
  .el-row {
    margin-bottom: 6px;
    margin-top: 6px;
  }
  .mainReply {
    width: 60%;
  }
  .submit_button {
    float: right;
    margin-top: 10px;
  }
</style>