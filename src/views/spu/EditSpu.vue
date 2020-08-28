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
                <UploadFile :uploadList="slideShowUploadList"></UploadFile>
            </FormItem>
            <FormItem label="详情图">
                <UploadFile :uploadList="detailUploadList"></UploadFile>
            </FormItem>
            <FormItem label="标签">
                <Tag v-for="item in tags" :key="item" :name="item" closable @on-close="handleCloseTag">item</Tag>
            </FormItem>
            <div class="gridCategoryBut">
                <Button type="primary" class="saveGridCategoryBut" @click="addOrUpdate?addGridCategory(spuData):updateGridCategory(spuData)">保存
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
                item:{}
            }
        },
        methods:{
            initData(){
                const id = this.$route.query.data;
                if(id){
                    this.addOrUpdate=false;
                }
                http.fetchGet('/v1/spu/'+id+'/detail').then((res)=>{
                    console.log(res)
                    this.dealData(res);
                }).catch(err=>{
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                console.log(this.spuData)
            },
            back(){
                this.$router.push('/spuList')
            },
            handleCloseTag(){

            },
            dealData(res) {
                this.spuData = res.data
                this.initMainImg()
                this.initThemeImg()
                this.initSlideShowImg()
                this.initDetailImg()
            },
            initMainImg() {
                const name = ImgUtil.spliceImgName(this.spuData.img);
                this.item.name = name
                this.item.status = 'finished'
                this.item.url = this.spuData.img
                this.item.showProgress = true
                this.item.percentage = 100
                this.mainUploadList.push(this.item)
            },
            initThemeImg() {

            },
            initSlideShowImg() {

            },
            initDetailImg() {

            },
            addGridCategory(data){
                console.log(data)
            },
            updateGridCategory(data){
                console.log(data)
            }

        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
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
