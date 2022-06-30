<template>
  <div>
    <el-card>
      <div class="t1">
        <el-input  placeholder="请输入内容" v-model="tagName">
          <template slot="append" ><el-button @click="addTag"  type="primary">增加</el-button></template>
        </el-input>
      </div>

      <el-table
          :data="tableData"
          border
          style="width: 100%"
      >
          <el-table-column
            prop="name"
            label="知识点"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="创建时间"
            :formatter="formatDate">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click.native.prevent="deleteTag(scope.$index, tableData)">删除</el-button>
              <el-button type="success" size="mini" @click="updateTag">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  data(){
    return{
      tagName:'',
      // 表格数据源
      tableData: this.$route.params.tags
    }
  },
  methods:{
    //开始阅卷
    deleteTag(index, rows){
      httpServer({
        url:'/tag/tag_delete'
      },{
        tagId:Number.parseInt(rows[index].id)
      })
      rows.splice(index, 1)
    },
    updateTag() {

    },
    addTag() {
      httpServer({
        url:'/tag/tag_add'
      },{
        name:this.tagName,
        userName:localStorage.getItem('username')
      })
      httpServer({
        url:'/tag/tag_getList',
        method: 'get'
      },{}).then((res)=>{
        this.tableData = res.data.data;
      })
      this.tagName=''
    },
    formatDate (row, column) {
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
  }
}
</script>

<style lang="less" scoped>
  .addBtn{
    float: right;
    margin: 10px 10px;
  }
  .t1{
    float: right;
    margin: 10px 10px;
  }
</style>
