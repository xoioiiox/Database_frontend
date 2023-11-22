<template>
    <div>
        <div>
            <homeHeader></homeHeader>
        </div>
        <el-col span="15">
            <div class="content1">
                <el-descriptions title="项目信息" column="1">
                    <el-descriptions-item label="项目名称">{{project_name}}</el-descriptions-item>
                    <el-descriptions-item label="项目时间">{{time}}</el-descriptions-item>
                    <el-descriptions-item label="项目地点">{{position}}</el-descriptions-item>
                    <el-descriptions-item label="项目描述">{{description}}</el-descriptions-item>
                </el-descriptions>
                <div>
                    <el-divider></el-divider>
                    <!--添加讨论-->
                    <div>
                        <!--el-col span="2">
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-col-->
                        <el-col span="20">
                            <el-input v-model="input" placeholder="留下你的评论吧..." ></el-input>
                        </el-col>
                        <el-col span="2" offset="1">
                            <el-button type="primary">提交</el-button>
                        </el-col>
                    </div>
                    <!--讨论列表-->
                    <el-table :data="discussions" border :show-header=false class="commentTable">
                        <el-table-column>
                            <template slot-scope="scope">
                                <projectComment :content="scope.row"></projectComment>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-col>
        <el-col span="9">
            <el-card class="sideContent" shadow="never">
            <div>
                <div class="table_head">成员信息</div>
                <el-table :data="project_members" border :default-sort = "{prop: 'type', order: 'descending'}" size="small">
                    <el-table-column prop="name" label="姓名" width="80" sortable></el-table-column>
                    <el-table-column prop="type" label="身份" width="100" sortable>
                        <template slot-scope="scope">
                            <el-tag :type="getType(scope.row.type)">{{scope.row.type}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click="preview(scope.row)" type="text">详情</el-button>
                            <el-button @click="preview(scope.row)" type="text">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="Feedback" width="100">
                        <template slot-scope="scope">
                            <el-button @click="preview(scope.row)" type="text">查看</el-button>
                            <el-button @click="download(scope.row)" type="text">下载</el-button>
                          </template>
                    </el-table-column>
                </el-table>
            </div>    
            </el-card>
        </el-col>
    </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader"
    import projectComment from "@/components/projectComment"
    export default {
        components: {homeHeader, projectComment},
        data() {
            return {
                id: '1', 
                project_name: '项目1', 
                time: '时间1', 
                position: '地点1', 
                description: '这是一项不错的项目balabala',
                input: '',
                project_members: [
                    {name: '张三', type: '成员'},
                    {name: '李四', type: '管理员'},
                    {name: '王五', type: '成员'},
                ],
                discussions: [
                    {comment_id: '1', student_id: '1', name: '张三', text: '我有一个问题', time: '2023-11-15', 
                    replies:[
                        {name: '王五', text: '这个问题我觉得...', time: '2023-11-16', reply_object_name: '张三', replySubVisible: false},
                        {name: '张三', text: '你说得对...', time: '2023-11-16', reply_object_name: '王五', replySubVisible: false}
                    ]},
                    {name: '李四', text: '我也有一个问题', time: '2023-11-18', replies:[]},
                    {name: '李四', text: '我也有一个问题', time: '2023-11-18', replies:[]},
                    {name: '李四', text: '我也有一个问题', time: '2023-11-18', replies:[]},
                    {name: '李四', text: '我也有一个问题', time: '2023-11-18', replies:[]},
                ]
            }
        },
        async created(){
            this.id = this.$route.params.id;
            await this.axios({
                methods: 'get',
                url: '/project/',
                params: {
                    'id': this.id
                }
            }).then((res) => {
                this.project_name = res.data.project_name
                this.time = res.data.time
                this.position = res.data.position
                this.description = res.data.description
                this.discussions = res.data.discussions
            })
        },
        methods: {
            preview(row) {
            window.open(this.$axios.defaults.baseURL +
                'DownloadFeedback/?token=' + this.$store.getters.getToken +
                '&project_id=' + this.ruleForm.HWValue +
                '&student_id=' + row.student_id + '&is_view=1')
            },
            download(row) {
            window.location.href=this.$axios.defaults.baseURL +
                'DownloadFeedback/?token=' + this.$store.getters.getToken +
                '&project_id=' + this.ruleForm.HWValue +
                '&student_id=' + row.student_id + '&is_view=0'
            },
            getType(type) {
                if (type == '成员') {
                    return 'success';
                }
                else {
                    return 'warning';
                }
            },
        }
    }
</script>

<style scoped>
    .commentTable {
        margin-top: 80px;
    }
    .content1 {
		margin-left: 120px;
		margin-top: 20px;
	}
    .sideContent {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 120px;
    }
    .table_head {
        margin-bottom: 10px;
        font-weight: bolder;
    }
</style>