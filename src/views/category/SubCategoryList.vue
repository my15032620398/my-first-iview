<template>
  <div>
    <div class="t-1">
      <div class="t-1-1">子分类列表</div>
      <Button type="primary" @click="addSubCategory">添加子分类</Button>
    </div>
    <Table border :columns="columns12" :data="data6" :loading="loading">
      <template slot-scope="{row}" slot="img">
        <div class="i-1">
          <img :src="row.img" class="bannerImg">
        </div>
      </template>
      <template slot-scope="{ row }" slot="online">
        <strong>{{ row.online=='1'?'显示':'不显示' }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">编辑</Button>
        <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" :page-size="count" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
    import http from "../../request/http";
    import store from "../../store";

    export default {
        name: "SubCategoryList",
        data() {
            return {
                columns12: [
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
                        title: '排序',
                        key: 'index'
                    },
                    {
                        title: '状态',
                        slot: 'online'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: '200px',
                        align: 'center',
                    }
                ],
                data6: [],
                loading: true,
                page: 1,
                count: 3,
                total: 0,
                root: 1,
                parentId: 0
            }
        },
        methods: {
            show(subCategory) {
                console.log(subCategory)
                store.setSubCategoryDetail(subCategory)
                this.$router.push({path: '/subCategoryDetail', query: {data: subCategory}})

            },
            getSubCategoryList() {
                const id = this.$route.query.id
                const param = {
                    page: this.page,
                    count: this.count,
                    id: id
                }
                http.fetchGet("/v1/category/sub-page", param).then((res) => {
                    if(res.data.items.length == 0){
                        this.loading = false
                        return
                    }
                    this.total = res.data.total;
                    this.data6 = res.data.items
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                })

            },
            onPageChange(page) {
                this.page = page;
                this.getSubCategoryList();
            },
            addSubCategory() {
                this.$router.push({path: '/addCategory', query: {parentId: this.parentId}})
            },
            remove(id, index) {

                http.fetchDelete('/v1/category/' + id, null).then((res) => {
                    this.$Message.success(res.data.message)
                    this.data6.splice(index, 1)
                }).catch(err => {
                    this.$Message.error(err.data.message)
                })

            }
        },
        created() {
            this.parentId = this.$route.query.id
            this.getSubCategoryList();
        }
    }
</script>

<style scoped>
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

  .bannerImg {
    width: 100%;
    height: 100%;
  }

  .t-1 {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .t-1-1 {
    color: #6739ff;
    padding-right: 20px;
  }
</style>
