<template>
  <div class="app-container calendar-list-container">
    <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px;">

      <el-form-item label="医生姓名" prop="doctorName">
        <el-input :disabled="isDetail" v-model="dataForm.doctorName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input :disabled="isDetail" v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input :disabled="isDetail" v-model="dataForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatarUrl">
        <div style="display: flex;">
          <img :src="dataForm.avatarUrl" class="avatar">
        </div>
      </el-form-item>
      <el-form-item label="学历证" prop="educationUrl">
        <div style="display: flex;">
          <img :src="dataForm.educationUrl" class="avatar">
        </div>
      </el-form-item>
      <el-form-item label="职业资格证" prop="credentialUrl">
        <div style="display: flex;">
          <img :src="dataForm.credentialUrl" class="avatar">
        </div>
      </el-form-item>
      <el-form-item label="教育程度" prop="educationLevel">
        <el-input :disabled="isDetail" v-model="dataForm.educationLevel"></el-input>
      </el-form-item>
      <el-form-item label="医院职称" prop="title">
        <el-input :disabled="isDetail" v-model="dataForm.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input type="textarea" :disabled="isDetail" autosize v-model="dataForm.introduction"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="goBack">返回</el-button>
      <el-button v-if="dataForm.states != 1" :loading="loading" type="primary" @click="submitData">审核</el-button>
    </div>

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
    getOneByEntity,
    auditDoctorInfo
  } from '@/api/doctorInfo'
  import {
    auditType
  } from '@/utils/json'

  const defaultDataForm = {
    doctorId: '',
    openId: '',
    doctorName: '',
    mobile: '',
    idCard: '',
    avatarUrl: '',
    educationLevel: '',
    educationUrl: '',
    title: '',
    credentialUrl: '',
    introduction: '',
    amount: '',
    withdrawPassword: '',
    isAgent: '',
    states: ''
  }


  export default {
    name: 'doctorDetail',
    computed: mapGetters(['loading']),
    data() {
      return {
        isDetail: true,
        dataForm: JSON.parse(JSON.stringify(defaultDataForm)),
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
          doctorId: '',
          states: '',
          auditRemark: ''
        }
      }
    },
    created() {
      const id = this.$route.query.id
      this.getOneDetail(id);
    },
    methods: {
      submitData() {
        this.dialogVisible = true;
        this.ntemp.doctorId = this.dataForm.doctorId;
      },
      getOneDetail(id) {
        getOneByEntity(id).then(response => {
          this.dataForm = response.data
        })
      },
      goBack() {
        this.$router.push({
          name: 'doctorInfoList'
        })
      },
      handleaudit() {
        this.$refs['auditForm'].validate((valid) => {
          if (valid) {
            auditDoctorInfo(this.ntemp).then(() => {
              this.dialogVisible = false
              this.goBack()
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


<style>
  .avatar {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 178px;
    height: 178px;
  }
</style>
