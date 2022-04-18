<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-04-05 16:52:10
 * @FilePath: \vue_manage\src\views\pms\list\ProductDatasheets.vue
-->
<template>
  <div class="product-datasheets">
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="dataList"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="序列码" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="公司" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.company }}</template>
        </el-table-column>
        <el-table-column label="查询地址" align="center">
          <template slot-scope="scope">{{ scope.row.queryUrl }}</template>
        </el-table-column>
        <el-table-column label="首次查询时间" align="center">
          <template slot-scope="scope">{{ scope.row.firstQueryTime }}</template>
        </el-table-column>
        <el-table-column label="查询次数" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.queryCount }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <!-- <p>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)"
                >编辑
              </el-button>
            </p> -->
            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDatasheets",
  props: {
    dataList: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSelectionChange(selection) {
      this.$emit("selectionChange", selection);
    },
    handleDelete(value) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("deleteIndex", value);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>