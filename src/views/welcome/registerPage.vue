<template>
    <div id="building">
        <div class="head">
            <router-link :to="'/login'" style="text-decoration: none;">
                <h1>Home</h1>
            </router-link>
        </div>
        <div class="registerCard">
          <div class="container">
            <div class="left-content">
              <!-- 在这里添加你想要的文字 -->
              <p>我们致力于</p>
              <p>为个体和志愿项目</p>
              <p>提供交流平台</p>
              <div class="small-text">
                <p>当前有xx名用户在线</p>
                <router-link :to="'/login/'" class="small-text" style="text-decoration: none;">
                  <p> 点此立即登录✔️</p>
              </router-link>
              </div>
            </div>
            <el-card class="box-card" shadow="never">
              <div style="text-align: center">
                <img style="width: 60px; height: 60px; padding: 10px" src="@/assets/images/3.png" alt="logo" class="image">
              </div>
              <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="register-form">
                  <el-form-item label="" prop="id">
                      <el-col >
                          <el-input v-model="form.id" autocomplete="off" placeholder="学工号"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="" prop="name">
                      <el-col >
                          <el-input v-model="form.name" autocomplete="off" placeholder="用户名"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="" prop="role">
                      <el-select v-model="form.role" placeholder="请选择身份">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>  
                    </el-form-item>
                  <el-form-item label="" prop="password">
                      <el-col>
                          <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="" prop="password_again">
                      <el-col>
                          <el-input type="password" v-model="form.password_again" autocomplete="off" placeholder="确认密码"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item>
                    <div class="btns">
                      <el-button type="primary" @click="submitForm('form')" round class="sub-btn">提交</el-button>
                      <el-button @click="resetForm('form')" round class="rst-btn">重置</el-button>
                    </div>
                  </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
    </div>
    
</template>

<script>
    export default {
      data() {
        /*var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.form.checkPass !== '') {
              this.$refs.form.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };*/
        return {
          form: {
            id: '',
            password: '',
            password_again: '',
            role: '',
            name: ''
          },
          options: [
            {
              value: '0',
              label: '普通用户'
            }, {
              value: '1',
              label: '志愿管理员'
            }, {
              value: '2',
              label: '系统管理员'
            }
          ],
          rules: {
            id: [
                { required: true, message: '请输入学工号', trigger: 'blur' },
            ],
            role: [
                { required: true, message: '请选择注册身份', trigger: 'blur' },
            ],
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                //{ required: true, validator: validatePass, trigger: 'blur' }
            ],
            password_again: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                //{ required: true, validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          let data = {
            id: this.form.id,
            name: this.form.name,
            password: this.form.password,
            password_again: this.form.password_again,
            role: this.form.role,
          }
          console.log(data);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios({
                method: 'post',
                url: 'http://localhost:8000/buaa_db/register/',
                headers: {'Content-Type': 'multipart/form-data'},
                data: data
              }).then((res) => {
                console.log("1"); //调试
                if (res.data.status === 200) {
                  this.$message({
                    type: 'success',
                    message: "创建成功"
                  });
                  this.$router.push({path: '/login/'}) // check
                } else if (res.data.status == 401) {
                  this.$message({
                    type: 'error',
                    message: "无注册权限，学工号不合法"
                  });
                } else if (res.data.status == 402) {
                  this.$message({
                    type: 'error',
                    message: "学号已被注册"
                  });
                } else if (res.data.status == 404) {
                  this.$message({
                    type: 'error',
                    message: "两次密码不一致"
                  });
                } else if (res.data.status == 500) {
                  this.$message({
                    type: 'error',
                    message: "非POST请求"
                  });
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  #building{
      background:url("@/assets/images/bg7.png");
      background-size: cover;
      width:100%;
      height:100%;
      position:fixed;
      background-position: center center;
    }
    .container {
      display: flex;
    }
    .box-card {
      border: none;
      background-color: rgba(255,255,255,0.6);
      border-radius: 20px;
      width: 400px;

      box-shadow:
          7px 7px 12px rgba(0, 0, 0, .4),
          -3px -3px 12px rgba(255, 254, 244, 0.9);
    }
    .register-form {
      margin: 20px 20px 20px 0px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .head {
        margin-left: 100px;
    }
    .registerCard {
        height: 550px;
        display:flex;
        justify-content:center;
        align-items: center;
    }
    .left-content {
      width: 700px;
      font-size: 80px;
      padding-left: 0px;
      font-family: 'Times New Roman';
      color: #ffffff;
      font-weight:bolder;
      text-align: left;
      vertical-align: top;  /* 让文字从最顶部开始显示 */
      line-height: 30%;  /* 调整行高，使文字垂直居中 */
    }
    .small-text {
      font-size: 40px;
      color: white;
    }
    .sub-btn {
      border: none;
      font-weight: bolder;
      background-color: #529ffc;
    }
    .rst-btn {
      border: none;
      font-weight: bolder;
      color: #529ffc;
    }
    /deep/ .el-input__inner {
      background-color: white !important;
      border: none;
      border-radius: 20px;
    }
    .router-link-active {
      color: white;
    }
    .image {
      text-align: center;
    }
    .btns {
      align-content: center;
    }
</style>