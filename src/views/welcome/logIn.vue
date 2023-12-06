<template>
    <div id="building">
        <div class="head">
            <router-link :to="'/login'" style="text-decoration: none;">
                <h1>Home</h1>
            </router-link>
        </div>
        <div class="content-container">
          <div class="left-content">
            <!-- 在这里添加你想要的文字 -->
            <p>欢迎来到</p>
            <p>北航志愿实践星</p>
            <p>请先登录。</p>
            <div class="small-text">
              <p>没有账号？</p>
              <router-link :to="'/register/'" class="small-text" style="text-decoration: none;">
                <p> 点此立即注册✔️</p>
            </router-link>
            </div>
          </div>
          <div class="login-box">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix" style="text-align: center;">
                <!-- <span class="login-title">🔐北航志愿实践星</span> -->
                <img style="width: 60px; height: 60px; padding: 20px" src="@/assets/images/1.png" alt="logo" class="image">
              </div>
              <el-form :model="form" status-icon :rules="rules" ref="form" label-width="0px" class="demo-form">
                  <el-form-item label="" prop="id">
                    <el-input v-model="form.id" autocomplete="off" placeholder="学工号" class="input"></el-input>
                  </el-form-item>
                  <el-form-item label="" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码" class="input"></el-input>
                  </el-form-item>
                  <el-form-item label="" prop="role">
                    <el-select v-model="form.role" placeholder="请选择身份" class="input">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>  
                  </el-form-item>
                  <div style="text-align: center">
                    <el-form-item class="btns">
                        <el-button class="log-btn" type="primary" @click="submitForm('form')" round>登录</el-button>
                        <router-link :to="'/register/'" class="button1" style="text-decoration:none">
                            <el-button class="reg-btn" round>注册</el-button>
                        </router-link>
                    </el-form-item>
                  </div>
              </el-form>
              <!-- 以下是动画部分 -->
                  <!-- <div>
                    <lottie
                      :options="heartOptions"
                      :height="100"
                      :width="100"
                      v-on:animCreated="heartAnimation"
                    />
                  </div>
                  <div @click="next()">
                    <el-button>注册</el-button>
                  </div> -->
            </el-card>
          </div>
        </div>
    </div>
</template>
    
<script>
  // import lottie from "../../components/lottie.vue";
  import loginSuccess from "@/assets/json/cheers.json";
    export default {
      // eslint-disable-next-line vue/multi-word-component-names
      name: "",
      components: {
        // lottie,
      },
      data() {
        return { 
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
          form: {
            role: '',
            password: '',
            id: ''
          },
          rules: {
            id: [
              { required: true, message: '请输入学工号', trigger: 'blur' },
            ],
            password : [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            role: [
              { required: true, message: '请选择身份', trigger: 'blur' },
            ]
          },
          heartOptions: {
            animationData: loginSuccess,
            loop: false,
            autoplay: false,
          },
          heartanim: null,
          Direction: -1,
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate(async (valid) => {
            valid = true;
            if (valid) {
              await this.axios({
                method: 'post',
                credentials: 'include',
                url: 'http://localhost:8000/buaa_db/login/',
                headers: {'Content-Type': 'multipart/form-data'},
                data: {
                  id : this.form.id,
                  password : this.form.password,
                  role: this.form.role
                },
                timeout: 1000
              }).then(async (res)=>{
                if (res.data.status === 200) {
                  let msg = this.$message({
                    type: 'success',
                    message: "登录成功"
                  });
                  setTimeout(()=> {
                    msg.close();
                  },1000);
                  if (this.form.role == 0) {
                    this.$router.push({path: '/home/'})
                  }
                  else if (this.form.role == 1) {
                    this.$router.push({path:'/ManageTeam/'})
                  }
                  else {
                    this.$router.push({path:'/CheckCreateProjectApply/'})
                  }
                } else if (res.data.status == 300) {
                  this.$message({
                    type: 'error',
                    message: "密码错误"
                  });
                } else if (res.data.status == 400) {
                  this.$message({
                    type: 'error',
                    message: "账号未注册"
                  });
                } else if (res.data.status == 500) {
                  this.$message({
                    type: 'error',
                    message: "非POST请求"
                  });
                }
              })
            } else {
              console.log('error!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        heartAnimation: function (anim) {
          this.heartanim = anim;
          if (this.Direction == -1) {
            this.heartanim.goToAndStop(64, true);
          }
        },
        next() {
          if (this.Direction > 0) {
            this.Direction = -1;
            this.heartanim.setDirection(this.Direction);
            this.heartanim.play();
            console.log(1);
          } else {
            this.Direction = 1;
            this.heartanim.setDirection(this.Direction);
            this.heartanim.play();
            console.log(2);
          }
        },
      }
    }
</script>

<style scoped>
    #building{
      background:url("@/assets/images/bg4.png");
      background-size: cover;
      width:100%;
      height:100%;
      position:fixed;
      background-position: center center;
    }
    .head {
        margin-left: 100px;
    }
    .login-box {
        /* height: 500px; */
        widows: 400px;
        display:flex;
        justify-content:center;
        align-items: center;
        content: "";
    }
    .box-card {
      border: none;
      background-color: rgba(255,255,255,0.6);
      border-radius: 20px;
      width: 400px;

      /* background: #e9ecef; */
        /* color: #333; */
      box-shadow:
          7px 7px 12px rgba(0, 0, 0, .4),
          -3px -3px 12px rgba(255, 254, 244, 0.9);
    }
    .card {
        height: 700px;
        display:flex;
        justify-content:center;
        align-items: center;
    }
    .button1 {
        margin-left: 30px;
    }
    .content-container {
      display: flex;  /* 使用 flexbox 布局 */
    }
    .left-content {
      width: 700px;
      font-size: 80px;
      padding-left: 80px;
      font-family: 'Times New Roman';
      color: #ffffff;
      font-weight:bolder;
      text-align: left;
      vertical-align: top;  /* 让文字从最顶部开始显示 */
      line-height: 30%;  /* 调整行高，使文字垂直居中 */
      /* text-shadow: 5px 5px 5px #ababab; */
    }
    .small-text {
      font-size: 40px;
      color: white;
    }
    .log-btn {
      border: none;
      font-weight: bolder;
      background-color: #529ffc;
    }
    .reg-btn {
      border: none;
      font-weight: bolder;
      color: #529ffc;
    }
    .el-form {
      align-items: center;
      padding-left: 50px;
      padding-right: 50px;
    }
    /deep/ .el-input__inner {
      background-color: white !important;
      border: none;
      border-radius: 20px;
    }
    .selected {
      color: #00D4FF;
    }
    .btns {
      align-content: center;
    }
    .router-link-active {
      color: white;
    }
    .image {
      align-content: center;
    }
    
    
</style>