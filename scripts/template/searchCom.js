module.exports = `<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      inline
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="名称"
        prop="name"
        >
        <el-input
          v-model="ruleForm.name"
          style="width: 200px"
          placeholder="请输入名称">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')">
          查询
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 查询
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('search', this.ruleForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    }
  }
</script>`