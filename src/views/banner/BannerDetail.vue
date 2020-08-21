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
        <UploadFile :uploadList="uploadList" ></UploadFile>
      </FormItem>
      <FormItem label="Banner描述">
        <Input v-model="formBanner.description" class="formBanner" placeholder="请输入Banner的描述"/>
      </FormItem>
      <div class="bannerBut">
        <Button type="primary" class="saveBannerBut" @click="updateBanner(formBanner)">保存</Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
    <Divider/>
    <div class="a-1">
      <span class="a-1-1">Banner-Item列表</span>
      <Button type="primary" @click="addBannerItem(formBanner.id)">添加BannerItem</Button>
    </div>
    <Table border :columns="columns" :data="data6" :loading="loading">
      <template slot-scope="{ row }" slot="img">
        <div class="i-1">
          <img :src="row.img" class="bannerImg">
        </div>
      </template>
      <template slot-scope="{ row,index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">查看</Button>
        <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
    import http from "../../request/http";
    import store from "../../store";
    import UploadFile from "../../components/UploadFile";
    export default {
        name: "BannerDetail",
        components:{
            UploadFile
        },
        data() {
            return {
                formBanner: {},
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '图片',
                        slot: 'img'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '关键字',
                        key: 'keyword'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [],
                loading: true,
                bannerId:'',
                item: {},
                uploadList: [],
            }
        },
        methods: {
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
            getBannerWithItemById() {
                const id = this.$route.query.id;
                http.fetchGet("/v1/banner/" + id, null).then((res) => {
                    this.formBanner = res.data;
                    this.data6 = res.data.items
                    this.loading = false;
                    this.initSubCategoryDetail()
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            updateBanner(formBanner) {
                formBanner.img = this.uploadList[0].url
                http.fetchPut("/v1/banner/"+formBanner.id, formBanner).then((res) => {
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(err.response.data.message)
                })
            },
            remove(id,index){
                http.fetchDelete('/v1/banner-item/'+id,null).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(err.response.data.message)
                })
                this.data6.splice(index,1);
            },
            show(id) {
                store.setBannerItemId(id)
                this.bannerId = id
                this.$router.push({path: '/bannerItemDetail', query: {id: id}})
            },
            addBannerItem(id){
                this.$router.push({path:'/addBannerItem',query:{id:id}})
            }
        },
        created() {
            this.getBannerWithItemById()
        }
    }
</script>

<style scoped>
  .mainImg {
    width: 160px;
    height: 160px;
  }

  .bannerDetailContainer {
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

  .bannerDetailContainer {
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
    width: 100%;
    height: 100%;
  }
  .i-1 {
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
</style>
