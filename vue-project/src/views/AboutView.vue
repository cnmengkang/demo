<template>
  <div class="about">
    <div class="container">
      <div class="box" v-for="(item, index) in list" :key="index">
        <p class="right user p" v-if="item.user">
          <span>{{ item.user }}---{{ index }}</span><b>U</b>
        </p>
        <p class="left system p" v-if="item.system">
          <b>S</b><span>{{ item.system }}---{{ index }}</span>
        </p>
      </div>

    </div>
    <div class="footer">
      <div class="input">
        <input placeholder="输入你的问题？" v-model="value" />
        <button @click="sedSubmit">提交</button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      list: [{
        user: '今天星期几？', system: '今天时星期一，天气很好'
      }]
    }
  },
  methods: {
    sedSubmit() {
      this.list.push({ user: this.value })
      setTimeout(() => {
        this.list.push({ system: `你好呀` })
      }, 1000)
      this.value = ''
    },

  }
}
</script>
<style>
.about {
  width: 80%;
}

.container {
  min-height: 100%;
  width: 100%;
  display: flex;
  border: 1px solid red;
  margin: 0 auto;
  flex-wrap: wrap;
}

.box {
  width: 100%;
  padding: 10px 30px;
}

.p {

  width: 100%;

}

.box p b {
  border-radius: 50%;
  color: #fff;
  background-color: #000;
  display: inline-block;
  width: 44px;
  text-align: center;
  height: 44px;
  line-height: 44px;
}

.left {
  float: left;
}

.left span {
  width: auto;
  display: inline-block;
  background: pink;
  color: #000;
  padding: 10px 15px;
  border-radius: 4px;
}

.right span {
  width: auto;
  display: inline-block;
  background: green;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
}

.right {
  float: right;
  text-align: right;
}
</style>
