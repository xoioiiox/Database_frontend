<template>
    <div>
        <sysManagerHomeHeader></sysManagerHomeHeader>
        <div class="list">
            <div v-for="(item, index) in teams" :key="index" class="project">
                <el-card class="box-card">
                    <!--div class="text item"-->
                        <el-col offset="2" span="3">{{ item.name }}</el-col>
                        <el-col span="8">{{ item.time }}</el-col>
                        <el-button @click="viewProject(item.id)" type="primary">查看详情</el-button>
                        <el-button @click="checkPass(item.id)" type="success">pass</el-button>
                        <el-button @click="checkFail(item.id)" type="danger">fail</el-button>
                    <!--/div-->
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import sysManagerHomeHeader from "@/components/sysManagerHomeHeader/"
export default {
    components: {sysManagerHomeHeader},
    async create() {
        await this.axios({
        method: 'get',
        url: '/sysManagerHome/'
        }).then((res)=>{
            this.teams = res.data.teams;
        })
    },
    data() {
        return {
        teams : [
            {id:1, name:"团体一", time:"2023-10-18", description: "", status: ""},
            {id:2, name:"团体二", time:"2023-10-21", description: "", status: ""},
            {id:3, name:"团体一", time:"2023-10-18", description: "", status: ""},
            {id:4, name:"团体二", time:"2023-10-21", description: "", status: ""},
            {id:5, name:"团体一", time:"2023-10-18", description: "", status: ""},
            {id:6, name:"团体二", time:"2023-10-21", description: "", status: ""},
            {id:7, name:"团体一", time:"2023-10-18", description: "", status: ""},
            {id:8, name:"团体二", time:"2023-10-21", description: "", status: ""},
        ]
        }
    },
    methods: {
        viewProject(id) {
            this.$router.push({
                path: '/team/' + id
            })
        },
        checkPass(id) {
            this.axios({
                methods: 'post',
                url: '',
                data: id
            })
        },
        checkFail(id) {
            this.axios({
                methods: 'post',
                url: '',
                data: id
            })
        }
    }
}
</script>

<style scoped>
    .el-card {
        width: 100%;
    }
    .list {
        margin-right: 120px;
    }
</style>