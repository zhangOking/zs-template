module.exports = `<template>
  <div class="zs-template">
    <section>
      <search-com @search="search"></search-com>
    </section>

    <section>
      <table-com
        ref="tableRef"
        :dataFunc="dataFunc"
        :urlFunc="urlFunc"
        showPagination
        :layout="'prev, pager, next'"
        >
          <el-table-column
            v-for="item in TABLEHEADER"
            :prop="item.prop"
            :label="item.label"
            :key="item.label">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button 
                type="text" 
                size="mini" 
                @click="operation(scope.row)">
                操作
              </el-button>
            </template>
          </el-table-column>
        </table-com>
    </section>
  </div>

</template>

<script>
import { TABLEHEADER } from './unit/ENUM'
export default {
  components: {
    'table-com': () => import('./components/tableCom'),
    'search-com': () => import('./components/searchCon.vue')
  },
  data () {
    return {
      TABLEHEADER,
      searchMsg: {}
    }
  },
  methods: {
    // 查询
    search (msg) {
      this.searchMsg = msg
      this.$refs['tableRef'].reloadTable()
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // table api参数
    dataFunc () {
      return this.searchMsg
    },
    // table api
    urlFunc () {
      return '' // function
    },
    operation (row) {
      console.log(row)
    }

  }
}
</script>

<style scoped>
.zs-template  section {
  margin: 15px 0;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 20px;
}
</style>`
