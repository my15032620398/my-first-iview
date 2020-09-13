<template>
  <div class="sp-0">
    <div class="t-1">
      <div class="t-1-1">主题列表</div>
      <Button type="primary" @click="addTheme">添加主题</Button>
    </div>
    <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0"  >
      <template slot-scope="{row}" slot="title_img">
        <div class="i-1">
          <img :src="row.title_img" class="img">
        </div>
      </template>
      <template slot-scope="{row}" slot="entrance_img">
        <div class="i-1">
          <img :src="row.entrance_img" class="img">
        </div>
      </template>
      <template slot-scope="{row}" slot="internal_top_img">
        <div class="i-1">
          <img :src="row.internal_top_img" class="img">
        </div>
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
    import http from "../request/http";

    export default {
        name: "ThemeList",
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
                        title: '标题图',
                        slot: 'title_img',
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
                        title: '模板名',
                        key: 'tpl_name',
                        align: "center",
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: "center",
                    },
                    {
                        title: '入口图',
                        slot: 'entrance_img',
                        align: "center",
                    },
                    {
                        title: '外连接图',
                        slot: 'internal_top_img',
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
                http.fetchGet("/v1/theme/page", param).then((res) => {
                    this.total = res.data.total;
                    this.data6 = res.data.items
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                this.loading = false
            },
            addTheme(){

            },
            edit(themeData){
                this.$router.push({path: '/updateTheme', query: {data: themeData}})
            },
            remove(){

            },
            onPageChange(){

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

  .img {
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
  .top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
