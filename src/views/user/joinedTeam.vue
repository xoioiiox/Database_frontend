<template>
    <div>
        <div>
            <homeHeader></homeHeader>
        </div>
        <div class="content1">
            <div>
                <userSideMenu></userSideMenu>
            </div>
            <div class="team_card">
                <div v-for="(item, index) in teams" :key="index" class="text item" @click="viewTeam(item.id)">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>{{item.team_name}}</span>
                        </div>
                        <div class="text item">
                            {{item.description}}
                        </div>
                    </el-card>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader"
    import userSideMenu from "@/components/userSideMenu"
    export default {
        components: {homeHeader, userSideMenu},
        data() {
            return {
                teams: [
                    {
                        "id": '1',
                        "team_name": '团体名称',
                        "description": '这是一个志愿团体'
                    }
                ]
            }
        },
        async create() {
            await this.axios({
                methods: 'get',
                url: '/joined_team/',
            }).then((res)=>{
                this.teams = res.data.teams;
            })
        },
        methods: {
            viewTeam(id) {
                this.$router.push({
                    path: '/team/' + id
                })
            }
        }
    }
</script>

<style>
	.content1 {
		margin-left: 120px;
	}
</style>