<template>
  <div class="sv-1">
    <div class="sv-0">
      <div class="sv-title">
        {{title}}
      </div>
      <Button type="text" icon="ios-undo" @click="back" ghost class="b-1">返回</Button>
    </div>

    <Form :model="specValueData " label-position="left" :label-width="100">
      <FormItem label="规格名名称">
        <Input v-model="specValueData.value" class="form" placeholder="请输入规格值名称"/>
      </FormItem>
      <FormItem label="规格名描述">
        <Input v-model="specValueData.extend" class="form" placeholder="请输入规格值扩展"/>
      </FormItem>
      <div class="cBut">
        <Button type="primary" class="saveBut" @click="addOrUpdateSpecValue(specValueData)">保存</Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
  import http from "../../request/http";
  import store from "../../store";
    export default {
        name: "AddOrUpdateSpecValue",
        data() {
            return {
                specValueData: {},
                //1:add 2:update
                addOrUpdateFlag: 1,
                title:'添加规格值',
                specId:Number
            }
        },
        methods: {
            initData() {
              const param = this.$route.query.data;
                console.log(param)
              this.specId = this.$route.query.data.specId
              if(param.flg == 2){
                  this.specValueData = param;
                  this.addOrUpdateFlag = 2;
                  this.title = '更新规格值';
              }
            },
            addOrUpdateSpecValue(specValueData) {
                specValueData.spec_id = this.specId
                console.log(specValueData)
                if(this.addOrUpdateFlag == 1){
                    http.fetchPost('/v1/spec-value',specValueData).then((res)=>{
                        this.$Message.success(res.data.message)
                    }).catch(err=>{
                        this.$Message.error(JSON.stringify(err.response.data.message))
                    })
                }else if (this.addOrUpdateFlag == 2){
                    http.fetchPut('/v1/spec-value/'+specValueData.id, specValueData).then((res) => {
                        console.log(res)
                        this.$Message.success(res.data.message)
                    }).catch(err => {
                        this.$Message.error(JSON.stringify(err.response.data.message))
                    })
                }
            },
            back(){
                const res = store.state.specKeyDetail
                this.$router.push({path:'/editSpecKey',query: {data:res}})
            }

        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
  .sv-title {
    font-size: larger;
    color: #6739ff;
    padding-bottom: 20px;
  }

  .sv-1 {
    padding-left: 20px;
  }
  .cBut{
    padding-left: 100px;
  }
  .saveBut{
    margin-right: 20px;
  }
  .form {
    width: 550px;
  }
  .sv-0{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding-bottom: 20px;
  }
  .b-1{
    color: #2c3e50;
  }
</style>
