<template>
  <div>
      <el-card>
        <div>
          <el-button type="warning" icon="el-icon-arrow-left" @click="back" class="btn">
            返回
          </el-button>
        </div>
        <div>
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
              prop="studentId"
              label="学号">
            </el-table-column>
            <el-table-column
              prop="code"
              label="状态">
            </el-table-column>
            <el-table-column
              label="阅卷">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="startCheck(scope.$index, tableData)" v-text="tableData[scope.$index].code === '已阅卷'?'重新阅卷':'开始阅卷'">开始阅卷</el-button>
                <el-button type="primary" size="mini" @click="lookPaper(scope.$index, tableData)" :disabled="tableData[scope.$index].code === '未阅卷'">查看试卷</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
     data(){
       return{
        tableData: this.$route.params.index2,
        examId: this.$route.params.examId,
         index1:this.$route.params.index1
      }
     },
    methods:{
        //开始阅卷
      startCheck(index, rows){
        httpServer({
          url:'/paper/getUserExam',
          method:'get'
        },{
          userId:rows[index].userId,
          examId:this.examId
        }).then((res)=>{
          let scores = [];
          for (let i = 0; i < res.data.data.length; ++i) {
            scores.push(res.data.data[i].queScore);
          }
          this.$router.push({
            name:'checkPaper',
            params:{
              index3:res.data.data,
              index2:rows,
              index1:this.index1,
              examId:this.examId,
              userId:rows[index].userId,
              scores:scores
            }
          });
        })
      },
      lookPaper(index, rows) {
        httpServer({
          url:'/paper/getUserExam',
          method:'get'
        },{
          userId:rows[index].userId,
          examId:this.examId
        }).then((res)=>{
          this.$router.push({
            name:'showPaper',
            params:{
              index3:res.data.data,
              index2:rows,
              index1:this.index1,
              examId:this.examId,
            }
          });
        })
      },
      back() {
        this.$router.push({
          name:'showClassExam',
          params:{
            index1:this.index1
          }
        });
      }
    }
}
</script>

<style lang="less" scoped>
  .btn{
    float: left;
    margin: 10px 10px;
  }
</style>
