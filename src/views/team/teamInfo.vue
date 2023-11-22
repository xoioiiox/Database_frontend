<template>
    <div>
        <div>
            <homeHeader></homeHeader>
        </div>
        <div class="content">
            <el-descriptions title="团体信息" column="1">
                <el-descriptions-item label="团体名称">{{team_name}}</el-descriptions-item>
                <el-descriptions-item label="团体描述">{{description}}</el-descriptions-item>
            </el-descriptions>
            <div>
                <el-button @click="request_join()">申请加入团体</el-button>
                <el-button @click="request_quit()">申请退出团体</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader";
    export default {
        components: {homeHeader},
        data() {
            return {
                id: '1', 
                team_name: '团体1',
                description: '这是一个团体balabala'
            }
        },
        async created(){
            this.id = this.$route.params.id;
            await this.axios({
                methods: 'get',
                url: '/team/',
                params: {
                    'id': this.id
                }
            }).then((res) => {
                this.team_name = res.data.team_name
                this.description = res.data.description
            })
        },
        methods: {
            request_join() {
                this.axios({
                    methods: 'post',
                    url: '/team/',
                    params: {
                        'id': this.id
                    }
                }).then((res)=>{
                    if (res.data.status == 200) {
                        let msg = this.$message({
                            type: 'success',
                            message: "申请加入成功"
                        });
                        setTimeout(()=> {
                            msg.close();
                        },1000);
                    } else {
                        this.$message({
                            type: 'error',
                            message: "你已加入过该团体"
                        })
                    }
                })
            },
            request_quit() {
                this.axios({
                    methods: 'post',
                    url: '/team/',
                    params: {
                        'id': this.id
                    }
                }).then((res)=>{
                    if (res.data.status == 200) {
                        let msg = this.$message({
                            type: 'success',
                            message: "申请退出成功"
                        });
                        setTimeout(()=> {
                            msg.close();
                        },1000);
                    } else {
                        this.$message({
                            type: 'error',
                            message: "你未加入过该团体"
                        })
                    }
                })
            }
        }
    }
</script>