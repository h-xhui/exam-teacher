<template>
  <div>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>题目列表</span>
          <el-input placeholder="请入试卷标题" v-model="title" class="t3">
            <template slot="append" >
              <el-button @click="submit" type="success" circle>提交</el-button>
            </template>
          </el-input>
        </div>
        <!-- 题目区块 -->
        <div class="box" v-for="(item,index) in testForm" :key="index" >
          <div class="box2">
            {{item.content}}
            <ul class="box3" style="list-style:none">
              <li v-for="(item2,i) in item.choices" :key="i">{{item2}}</li>
            </ul>
          </div>
          <h4 style="color:red">正确答案：</h4>
          <div>{{item.answer}}</div>
          <div style="margin-left:80%">
            <el-checkbox v-model="item.checked">加入试卷</el-checkbox>
            <div v-if="item.checked">
              <span>分值: </span>
              <el-input class="score" v-model="item.score" placeholder="请输入得分" type="Number"></el-input>
            </div>
          </div>

          <el-divider></el-divider>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="totalPage"
          @current-change="changeData">
        </el-pagination>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";
import {MessageBox} from "element-ui";

export default {
  data(){
    return{
      scoreForm:[],
      testForm:this.$route.params.pageData,
      totalData:this.$route.params.totalData,
      totalPage:parseInt(this.$route.params.totalPage),
      pageSize:this.$route.params.pageSize,
      currentPage:1,
      title:''
    }
  },
  methods:{
    changeData(cur) {
      this.currentPage = cur;
      this.testForm = this.totalData.slice(this.pageSize*(cur-1),this.pageSize*(cur-1)+this.pageSize)
    },
    submit() {
      if (this.title === '') {
        MessageBox('请输入试卷标题', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
        return;
      }
      let questions = [];
      for (let i = 0; i < this.totalData.length; ++i) {
        if (this.totalData[i].checked) {
          questions.push(this.totalData[i])
        }
      }
      httpServer({
        url:'/paper/createPaperBySelect'
      },{
        questionList:JSON.stringify(questions),
        title:this.title,
        author:localStorage.getItem("username")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  .score{
    width: 120px;
    margin-top:10px;

  }
  margin: 10px 10px;
  .box2{
    margin: 10px 10px;
    .box3{
      margin: 10px 10px;

    }
  }
}
.backBtn{
  float: left;
  margin: 10px 10px;
}
.submitBtn{
  float: right;
  margin: 10px 10px;
}
.t3{
  float: right;
  width: 200px;
  margin: 10px 10px;
}
</style>
