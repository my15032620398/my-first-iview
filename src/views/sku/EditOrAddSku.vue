<template>
    <div class="gc-1">
        <div class="h-1">
            <div class="h-1-1">
                {{addOrUpdate?'新建SKU':'更新SKU'}}
            </div>
            <Button type="primary" icon="ios-undo" @click="back">返回</Button>
        </div>
        <Form :model="skuData" label-position="left" :label-width="100" :loading="loading">
            <FormItem label="标题">
                <Input v-model="skuData.title" placeholder="请输入标题" class="form"/>
            </FormItem>
            <FormItem label="价格">
                <InputNumber
                        class="in-1"
                        :max="10000"
                        v-model="skuData.price"
                        :formatter="value => `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        :step="0.1">
                </InputNumber>
                <!--        <CountNumber v-model="skuData.price"></CountNumber>-->
            </FormItem>
            <FormItem label="折扣价">
                <div class="dp-0">
                    <RadioGroup v-model="discountValue" @on-change="onChangeRadio">
                        <Radio label="无折扣"></Radio>
                        <Radio label="折扣价"></Radio>
                        <Radio label="打折"></Radio>
                    </RadioGroup>
                    <Input :disabled="disabled1" v-model="inputDiscountPrice" class="form" style="margin-bottom: 5px"/>
                    <Input :disabled="disabled2" v-model="newDiscountPrice" placeholder="折扣价" class="form"/>
                </div>
            </FormItem>
            <FormItem v-show="!addOrUpdate" label="编码">
                <Input disabled v-model="skuData.code" placeholder="请输入编码" class="form"/>
            </FormItem>
            <FormItem label="库存">
              <InputNumber
                      :min="0"
                      :max="10000"
                      v-model="skuData.stock"
                      :step="1">
              </InputNumber>
            </FormItem>
            <FormItem label="SPU">
                <i-select v-model="listen_spu_id" clearable style="width:200px" placeholder="请输入SPU">
                    <i-option v-for="item in spuList" :value="item.id" :key="item.id">{{ item.id+'-'+item.title }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否上架">
                下架
                <i-switch v-model="skuData.online" :true-value=1 :false-value=0 />
                上架
            </FormItem>
            <FormItem label="图片">
                <UploadFile :uploadList="mainUploadList"></UploadFile>
            </FormItem>
            <FormItem v-for="item in specData" :key="item.id" :label="item.name">
              <i-select v-model="item.selected_value" clearable style="width:200px" placeholder="请选择规格(可多选)">
                <i-option v-for="a in item.items" :value="a.id" :key="a.id">{{ a.id+'-'+a.value }}
                </i-option>
              </i-select>
            </FormItem>
            <div class="gridCategoryBut">
                <Button type="primary" class="saveGridCategoryBut"
                        @click="addOrUpdate?addSku(skuData):updateSku(skuData)">保存
                </Button>
                <Button html-type="reset">重置</Button>
            </div>
        </Form>
    </div>
</template>

<script>
    import UploadFile from "../../components/UploadFile";
    import ImgUtil from "../../utils/ImgUtil";
    import http from "../../request/http";
    // import * as qs from "qs";
    // import CountNumber from "../../components/CountNumber";
    export default {
        name: "EditOrAddSku",
        components: {
            UploadFile,
            // CountNumber
        },
        data() {
            return {
                addOrUpdate: false,
                skuData: {},
                mainUploadList: [],
                mainItem: {},
                discountValue:'无折扣',
                disabled1:true,
                disabled2:true,
                inputDiscountPrice:null,
                newDiscountPrice:null,
                spuDetail:{},
                specData:[],
                spuList:[],
                loading:true,
                listen_spu_id:null
            }
        },
        methods: {
            back() {
                this.$router.push('/skuList')
            },
            addSku(data) {
                console.log('---add-----')
                let img =''
                if(this.mainUploadList.length != 0){
                    img = this.mainUploadList[0].response[0].url
                }
                let selectors = []
                this.specData.forEach(spec=>{
                    let a = {
                        key_id:spec.id,
                        value_id:spec.selected_value
                    }
                    selectors.push(a)
                })
                const param = {
                    title:data.title,
                    img:img,
                    discount_price:this.newDiscountPrice,
                    online:data.online,
                    spu_id:data.spu_id,
                    price:data.price,
                    stock:data.stock,
                    selectors:selectors
                }
                http.fetchPost('/v1/sku',param).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                console.log(param)
            },
            updateSku(data) {
                console.log('---update-----')
                let img = '';
                let selectors = []
                this.specData.forEach(spec=>{
                    let a = {
                        key_id:spec.id,
                        value_id:spec.selected_value
                    }
                    selectors.push(a)
                })
                if(this.mainUploadList.length != 0){
                    img = this.mainUploadList[0].response[0].url
                }
                const param={
                    title:data.title,
                    img:img,
                    discountPrice:this.newDiscountPrice,
                    online:data.online,
                    spu_id:data.spu_id,
                    price:data.price,
                    stock:data.stock,
                    selectors:selectors
                }
                http.fetchPut('/v1/sku/'+this.skuData.id,param).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                console.log(param)
            },
            initData() {
                if (!this.$route.query.data) {
                    this.addOrUpdate = true
                    this.initSpuData();
                    return
                }
                this.skuData = this.$route.query.data
                this.getSpuById(this.skuData.spu_id);
                this.newDiscountPrice = this.skuData.discount_price
                this.initImg();
                this.initSpecData(this.skuData.spu_id);
                this.initSpuData();
                this.loading = false
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
            },
            onChangeRadio(){
                console.log(this.discountValue)
                if(!(this.discountValue === '无折扣')){
                    this.disabled1 = false
                }else{
                    this.disabled1 = true
                }

            },
            getSpuById(spu_id) {
                http.fetchGet("/v1/spu/"+spu_id,null).then((res)=>{
                    this.spuDetail = res.data
                    console.log(this.spuDetail)
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            initSpecData(spu_id) {
                http.fetchGet('/v1/spec-key/'+spu_id+'/detail',null).then((res)=>{
                    this.specData = res.data;
                    if(this.addOrUpdate){
                        return
                    }
                    for(let i=0;i<this.specData.length;i++){
                        for(let j=0;j<this.skuData.specs.length;j++){
                            if(this.skuData.specs[j].key_id == this.specData[i].id){
                                this.specData[i].selected_value = this.skuData.specs[j].value_id
                            }
                        }
                    }
                    console.log(this.specData)
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            initSpuData() {
                http.fetchGet('/v1/spu/list',null).then((res)=>{
                    this.spuList = res.data
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            }
        },
        watch:{
            inputDiscountPrice:function(newValue){
                if(!Number(newValue)){
                    this.$Message.warning('请输入数字')
                    return
                }
                if(this.discountValue == '折扣价'){
                    this.newDiscountPrice = newValue
                }else if(this.discountValue == '打折'){
                    this.newDiscountPrice = this.skuData.price * newValue
                }
            },
            listen_spu_id:function (newValue) {
                this.skuData.spu_id = newValue
                this.initSpecData(newValue)
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
    .in-1{
        width: 100px;
    }
    .dp-0{
        display: flex;
        flex-direction: column;
    }
</style>
