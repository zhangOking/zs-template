module.exports = `<template>
  <div>
    <h4>{{title}}</h4>
    <el-table
    v-loading="loading"
    :data="operationRecordsList"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :fit="fit"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :current-row-key="currentRowKey"
    :row-class-name="rowClassName"
    :row-style="rowStyle"
    :row-key="rowKey"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :default-sort="defaultSort"
    :tooltip-effect="tooltipEffect"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"

    @select="select"
    @select-all="selectAll"
    @selection-change="selectionChange"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
    @cell-click="cellClick"
    @cell-dblclick="cellDblclick"
    @row-click="rowClick"
    @row-contextmenu="rowContextmenu"
    @row-dblclick="rowDblclick"
    @header-click="headerClick"
    @sort-change="sortChange"
    @filter-change="filterChange"
    @current-change="currentChange"
    @header-dragend="headerDragend"
    @expand-change="expandChange"
    >
      <slot></slot>
    </el-table>

    <div class="zs-template__pagination">
      <el-pagination
        v-if="showPagination"
        class="pagination zs-template__pagination--pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled='loading'
        :small="pgSmall"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :layout="layout"
        :total="total"
      ></el-pagination>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {

    title: {
      type: String
    },
    urlFunc: {
      type: [Function, Object, String]
    },
    dataFunc: {
      type: [Function, Object],
      default: null
    },

    pagination: {
      default: true,
      type: Boolean
    },

    // elment-table默认参数
    height: [String, Number],
    maxHeight: [String, Number],
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    currentRowKey: [String, Number],
    rowClassName: [Function, String],
    rowStyle: [Function, Object],
    rowKey: [Function, String],
    emptyText: [String],
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandRowKeys: [Array],
    defaultSort: {
      type: Object,
      default () {
        return {}
      }
    },
    tooltipEffect: [String],
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: [String],
    summaryMethod: [Function],

    // pagination的参数
    showPagination: {
      type: Boolean,
      default: false
    },
    pgSmall: {
      type: Boolean,
      default: false
    },

    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    pageSizes: {
      type: Array,
      default () {
        return +this.pageSize === 10 ? [10, 20, 50, 100] : [this.pageSize, 10, 20, 50, 100].sort((a, b) => { return a - b })
      }
    }

  },
  data () {
    return {
      operationRecordsList: [],
      newDate: {},
      loading: false,
      total: 0,
      pageSize: 10,
      currentPage: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(val, '---handleSizeChange')
      this.currentPage = 1
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData()
      console.log(val, '---handleCurrentChange')
    },
    getTableData () {
      this.loading = true
      this.getDate()
      this.urlFunc()(this.newDate).then(res => {
        this.operationRecordsList = res.data.list
        this.total = res.data.pagination.total || 0
        this.loading = false
        this.$emit('operationRecordsList', this.operationRecordsList)
      }).catch(() => {
        this.$emit('operationRecordsList', [])
        this.loading = false
      })
    },
    getDate () {
      console.log(this.currentPage, '---this.currentPage')
      this.newDate = Object.assign(this.dataFunc(), {
        page: this.currentPage,
        size: this.pageSize
      })
    },
    expandChange (row, expandedRows) {
      this.$emit('expandChange', row, expandedRows)
    },
    reloadTable () {
      this.currentPage = 1
      this.pageSize = 10
      this.getTableData()
    },
    select () {},
    selectAll () {},
    selectionChange () {},
    cellMouseEnter () {},
    cellMouseLeave () {},
    cellClick () {},
    cellDblclick () {},
    rowClick () {},
    rowContextmenu () {},
    rowDblclick () {},
    headerClick () {},
    sortChange () {},
    filterChange () {},
    currentChange () {},
    headerDragend () {}
  }
}
</script>

<style>
.zs-template__pagination::after {
  content: '';
  display: block;
  clear: both;
}
.zs-template__pagination .zs-template__pagination--pagination {
  float: right !important;
}
</style>`