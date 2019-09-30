<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 100px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile" clearable></el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="基因检测单号" v-model="listQuery.orderNo" clearable></el-input>
      <el-select style="width: 130px" class="filter-item" v-model="listQuery.payStates">
        <el-option v-for="item in payStatesList" :label="item.value" :value="item.key"></el-option>
      </el-select>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="60px" align="center" label="检测名称">
        <template slot-scope="scope">
          <span>{{scope.row.geneName}}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="60px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="基因检测单号">
        <template slot-scope="scope">
          <span>{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="检测的图片地址">
        <template slot-scope="scope">
          <span>{{scope.row.geneUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{payStates[scope.row.payStates]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="120px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" data-id="1002" v-display type="primary" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column> -->
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
  } from '@/api/geneInfo'
  import display from '@/directive/display'

  export default {
    name: "geneInfo",
    directives: {
      display
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        list: [],
        payStates:['支付中','支付成功','支付失败'],
        payStatesList:[{key:"",value:"请选择"},{key:"0",value:"支付中"},{key:"1",value:"支付成功"},{key:"2",value:"支付失败"}],
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          mobile: '',
          payStates:'',
          orderNo:''
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
          name: "geneDetail",
          query: {
            id: row.geneId
          }
        })
      }
    }
  }
</script>
