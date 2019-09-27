<template>
  <div class="app-container calendar-list-container">
    <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px;">

      <el-form-item label="问题描述">
        <span>{{dataForm.detail}}</span>
      </el-form-item>
      <el-form-item label="上传图片" prop="picUrlList">
        <div style="display: flex;">
          <img :src="item" class="avatar" v-for="item in picUrlList">
        </div>
      </el-form-item>
      <el-form-item label="患者姓名">
        <span>{{dataForm.realName}}</span>
      </el-form-item>
      <el-form-item label="患者身份证号">
        <span>{{dataForm.idCard}}</span>
      </el-form-item>
      <el-form-item label="患者体重(kg)">
        <span>{{dataForm.weight}}</span>
      </el-form-item>
      <el-form-item label="患者描述">
        <span>{{dataForm.allergic == '0' ? '无' : '有'}}过敏史/</span>
        <span>{{conceive[dataForm.conceive]}}/</span>
        <span>肝功能{{dataForm.liver == '0' ? '异常' : '正常'}}/</span>
        <span>肾功能{{dataForm.kidney == '0' ? '异常' : '正常'}}</span>
      </el-form-item>
      <el-form-item label="过往病史">
        <span>{{dataForm.medicalHistory}}</span>
      </el-form-item>
      <el-form-item label="医生姓名">
        <span>{{dataForm.doctorName}}</span>
      </el-form-item>
  <!--    <el-form-item label="医生简介">
        <span>{{dataForm.introduction}}</span>
      </el-form-item> -->
      <el-form-item label="问诊状态" class="red">
        <span v-if="dataForm.payStates == 1">{{states[dataForm.states]}}</span>
        <span v-else>{{payStates[dataForm.payStates]}}</span>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="goBack">返回</el-button>
    </div>


  </div>


</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Cookies from 'js-cookie'
  import {
    getOneByEntity
  } from '@/api/inquiryInfo'
  import {
    auditType
  } from '@/utils/json'

  const defaultDataForm = {
    inquiryId: '',
    detail: '',
    picUrl: '',
    realName: '',
    idCard: '',
    gender: '',
    weight: '',
    allergic: '',
    conceive: '',
    liver: '',
    kidney: '',
    medicalHistory: '',
    states: '',
    doctorName: '',
    receptTime: '',
    payStates:'',
    introduction:''
  }


  export default {
    name: 'inquiryDetail',
    computed: mapGetters(['loading']),
    data() {
      return {
        conceive:['没有备孕计划','备孕中','怀孕中','哺乳期'],
        states: ["等待接单中", "正在问诊", "已结束",'已取消'],
        payStates:['支付中','支付成功','支付失败'],
        picUrlList: [],
        dataForm: JSON.parse(JSON.stringify(defaultDataForm))
      }
    },
    created() {
      const id = this.$route.query.id
      this.getOneDetail(id);
    },
    methods: {
      submitData() {
        this.dialogVisible = true;
        this.ntemp.inquiryId = this.dataForm.inquiryId;
      },
      getOneDetail(id) {
        getOneByEntity({"inquiryId":id}).then(response => {
          this.dataForm = response.data
          this.picUrlList = response.data.picUrl.split(',');
        })
      },
      goBack() {
        this.$router.push({
          name: 'inquiryInfo'
        })
      }
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
  .red{
    color: red;
  }
</style>
