<template>
  <div class="app-container calendar-list-container">
   <!-- <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile" clearable></el-input>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div> -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="60px" align="center" label="医生姓名">
        <template slot-scope="scope">
          <span>{{scope.row.doctorName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" align="center" label="用户手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="60px" align="center" label="评论打分">
        <template slot-scope="scope">
          <span>{{scope.row.commentRate}}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="60px" align="center" label="评论内容">
        <template slot-scope="scope">
          <span>{{scope.row.commentContent}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="60px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.states == 0" class="filter-item" data-id="1002" v-display type="primary" @click="Comment(scope.row)">重置密码</el-button>
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
  } from '@/api/doctorCommentInfo'
  import display from '@/directive/display'

  export default {
    name: "doctorCommentInfo",
    directives: {
      display
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        list: [],
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10
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
      }
    }
  }
</script>
