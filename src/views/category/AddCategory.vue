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
                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        type="drag"
                        action="http://127.0.0.1:5000/cms/file"
                        style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="this.item.url" v-if="visible" style="width: 100%">
                </Modal>
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

    export default {
        name: "AddCategory",
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

                console.log(subCategoryData)
                http.fetchPost("/v1/category", subCategoryData).then((res) => {
                    console.log(res)
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(err.data.message)
                })
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                http.fetchDelete("/cms/file/" + file.id, null).then(() => {
                }).catch(err => {
                    console.log(err)
                })
                this.subCategoryData.img = null;
                this.uploadList.splice(this.uploadList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                this.item.status = 'finished'
                this.item.name = file.name
                this.item.url = res[0].url
                this.item.id = res[0].id
                this.item.showProgress = file.showProgress
                this.item.percentage = file.percentage
                this.subCategoryData.img = res[0].url
                this.uploadList.push(this.item)
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length + 1 > 1;
                if (check) {
                    this.$Notice.warning({
                        title: 'Up to one pictures can be uploaded.'
                    });
                }
                return !check;
            }
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