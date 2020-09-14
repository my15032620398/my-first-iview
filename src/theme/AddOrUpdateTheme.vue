<template>
  <div class="gc-1">
    <div class="h-1">
      <div class="h-1-1">
        {{addOrUpdate?'新建主题':'更新主题'}}
      </div>
      <Button type="primary" icon="ios-undo" @click="back">返回</Button>
    </div>
    <Form :model="themeData" label-position="left" :label-width="100">
      <FormItem label="标题">
        <Input v-model="themeData.title" placeholder="请输入标题" class="form"/>
      </FormItem>
      <FormItem label="名称">
        <Input v-model="themeData.name" placeholder="请输入名称" class="form"/>
      </FormItem>
      <FormItem label="主题描述">
        <Input v-model="themeData.description" placeholder="请输入描述" class="form"/>
      </FormItem>
      <FormItem label="模板名">
        <i-select v-model="themeData.tpl_name" clearable style="width:200px" placeholder="请输入模板名">
          <i-option v-for="item in tplNames" :value="item" :key="item">{{item}}
          </i-option>
        </i-select>
      </FormItem>
      <FormItem label="是否上架">
        下架
        <i-switch v-model="themeData.online" :true-value=1 :false-value=0 />
        上架
      </FormItem>
      <FormItem label="标题图">
        <UploadFile :uploadList="title_img"></UploadFile>
      </FormItem>
      <FormItem label="入口图">
        <UploadFile :uploadList="entrance_img"></UploadFile>
      </FormItem>
      <FormItem label="外部图">
        <UploadFile :uploadList="internal_top_img"></UploadFile>
      </FormItem>
      <div class="gridCategoryBut">
        <Button type="primary" class="saveGridCategoryBut"
                @click="addOrUpdate?addTheme(themeData):updateTheme(themeData)">保存
        </Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
    <div v-show="!addOrUpdate">
      <div class="th-0">
        主题下SPU
      </div>
      <div>
        <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0">
          <template slot-scope="{row}" slot="img">
            <div class="i-1">
              <img :src="row.img" class="img">
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="remove_spu(row.id,index)">删除</Button>
          </template>
        </Table>
      </div>
      <div class="th-1">
        <i-select v-model="themeSpu" clearable style="width:200px" placeholder="请选择SPU">
          <i-option v-for="(item,index) in themeSpus" :value="item.id" :key="index">{{item.id+'-'+item.title}}
          </i-option>
        </i-select>
        <Button type="primary" @click="addSpu" class="thb-1">添加</Button>
      </div>
    </div>
  </div>
</template>

<script>
    import ImgUtil from "../utils/ImgUtil";
    import UploadFile from "../components/UploadFile";
    import http from "../request/http";

    export default {
        name: "AddOrUpdateTheme",
        components: {
            UploadFile
        },
        data() {
            return {
                themeData: {},
                tplNames: ['diana', 'irelia', 'camille', 'janna', 'spu-list'],
                title_img: [],
                titleItem: {},
                entrance_img: [],
                entranceItem: {},
                internal_top_img: [],
                internalItem: {},
                addOrUpdate: false,
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '主题',
                        slot: 'img',
                        align: "center",
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center",
                    },
                    {
                        title: '副标题',
                        key: 'subtitle',
                        align: "center",
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: '200px',
                        align: 'center',
                        fixed: 'right'
                    }
                ],
                data6: [],
                loading: true,
                themeSpus: [],
                themeSpu: null
            }
        },
        methods: {
            initData() {
                if (!this.$route.query.data) {
                    this.addOrUpdate = true
                    return
                }
                this.themeData = this.$route.query.data
                this.initThemeSpu();
                this.initSpu()
                this.initTitleImg();
                this.initEntranceImg();
                this.initInternalTopImg();
            },
            initTitleImg() {
                if (!this.themeData.title_img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.themeData.title_img);
                this.titleItem.name = name
                this.titleItem.status = 'finished'
                this.titleItem.response = []
                this.titleItem.response[0] = {}
                this.titleItem.response[0].url = this.themeData.title_img
                this.titleItem.showProgress = true
                this.titleItem.percentage = 100
                this.title_img.push(this.titleItem)
            },
            initEntranceImg() {
                if (!this.themeData.entrance_img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.themeData.entrance_img);
                this.entranceItem.name = name
                this.entranceItem.status = 'finished'
                this.entranceItem.response = []
                this.entranceItem.response[0] = {}
                this.entranceItem.response[0].url = this.themeData.entrance_img
                this.entranceItem.showProgress = true
                this.entranceItem.percentage = 100
                this.entrance_img.push(this.entranceItem)
            },
            initInternalTopImg() {
                if (!this.themeData.internal_top_img) {
                    return
                }
                const name = ImgUtil.spliceImgName(this.themeData.internal_top_img);
                this.internalItem.name = name
                this.internalItem.status = 'finished'
                this.internalItem.response = []
                this.internalItem.response[0] = {}
                this.internalItem.response[0].url = this.themeData.internal_top_img
                this.internalItem.showProgress = true
                this.internalItem.percentage = 100
                this.internal_top_img.push(this.internalItem)
            },
            initThemeSpu() {
                http.fetchGet('/v1/theme/spus', {id: this.themeData.id}).then((res) => {
                    this.data6 = res.data
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                this.loading = false
            },
            initSpu() {
                http.fetchGet('/v1/theme/spu/list', {id: this.themeData.id}).then((res) => {
                    console.log(res.data)
                    this.themeSpus = res.data
                }).catch(err => {
                    console.log(err)
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            back() {
                this.$router.push('/themeList')
            },
            addTheme(themeData) {
                console.log(themeData)
                let title_img = ''
                let entrance_img = ''
                let internal_img = ''
                if (this.title_img.length != 0) {
                    title_img = this.title_img[0].response[0].url
                }
                if (this.entrance_img.length != 0) {
                    entrance_img = this.entrance_img[0].response[0].url
                }
                if (this.internal_top_img.length != 0) {
                    internal_img = this.internal_top_img[0].response[0].url
                }
                const param = {
                    title: themeData.title,
                    description: themeData.description,
                    name: themeData.name,
                    tpl_name: themeData.tplName,
                    entrance_img: entrance_img,
                    internal_top_img: internal_img,
                    title_img: title_img,
                }
                console.log(param)
                http.fetchPost('/v1/theme', param).then((res) => {
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            updateTheme(themeData) {
                console.log(themeData)
                let title_img = ''
                let entrance_img = ''
                let internal_img = ''
                if (this.title_img.length != 0) {
                    title_img = this.title_img[0].response[0].url
                }
                if (this.entrance_img.length != 0) {
                    entrance_img = this.entrance_img[0].response[0].url
                }
                if (this.internal_top_img.length != 0) {
                    internal_img = this.internal_top_img[0].response[0].url
                }
                const param = {
                    title: themeData.title,
                    description: themeData.description,
                    name: themeData.name,
                    tpl_name: themeData.tplName,
                    entrance_img: entrance_img,
                    internal_top_img: internal_img,
                    title_img: title_img,
                }
                console.log(param)
                http.fetchPut('/v1/theme/' + this.themeData.id, param).then((res) => {
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })

            },
            remove_spu(id, index) {
                http.fetchDelete('/v1/theme/spu/' + id, null).then((res) => {
                    this.$Message.success(res.data.message)
                    const a = this.data6.splice(index, 1)
                    console.log('=====a====a======')
                    console.log(a)
                    const item = {
                        id: a[0].id,
                        title: a[0].title
                    }
                    console.log('------item-------')
                    console.log(item)
                    this.themeSpus.push(item)
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            addSpu() {
                const param = {
                    theme_id: this.themeData.id,
                    spu_id: this.themeSpu
                }
                http.fetchPost('/v1/theme/spu', param).then((res) => {
                    this.$Message.success(res.data.message)
                    let data = this.themeSpus.filter(ts => ts.id == this.themeSpu)
                    const item = {
                        id: this.themeSpu,
                        img: data[0].img,
                        title: data[0].title,
                        subtitle: data[0].subtitle
                    }
                    console.log(item)
                    this.data6.push(item)
                    this.themeSpus.splice(data, 1)
                    this.themeSpu = null
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
  .gc-1 {
    margin-right: 20px;
    margin-left: 20px;
  }

  .h-1 {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding-bottom: 20px;
  }

  .h-1-1 {
    color: #6739ff;
  }

  .ep-1 {
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

  .in-1 {
    width: 100px;
  }

  .dp-0 {
    display: flex;
    flex-direction: column;
  }

  .th-0 {
    margin-top: 40px;
    margin-bottom: 20px;
    color: #6739ff;
    font-size: large;
  }

  .t-0 {
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }

  .img {
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

  .th-1 {
    margin-top: 20px;

  }

  .thb-1 {
    margin-left: 20px;
  }
</style>
