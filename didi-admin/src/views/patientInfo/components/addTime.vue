<template>
  <div class="app-container calendar-list-container">
    <el-form :rules="rules" ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px;">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item label="时长(分钟)" prop="time">
        <el-input type="tetxtarea" v-model="dataForm.time" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goBack">返回</el-button>
      <el-button :loading="loading" type="primary" @click="submitData">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Cookies from 'js-cookie'
  import {
    addTime
  } from '@/api/patientInfo'
  import {
    validateNum
  } from '@/utils/validate'

  export default {
    name: 'addPatientTime',
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
        dataForm: {},
        rules: {
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
          time: [{
              required: true,
              message: '时长是必填项',
              trigger: 'blur'
            },
            {
              required: true,
              trigger: 'blur',
              validator: validateNum_N
            }
          ]
        }
      }
    },
    computed: mapGetters(['loading']),
    methods: {
      submitData() {
        let that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addTime(that.dataForm).then((response) => {
              that.$router.push({
                name: 'patientInfo'
              })
              that.$message({
                message: '增加成功',
                type: 'success'
              })
            })
          }
        })
      },
      goBack() {
        this.$router.push({
          name: 'patientInfo'
        })
      }
    }
  }
</script>
