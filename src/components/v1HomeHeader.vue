<template>
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <!--一级导航栏-->
        <el-menu-item class="back_to_home">
            <router-link :to="'/home'" style="text-decoration: none;">Home</router-link>
        </el-menu-item>
        <el-menu-item index="1">
            <router-link :to="'/home/'" style="text-decoration: none;">项目</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link :to="'/team_home/'" style="text-decoration: none;">团体</router-link>
        </el-menu-item>
        <!--创建项目 团体-->
        <div class="create">
        <router-link :to="'/createProject'">
            <el-col :offset="10" :span="2">
            <el-button icon="el-icon-plus" size="small" style="margin-top:20px">项目</el-button>
            </el-col>
        </router-link>
        <router-link :to="'/createTeam/'">
            <el-col :span="2">
            <el-button icon="el-icon-plus" size="small" style="margin-top:20px">团体</el-button>
            </el-col>
        </router-link>
        <!--消息通知-->
        <router-link :to="'/check_message/'">
            <el-col :span="2">
                <el-button icon="el-icon-chat-dot-square" size="small" style="margin-top:20px">消息</el-button>
            </el-col>
        </router-link>
        </div>
        <!--个人主页-->
        <el-submenu index="4">
            <template slot="title">
            <i class="el-icon-user-solid"></i>
            </template>
            <router-link :to="'/user_page/'" style="text-decoration: none;">
                <el-menu-item index="4-1">个人中心</el-menu-item>
            </router-link>
            <el-menu-item index="4-2">
                <el-button type="text" @click="logOut()">退出登录</el-button>
            </el-menu-item>
        </el-submenu>
        </el-menu>
    </div>
    </template>
    
    <script>
    export default {
        name: "homeHeader",
        props: ["messageNum"],
        date() {
            return {
                messageNum: 0
            };
        },
        methods: {
            logOut() {
                this.axios({
                    methods: 'post',
                    url: 'http://localhost:8000/buaa_db/logout/',
                    data: ''
                }).then((res)=>{
                    if (res.data.status == 200) {
                        let msg = this.$message({
                            type: 'success',
                            message: "退出登录成功"
                        });
                        setTimeout(()=> {
                            msg.close();
                        },1000);
                        this.$router.push({path: '/login/'})
                    }
                    else if (res.data.status == 400) {
                        this.$message({
                            type: 'error',
                            message: '退出登录失败'
                        })
                    }
                })
            }
        }
    }
    </script>
    
    <!--scoped修改默认值-->
    <style scoped>
        .header {
            margin-left: 100px;
            margin-right: 100px;
        }
    
        div /deep/ .submenu{
            margin-bottom: 20px;
        }
    </style>