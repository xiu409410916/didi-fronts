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
  } from '@/api/geneInfo'
  import {
    auditType
  } from '@/utils/json'

  const defaultDataForm = {
    geneId: '',
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
    name: 'geneDetail',
    computed: mapGetters(['loading']),
    data() {
      return {
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
        this.ntemp.geneId = this.dataForm.geneId;
      },
      getOneDetail(id) {
        getOneByEntity({"geneId":id}).then(response => {
          this.dataForm = response.data
          this.picUrlList = response.data.picUrl.split(',');
        })
      },
      goBack() {
        this.$router.push({
          name: 'geneInfo'
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
