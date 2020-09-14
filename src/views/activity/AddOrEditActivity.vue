<template>
  <div>
    <div class="gc-1">
      <div class="h-1">
        <div class="h-1-1">
          {{addOrUpdate?'新增活动':'更新活动'}}
        </div>
        <Button type="primary" icon="ios-undo" @click="back">返回</Button>
      </div>
      <Form :model="activityData" label-position="left" :label-width="100">
        <FormItem label="标题">
          <Input v-model="activityData.title" placeholder="请输入标题" class="form"/>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="activityData.name" placeholder="请输入名称" class="form"/>
        </FormItem>
        <FormItem label="提示">
          <Input v-model="activityData.remark" placeholder="请输入提示" class="form"/>
        </FormItem>
        <FormItem label="是否上架">
          下线
          <i-switch v-model="activityData.online" :true-value=1 :false-value=0 />
          上线
        </FormItem>
        <FormItem label="入口图">
          <UploadFile :uploadList="entrance_img"></UploadFile>
        </FormItem>
        <FormItem label="顶部图">
          <UploadFile :uploadList="internal_top_img"></UploadFile>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="activityData.description" placeholder="请输入描述" class="form"/>
        </FormItem>
        <div class="gridCategoryBut">
          <Button type="primary" class="saveGridCategoryBut"
                  @click="addOrUpdate?addActivity(activityData):updateActivity(activityData)">保存
          </Button>
          <Button html-type="reset">重置</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
    import ImgUtil from "../../utils/ImgUtil";
    import UploadFile from "../../components/UploadFile";
    export default {
        name: "AddOrEditActivity",
        components:{
            UploadFile
        },
        data(){
            return{
                addOrUpdate:false,
                activityData:{},
                internal_top_img:[],
                internalItem:{},
                entrance_img:[],
                entranceItem:{}

            }
        },
        methods:{
            initData(){
              this.activityData = this.$route.query.data;
              if(!this.$route.query.data){
                  this.addOrUpdate = true
              }
              this._initEntranceImg();
              this._initInternalTopImg();
            },
            _initEntranceImg(){
                if (!this.activityData.entrance_img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.activityData.entrance_img);
                this.entranceItem.name = name
                this.entranceItem.status = 'finished'
                this.entranceItem.response = []
                this.entranceItem.response[0] = {}
                this.entranceItem.response[0].url = this.activityData.entrance_img
                this.entranceItem.showProgress = true
                this.entranceItem.percentage = 100
                this.entrance_img.push(this.entranceItem)
            },
            _initInternalTopImg(){
                if (!this.activityData.internal_top_img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.activityData.internal_top_img);
                this.internalItem.name = name
                this.internalItem.status = 'finished'
                this.internalItem.response = []
                this.internalItem.response[0] = {}
                this.internalItem.response[0].url = this.activityData.internal_top_img
                this.internalItem.showProgress = true
                this.internalItem.percentage = 100
                this.internal_top_img.push(this.internalItem)
            },
            back(){
                this.$router.push('/activityList')
            },
            addActivity(){

            },
            updateActivity(){

            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped>
  .gc-1 {
    margin-right: 20px;
    margin-left: 20px;
  }

  .h-1 {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding-bottom: 20px;
  }

  .h-1-1 {
    color: #6739ff;
  }

  .ep-1 {
    height: 22px;
    width: 100px;
    border-radius: 4px;
  }

  .gridCategoryBut {
    padding-left: 100px;
  }

  .saveGridCategoryBut {
    margin-right: 20px;
  }

  .form {
    width: 550px;
  }
  .in-1{
    width: 100px;
  }
  .dp-0{
    display: flex;
    flex-direction: column;
  }
</style>
