<template>
    <div>
        <div>
            <homeHeader></homeHeader>
        </div>
        <div >
            <el-card class="message_card">
                <el-row>
                    <el-col span="4">
                        <div class="card_title">消息中心</div>
                    </el-col>
                    <el-col span="2" offset="17">
                        <el-button type="text" icon="el-icon-edit-outline" @click="toWriteMessage()">
                            写通知
                        </el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <div class="card_content">
                    <el-col span="6">
                        <el-table 
                        :data="messages_list" height="500px" :show-header="false" 
                        highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-col span="6">
                                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                                    </el-col>
                                    <el-col span="16">{{scope.row.name}}</el-col>
                                    <el-col span="1">
                                        <el-badge :is-dot="getIsHot(scope.row.hasUnRead)" class="item"></el-badge>
                                    </el-col>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col span="1"><el-divider direction="vertical"></el-divider></el-col>
                    <el-col span="17">
                        
                    </el-col>
                </div>
            </el-card>
            <!--div v-for="(item, index) in messages" :key="index" class="messages">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{item.title}}</span>
                        <el-button :type="getColor(item.has_read)" size="mini" round style="float: right;" @click="readMessage(item)">
                            {{getType(item.has_read)}}
                        </el-button>
                    </div>
                    <div class="text item">{{item.time}}</div>
                    <div class="text item">{{item.content}}</div>
                </el-card>
            </div-->
        </div>
    </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader";
    export default {
        components: {homeHeader},
        data() {
            return {
                messages_list: [
                    {name: 'xxx团体', hasUnRead: 'false'},
                    {name: 'xxx项目', hasUnRead: 'true'},
                    {name: 'xxx志愿服务项目', hasUnRead: 'false'},
                ],
                messages: [
                    {id: '1', title:'项目审核通过通知', time: '2023-10-30 16:40', content:'111', has_read:'flase'},
                    {id: '2', title:'项目通知', time: '2023-10-29 13:40', content:'22', has_read:'flase'},
                    {id: '3', title:'团体通知', time: '2023-10-28 10:00', content:'3333333', has_read:'true'}
                ]
            }
        },
        async create() {
            await this.axios({
                methods: 'get',
                url: '/check_message/'
            }).then((res)=>{
                this.messages = res.data.messages;
            })
        },
        methods: {
            getIsHot(type) {
                if (type == 'false') {
                    return false;
                }
                else {
                    return true;
                }
            },
            getType(has_read) {
                if (has_read=="true") return '已读';
                else return '未读';
            },
            getColor(has_read) {
                if (has_read=="true") return '';
                else return 'primary';
            },
            readMessage(item) {
                item.has_read="true"
                let data = {
                    "id": item.id,
                    "has_read": item.has_read
                }
                console.log(data)
                this.axios({
                    methods: 'post',
                    url: '/check_message/',
                    data: data
                })
            },
            handleCurrentChange(val) {
                val;
            },
            toWriteMessage() {
                this.$router.push('/new_message/');
            }
        }
    }
</script>

<style scoped>
    .message_card {
        margin-top: 15px;
        margin-left: 200px;
        margin-right: 200px;
        height: 650px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
        margin-bottom: 20px;
    }
    .card_title {
        margin-left: 30px;
        margin-top: 8px;
        font-size: large;
    }
    .card_content {
        height: 500px;
    }
    .el-divider--horizontal{
        margin: 10px;
    }
    .el-divider--vertical{
        display:inline-block;
        width:1px;
        height:500px;
        margin:0 8px;
        vertical-align:middle;
        position:relative;
    }
    .el-badge {
        margin-bottom: 0;
        padding: 0;
    }
</style>