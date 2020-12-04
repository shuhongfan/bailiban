<template>
  <el-form>
    <el-card v-for="(item, index) in testData" :key="index">
      <el-tag>{{ index + 1 }}</el-tag>
      <el-form-item :label="item.question" >
        <br>
        <el-radio-group v-model="form.answer">
          <el-radio :label="item.option1"></el-radio>
          <el-radio :label="item.option2"></el-radio>
          <el-radio :label="item.option3"></el-radio>
          <el-radio :label="item.option4"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-card>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即验证</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      testData: [],
      form: {
        answer: []
      }
    }
  },
  methods: {
    async getTestData () {
      const result = await this.axios.post('/test')
      // console.log(result)
      this.testData = result.data.datas
    },
    onSubmit () {
      console.log('submit!')
    },
    createAnswer () {
      for (var i = 0; i < this.testData.length; i++) {
        var item = { opt: [] }
        const newAnswer = this.form.push(item)
        this.$set(this.form, newAnswer)
      }
    }
  },
  async created () {
    await this.getTestData()
    await this.createAnswer()
  }
}
</script>

<style scoped lang="less">
.el-tag{
  float: left;
  .el-form-item{
    float: left;
  }
}
</style>
