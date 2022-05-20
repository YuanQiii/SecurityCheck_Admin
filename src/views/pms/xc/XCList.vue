<template>
  <div class="product-list">
    <el-card class="operate-container" shadow="never">
      <div class="left">
        <i class="el-icon-tickets"></i> <span>数据列表</span>
      </div>

      <el-button class="btn-add" @click="handleBatchAdd" size="mini">
        批量添加
      </el-button>
      <el-button class="btn-add" @click="handleExport" size="mini">
        导出到Excel
      </el-button>
    </el-card>

    <product-datasheets
      class="list"
      :loading="loading"
      :dataList="dataList"
      @selectionChange="selectionChange"
      @deleteIndex="deleteIndex"
    />

    <product-operate
      :total="total"
      :selectList="selectList"
      class="product-operate"
      @pageConfigChange="pageConfigChange"
      @batchOperate="batchOperate"
    />

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :show-close="false"
      width="30%"
    >
      <el-form ref="addCountForm" :model="addCount" label-width="120px">
        <el-form-item label="数量" prop="count">
          <el-input
            v-model="addCount.count"
            min="0"
            max="10000"
            auto-complete="off"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="dialogExportTitle"
      :visible.sync="dialogExportVisible"
      :before-close="handleClose"
      :show-close="false"
      width="30%"
    >
      <el-form ref="exportExcelForm" :model="exportCount" label-width="120px">
        <el-form-item label="数量" prop="count">
          <el-input
            v-model="exportCount.count"
            min="0"
            max="10000"
            auto-complete="off"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogExportVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleExportConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { xcProductListApi, xcBatchAddApi, xcBatchExportApi } from "@/api/xc";

import ProductOperate from "./components/ProductOperate.vue";
import ProductDatasheets from "./components/ProductDatasheets.vue";
export default {
  name: "XCList",
  components: {
    ProductOperate,
    ProductDatasheets,
  },
  created() {
    this.getProductList();
  },
  data() {
    return {
      productList: [],
      total: 0,
      loading: false,
      dataList: [],
      selectList: [],
      listConfig: {},
      pageConfig: {
        pageSize: 10,
        pageNum: 1,
      },
      dialogTitle: "添加数据数量(最大值为10000)",
      dialogVisible: false,
      dialogExportTitle: "导出数据量(最大值为10000)",
      dialogExportVisible: false,
      addCount: {
        count: 1,
      },
      exportCount: {
        count: 10000,
      },
    };
  },

  watch: {
    "addCount.count"(newVal) {
      this.addCount.count = Math.min(parseInt(newVal), 10000);
    },
  },

  methods: {
    //  获取商品
    getProductList() {
      this.loading = true;
      xcProductListApi(this.pageConfig.pageSize, this.pageConfig.pageNum).then(
        (response) => {
          console.log(response);
          this.dataList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },

    pageConfigChange(value) {
      this.pageConfig = value;
      this.getProductList();
    },

    selectionChange(value) {
      this.selectList = value;
    },

    deleteIndex(value) {
      console.log(value);
    },

    batchOperate(value) {
      console.log(value);
    },

    getMatchResult(element) {
      let keys = Object.keys(this.listConfig);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];

        if (this.listConfig[key] != null || this.listConfig[key] != undefined) {
          if (key == "keyword") {
            if (!element.name.includes(this.listConfig[key])) {
              return false;
            }
          } else {
            if (this.listConfig[key] != element[key]) {
              return false;
            }
          }
        }
      }
      return true;
    },

    handleBatchAdd() {
      this.dialogVisible = true;
    },
    handleExport() {
      this.dialogExportVisible = true;
    },
    handleClose() {
      if (!this.dialogVisible && this.$refs.addCountForm) {
        this.$refs.addCountForm.clearValidate();
        this.$refs.exportExcelForm.clearValidate();
      }
    },
    handleConfirm() {
      let count = this.addCount.count;
      if (count) {
        xcBatchAddApi(count).then((response) => {
          this.getProductList();
          this.loading = false;
        });
        this.loading = true;
      }
      this.dialogVisible = false;
    },
    handleExportConfirm() {
      let count = this.exportCount.count;
      if (count) {
        this.loading = true;
        xcBatchExportApi(count).then((response) => {
          this.downloadExcel(response);
          this.loading = false;
        });
        this.dialogExportVisible = false;
      }
    },

    downloadExcel(res) {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = URL.createObjectURL(res);
      link.setAttribute("download", `${Date.now()}-1W.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="less" scoped>
.product-list {
  .filter {
    margin-top: 60px;
    margin-left: 20px;
  }
  .operate-container {
    margin-left: 20px;
    margin-top: 20px;
    .left {
      display: inline-block;
      .el-icon-tickets {
        margin-right: 5px;
      }
    }
    .btn-add {
      float: right;
      margin-right: 10px;
    }
  }
  .list {
    margin-left: 20px;
    margin-top: 20px;
  }
  .product-operate {
    margin-bottom: 40px;
  }
}
</style>
