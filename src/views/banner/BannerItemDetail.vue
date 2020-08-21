<template>
  <div class="bannerItemDetailContainer">
    <Form :model="formBannerItem" label-position="left" :label-width="100">
      <FormItem label="名称">
        <Input v-model="formBannerItem.name" class="formBanner" placeholder="请输入BannerItem的名称"/>
      </FormItem>
      <FormItem label="关键字">
        <Input v-model="formBannerItem.keyword" class="formBanner" placeholder="请输入BannerItem的关键字"/>
      </FormItem>
      <FormItem label="类型">
        <Input v-model="formBannerItem.type" class="formBanner" placeholder="请输入BannerItem的类型"/>
      </FormItem>
      <FormItem label="图片">
        <UploadFile :uploadList="uploadList" ></UploadFile>
      </FormItem>
      <div class="bannerBut">
        <Button type="primary" class="saveBannerBut" @click="updateBannerItem(formBannerItem)">保存</Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import http from "../../request/http";
    import UploadFile from "../../components/UploadFile";
    export default {
        name: "BannerItemDetail",
        components:{
            UploadFile
        },
        data() {
            return {
                formBannerItem: {},
                loading: true,
                bannerItem: Number,
                item: {},
                uploadList: [],
            }
        },
        methods: {
            updateBannerItem(formBannerItem) {
                formBannerItem.img = this.uploadList[0].url
                http.fetchPut("/v1/banner-item/" + this.formBannerItem.id, formBannerItem).then((res) => {
                    console.log(res)
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            getBannerItem() {
                const id = this.$route.query.id;
                http.fetchGet("/v1/banner-item/" + id, null).then((res) => {
                    this.formBannerItem = res.data;
                    this.initSubCategoryDetail()
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            initSubCategoryDetail() {
                console.log('----------initSubCategoryDetail----------')
                console.log(this.formBanner)
                this.item.status = 'finished'
                this.item.url = this.formBanner.img
                this.item.id = this.formBanner.id
                this.item.showProgress = true
                this.item.percentage = 100
                console.log(this.item)
                this.uploadList.push(this.item)
            },
        },
        created() {
            this.getBannerItem();
        }
    }
</script>

<style scoped>
  .mainImg {
    width: 160px;
    height: 160px;
  }

  .bannerItemDetailContainer {
    margin-bottom: 20px;
  }

  .formBanner {
    width: 550px;
  }

  .bannerBut {
    padding-left: 100px;
  }

  .saveBannerBut {
    margin-right: 20px;
  }

  .bannerItemDetailContainer {
    margin-right: 20px;
    margin-left: 20px;
  }

  .a-1 {
    display: inline-block;
    flex-direction: row;
    padding-bottom: 15px;
  }

  .a-1-1 {
    padding-right: 10px;
    padding-bottom: 20px;
  }

  .bannerImg {
    width: auto;
    height: auto;
    max-width: 30%;
    max-height: 30%;
  }
</style>
