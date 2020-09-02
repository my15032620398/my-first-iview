<template>
    <div>
        <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
                <img :src="item.response[0].url">
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
                :on-progress="handleProgress"
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
            <img :src="view_url" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import ImgUtil from "../utils/ImgUtil";

    export default {
        name: "UploadFile",
        props: {
            uploadList: Array,
            num: Number,
            defaultList:Array
        },
        data() {
            return {
                visible: false,
                item: {},
                view_url: '',
                limit:1,
                tempuploadList:[]
            }
        },
        methods: {
            handleView(name) {
                const url = ImgUtil.findImgUrl(this.uploadList, name);
                this.view_url = url
                this.visible = true;
            },
            handleRemove(file) {
                this.uploadList.splice(this.uploadList.indexOf(file), 1);
            },
            handleProgress(event, file){
                console.log(file)
                this.uploadList.push(file)
                event.target.onprogress = (event)=>{
                    let uploadPercent = ((event.loaded / event.total) * 100).toFixed(1) + '%'
                    // 手动设置显示上传进度条 以及上传百分比
                    file.showProgress = true
                    file.percentage = uploadPercent
                }
            },
            handleSuccess(res, file,fileList) {
                console.log('----------handleSuccess------------')
                console.log(res)
                console.log(file)
                console.log(fileList)
                // this.item.status = 'finished'
                // this.item.name = file.name
                // this.item.url = res[0].url
                // this.item.id = res[0].id
                // this.item.showProgress = file.showProgress
                // this.item.percentage = file.percentage
                // console.log(this.uploadList)
                // this.uploadList.push(this.item)
                // this.item = {}
                console.log(this.uploadList)
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
              console.log(this.limit)
              console.log(this.num)
                const check = this.uploadList.length + 1 > this.limit;
                if (check) {
                    this.$Notice.warning({
                        title: 'Up to one pictures can be uploaded.'
                    });
                }
                return !check;
            }
        },
        created() {
          if (this.num) {
            console.log(2222222222)
            this.limit = this.num
          }
        },
    }
</script>

<style scoped>
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
