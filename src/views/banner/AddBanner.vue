<template>
  <div class="bannerDetailContainer">
    <Form :model="formBanner" label-position="left" :label-width="100">
      <FormItem label="名称">
        <Input v-model="formBanner.name" class="formBanner" placeholder="请输入Banner的名称"/>
      </FormItem>
      <FormItem label="标题">
        <Input v-model="formBanner.title" class="formBanner" placeholder="请输入Banner的标题"/>
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
      <FormItem label="Banner描述">
        <Input v-model="formBanner.description" class="formBanner" placeholder="请输入Banner的描述"/>
      </FormItem>
      <div class="bannerBut">
        <Button type="primary" class="saveBannerBut" @click="addBanner(formBanner)">保存</Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import http from "../../request/http";

    export default {
        name: "AddBanner",
        data() {
            return {
                formBanner: {},
                item: {},
                imgName: '',
                visible: false,
                uploadList:[],
                a:false
            }
        },
        methods: {
            addBanner(formBanner) {
                http.fetchPost("/v1/banner", formBanner).then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                http.fetchDelete("/cms/file/"+file.id,null).then(()=>{
                }).catch(err=>{
                    console.log(err)
                })
                this.uploadList.splice(this.uploadList.indexOf(file),1);
            },
            handleSuccess(res, file) {
                this.item.status = 'finished'
                this.item.name = file.name
                this.item.url = res[0].url
                this.item.id = res[0].id
                this.item.showProgress = file.showProgress
                this.item.percentage = file.percentage
                this.formBanner.img = res[0].url
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
                const check = this.uploadList.length+1>1;
                if (check) {
                    this.$Notice.warning({
                        title: 'Up to one pictures can be uploaded.'
                    });
                }
                return !check;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
  .bannerDetailContainer {
    margin-right: 20px;
    margin-left: 20px;
  }

  .bannerBut {
    padding-left: 100px;
  }

  .mainImg {
    width: 160px;
    height: 160px;
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
