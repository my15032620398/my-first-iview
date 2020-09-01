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
                <i-select v-model="category_id" clearable style="width:200px" placeholder="请输入分类">
                    <i-option v-for="item in category_item"  :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="默认SKU" v-if="!addOrUpdate">
                <i-select v-model="default_sku_id" clearable style="width:200px" placeholder="请选择默认SKU">
                    <i-option v-for="item in skuList"  :value="item.id" :key="item.id">{{ item.id+"-"+item.title }}
                    </i-option>
                </i-select>
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
            <FormItem label="选择规格">
                <i-select v-model="specKeyIds" multiple clearable style="width:200px" placeholder="请选择规格(可多选)">
                    <i-option v-for="item in specKeys" :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="可视规格">
                <i-select v-model="sketch_spec_id" clearable style="width:200px" placeholder="请选择可视规格">
                    <i-option v-for="item in sketchItems"  :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
<!--            <FormItem label="是否测试">-->
<!--                非测试-->
<!--                <i-switch v-model="spuData.is_test" :true-value=1 :false-value=0 />-->
<!--                测试-->
<!--            </FormItem>-->
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
                updateData:{},
                flg:false,
                sketchItems:[],
                default_sku_id:null,
                sketch_spec_id: null,
                category_item:[],
                category_id:null
            }
        },
        methods:{
            initData(){
                const id = this.$route.query.data;
                this.initCategory();
                this.getSpecKeys()
                if(!id){
                    this.initAddData();
                    return
                }else {
                    this.initUpdateData(id)
                }


            },
            getSpuDetail(id){
                http.fetchGet('/v1/spu/'+id+'/detail').then((res)=>{
                    this.dealData(res);
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
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
                    for (let i=0;i<res.data.length;i++){
                        this.specKeyIds.push(res.data[i].id)
                    }
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
                this.category_id = this.spuData.category_id
                this.initSketchSpecKey()
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
            initTags() {
                if(!this.spuData.tags){
                    return
                }
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
                    console.log('----skuList----')
                    console.log(this.skuList)
                    this.default_sku_id = this.spuData.default_sku_id
                    //this.defaultSku()

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
            },
            dealParam(data){
                let strTags = '';
                let spuImgList = []
                let spuDetailImgList = []
                for(let i=0;i<this.detailUploadList.length;i++){
                    spuDetailImgList.push(this.detailUploadList[i].url)
                }
                for(let i=0;i<this.slideShowUploadList.length;i++){
                    spuImgList.push(this.slideShowUploadList[i].url)
                }
                for(let i=0;i<this.tags.length;i++){
                    if(i==this.tags.length){
                        return
                    }
                    strTags = strTags+this.tags[i]+'$'
                }
                strTags = strTags.substr(0,strTags.length-1)
                let param={
                    title:data.title,
                    subtitle:data.subtitle,
                    img:this.mainUploadList.length>0?this.mainUploadList[0].url:null,
                    for_theme_img:this.themeUploadList.length>0?this.themeUploadList[0].url:null,
                    category_id:this.category_id,
                    online:data.online,
                    sketch_spec_id:this.sketch_spec_id,
                    default_sku_id:this.default_sku_id,
                    price:data.price,
                    discount_price:data.discount_price,
                    description:data.description,
                    tags:strTags,
                    spec_key_id_list:this.specKeyIds,
                    spu_img_list:spuImgList,
                    spu_detail_img_list:spuDetailImgList,

                }
                return param
            },
            addSpu(data){
                const params = this.dealParam(data)
                console.log(params)
                http.fetchPost('/v1/spu',params).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            updateSpu(data){
                const param = this.dealParam(data)
                http.fetchPut('/v1/spu/'+data.id,param).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            initSketchSpecKey() {
                this.watchSpec(this.specKeys);
                if(this.spuData.sketch_spec_id){
                    this.sketch_spec_id =this.spuData.sketch_spec_id
                }

                // const param={
                //     id:this.spuData.id
                // }
                // http.fetchGet('/v1/spu/key',param).then((res)=>{
                //     console.log('-------initSketchSpecKey--------')
                //     console.log(res.data)
                //     for(let i=0;i<res.data.length;i++){
                //         if(res.data.length<=0){
                //             return
                //         }
                //         this.sketchItems.push(res.data[i])
                //     }
                //     console.log('-------sketchItems--------')
                //     console.log(this.sketchItems)
                // }).catch(err=>{
                //     this.$Message.error(JSON.stringify(err.response.data.message))
                // })
            },
            initUpdateData(id) {
                this.addOrUpdate=false;
                this.getSpuDetail(id)
                this.getSpuSpecKey(id)
            },
            initAddData() {
            },
            initCategory() {
                http.fetchGet('/v1/category/sub/list').then((res)=>{
                    console.log('------category---------')
                    console.log(res.data)
                    if(res.data.length<=0){
                        return
                    }
                    for(let i=0;i<res.data.length;i++){
                        this.category_item.push(res.data[i])
                    }
                    console.log(this.category_item)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            watchSpec(newValue){
                for(let i=0;i<this.specKeys.length;i++){
                    for(let j=0;j<newValue.length;j++){
                        if(this.specKeys[i].id == newValue[j]){
                            if(this.sketchItems.indexOf(this.specKeys[i])==-1){
                                this.sketchItems.push(this.specKeys[i])
                            }
                        }
                    }
                }
            }
        },
        watch:{
            specKeyIds:function (newValue) {
                // if(!this.addOrUpdateFlag){
                //     return
                // }
                console.log('23232323')
                this.sketchItems = []
                this.watchSpec(newValue)
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
