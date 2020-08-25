<template>
  <div class="sk-1">
    <div class="sk-title" v-if="addOrUpdateFlag=='2'">
      {{title}}
    </div>
    <Form :model="specKeyData " label-position="left" :label-width="100">
      <FormItem label="规格名名称">
        <Input v-model="specKeyData.name" class="form" placeholder="请输入规格名称"/>
      </FormItem>
      <FormItem label="规格名描述">
        <Input v-model="specKeyData.description" class="form" placeholder="请输入规格描述"/>
      </FormItem>
      <FormItem label="单位">
        <Input v-model="specKeyData.unit" class="form" placeholder="请输入单位"/>
      </FormItem>
      <FormItem label="是否标准">
        非标准
        <i-switch v-model="specKeyData.standard" :true-value=1 :false-value=0 />
        标准
      </FormItem>
      <div class="cBut">
        <Button type="primary" class="saveBut" @click="addSpecKey(specKeyData)">保存</Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
  import http from "../../request/http";
    export default {
        name: "AddSpecKey",
        data() {
            return {
                specKeyData: {},
                //1:add 2:update
                addOrUpdateFlag:1,
                title:''
            }
        },
        props:{

        },
        methods: {
            initData(){
              const initData = this.$route.query.data;
              if(initData){
                  this.addOrUpdateFlag = 2
                  this.title = '修改规格名'
                  this.specKeyData = initData
              }
            },
            addSpecKey(specKeyData) {
                if(this.addOrUpdateFlag == 1){
                    http.fetchPost('/v1/spec-key', specKeyData).then((res) => {
                        console.log(res)
                        this.$Message.success(res.data.message)
                    }).catch(err => {
                        this.$Message.error(JSON.stringify(err.response.data.message))
                    })
                }else if (this.addOrUpdateFlag == 2){
                    http.fetchPut('/v1/spec-key/'+specKeyData.id, specKeyData).then((res) => {
                        console.log(res)
                        this.$Message.success(res.data.message)
                    }).catch(err => {
                        this.$Message.error(JSON.stringify(err.response.data.message))
                    })
                }
            },
            back(){
                this.$router.push('/specKeyList')
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
  .cBut {
    padding-left: 100px;
  }
  .saveBut {
    margin-right: 20px;
  }
  .form {
    width: 550px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .sk-1{
    padding-left: 20px;
  }
  .sk-title{
    font-size: larger;
    color: #6739ff;
    padding-bottom: 20px;
  }
  .sk-2{
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
