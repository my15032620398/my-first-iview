<template>
  <div>
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
        name: "BannerList",
        data() {
            return {
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
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '描述',
                        key: 'description'
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
                page: 1,
                count: 10,
                total: 0,
            }
        },
        methods: {
            show(id) {
                store.setBannerId(id);
                this.$router.push({path: '/bannerDetail', query: {id: id}})
            },
            remove(id, index) {
                http.fetchDelete("/v1/banner/" + id).then(() => {
                    this.data6.splice(index, 1);
                }).catch(err => {
                    console.log(err)
                })
            },
            onPageChange(page) {
                this.page = page
                this.getBannerListByPage();

            },
            getBannerListByPage() {
                const param = {
                    page: this.page,
                    count: this.count
                }
                http.fetchGet("/v1/banner/page", param).then((data) => {
                    console.log(data.data)
                    let res = data.data;
                    this.total = res.total;
                    this.data6 = res.items
                }).catch(err => {
                    console.log(err)
                })
                this.loading = false
            },
        },
        created() {
            this.getBannerListByPage();
        },

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
    height: 50px;
  }

</style>
