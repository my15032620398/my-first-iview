<template>
  <div class="bannerDetailContainer">
    <Form :model="formBanner" label-position="left" :label-width="100">
      <FormItem label="名称">
        <Input :autofocus=true v-model="formBanner.name" class="formBanner" placeholder="请输入Banner的名称"/>
      </FormItem>
      <FormItem label="标题">
        <Input v-model="formBanner.title" class="formBanner" placeholder="请输入Banner的标题"/>
      </FormItem>
      <FormItem label="图片">
        <UploadFile :uploadList="uploadList" ></UploadFile>
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
    import UploadFile from "../../components/UploadFile";

    export default {
        name: "AddBanner",
        components:{
            UploadFile
        },
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
                formBanner.img = this.uploadList[0].url
                console.log(formBanner)
                http.fetchPost("/v1/banner", formBanner).then((res) => {
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    console.log(err.response.data.message)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },

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
