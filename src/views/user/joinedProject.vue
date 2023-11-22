<template>
    <div>
        <div>
            <homeHeader></homeHeader>
        </div>
        <div class="content1">
            <userSideMenu></userSideMenu>
            <div class="project_card">
				<el-row :gutter="25" style="margin-right: 15px;margin-left: -5px" type="flex" v-loading="loading">
				<el-col v-for="(item, index) in projects" :key="index" class="text item" :span="8">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>{{item.project_name}}</span>
                        </div>
                        <div class="item">
                            时间：{{item.time}}
                        </div>
                        <div class="item">
                            地点：{{item.position}}
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <el-button @click="viewProject(item.id)" type="text">
                                查看详情
                            </el-button>
                            <el-button @click="quitProject(item.id)" type="text">
                                退出项目
                            </el-button>
                            <!--el-button @click="uploadData(item.id)">
                                上传资料
                            </el-button-->
                            <!--el-button type="text">查看讨论</el-button-->
                            <el-button @click="item.dialogVisible = !item.dialogVisible" type="text">上传资料</el-button>
                                <div class="submit" v-show="item.dialogVisible">
                                    <div class="loaderCss">
                                        <upLoader :HWid="nowId" :lastSubmit="last"></upLoader>
                                    </div>
                                </div>
							<!--el-dialog
								title="上传资料"
								:visible.sync="dialogVisible"
								width="30%">
								<el-upload
									class="upload-demo"
									action="https://jsonplaceholder.typicode.com/posts/"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
									multiple
									:file-list="fileList">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件, 且不超过500kb</div>
								</el-upload>
								<span slot="footer" class="dialog-footer">
									<el-button @click="dialogVisible = false">取 消</el-button>
									<el-button type="primary" @click="onsubmit()">确 定</el-button>
								</span>
                            </el-dialog-->
                        </div>
                    </el-card>
				</el-col>
				</el-row>
            </div>    
        </div>
    </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader"
    import userSideMenu from "@/components/userSideMenu"
    import upLoader from "@/components/upLoader"
    export default {
        components: {homeHeader, userSideMenu, upLoader},
        data() {
            return {
                nowId: '',
                last: '',
				dialogVisible: false,
                projects: [
                    {
                        "id": '1',
                        "project_name": '项目名称',
                        "time": '周五 12:00-14:00',
                        "position": '操场',
                        "description": '这是一项很好的志愿项目',
                        "status": '已完成',
                        dialogVisible: false,
                    },
                    {
                        "id": '2',
                        "project_name": '项目名称',
                        "time": '周五 12:00-14:00',
                        "position": '操场',
                        "description": '这是一项很好的志愿项目',
                        "status": '已完成',
                        dialogVisible: false
                    },
                    {
                        "id": '3',
                        "project_name": '项目名称',
                        "time": '周五 12:00-14:00',
                        "position": '操场',
                        "description": '这是一项很好的志愿项目',
                        "status": '已完成',
                        dialogVisible: false
                    },
                    {
                        "id": '4',
                        "project_name": '项目名称',
                        "time": '周五 12:00-14:00',
                        "position": '操场',
                        "description": '这是一项很好的志愿项目',
                        "status": '已完成',
                        dialogVisible: false
                    },
                    {
                        "id": '4',
                        "project_name": '项目名称',
                        "time": '周五 12:00-14:00',
                        "position": '操场',
                        "description": '这是一项很好的志愿项目',
                        "status": '已完成',
                        dialogVisible: false
                    },
                ]
            }
        },
        async create() {
            await this.axios({
                methods: 'get',
                url: '/joined_project/',
            }).then((res)=>{
                this.projects = res.data.projects;
            })
        },
        methods: {
            viewProject(id) {
                this.$router.push({
                    path: '/project/' + id
                })
            },
            quitProject(id) {
                this.axios({
                    methods: 'post',
                    url: '/joined_project/',
                    data: id
                }).then((res)=>{
                    if (res.data.status == 200) {
                        let msg = this.$message({
                            type: 'success',
                            message: "退出项目成功"
                        });
                        setTimeout(()=> {
                            msg.close();
                        },1000);
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: "未加入过该项目"
                        });
                    }
                })
            },
			/*handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file) {
				return this.$confirm(`确定移除 ${ file.name }?`);
			},
            uploadData(id) {
                this.$router.push({
                    path: '/upload_data/' + id
                })
            },
			onsubmit() {
				this.dialogVisible = false;
				console.log(this.fileList);
				this.axios({
					methods: 'post',
					url: '/join_project/',
					data: this.fileList
				}).then((res)=>{
					if(res.data.status == 200) {
						let msg = this.$message({
                            type: 'success',
                            message: "上传成功"
                        });
                        setTimeout(()=> {
                            msg.close();
                        },1000);
					}
				})
			}*/
        }
    }
</script>

<style scoped>
	.content1 {
		margin-left: 120px;
	}
	.project_card {
		margin-left: 20px;
	}
    .el-divider {
        margin: 10px 0;
    }
	.item {
		padding: 5px;
	}
	.el-row {
		display:flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.el-row  .el-card {
		width: 100%;
		height: 100%;
		margin-right: 20px;
        margin-top: 20px;
		transition: all .5s;
	}
	.el-form-item {
		margin-bottom: 0 !important;
	}
	.pagination-container {
		margin-top: -3px;
		margin-bottom: 30px;
	}
</style>