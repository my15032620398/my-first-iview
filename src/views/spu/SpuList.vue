<template>
    <div class="sp-0">
        <div class="t-1">
            <div class="t-1-1">SPU列表</div>
            <Button type="primary" @click="addSPU">添加SPU</Button>
        </div>
        <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0"  >
            <template slot-scope="{row}" slot="img">
                <div class="i-1">
                    <img :src="row.img" class="bannerImg">
                </div>
            </template>
            <template slot-scope="{ row }" slot="online">
                <strong>{{ row.online=='1'?'是':'否' }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
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
        name: "SpuList",
        data() {
            return {
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '图片',
                        slot: 'img',
                        align: "center",
                        width: 150
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center",
                        width: 200
                    },
                    {
                        title: '副标题',
                        key: 'subtitle',
                        align: "center",
                    },
                    {
                        title: '分类ID',
                        key: 'category_id',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '价格(元)',
                        key: 'price',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '是否上架',
                        slot: 'online',
                        align: "center",
                        width: 100
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
                page: 1,
                count: 10,
                total: 0,
            }
        },
        methods: {
            show(categoryRootId) {
                store.setCategoryRootId(categoryRootId);
                this.$router.push({path: '/subCategoryList', query: {id: categoryRootId}})
            },
            edit(spuData) {
                store.setSpuDetail(spuData)
                this.$router.push({path: '/editSpu', query: {data: spuData.id}})
            },
            remove(id, index) {
                http.fetchDelete('/v1/category/' + id, null).then((res => {
                    this.data6.splice(index, 1);
                    this.$Message.success(res.data.message)
                })).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            initData() {
                const param = {
                    page: this.page,
                    count: this.count,
                }
                http.fetchGet("/v1/spu/page", param).then((res) => {
                    this.total = res.data.total;
                    this.data6 = res.data.items
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                this.loading = false
            },
            onPageChange(page) {
                this.page = page;
                this.initData();
            },
            addSPU() {
                this.$router.push('/addSpu')
            },
        },
        created() {
            this.initData();
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

    .t-0 {
        display: flex;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
    }
    .top {
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
