<template>
    <div class="gc-1">
        <div class="h-1">
            <div class="h-1-1">
                {{addOrUpdate?'新建SPU':'更新SPU'}}
            </div>
            <Button type="primary" icon="ios-undo" @click="back">返回</Button>
        </div>
        <Form :model="spuData" label-position="left" :label-width="100">
            <FormItem label="标题">
                <Input v-model="spuData.title" placeholder="请输入标题" class="form"/>
            </FormItem>
            <FormItem label="副标题">
                <Input v-model="spuData.subtitle" placeholder="请输入副标题" class="form"/>
            </FormItem>
            <FormItem label="价格">
                <Input v-model="spuData.price" placeholder="请输入价格" class="form"/>
            </FormItem>
            <FormItem label="折扣">
                <Input v-model="spuData.discount_price" placeholder="请输入折扣" class="form"/>
            </FormItem>
            <FormItem label="分类">
                <Input v-model="spuData.category_name" placeholder="请输入分类" class="form"/>
            </FormItem>
            <FormItem label="默认SKU">
                <Input v-model="spuData.default_sku_id" placeholder="请输入默认SKU" class="form"/>
            </FormItem>
            <FormItem label="是否上架">
                下架
                <i-switch v-model="spuData.online" :true-value=1 :false-value=0 />
                上架
            </FormItem>
            <FormItem label="主图">
                <UploadFile :uploadList="mainUploadList"></UploadFile>
            </FormItem>
            <FormItem label="主题图">
                <UploadFile :uploadList="themeUploadList"></UploadFile>
            </FormItem>
            <FormItem label="轮播图">
                <UploadFile :uploadList="slideShowUploadList" :num="num"></UploadFile>
            </FormItem>
            <FormItem label="详情图">
                <UploadFile :uploadList="detailUploadList" :num="num"></UploadFile>
            </FormItem>
            <FormItem label="标签">
                <Tag v-for="tag in tags" :key="tag" :name="tag" closable color="primary" @on-close="handleCloseTag">{{tag}}</Tag>
                <Button v-if="addTagFlg" icon="ios-add" type="dashed" size="small" @click="handleAddTag">添加标签</Button>
                <input  v-else v-model="tagValue" ref="inputs" class="ep-1" @blur="addTag" @keyup.enter="addTag">
            </FormItem>
            <FormItem label="选择分类">
                <i-select v-model="specKeyIds" multiple clearable style="width:200px" placeholder="请选择规格(可多选)">
                    <i-option v-for="item in specKeys" :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否测试">
                非测试
                <i-switch v-model="spuData.is_test" :true-value=1 :false-value=0 />
                测试
            </FormItem>
            <FormItem label="描述">
                <Input v-model="spuData.description" placeholder="请输入描述" class="form"/>
            </FormItem>
            <div class="gridCategoryBut">
                <Button type="primary" class="saveGridCategoryBut" @click="addOrUpdate?addSpu(spuData):updateSpu(spuData)">保存
                </Button>
                <Button html-type="reset">重置</Button>
            </div>
        </Form>

    </div>
</template>

<script>
    import http from "../../request/http";
    import UploadFile from "../../components/UploadFile";
    import ImgUtil from "../../utils/ImgUtil";
    export default {
        name: "EditSpu",
        components:{
            UploadFile
        },
        data(){
            return{
                spuData:{},
                tags:[],
                addOrUpdate:true,
                mainUploadList:[],
                themeUploadList:[],
                slideShowUploadList:[],
                detailUploadList:[],
                mainItem:{},
                themeItem:{},
                num:5,
                addTagFlg:true,
                tagValue:null,
                specKeys:[],
                spuSpecKey:[],
                specKeyIds:[],
                skuList:[],
                updateData:{}
            }
        },
        methods:{
            initData(){
                const id = this.$route.query.data;
                if(id){
                    this.addOrUpdate=false;
                }
                this.getSpuDetail(id)
                this.getSpuSpecKey(id)
                this.getSpecKeys()

            },
            getSpuDetail(id){
                http.fetchGet('/v1/spu/'+id+'/detail').then((res)=>{
                    console.log(res)
                    this.dealData(res);
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                console.log(this.spuData)
            },
            getSpecKeys() {
                http.fetchGet('/v1/spec-key/list').then((res)=>{
                    this.specKeys = res.data
                    console.log(this.specKeys)
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            getSpuSpecKey(id){
                const param={
                    id:id
                }
                http.fetchGet('/v1/spu/key',param).then((res)=>{
                    this.specKeyIds = res.data
                    console.log(this.specKeyIds)
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            back(){
                this.$router.push('/spuList')
            },

            dealData(res) {
                this.spuData = res.data
                console.log(this.spuData)
                this.initMainImg()
                this.initThemeImg()
                this.initSlideShowImg()
                this.initDetailImg()
                this.initTags()
                this.getSkuBySpuId(this.spuData.id);
            },
            initMainImg() {
                if(!this.spuData.img){
                    return
                }
                const name = ImgUtil.spliceImgName(this.spuData.img);
                this.mainItem.name = name
                this.mainItem.status = 'finished'
                this.mainItem.url = this.spuData.img
                this.mainItem.showProgress = true
                this.mainItem.percentage = 100
                this.mainUploadList.push(this.mainItem)
            },
            initThemeImg() {
                if(!this.spuData.for_theme_img){
                    return
                }
                const name = ImgUtil.spliceImgName(this.spuData.for_theme_img);
                this.themeItem.name = name
                this.themeItem.status = 'finished'
                this.themeItem.url = this.spuData.for_theme_img
                this.themeItem.showProgress = true
                this.themeItem.percentage = 100
                this.themeUploadList.push(this.themeItem)
            },
            initSlideShowImg() {
                if(this.spuData.spu_img_list.length<=0){
                    return
                }
                for (let i=0;i<this.spuData.spu_img_list.length;i++){
                    const ssImg = this.spuData.spu_img_list[i];
                    const ssItem = {}
                    const name = ImgUtil.spliceImgName(ssImg);
                    ssItem.name = name
                    ssItem.status = 'finished'
                    ssItem.url = ssImg
                    ssItem.showProgress = true
                    ssItem.percentage = 100
                    this.slideShowUploadList.push(ssItem)
                }
            },
            initDetailImg() {
                if(this.spuData.spu_detail_img_list.length<=0){
                    return
                }
                for (let i=0;i<this.spuData.spu_detail_img_list.length;i++){
                    const dImg = this.spuData.spu_detail_img_list[i];
                    const dItem = {}
                    const name = ImgUtil.spliceImgName(dImg);
                    dItem.name = name
                    dItem.status = 'finished'
                    dItem.url = dImg
                    dItem.showProgress = true
                    dItem.percentage = 100
                    this.detailUploadList.push(dItem)
                }
            },
            addSpu(data){
                console.log(data)
                console.log(this.specKeyIds)
            },
            updateSpu(data){
                console.log(data)
                console.log(this.specKeyIds)
            },

            initTags() {
                this.tags = this.spuData.tags.split('$')
            },
            handleCloseTag(event,name){
                this.tags.splice(this.tags.indexOf(name),1)
            },
            handleAddTag(){
                this.addTagFlg = false
                this.changFocus()
            },
            addTag(){
                this.dealTagValue()
            },
            dealTagValue(){
                if(!this.tagValue){
                    this.addTagFlg = true
                    return
                }
                this.tags.push(this.tagValue)
                this.addTagFlg = true
                this.tagValue = null
            },
                changFocus() {
                this.$nextTick(() => {   //正确写法
                    this.$refs.inputs.focus();
                })
            },

            getSkuBySpuId(id) {
                http.fetchGet('/v1/sku/by/spu/'+id).then((res)=>{
                    console.log('----getSkuBySpuId-----')
                    console.log(res)
                    this.skuList = res.data;
                    this.defaultSku()

                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            defaultSku() {
                const defaultSkuId = this.spuData.default_sku_id;
                const skuList = this.skuList;
                for (let i= 0;i<skuList.length;i++){
                    if(defaultSkuId == skuList[i].id){
                        this.spuData.default_sku_id = skuList[i].title
                    }
                }
            }
        },
        created() {
            this.initData()
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .ep-1{
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

    .gc-1 {
        margin-right: 20px;
        margin-left: 20px;
    }
    .h-1{

        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        padding-bottom: 20px;
    }
    .h-1-1{
        color: #6739ff;
    }
</style>
