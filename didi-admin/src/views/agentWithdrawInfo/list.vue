<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile" clearable></el-input>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="60px" align="center" label="代理商姓名">
        <template slot-scope="scope">
          <span>{{scope.row.agentName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="打款订单号">
        <template slot-scope="scope">
          <span>{{scope.row.withdrawNo}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="打款金额">
        <template slot-scope="scope">
          <span>{{scope.row.amount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="打款方式">
        <template slot-scope="scope">
          <span>{{scope.row.withdrawType == '0' ? '到余额' : '到银行卡' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="打款状态">
        <template slot-scope="scope">
          <span>{{states[scope.row.refundStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="操作时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.row" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>



  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  import Cookies from 'js-cookie'
  import {
    queryList
  } from '@/api/agentWithdrawInfo'
  import {

  } from '@/utils/json'
  import display from '@/directive/display'

  export default {
    name: "agentWithdrawInfo",
    directives: {
      display
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        list: [],
        states: ["提现中", "提现失败", "提现成功"],
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          mobile: ''
        }

      }
    },
    created() {
      this.listQuery.userType = '1'
      this.getList();
    },
    methods: {
      getList() {
        queryList(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      }

    }
  }
</script>
