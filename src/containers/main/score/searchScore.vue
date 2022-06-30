<template>
  <div>
   <el-card>
     <div>
       <el-button type="warning" icon="el-icon-arrow-left" @click="back" class="btn">
         返回
       </el-button>
     </div>
<!--     <div>-->
<!--       <div class="t3">-->
<!--         <el-input  placeholder="请输入班级" v-model="className">-->
<!--           <template slot="append" >-->
<!--             <el-button @click="exportScore" type="success" icon="el-icon-download" circle>导出成绩</el-button>-->
<!--           </template>-->
<!--         </el-input>-->
<!--       </div>-->
<!--    &lt;!&ndash; 搜索框 &ndash;&gt;-->
      <div class="t1">
        <el-input  placeholder="请输入内容" v-model="input">
        <template slot="append" ><el-button @click="search"  type="primary" icon="el-icon-search">搜索</el-button></template>
        </el-input>
      </div>
<!--      &lt;!&ndash; 选择器&ndash;&gt;-->
<!--       <div class="t2">-->
<!--          <el-select v-model="value" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--        </el-select>-->
<!--       </div>-->
<!--     </div>-->
      <div>
      <!--表格区域 -->
        <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="clazz"
            label="班级"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="学号">
          </el-table-column>
           <el-table-column
            prop="examTitle"
            label="考试名称">
          </el-table-column>
           <el-table-column
            prop="score"
            label="成绩">
          </el-table-column>
        </el-table>
      </div>
     <div>
       <el-button @click="exportScore" type="success" icon="el-icon-download" class="downloadBtn">导出成绩</el-button>
     </div>
   </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";
import {exportExcel} from "../../../components/httpServer/api";
import {MessageBox} from "element-ui";

export default {
        data(){
            return{
                // 选择器源
                options:[
                    {
                        value:'姓名',
                        lable:'姓名'
                    },
                    {
                        value:'学号',
                        lable:'学号'
                    },
                ],
                value:'',
                input:'',
                className:'',
        // 表格数据源
        tableData: this.$route.params.scores
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

            exportScore() {
              exportExcel('/score/export', {
                clazz:this.$route.params.class,
                examId:this.$route.params.examId,
                examName:this.$route.params.examName,
                fileName:this.$route.params.class+'_'+this.$route.params.examName+'_考试成绩'
              });
              // httpServer({
              //   url:'score/export'
              // })
            },
          back() {
            this.$router.push({
              name : 'classExamList',
              params : {
                index1:this.$route.params.index1
              }
            });
          }
        }
}
</script>

<style>
  .t1{
      float: right;
      margin: 10px 10px;
  }
  .t2{
      float: right;
      margin: 10px 10px;
      width: 150px;
  }
  .t3{
    float: left;
    margin: 10px 10px;
  }
  .btn{
    float: left;
    margin: 10px 10px;
  }
  .downloadBtn{
    float: inside;
    margin: 10px 10px;
  }
</style>
