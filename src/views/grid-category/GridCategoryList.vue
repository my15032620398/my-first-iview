<template>
    <div>
        <div class="t-1">
            <div class="t-1-1">六宫格列表</div>
            <Button type="primary" @click="addGridCategory">添加宫格</Button>
        </div>
        <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0">
            <template slot-scope="{row}" slot="img">
                <div class="i-1">
                    <img :src="row.img" class="bannerImg">
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
                <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    import http from "../../request/http";
    import store from "../../store";

    export default {
        name: "GridCategoryList",
        data() {
            return {
                columns12: [
                    {
                        title: 'id',
                        key: 'id',
                        align: "center"
                    },
                    {
                        title: '图片',
                        slot: 'img',
                        align: "center"
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '分类ID',
                        key: 'category_id',
                        align: "center"
                    },
                    {
                        title: '父分类ID',
                        key: 'root_category_id',
                        align: "center"
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
            initGridCategory() {
                http.fetchGet('/v1/grid-category/list', null).then((res) => {
                    this.data6 = res.data
                    this.loading = false
                }).catch(err => {
                    this.$Message.error(err.response.data.message)
                })
            },
            addGridCategory() {
              this.$router.push('/addGridCategory')
            },
            remove(id, index) {
                http.fetchDelete('/v1/grid-category/' + id).then((res) => {
                    this.data6.splice(index, 1);
                    this.$Message.success(res.data.message)
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            },
            edit(data) {
                store.setTempGridCategoryData(data);
                this.$router.push({
                    path: '/editGridCategory',
                    query: {
                        data: data
                    }
                })
            }
        },
        created() {
            this.initGridCategory()
        }
    }
</script>

<style scoped>
    .i-1 {
        display: inline-block;
        width: 50px;
        height: 50px;
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
</style>
