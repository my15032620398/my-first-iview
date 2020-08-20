<template>
  <div>
    <div class="t-1">
      <div class="t-1-1">分类列表</div>
      <Button type="primary" @click="addCategory">添加分类</Button>
    </div>
    <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0">
      <template slot-scope="{row}" slot="img">
        <div class="i-1">
          <img :src="row.img" class="bannerImg">
        </div>
      </template>
      <template slot-scope="{ row }" slot="online">
        <strong>{{ row.online=='1'?'显示':'不显示' }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">子分类</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
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
        data() {
            return {
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align:"center"
                    },
                    {
                        title: '图片',
                        slot: 'img',
                        align:"center"
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align:"center"
                    },
                    {
                        title: '排序',
                        key: 'index',
                        align:"center"
                    },
                    {
                        title: '状态',
                        slot: 'online',
                        align:"center"
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align:"center"
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
                root: 1
            }
        },
        methods: {
            show(categoryRootId) {
                store.setCategoryRootId(categoryRootId);
                this.$router.push({path: '/subCategoryList', query: {id: categoryRootId}})
            },
            edit(category) {
                store.setSubCategoryDetail(category)
                this.$router.push({path: '/subCategoryDetail', query: {data: category}})
            },
            remove(id, index) {
                http.fetchDelete('/v1/category/' + id, null).then((res => {
                    this.data6.splice(index, 1);
                    this.$Message.success(res.data.message)
                })).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            getCategoryList() {
                const param = {
                    page: this.page,
                    count: this.count,
                    root: this.root
                }
                http.fetchGet("/v1/category/page", param).then((res) => {
                    this.total = res.data.total;
                    this.data6 = res.data.items
                    this.loading = false
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })

            },
            onPageChange(page) {
                this.page = page;
                this.getCategoryList();
            },
            addCategory() {
                this.$router.push('/addCategory')
            }
        },
        created() {
            this.getCategoryList();
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
    .t-0{
        display: flex;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
    }
</style>
