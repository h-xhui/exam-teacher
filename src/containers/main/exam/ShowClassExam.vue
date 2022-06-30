<template>
  <div>
      <el-card>
        <div>
            <!-- 搜索框 -->
          <div class="t1">
            <el-input  placeholder="请输入内容" v-model="input">
              <template slot="append" ><el-button @click="search"  type="primary" icon="el-icon-search">搜索</el-button></template>
            </el-input>
          </div>
            <!-- 选择器-->
          <div class="t2">
            <el-select v-model="value" placeholder="请选择班级">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
    <!--表格区域 -->
          <el-table
          :data="tableData"
          border
          style="width: 100%">
            <el-table-column
              prop="clazzName"
              label="班级"
              width="180">
            </el-table-column>
            <el-table-column
              prop="title"
              label="考试名称">
            </el-table-column>
             <el-table-column
              prop="beginTime"
              label="考试时间"
              :formatter="formatDate">
            </el-table-column>
             <el-table-column
              label="阅卷">
              <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="startCheck(scope.$index, tableData)">开始阅卷</el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          <div class="block">-->
<!--          <el-pagination-->
<!--            background-->
<!--            layout="prev, pager, next"-->
<!--            :total="50">-->
<!--          </el-pagination>-->
<!--          </div>-->
        </div>
      </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";
import {MessageBox} from "element-ui";

export default {
  data(){
    return{
                // 选择器源
      options:[
        {
          value:'class1',
          lable:'一班'
        },
        {
          value:'class2',
          lable:'二班'
        },
      ],
      value:'',
      input:'',
        // 表格数据源
      tableData: this.$route.params.index1
     }
  },
  methods:{
            // 搜索
    search(){
      MessageBox('敬请期待', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
    },
    //开始阅卷
    startCheck(index, rows){
      httpServer({
        url:'/exam/get_exam_list_byClass'
      },{
        clas:rows[index].clazzName,
        examId:rows[index].examId
      }).then((res)=>{
        let newData = res.data.data;
        for (let i = 0; i < newData.length; ++i) {
          newData[i].code = newData[i].code >= 0? '已阅卷' : '未阅卷'
        }
        this.$router.push({
          name:'showStuExam',
          params:{
            index2:res.data.data,
            examId:rows[index].examId,
            index1:rows
          }
        })
      })
    },
    formatDate (row, column) {
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes()
    },
  }
}
</script>

<style lang="less" scoped>
.t1{
    float: right;
    margin: 10px 10px;
}
.t2{
    float: right;
    margin: 10px 10px;
    width: 150px;
}
.block{
    margin: 10px 10px;
    float: right;
}
</style>
