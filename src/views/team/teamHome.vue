<template>
    <div class="home1">
      <div class="homeHeader">
        <!--向子组件传数据-->
        <homeHeader :messageNum="messageNum"></homeHeader>
      </div>
      <div v-for="(item, index) in teams" :key="index" class="team">
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>{{ item.team_name }}</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                <router-link :to="'/team/'+item.id" style="text-decoration: none;">
                  查看详情
                </router-link>
              </el-button>
          </div>
          <div class="text item">{{ item.description }}</div>
      </el-card>
      </div>
  </div>
</template>

<script>
    import homeHeader from "@/components/homeHeader";
    export default {
        components: {homeHeader},
        async create() {
          await this.axios({
            method: 'get',
            url: '/team_home/'
          }).then((res)=>{
            this.teams = res.data.teams;
          })
        },
        data() {
          return {
            messageNum: 2,
            teams : [
              {id:1, team_name: "团体一", description: "这是团体1"},
              {id:1, team_name: "团体二", description: "团体2balabala"}
            ]
          }
        }
    }
</script>

<style> 
  .team {
    margin-top: 20px;
    margin-left: 120px;
  }
</style>