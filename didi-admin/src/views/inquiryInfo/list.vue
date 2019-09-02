<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="身份证号" v-model="listQuery.idCard" clearable></el-input>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="60px" align="center" label="患者姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{states[scope.row.states]}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="医生姓名">
        <template slot-scope="scope">
          <span>{{scope.row.doctorName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" data-id="1002" v-display type="primary" @click="detail(scope.row)">查看详情</el-button>
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
  } from '@/api/inquiryInfo'
  import display from '@/directive/display'

  export default {
    name: "inquiryInfo",
    directives: {
      display
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        list: [],
        states: ["新问诊", "正在问诊", "已结束",'已取消'],
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          mobile: ''
        }
      }
    },
    created() {
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
      },
      detail(row) {
        this.$router.push({
          name: "inquiryDetail",
          query: {
            id: row.inquiryId
          }
        })
      }
    }
  }
</script>
