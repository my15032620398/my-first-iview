<template>
  <div class="ci-0">
    <div class="ci-1">
      <div class="upClasses">
        <a @click="subNumber(precisionValue)" class="ci-3">-</a>
      </div>
      <div class="downClasses">
        <a @click="addNumber(precisionValue)" class="ci-3">+</a>
      </div>
    </div>
    <input class="ci-2"
           :value="precisionValue"
           @keydown.stop="keyDown"
           @keyup.enter="keyEnter"
           @input="change">
  </div>
</template>

<script>
    export default {
        name: "CountNumber",
        props: {
            value: {
                default: 10,
                type: Number
            },
            precision: {
                default: 2,
                type: Number
            },
        },
        data() {
            return {
                currentValue: this.value,
                visible:true
            }
        },
        methods: {
            addNumber(val) {
                val = Number(val);
                this.currentValue = val + 0.1
            },
            subNumber(val) {
                val = Number(val);
                this.currentValue = val - 0.1
            },
            keyDown(e) {
                if (e.key === 'ArrowUp') {
                    this.up(e);
                } else if (e.key === 'ArrowDown') {
                    this.down(e);

                }
            },
            keyEnter(e){
               this.change(e)
                e.target.blur()
            },
            up(e) {
                this.changeStep('up', e)
            },
            down(e) {
                this.changeStep('down', e)
            },
            changeStep(type, e) {
                console.log(e.target.value)
                if (type === 'up') {
                    this.addNumber(e.target.value)
                } else if (type === 'down') {
                    this.subNumber(e.target.value)
                }
            },
            change(event) {
                if (event.type == 'change') return;
                let val = event.target.value.trim();
                const res = this.isNumber(val)
                if(!res){
                    event.target.value = this.currentValue.toFixed(this.precision);
                    return;
                }
                this.currentValue = Number(val)
            },
            isNumber(value) {
                var z_reg = /^(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/;
                return z_reg.test(value);
            }
        },
        computed: {
            precisionValue() {
                return this.currentValue.toFixed(this.precision)
            }
        }
    }
</script>

<style scoped>
  .ci-0 {
    position: relative;

  }

  .ci-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    z-index: 1;
    width: 150px;
    border-radius: 4px;
    border: 1px solid #dcdee2
  }

  .ci-2 {
    text-align: center;
    position: absolute;
    z-index: 2;
    left: 32px;
    top: 1px;
    bottom: 1px;
    height: 30px;
    width: 86px;
    border: none
  }

  .ci-3 {
    display: block;
    text-align: center;
    font-size: 26px;
  }

  .upClasses {
    text-align: center;
    width: 32px;
    height: 32px;
    display: inline-block;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .downClasses {
    text-align: center;
    width: 32px;
    height: 32px;
    display: inline-block;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
</style>
