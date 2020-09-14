<template>
  <div class="sp-0">
    <div class="t-1">
      <div class="t-1-1">活动列表</div>
      <Button type="primary" @click="addActivity">添加活动</Button>
    </div>
    <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0"  >
      <template slot-scope="{row}" slot="entrance_img">
        <div class="i-1" v-show="row.entrance_img">
          <img :src="row.entrance_img" class="bannerImg">
        </div>
      </template>
      <template slot-scope="{row}" slot="internal_top_img">
        <div class="i-1" v-show="row.internal_top_img">
          <img :src="row.internal_top_img" class="bannerImg">
        </div>
      </template>
      <template slot-scope="{ row }" slot="start_time">
        <strong>{{ row.start_time | formatDate}}</strong>
      </template>
      <template slot-scope="{ row }" slot="end_time">
        <strong>{{ row.end_time | formatDate}}</strong>
      </template>
      <template slot-scope="{ row }" slot="online">
        <strong>{{ row.online=='1'?'是':'否' }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" :page-size="count" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
    import http from "../../request/http";
    import moment from "moment";
    export default {
        name: "ActivityList",
        data(){
            return{
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '入口图',
                        slot: 'entrance_img',
                        align: "center",
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center",
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: "center",
                    },
                    {
                        title: '提示信息',
                        key: 'remark',
                        align: "center",
                    },
                    {
                        title: '顶部图',
                        slot: 'internal_top_img',
                        align: "center",
                    },
                    {
                        title: '状态',
                        slot: 'online',
                        align: "center",
                    },
                    {
                        title: '开始时间',
                        slot: 'start_time',
                        align: "center",
                    },
                    {
                        title: '结束时间',
                        slot: 'end_time',
                        align: "center",
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: "center",
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: '200px',
                        align: 'center',
                        fixed: 'right'
                    }
                ],
                data6: [],
                loading: true,
                page: 1,
                count: 10,
                total: 0,
            }
        },
        methods:{
            initData(){
                const param = {
                    page: this.page,
                    count: this.count,
                }
                http.fetchGet("/v1/activity/page", param).then((res) => {
                    this.total = res.data.total;
                    this.data6 = res.data.items
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                this.loading = false
            },
            addActivity(){

            },
            edit(data){
              this.$router.push({path:'/updateActivity',query:{data:data}})
            },
            remove(id,index){
                http.fetchDelete('/v1/activity/'+id,null).then((res)=>{
                    this.$Message.success(res.data.message)
                    this.data6.splice(index,1)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            onPageChange(page){
                this.page = page;
                this.initData()
            }

        },
        filters:{
          formatDate(time){
              return moment(time).format('YYYY-MM-DD hh:mm:ss')
          }
        },
        created() {
          this.initData()
        }
    }
</script>

<style scoped>
  .i-1 {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .bannerImg {
    width: 100%;
    height: 100%;
  }

  .t-1 {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .t-1-1 {
    color: #6739ff;
    padding-right: 20px;
  }

  .t-0 {
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }
</style>
