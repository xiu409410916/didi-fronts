<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 100px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile" clearable></el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="身份证号" v-model="listQuery.idCard" clearable></el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="问诊单号" v-model="listQuery.orderNo" clearable></el-input>
      <el-select style="width: 130px" class="filter-item" v-model="listQuery.payStates">
        <el-option v-for="item in payStatesList" v-bind:key="item.key" :label="item.value" :value="item.key"></el-option>
      </el-select>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="60px" align="center" label="患者姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="60px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="问诊单号">
        <template slot-scope="scope">
          <span>{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.payStates == 1">{{states[scope.row.states]}}</span>
          <span v-else>{{payStates[scope.row.payStates]}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="医生姓名">
        <template slot-scope="scope">
          <span>{{scope.row.doctorName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" data-id="1002" v-display type="primary" @click="detail(scope.row)">查看详情</el-button>
          <el-button v-if="scope.row.states == 1 || scope.row.states == 3"  class="filter-item" data-id="1002" v-display type="primary" @click="cancelInquiry(scope.row)">取消问诊</el-button>
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
    queryList,systemCancelInquiry
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
        states: ["等待接单中", "正在问诊", "已结束",'已取消'],
        payStates:['支付中','支付成功','支付失败'],
        payStatesList:[{key:"",value:"请选择"},{key:"0",value:"支付中"},{key:"1",value:"支付成功"},{key:"2",value:"支付失败"}],
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          mobile: '',
          payStates:'',
          orderNo:'',
          idCard:''
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
      },
      cancelInquiry(row){
         this.$confirm('确定取消问诊?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var dd = {inquiryId:row.inquiryId}
          systemCancelInquiry(dd).then(response => {
            this.$message({
              type: 'success',
              message: '取消成功!'
            });
          })
        }).catch(() => {

        })
      }
    }
  }
</script>
