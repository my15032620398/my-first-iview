<template>
    <div class="gc-1">
        <div class="h-1">
            <div class="h-1-1">
                {{addOrUpdate?'新建宫格':'更新宫格'}}
            </div>
            <Button type="primary" icon="ios-undo" @click="back">返回</Button>
        </div>
        <Form :model="gridCategoryData " label-position="left" :label-width="100">
            <FormItem label="宫格主题">
                <Input v-model="gridCategoryData.title" placeholder="请输入宫格主题" class="form"/>
            </FormItem>
            <FormItem label="宫格名">
                <Input v-model="gridCategoryData.name" placeholder="请输入宫格名" class="form"/>
            </FormItem>
            <FormItem label="父分类">
                <i-select v-model="gridCategoryData.root_category_id" clearable style="width:200px" placeholder="请选择父分类">
                    <i-option v-for="item in rootCategoryIds" :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="分类">
                <i-select v-model="gridCategoryData.category_id" clearable style="width:200px" placeholder="请选择分类">
                    <i-option v-for="item in subCategoryIds" :value="item.id" :key="item.id">{{ item.id+"-"+item.name }}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="图片">
                <UploadFile :uploadList="uploadList"></UploadFile>
            </FormItem>
            <div class="gridCategoryBut">
                <Button type="primary" class="saveGridCategoryBut" @click="addOrUpdate?addGridCategory(gridCategoryData):updateGridCategory(gridCategoryData)">保存
                </Button>
                <Button html-type="reset">重置</Button>
            </div>
        </Form>
    </div>
</template>

<script>
    import UploadFile from "../../components/UploadFile";
    import http from "../../request/http";

    export default {
        name: "EditGridCategotry",
        components: {
            UploadFile
        },
        data() {
            return {
                uploadList: [],
                gridCategoryData: {},
                item: {},
                rootCategoryIds: [],
                subCategoryIds:[],
                addOrUpdate:false
            }
        },
        methods: {
            initData() {
                //加载之分类
                http.fetchGet('/v1/category/sub/list',null).then((res)=>{
                    this.subCategoryIds = res.data;
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                http.fetchGet('/v1/category/root/list',null).then((res)=>{
                    this.rootCategoryIds = res.data;
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                const data = this.$route.query.data;
                if(!data){
                    this.addOrUpdate = true
                    return
                }
                this.gridCategoryData = data
                this.initUpLoadImg()

            },
            initUpLoadImg() {
                this.item.status = 'finished'
                this.item.url = this.gridCategoryData.img
                this.item.id = this.gridCategoryData.id
                this.item.showProgress = true
                this.item.percentage = 100
                this.uploadList.push(this.item)
            },
            updateGridCategory(data) {
                data.img = this.uploadList[0].url
                http.fetchPut('/v1/grid-category/' + data.id, data).then((res) => {
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            addGridCategory(data){
                data.img = this.uploadList[0].url
                http.fetchPost('/v1/grid-category',data).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            back(){
                this.$router.push('/gridCategoryList')
            }
        },
        created() {
            this.initData();
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