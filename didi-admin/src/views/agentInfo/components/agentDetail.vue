<template>
  <div class="app-container calendar-list-container">
    <el-form :rules="rules" ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px;">
      <el-form-item label="供应商姓名" prop="agentName">
        <el-input :disabled="isDetail" v-model="dataForm.agentName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input :disabled="isDetail" v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input :disabled="isDetail" v-model="dataForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="开护行" prop="bankName">
        <el-select style="width: 130px" class="filter-item" v-model="dataForm.bankName">
          <el-option v-for="item in bankList" :key="item.key" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行账号" prop="bankAccount">
        <el-input :disabled="isDetail" v-model="dataForm.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="一级代理" prop="agentIdParent">
         <el-select style="width: 130px" class="filter-item" v-model="dataForm.agentIdParent">
          <el-option v-for="item in firstAgentList" :key="item.agentId" :label="item.agentName" :value="item.agentId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goBack">返回</el-button>
      <el-button :loading="loading" type="primary" v-if="!isDetail" @click="submitData">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Cookies from 'js-cookie'
  import {
    getOneByEntity,
    add,
    edit,
    findList
  } from '@/api/agentInfo'
  import {
    validateNum
  } from '@/utils/validate'
  import {
    bankList,
    agentLevel
  } from '@/utils/json'

  const defaultDataForm = {
    agentId: '',
    agentName: '',
    mobile: '',
    idCard: '',
    bankName: '',
    bankAccount: '',
    agentIdParent: '',
    states: ''
  }

  export default {
    name: 'agentDetail',
    data() {
      const validateNum_N = (rule, value, callback) => {
        if (value == "") {
          callback(new Error('值不能为空'))
        } else if (!validateNum(value)) {
          callback(new Error('请输入整数'))
        } else {
          callback()
        }
      }
      return {
        isDetail: true,
        dataForm: JSON.parse(JSON.stringify(defaultDataForm)),
        bankList:bankList,
        agentLevel:agentLevel,
        firstAgentList:[{agentId:'0',agentName:'系统'}],
        rules: {
          agentName: [{
            required: true,
            message: '姓名是必填项',
            trigger: 'blur'
          }],
          mobile: [{
              required: true,
              message: '手机号是必填项',
              trigger: 'blur'
            },
            {
              required: true,
              trigger: 'blur',
              validator: validateNum_N
            }
          ],
          idCard: [{
            required: true,
            message: '身份证是必填项',
            trigger: 'blur'
          }],
          bankName: [{
            required: true,
            message: '开户行是必填项',
            trigger: 'blur'
          }],
          bankAccount: [{
              required: true,
              message: '银行账号是必填项',
              trigger: 'blur'
            },
            {
              required: true,
              trigger: 'blur',
              validator: validateNum_N
            }
          ],
          agentIdParent: [{
            required: true,
            message: '时长是必填项',
            trigger: 'blur'
          }]
        }
      }
    },
    computed: mapGetters(['loading']),
    created() {
      const id = this.$route.query.id
      this.isDetail = this.$route.query.isDetail
      this.getFirstAgentList();
      if (id != null && id != '') {
        this.getOneDetail(id);
      }
    },
    methods: {
      getFirstAgentList(){
        const query = {states:1,agentLevel:1};
        findList(query).then(response => {
          this.firstAgentList = this.firstAgentList.concat(response.data);
        })
      },
      getOneDetail(id) {
        const query = {agentId:id};
        getOneByEntity(query).then(response => {
          this.dataForm = response.data
        })
      },
      submitData() {
        let that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            add(that.dataForm).then((response) => {
              that.$router.push({
                name: 'agentInfo'
              })
              that.$message({
                message: '保存成功',
                type: 'success'
              })
            })
          }
        })
      },
      goBack() {
        this.$router.push({
          name: 'agentInfo'
        })
      }
    }
  }
</script>
