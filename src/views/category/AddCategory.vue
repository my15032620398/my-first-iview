<template>
    <div>
        <Form :model="subCategoryData " label-position="left" :label-width="100">
            <FormItem label="分类名">
                <Input v-model="subCategoryData.name" class="formBanner" placeholder="请输入分类名"/>
            </FormItem>
            <FormItem label="排序">
                <Input v-model="subCategoryData.index" class="formBanner" placeholder="请输入排序号"/>
            </FormItem>
            <FormItem label="显示上线">
                下线
                <i-switch v-model="subCategoryData.online" :true-value=1 :false-value=0 />
                上线
            </FormItem>
            <FormItem label="图片">
                <UploadFile :uploadList="uploadList" ></UploadFile>
            </FormItem>
            <FormItem label="分类描述">
                <Input v-model="subCategoryData.description" class="formCategory" placeholder="请输入子分类的描述"/>
            </FormItem>
            <div class="categoryBut">
                <Button type="primary" class="saveCategoryBut" @click="addSubCategory(subCategoryData)">保存</Button>
                <Button html-type="reset">重置</Button>
            </div>
        </Form>
    </div>
</template>

<script>
    import http from "../../request/http";
    import UploadFile from "../../components/UploadFile";

    export default {
        name: "AddCategory",
        components:{
            UploadFile
        },
        data() {
            return {
                subCategoryData: {},
                uploadList: [],
                visible: false,
                imgName: '',
                item: {},
            }
        },
        methods: {
            addSubCategory(subCategoryData) {
                if (this.$route.query.parentId) {
                    subCategoryData.parent_id = this.$route.query.parentId
                    subCategoryData.level = 2
                } else {
                    subCategoryData.level = 1
                    subCategoryData.is_root = 1
                }
                subCategoryData.img = this.uploadList[0].url
                http.fetchPost("/v1/category", subCategoryData).then((res) => {
                    console.log(res)
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(err.data.message)
                })
            },
        },
        created() {
        }
    }
</script>

<style scoped>
    .categoryBut {
        padding-left: 100px;
    }

    .saveCategoryBut {
        margin-right: 20px;
    }

    .formCategory {
        width: 550px;
    }


    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
