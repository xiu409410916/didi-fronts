<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile" clearable></el-input>
      <el-button class="filter-item" data-id="1001" v-display type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" data-id="1002" v-display type="primary" @click="addAgent">新增</el-button> -->
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column min-width="50px" align="center" label="代理商姓名">
        <template slot-scope="scope">
          <span>{{scope.row.agentName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="代理商等级">
        <template slot-scope="scope">
          <span>{{agentLevel[scope.row.agentLevel]}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{states[scope.row.states]}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.states != 1" class="filter-item" data-id="1002" v-display type="primary" @click="audit(scope.row.agentId)">审核</el-button>
          <el-button v-if="scope.row.agentLevel == 0 && scope.row.states == 1" class="filter-item" data-id="1002" v-display type="primary" @click="updateLevel(scope.row.agentId)">升级为一级代理</el-button>
          <el-button v-if="scope.row.states != 1" class="filter-item" data-id="1002" v-display type="primary" @click="update(scope.row.agentId)">编辑</el-button>
          <el-button class="filter-item" data-id="1002" v-display type="primary" @click="detail(scope.row.agentId)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.row" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>


    <!-- 审核 -->
    <el-dialog title="审核" :visible.sync="dialogVisible">
      <el-form :rules="nrules" ref="auditForm" :model="ntemp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="审核意见" prop="states">
          <el-select style="width: 130px" class="filter-item" v-model="ntemp.states">
            <el-option v-for="item in auditType" :key="item.key" :label="item.name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注" v-model="ntemp.auditRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" :loading="loading" @click="handleaudit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  import Cookies from 'js-cookie'
  import {
    queryList,
    auditAgentInfo,
    updateAgentLevel
  } from '@/api/agentInfo'
  import {
    agentLevel,
    auditState,
    auditType
  } from '@/utils/json'
  import display from '@/directive/display'

  export default {
    name: "agentInfoList",
    directives: {
      display
    },
    data() {
      return {
        listLoading: false,
        total: 0,
        list: [],
        agentLevel: agentLevel,
        states: auditState,
        multipleSelection: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          mobile: ''
        },

        dialogVisible: false,
        auditType: auditType,
        nrules: {
          states: [{
            required: true,
            message: '请选择审核意见',
            trigger: 'blur'
          }]
        },
        ntemp: {
          agentId: '',
          states: '',
          auditRemark: ''
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
      detail(id) {
        this.$router.push({
          name: "agentDetail",
          query: {
            id: id,
            isDetail: true
          }
        })
      },
      addAgent() {
        this.$router.push({
          name: "agentDetail",
          query: {
            id: '',
            isDetail: false
          }
        })
      },
      update(id) {
        this.$router.push({
          name: "agentDetail",
          query: {
            id: id,
            isDetail: false
          }
        })
      },
      audit(id) {
        this.dialogVisible = true;
        this.ntemp.agentId = id;
      },
      updateLevel(id) {
        const param = {agentId:id};
        this.$confirm('确定升级为一级代理吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateAgentLevel(param).then(response => {
            this.getList();
            this.$message({
              message: '升级成功',
              type: 'success'
            })
          })
        }).catch(() => {
        
        })
      },
      handleaudit() {
        this.$refs['auditForm'].validate((valid) => {
          if (valid) {
            auditAgentInfo(this.ntemp).then(() => {
              this.dialogVisible = false
               this.getList();
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            })
          }
        })
      },
    }
  }
</script>
