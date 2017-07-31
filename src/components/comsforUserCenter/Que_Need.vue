<template>
    <div style="width:800px;margin-left:-70px;margin-top:20px">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-FormForUpdateInfo" >
            <el-form-item label="标题：" prop="title" >
                <el-input v-model="form.title" :rows="1"  ></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="description">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="分类：" prop="category">
                <el-input type="textarea" v-model="form.category"></el-input>
            </el-form-item>
            <el-form-item label="截止日期：" class="time" prop="end_time">
                <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择截止日期" format="yyyy-MM-dd HH:mm:ss" @change="datetimeChange">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">发布问题</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../../publicAPI/config'
export default {
    props: ['btnset'],
    data() {
        return {
            activeName: 'seventh',
            buttons: this.btnset,
            form: {
                title: '',
                description: '',
                category: '',
                end_time:''
            },
            rules: {
              title: [
                { required: true, message: '标题不能为空', trigger: 'blur' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
              ],
              description: [
                { required: true, message: '描述不能为空', trigger: 'blur' },
                { min: 20, max: 200, message: '长度在 20 到 200 个字符', trigger: 'blur' }
              ],
              category: [
                { required: true, message: '分类不能为空', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ],
              end_time: [
                { required: true, message: '截止日期不能为空', trigger: 'blur' },
                { trigger: 'blur' }
              ],

            }
        };
    },
    methods: {
      datetimeChange(value) {
          console.log(value);
          this.form.end_time = value;
          console.log(this.form.end_time);
      },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        onSubmit(formName) {

          this.$refs[formName].validate((valid) => {
            if (valid) {
              var querystring = require('querystring'); //Json数据查询器
              let that = this;
              console.log(this.form.imgs);
              axios.post(config.URL + '/TechnicalQuestion/insertTechnical_question',
                      querystring.stringify({
                          title: that.form.title,
                          description: that.form.description,
                          end_time:that.form.end_time,
                          category: that.form.category,
                          tokennum: localStorage.getItem('tokennum')
                      })
                  )
                  .then(function(res) {
                      if (res.data.status == 'success') {
                          alert('发布成功！');
                      } else {
                          alert(res.data.msg)
                      }
                  })
                  .catch(function(error) {
                      console.error('发布失败！请检查所填信息的正确性');
                  });

            } else {
              console.log('提交错误!请保存您的信息！');
              return false;
            }
          });



        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;
}

.hint {
    width: 100%;
    height: 50px;
}
</style>
