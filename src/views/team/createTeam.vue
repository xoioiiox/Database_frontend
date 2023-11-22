<template>
    <div>
      <div>
        <homeHeader></homeHeader>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="团体名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="团体描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import homeHeader from "@/components/homeHeader";
    export default {
      components: {homeHeader},
      data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                desc: ''
            },
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        };
      },
      methods: {
        onSubmit() {
          let data = {
            name: this.form.name,
            region: this.form.region,
            date1: this.form.date1,
            date2: this.form.date2,
            desc: this.form.desc
          }
          console.log(data);
          this.axios({
            methods: 'post',
            url: '/createTeam/',
            data: data
          }).then((res) => {
            console.log(res.data);
            if (res.data.value === 0) { //后端传回数据
              let msg = this.$message({
                type: 'success',
                message: "创建成功"
              });
              setTimeout(()=> {
                msg.close();
              },1000);
              this.$router.push({
                path: '/home'
              })
            } else {
              this.$message({
                type: 'error',
                message: this.data.reason
              });
            }
          })
        },

        handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
  
        showInput() {
          this.inputVisible = true;
          // eslint-disable-next-line
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
  
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },

        back() {
          this.$router.push({
            path: '/home'
          })
        }
      }
    }
  </script>

<style>
  .content {
    margin-left: 120px;
    margin-right: 500px;
    margin-top: 20px;
  }
  .center {
      text-align: center;
  }
  .el-tag + .el-tag {
      margin-left: 10px;
  }
  .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
  }
  .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
  }
</style>