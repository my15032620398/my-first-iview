<template>
  <div class="sp-1">
    <div class="right">
      <AddSpecKey></AddSpecKey>
    </div>
    <div class="left">
      <div class="t-1">
        <div class="t-1-1">规格值列表</div>
        <Button type="primary" @click="addSpecValue">添加规格值</Button>
      </div>
      <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
          <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  import AddSpecKey from "./AddSpecKey";
  import http from "../../request/http";
    export default {
        name: "EditSpecKey",
        components:{
            AddSpecKey
        },
        data(){
            return{
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '规格值名称',
                        key: 'value',
                        align: "center"
                    },
                    {
                        title: '扩展',
                        key: 'extend',
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
                specId:Number
            }
        },
        methods:{
            initSpecKey() {
                this.specId = this.$route.query.data.id;
                http.fetchGet('/v1/spec-value/by/spec-key/'+this.specId,null).then((res) => {
                    console.log(res)
                    this.data6 = res.data
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            remove(id,index) {
                http.fetchDelete('/v1/spec-value/' + id, null).then((res => {
                    this.data6.splice(index, 1);
                    this.$Message.success(res.data.message)
                })).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            edit(specValue) {
                specValue.specId = this.specId
                specValue.flg = 2
                console.log(specValue)
                this.$router.push({path: '/updateSpecValue', query: {data: specValue}})
            },
            onPageChange(page) {
                this.page = page;
                this.initSpecKey();
            },
            addSpecValue(){
                let param = {}
                param.specId = this.specId;
                param.flg  = 1;
                console.log(param)
                this.$router.push({path: '/updateSpecValue', query: {data: param}})
            }
        },
        created() {
            this.initSpecKey()
        }
    }
</script>

<style scoped>
.sp-1{
  display: flex;
  flex-direction: row;
}
.t-0 {
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
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
  .left{
    padding-left: 20px;
  }
</style>
