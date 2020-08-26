<template>
  <div>
    <div class="t-1">
      <div class="t-1-1">规格名列表</div>
    </div>
    <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0">
      <template slot-scope="{ row }" slot="standard">
        <strong>{{ row.standard=='1'?'标准':'非标准' }}</strong>
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
    import store from "../../store";
    export default {
        name: "SpecKeyList",
        data() {
            return {
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: "center"
                    },
                    {
                        title: '单位',
                        key: 'unit',
                        align: "center"
                    },
                    {
                        title: '标准',
                        slot: 'standard',
                        align: "center"
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: '200px',
                        align: 'center',
                    }
                ],
                data6: [],
                loading: true,
                page: 1,
                count: 10,
                total: 0,
            }
        },
        methods: {
            initSpecKey() {
                const param = {
                    page: this.page,
                    count: this.count
                }
                http.fetchGet('/v1/spec-key/page', param).then((res) => {
                    console.log(res)
                    this.total = res.data.total
                    this.data6 = res.data.items
                    this.loading = false
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            remove(id,index) {
                http.fetchDelete('/v1/spec-key/' + id, null).then((res => {
                    this.data6.splice(index, 1);
                    this.$Message.success(res.data.message)
                })).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            edit(specKey) {
              store.setSpecKeyDetail(specKey);
              this.$router.push({path: '/editSpecKey', query: {data: specKey}})
            },
            onPageChange(page) {
                this.page = page;
                this.initSpecKey();
            },
        },
        computed:{
        },
        created() {
            this.initSpecKey()
        }
    }
</script>

<style scoped>
  .i-1 {
    display: inline-block;
    width: 50px;
    height: 50px;
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
