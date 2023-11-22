<template>
    <div>
        <div class="head">
            <router-link :to="'/login'" style="text-decoration: none;">
                <h1>Home</h1>
            </router-link>
        </div>
        <div class="registerCard">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
                <el-form-item label="学号" prop="student_id">
                    <el-col >
                        <el-input v-model="form.student_id" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                    <el-col>
                        <el-input v-model="form.nick_name" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="真实姓名" prop="real_name">
                  <el-col>
                      <el-input v-model="form.real_name" autocomplete="off"></el-input>
                  </el-col>
              </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-col>
                        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-col>
                        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号" prop="phone_num">
                    <el-col >
                        <el-input v-model="form.phone_num" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号" prop="id_card_num">
                    <el-col>
                        <el-input v-model="form.id_card_num" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat_num">
                    <el-col>
                        <el-input v-model="form.wechat_num" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学院" prop="college">
                    <el-col>
                        <el-input v-model="form.college" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    export default {
      data() {
        var validatePass = (rule, value, callback) => {
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
        };
        return {
          form: {
            student_id: '',
            real_name: '',
            nick_name: '',
            pass: '',
            checkPass: '',
            phone_num: '',
            id_card_num: '',
            wechat_num: '',
            college: ''
          },
          rules: {
            student_id: [
                { required: true, message: '请输入学工号', trigger: 'blur' },
            ],
            real_name: [
                { required: true, message: '请输入真实姓名', trigger: 'blur' },
            ],
            nick_name: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
            ],
            pass: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { required: true, validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          let data = {
            student_id: this.form.student_id,
            realname: this.form.realname,
            nickname: this.form.nickname,
            pass: this.form.pass,
            phone_num: this.form.phone_num,
            wechat_num: this.form.wechat_num,
            id_card_num: this.form.id_card_num,
            college: this.form.college
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios({
                methods: 'post',
                url: '/normal_register/',
                data: data
              }).then((res) => {
                console.log(res.data); //调试
                if (res.data.status === 200) {
                  let msg = this.$message({
                    type: 'success',
                    message: "创建成功"
                  });
                  setTimeout(()=> {
                    msg.close();
                  },1000);
                  this.$router.push({path: '/login/'})
                } else {
                  this.$message({
                    type: 'error',
                    message: "学号已被注册"
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

<style>
    .head {
        margin-left: 100px;
    }
    .registerCard {
        height: 400px;
        display:flex;
        justify-content:center;
    }
</style>