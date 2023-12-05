<template>
    <div>
      <div>
        <managerHomeHeader></managerHomeHeader>
      </div>
      <div class="content1">
        <el-col :span="16" class="info">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="handleAvatarPreview"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-descriptions column="2" border="true">
            <el-descriptions-item label="学号">
              <el-input v-model="user_id"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="真实姓名">
              <el-input v-model="real_name"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="昵称">
              <el-input v-model="name"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="身份证号">
              <el-input v-model="id_number"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="电话号">
              <el-input v-model="phone_id"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="微信号">
              <el-input v-model="wechat_id"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="学院">
              <el-input v-model="faculty_id"></el-input>
            </el-descriptions-item>
          </el-descriptions>
          <div>
            <el-button @click="changeInfo">上传修改</el-button>
            <router-link :to="'/home/'">
              <el-button>返回</el-button>
            </router-link>
            <el-button type="primary" @click="dialogFormVisible = true" class="changePassButton">修改密码</el-button>
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
              <el-form :model="form" ref="pwdForm" :rules="rules">
                <el-form-item label="原密码" prop="old_password">
                <el-input v-model="form.old_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                <el-input v-model="form.new_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="new_password_again">
                <el-input v-model="form.new_password_again" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('pwdForm')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </div>
    </div>
  
  </template>
  
  <script>
    import managerHomeHeader from "@/components/managerHomeHeader"
    export default {
      components: {managerHomeHeader},
      async created() {
        await this.axios({
          method: 'post',
          url: 'http://localhost:8000/buaa_db/get_personal_profile/',
          headers: {'Content-Type': 'multipart/form-data'},
          data: null
        }).then((res)=>{
          console.log(res)
          this.user_id = res.data.username;
          this.name = res.data.name;
          this.real_name = res.data.real_name;
          this.phone_id = res.data.phone_id;
          this.id_number = res.data.id_number;
          this.wechat_id = res.data.wx_id;
          this.faculty_id = res.data.faculty_id;
          this.image_url = res.data.image_url; //头像id
          this.role = res.data.role; //0.1.2
        })
      },
      data() {
        return {
          image_formData: new FormData(),
          imageUrl: '',
          img_id: '',
          user_id: '21373000',
          name: 'a',
          role: '1',
          real_name: '张三',
          id_number: '4000000000000000000',
          phone_id: '18000000000',
          wechat_id: '2000000',
          faculty_id: 'cs',
          image_url: '',
          rules: {
            old_password: [
              { required: true, message: "请输入原密码", trigger: "blur" },
            ],
            new_password: [
              { required: true, message: "请输入新密码", trigger: "blur" },
            ],
            new_password_again: [
              { required: true, message: "请再次输入新密码", trigger: "blur" },
            ],
          },
          dialogFormVisible: false,
          form: {
            old_password: "",
            new_password: "",
            new_password_again: "",
          },
        }
      },
      methods: {
        /*uploadHttpRequest(data) {
          let formData = new FormData();
          formData.append('img', data.file);
          console.log(formData.get('img'))
          this.axios({
            method: 'post',
            url: 'UploadImage/',
            data: formData,
          }).then((res) => {
            console.log(res.data.url);
            console.log(data.file);
            this.imageUrl = res.data.url;
            this.img_id = res.data.id;
          })
        },*/
        handleAvatarPreview(file) {
          console.log(true);
          let fd = new FormData()
          fd.append('image', file.raw)
          this.image_formData = fd
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log(this.imageUrl);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          return isJPG;
        },
        changeInfo() {
          this.image_formData.append('real_name', this.real_name)
          this.image_formData.append('phone_id', this.phone_id)
          this.image_formData.append('id_number', this.id_number)
          this.image_formData.append('wx_id', this.wechat_id)
          this.image_formData.append('faculty_id', this.faculty_id)
          this.image_formData.append('real_name', this.real_name)
          console.log(this.image_formData.get('real_name'))
          this.axios({
            method: 'post',
            url: 'http://localhost:8000/buaa_db/modify_personal_profile/',
            headers: {'Content-Type': 'multipart/form-data'},
            data: this.image_formData
          }).then((res)=>{
            if (res.data.status == 200) {
              let msg = this.$message({
                type: 'success',
                message: "修改成功"
              });
              setTimeout(()=> {
                msg.close();
              },1000);
            }
            else {
              this.$message({
                type: 'error',
                message: "修改失败"
              });
            }
          })
        },
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.form);
              this.axios({
                method: 'post',
                credentials: 'include',
                url: 'http://localhost:8000/buaa_db/change_password/',
                headers: {'Content-Type': 'multipart/form-data'},
                data: this.form
              }).then((res)=>{
                if (res.data.status == 200) {
                  this.$message({
                    type: 'success',
                    message: "修改密码成功"
                  });
                }
                else if (res.data.status == 400) {
                  this.$message({
                    type: 'error',
                    message: '两次密码不一致'
                  })
                }
                else if (res.data.status == 401) {
                  this.$message({
                    type: 'error',
                    message: '旧密码验证失败'
                  })
                }
              })
            }
            else {
              return false;
            }
          });
        },
      }
    }
  </script>
  
  <style scoped>
    .content1 {
      margin-left: 120px;
    }
    .info {
      margin-top: 20px;
      margin-left: 20px;
      width: 800px;
    }
    .changePassButton {
      float: right;
    }
  
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  </style>