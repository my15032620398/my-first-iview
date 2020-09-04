<template>
  <div class="gc-1">
    <div class="h-1">
      <div class="h-1-1">
        {{addOrUpdate?'新建SKU':'更新SKU'}}
      </div>
      <Button type="primary" icon="ios-undo" @click="back">返回</Button>
    </div>
    <Form :model="skuData" label-position="left" :label-width="100">
      <FormItem label="标题">
        <Input v-model="skuData.title" placeholder="请输入标题" class="form"/>
      </FormItem>
      <FormItem label="价格">
<!--        <InputNumber-->
<!--                :max="10000"-->
<!--                v-model="skuData.price"-->
<!--                :formatter="value => `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"-->
<!--                :parser="value => value.replace(/\$\s?|(,*)/g, '')"-->
<!--        :step="0.1" >-->
<!--        </InputNumber>-->
        <CountNumber v-model="skuData.price"></CountNumber>
      </FormItem>
      <FormItem label="折扣价">
        <Input v-model="skuData.discount_price" placeholder="请输入折扣价" class="form"/>
      </FormItem>
      <FormItem label="编码">
        <Input v-model="skuData.code" placeholder="请输入编码" class="form"/>
      </FormItem>
      <FormItem label="库存">
        <Input v-model="skuData.stock" placeholder="请输入库存" class="form"/>
      </FormItem>
      <FormItem label="SPU">
        <Input v-model="skuData.spu_id" placeholder="请输入SPU" class="form"/>
      </FormItem>
      <FormItem label="是否上架">
        下架
        <i-switch v-model="skuData.online" :true-value=1 :false-value=0 />
        上架
      </FormItem>
      <FormItem label="图片">
        <UploadFile :uploadList="mainUploadList"></UploadFile>
      </FormItem>
      <div class="gridCategoryBut">
        <Button type="primary" class="saveGridCategoryBut" @click="addOrUpdate?addSku(skuData):updateSku(skuData)">保存
        </Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import UploadFile from "../../components/UploadFile";
    import ImgUtil from "../../utils/ImgUtil";
    import CountNumber from "../../components/CountNumber";
    export default {
        name: "EditOrAddSku",
        components: {
            UploadFile,
            CountNumber
        },
        data() {
            return {
                addOrUpdate: false,
                skuData: {},
                mainUploadList: [],
                mainItem: {}
            }
        },
        methods: {
            back() {
                this.$router.push('/skuList')
            },
            addSku(data) {
                console.log(data)
            },
            updateSku(data) {
                console.log(data)
            },
            initData() {
                if (!this.skuData) {
                    this.addOrUpdate = true
                    return
                }
                this.skuData = this.$route.query.data

                this.initImg();
                console.log(this.skuData)
            },
            initImg() {
                if (!this.skuData.img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.skuData.img);
                this.mainItem.name = name
                this.mainItem.status = 'finished'
                this.mainItem.response = []
                this.mainItem.response[0] = {}
                this.mainItem.response[0].url = this.skuData.img
                this.mainItem.showProgress = true
                this.mainItem.percentage = 100
                this.mainUploadList.push(this.mainItem)
                console.log(this.mainUploadList)
            }
        },
        created() {
            this.initData()
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

</style>
