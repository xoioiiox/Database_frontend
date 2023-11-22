<template>
    <div>
        <div class="head">
            <router-link :to="'/login'" style="text-decoration: none;">
                <h1>Home</h1>
            </router-link>
        </div>
        <div class="registerCard">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
                <el-form-item label="用户名" prop="name">
                    <el-col >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
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
            name: '',
            pass: '',
            checkPass: '',
            phone_num: ''
          },
          rules: {
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
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
            name: this.form.name,
            pass: this.form.pass,
            phone_num: this.form.phone_num
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios({
                methods: 'post',
                url: '/manager_register/',
                data: data
              }).then((res) => {
                console.log(res.data); //调试
                if (res.data.value === 200) {
                  let msg = this.$message({
                    type: 'success',
                    message: "创建成功"
                  });
                  setTimeout(()=> {
                    msg.close();
                  },1000);
                  this.$router.push({
                    path: '/login/'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: "用户名已被注册"
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