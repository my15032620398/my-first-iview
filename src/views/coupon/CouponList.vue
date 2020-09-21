<template>
    <div class="sp-0">
        <div class="t-1">
            <div class="t-1-1">优惠券列表</div>
        </div>
        <Table border :columns="columns12" :data="data6" :loading="loading" class="t-0" >
            <template slot-scope="{ row }" slot="type">
                <strong>{{ row.type | typeValue}}</strong>
            </template>
            <template slot-scope="{ row }" slot="start_time">
                <strong>{{ row.start_time | formatDate}}</strong>
            </template>
            <template slot-scope="{ row }" slot="end_time">
                <strong>{{ row.end_time | formatDate}}</strong>
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
    import moment from "moment";
    import http from "../../request/http";

    export default {
        name: "CouponList",
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
                        title: '标题',
                        key: 'title',
                        align: "center",
                    },
                    {
                        title: '满额减',
                        key: 'full_money',
                        align: "center",
                    },
                    {
                        title: '优惠额',
                        key: 'minus',
                        align: "center",
                    },
                    {
                        title: '折扣',
                        key: 'rate',
                        align: "center",
                    },
                    {
                        title: '类型',
                        slot: 'type',
                        align: "center",
                    },
                    {
                        title: '开始时间',
                        slot: 'start_time',
                        align: "center",
                    },
                    {
                        title: '结束时间',
                        slot: 'end_time',
                        align: "center",
                    },
                    {
                        title: '描述',
                        key: 'description',
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
                page: 1,
                count: 10,
                total: 0,
            }
        },
        methods: {
            initData() {
                const param = {
                    page: this.page,
                    count: this.count,
                }
                http.fetchGet("/v1/coupon/page", param).then((res) => {
                    this.total = res.data.total;
                    this.data6 = res.data.items
                }).catch(err => {
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
                this.loading = false
            },
            edit(data) {
              this.$router.push({path:'/editCoupon',query:{data:data}})
            },
            remove(id,index) {
                http.fetchDelete('/v1/coupon/'+id,null).then((res)=>{
                    this.$Message.success(res.data.message)
                    this.data6.splice(index, 1);
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })

            },
            onPageChange() {

            }
        },
        created() {
            this.initData();
        },
        computed: {},
        filters: {
            formatDate(time) {
                return moment(time).format('YYYY-MM-DD')
            },
            typeValue(type) {
                let res = '';
                switch (type) {
                    case 1:
                        res = '满减价'
                        break
                    case 2:
                        res = '折扣价'
                        break
                    case 3:
                        res = '无门槛卷'
                        break
                    case 4:
                        res = '满金额折扣卷'
                        break
                }
                return res
            }
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
