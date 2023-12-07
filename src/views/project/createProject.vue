<template>
    <div>
      <div>
        <managerHomeHeader></managerHomeHeader>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动图片">
            <div class="avatar">
              <el-col span="8">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-change="handleAvatarPreview"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="form.place"></el-input>
          </el-form-item>
          <el-form-item label="活动开始时间">
            <el-col :span="6">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.start_date"
              value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">
              <div class="center">-</div>
            </el-col>
            <el-col :span="4">
              <el-time-picker placeholder="选择时间" v-model="form.start_time"
              :format="'HH:mm'" value-format="HH:mm" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="活动结束时间">
            <el-col :span="6">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.end_date"
              value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">
              <div class="center">-</div>
            </el-col>
            <el-col :span="4">
              <el-time-picker placeholder="选择时间" v-model="form.end_time"
              :format="'HH:mm'" value-format="HH:mm" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="发布范围" prop="range">
            <el-radio v-model="form.private" label="0">公开项目</el-radio>
            <el-radio v-model="form.private" label="1" @change="getAllTeams()">团队内项目</el-radio>
            <el-select v-model="form.team_id" placeholder="请选择" v-show="teamsVisible">
              <el-option
                v-for="item in teams"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>  
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input type="textarea" v-model="form.profile"></el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-radio-group v-model="form.tag" size="small">
              <el-radio-button label="社区服务" border></el-radio-button>
              <el-radio-button label="支教助学" border></el-radio-button>
              <el-radio-button label="卫生健康" border></el-radio-button>
              <el-radio-button label="环境保护" border></el-radio-button>
              <el-radio-button label="文化艺术" border></el-radio-button>
              <el-radio-button label="平安综治" border></el-radio-button>
              <el-radio-button label="交通引导" border></el-radio-button>
              <el-radio-button label="其他" border></el-radio-button>
            </el-radio-group>
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
  import managerHomeHeader from "@/components/managerHomeHeader";
    export default {
      components: {managerHomeHeader},
      data() {
        return {
          formData: new FormData,
          imageUrl: '',
          form: {
            name: '',
            place: '',
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            profile: '',
            private: '0',
            team_id: '',
            tags: {},
            quest_url: '',
            images: {},
            files: {},
            state: 'False',
            tag: '',
          },
          teams: [],
          /*ranges:[
            {value: '0', label: '全体'},
            {value: '1', label: 'xx志愿团体'}
          ],*/
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          teamsVisible: false
        };
      },
      methods: {
        handleAvatarPreview(file) {
          console.log(true);
          let fd = new FormData()
          fd.append('image', file.raw)
          this.formData = fd
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
        /*handleTrigger($event){
          let _this = this;
          let objVal = this.value;
          window.setTimeout(() => {
            if (!!objVal && objVal == $event.target.value) {
              $event.target.checked = false
              _this.value= ''
            }
          }, 0);
        },*/
        onSubmit() {
          this.formData.append('name', this.form.name)
          this.formData.append('time', this.form.time)
          this.formData.append('place', this.form.place)
          this.formData.append('profile', this.form.profile)
          this.formData.append('private', this.form.private)
          this.formData.append('team_id', this.form.team_id)
          this.formData.append('tag', this.form.tag)
          this.formData.append('quest_url', this.form.quest_url)
          this.formData.append('state', this.form.state)
          console.log(this.formData.get('image'))

          /*let data = {
            name: this.form.name,
            time: this.form.start_date + ' ' + this.form.start_time + ' - ' + this.form.end_date + ' ' + this.form.end_time,
            place: this.form.place,
            profile: this.form.profile,
            private: this.form.private,
            team_id: this.form.team_id,
            tag: this.form.tag,
            quest_url: this.form.quest_url,
            images: this.form.images,
            files: this.form.files,
            state: this.form.state
          }
          console.log(data);*/
          this.axios({
            method: 'post',
            url: 'http://localhost:8000/buaa_db/man_create_project/',
            headers: {'Content-Type': 'multipart/form-data'},
            data: this.formData
          }).then((res) => {
            console.log(res.data);
            if (res.data.status == 200) { //后端传回数据
              this.$message({
                type: 'success',
                message: "项目创建成功"
              });
              this.$router.push({
                path: '/ManageTeam/'
              })
            } else {
              this.$message.error('创建项目失败');
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
            path: '/ManageTeam/'
          })
        },
        getAllTeams() {
          this.teamsVisible = true
          this.axios({
            method: 'post',
            url: 'http://localhost:8000/buaa_db/get_manage_teams/',
            headers: {'Content-Type': 'multipart/form-data'},
          }).then((res)=>{
            console.log(res)
            this.teams = res.data.teams
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