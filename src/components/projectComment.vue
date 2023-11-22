<template>
  <div>
    <el-col span="2">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </el-col>
    <el-col span="20">
      <div>
        <el-row>
          <el-col span="5">{{this.content.name}} {{this.content.time}}</el-col>
          <el-col span="4">
            <!--这里不能加this-->
            <el-button type="text" @click="replyMainVisible=!replyMainVisible" class="el-button-text">回复</el-button>
            <el-button type="text" @click="deleteMainVisible=true" class="el-button-text" v-show="checkVisible(this.content.student_id)">删除</el-button>
            <el-dialog width="30%" title="删除确认" :visible.sync="deleteMainVisible" append-to-body>
              <span>您确认要删除该项目吗</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteMainVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deleteProjectMember(this.content.comment_id)">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <div>{{this.content.text}}</div>
        </el-row>
        <el-row v-show="replyMainVisible">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_text" maxlength="100"></el-input>
          <el-button type="primary" class="submit_button" size="small" @click="submitMainReply()">提交</el-button>
        </el-row>
        <!--回复列表-->
        <div v-for="(item, index) in this.content.replies" :key="index">
          <el-row>
            <el-col span="2">
              <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
            </el-col>
            <el-col span="20">
              <div>
                <el-row>
                  <el-col span="8">{{item.name}} 回复 {{item.reply_object_name}} {{item.time}}</el-col>
                  <el-col span="4">
                    <el-button type="text" class="el-button-text" 
                    @click="item.replySubVisible=!item.replySubVisible">回复</el-button>
                    <el-button type="text" class="el-button-text"
                     @click="item.deleteMainVisible=true" v-show="checkVisible()">删除</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <div>{{item.text}}</div>
                </el-row>
                <el-row v-show="item.replySubVisible">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reply_text" maxlength="100"></el-input>
                  <el-button type="primary" class="submit_button" size="small" @click="submitSubReply(item.name)">提交</el-button>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
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
      replyMainVisible: false,
      deleteMainVisible: false,
      reply_text: ''
    }
  },
  methods: {
    checkVisible(id) {
      console.log(id);
      this.axios({
        methods: 'get',
        url: '',
      }).then((res)=>{
        if (id == res.data.id) {
          return true;
        }
        else {
          return false;
        }
      })
    },
    deleteProjectMember(id) {
      this.axios({
        methods: 'post',
        url: '',
        data: id
      }).then((res)=>{
        if (res.data.status == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        else {
          this.$message.error('删除失败')
        }
      })
    },
    submitMainReply() {
      var date = new Date();
      var dateArr = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      ];
      var strDate = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2] + " " + dateArr[3] + ":" + dateArr[4];
      console.log(strDate);
      let data = {
        text : this.reply_text,
        desName: this.content.name, // 判断传送内容
        time: strDate
      }
      this.axios({
        methods: 'post',
        url: '',
        data: data
      }).then((res)=>{
        if (res.data.statue == 200) {
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
    submitSubReply(subName) {
      var date = new Date();
      var dateArr = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      ];
      var strDate = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2] + " " + dateArr[3] + ":" + dateArr[4];
      console.log(strDate);
      let data = {
        text: this.reply_text,
        mainName: this.content.name,
        subName: subName,
        time: strDate
      }
      this.axios({
        methods: 'post',
        url: '',
        data: data
      }).then((res)=>{
        if (res.data.statue == 200) {
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