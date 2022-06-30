<template>
  <div>
    <el-card>
      <Question type="单选题" ref="single"></Question>
      <Question type="多选题" ref="multi"></Question>
      <Question type="判断题" ref="judge"></Question>
      <Question type="填空题" ref="blank"></Question>
      <Question type="简答题" ref="simple"></Question>
      <div>
        <el-input placeholder="请入试卷标题" v-model="title" class="t3">
          <template slot="append" >
            <el-button @click="onSubmit" type="success" circle>提交</el-button>
          </template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
import Question from "./Question.vue";
import httpServer from "../../../components/httpServer/httpServer";
import {MessageBox} from "element-ui";
export default {
    data(){
        return{
          title:''
        }
    },
    computed:{

    },
    methods:{
      onSubmit() {
        if (this.title === '') {
          MessageBox('请输入试卷标题', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return;
        }
        let typeList = [];
        let tagList = [];
        let numList = [];
        let scores = [];
        let single = this.$refs.single.$data;
        let multi = this.$refs.multi.$data;
        let judge = this.$refs.judge.$data;
        let blank = this.$refs.blank.$data;
        let simple = this.$refs.simple.$data;
        scores.push(single.score);
        scores.push(multi.score);
        scores.push(judge.score);
        scores.push(blank.score);
        scores.push(simple.score);
        for (let i = 0; i < single.knowledge.length; ++i) {
          typeList.push(1);
          tagList.push(single.knowledge[i]);
          numList.push(single.num[i]);
        }
        for (let i = 0; i < multi.knowledge.length; ++i) {
          typeList.push(2);
          tagList.push(multi.knowledge[i]);
          numList.push(multi.num[i]);
        }
        for (let i = 0; i < judge.knowledge.length; ++i) {
          typeList.push(3);
          tagList.push(judge.knowledge[i]);
          numList.push(judge.num[i]);
        }
        for (let i = 0; i < blank.knowledge.length; ++i) {
          typeList.push(4);
          tagList.push(blank.knowledge[i]);
          numList.push(blank.num[i]);
        }
        for (let i = 0; i < simple.knowledge.length; ++i) {
          typeList.push(5);
          tagList.push(simple.knowledge[i]);
          numList.push(simple.num[i]);
        }

        console.log(typeList);
        console.log(tagList);
        console.log(numList);

        httpServer({
          url:'/paper/createPaper',
          method:'post'
        }, {
          typeJson:JSON.stringify(typeList),
          tagJson:JSON.stringify(tagList),
          numJson:JSON.stringify(numList),
          scoreJson:JSON.stringify(scores),
          title:this.title,
          author:localStorage.getItem("username")
        })
      }
    },
    components : {
      Question
    }
}
</script>

<style lang="less" scoped>
    .box1{
        display: flex;
        justify-content: space-around;
        margin:5px 0 20px 0;
    }
    .el-input{
        width: 100px;
    }
    .btn{
        float: right;
        margin: 10px 10px;
    }
    .t3{
      float: right;
      width: 200px;
      margin: 10px 10px;
    }
</style>
