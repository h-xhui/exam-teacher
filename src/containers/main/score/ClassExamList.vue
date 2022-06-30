<template>
  <div>
    <el-card>
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
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="look(scope.$index, tableData)">查看成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="block">-->
<!--          <el-pagination-->
<!--            background-->
<!--            layout="prev, pager, next"-->
<!--            :total="50">-->
<!--          </el-pagination>-->
<!--        </div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  data(){
    return{
      // 表格数据源
      tableData: this.$route.params.index1
    }
  },
  methods:{
    look(index, rows){
      httpServer({
        url:'/exam/inquire'
      },{
        searchKey:'班级',
        searchValue:rows[index].clazzName,
        examId:rows[index].examId
      }).then((res)=>{
        this.$router.push({
          name:'searchScore',
          params:{
            scores:res.data.data,
            examId:rows[index].examId,
            examName:rows[index].title,
            class:rows[index].clazzName,
            index1:this.$route.params.index1
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
