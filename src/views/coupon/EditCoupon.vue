<template>
  <div class="gc-1">
    <div class="h-1">
      <div class="h-1-1">
        更新优惠券
      </div>
      <Button type="primary" icon="ios-undo" @click="back">返回</Button>
    </div>
    <Form :model="couponData" label-position="left" :label-width="100">
      <FormItem label="标题">
        <Input v-model="couponData.title" placeholder="请输入标题" class="form"/>
      </FormItem>
      <FormItem label="满减额">
        <InputNumber
                class="in-1"
                :max="10000"
                :min="0"
                v-model="couponData.full_money"
                :formatter="value => `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                :step="0.1">
        </InputNumber>
        <!--        <CountNumber v-model="skuData.price"></CountNumber>-->
      </FormItem>
      <FormItem label="优惠额">
        <InputNumber
                class="in-1"
                :max="10000"
                v-model="couponData.minus"
                :formatter="value => `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                :step="0.1">
        </InputNumber>
        <!--        <CountNumber v-model="skuData.price"></CountNumber>-->
      </FormItem>
      <FormItem label="折扣">
        <InputNumber
                class="in-1"
                :max="1"
                v-model="couponData.rate"
                :formatter="value => `${parseFloat(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                :step="0.1">
        </InputNumber>
        <!--        <CountNumber v-model="skuData.price"></CountNumber>-->
      </FormItem>
      <FormItem label="类型">
        <i-select v-model="couponData.type" clearable style="width:200px" placeholder="请选择类型">
          <i-option v-for="item in couponTypeList" :value="item.id" :key="item.id">{{ item.id+'-'+item.value
            }}
          </i-option>
        </i-select>
      </FormItem>
      <FormItem label="时间">
        <DatePicker @on-change="onChangeDate" :options="onOptions" v-model="start_end_time" type="daterange"
                    format="yyyy-MM-dd" placeholder="选择开始-结束时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="couponData.description" placeholder="请输入描述" class="form"/>
      </FormItem>
      <div class="gridCategoryBut">
        <Button type="primary" class="saveGridCategoryBut"
                @click="updateSku(couponData)">保存
        </Button>
        <Button html-type="reset">重置</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import http from "../../request/http";
    import moment from "moment";
    export default {
        name: "EditCoupon",
        data() {
            return {
                couponData: {},
                couponTypeList: [
                    {
                        id: 1,
                        value: '满减券'
                    },
                    {
                        id: 2,
                        value: '折扣券'
                    },
                    {
                        id: 3,
                        value: '无门槛券'
                    },
                    {
                        id: 4,
                        value: '满金额折扣券'
                    }
                ],
                onOptions: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                start_end_time: []
            }
        },
        methods: {
            initData() {
                this.couponData = this.$route.query.data;
                console.log(this.couponData)
                this.couponData.full_money = this.couponData.full_money ? this.couponData.full_money : 0
                this.couponData.minus = this.couponData.minus ? this.couponData.minus : 0
                this.couponData.rate =this.couponData.rate?this.couponData.rate:0
                this.start_end_time.push(this.couponData.start_time)
                this.start_end_time.push(this.couponData.end_time)
            },
            back() {
                this.$router.push('/couponList')
            },
            onChangeDate(time) {
                console.log(time)

            },
            updateSku() {
                const param ={
                    title:this.couponData.title,
                    description:this.couponData.description,
                    full_money:this.couponData.full_money,
                    minus:this.couponData.minus,
                    discount:this.couponData.discount,
                    type:this.couponData.type,
                    activity_id:this.couponData.activity_id,
                    start_time:moment(this.start_end_time[0]).format('YYYY-MM-DD hh:mm:ss'),
                    end_time:moment(this.start_end_time[1]).format('YYYY-MM-DD hh:mm:ss')
                }
                console.log(param)
                http.fetchPut('/v1/coupon/'+this.couponData.id,param).then((res)=>{
                    this.$Message.success(res.data.message)
                }).catch(err=>{
                    this.$Message.error(JSON.stringify(err.response.data.message))
                })
            }
        },
        computed: {},
        watch: {},
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
</style>
