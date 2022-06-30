<template lang="html">
    <div class="exam-card">
      <div class="card-header clearfix">
        <div class="time f-l">
          <i class="el-icon-time"></i>
          <span v-cloak>{{hour}}:{{min}}:{{sec}}</span>
        </div>
        <div class="answer-card f-l m-l-20" @click="dialogVisible = true">
          <i class="el-icon-date"></i>
          <span>答题卡</span>
        </div>
        <div class="submit-paper f-r">
          <el-button type="primary" round @click="submitPaper">交卷</el-button>
        </div>
      </div>
      <div class="card-content">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>第{{questionId}}题（{{questionTypeText}}）</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="nextQuestion">下一题</el-button>
          </div>
          <div>
            <!-- 单选 -->
            <div class="q-single" v-show="type == 2">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item" v-for="(item,index) in currentQuestion.choice">
                  <el-radio v-model="radio" :label="index">{{item}}</el-radio>
                </div>
              </div>
            </div>

            <!-- 多选 -->
            <div class="q-multiple" v-show="type == 3">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item" v-for="(item,index) in currentQuestion.choice">
                  <el-checkbox  v-model="checked[index]" :label="index">{{item}}</el-checkbox>
                </div>
              </div>
            </div>

            <!-- 判断 -->
            <div class="q-true-or-false" v-show="type == 4">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-radio v-model="radio" label="0">正确</el-radio>
                </div>
                <div class="answer-item">
                  <el-radio v-model="radio" label="1">错误</el-radio>
                </div>
              </div>
            </div>

            <!-- 填空 -->
            <div class="q-fill-in" v-show="type == 1">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入答案"
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </div>

            <!-- 简答 -->
            <div class="q-short-answer" v-show="type == 5">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    type="textarea"
                    :rows="15"
                    placeholder="请输入答案"
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </div>

            <!-- 程序 -->
            <div class="q-program" v-show="type == 6">
              <div class="question">
                {{currentQuestion.content}}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    type="textarea"
                    :rows="15"
                    placeholder="请输入答案"
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </div>
          </div>

        </el-card>
      </div>
      <el-dialog
        title="答题卡"
        :visible.sync="dialogVisible"
        width="50%"
        >
        <el-button v-for="(item,index) in questionList" key="index" type="primary" class="stu-answer-item" @click="clickAnswerCard(index)">{{index+1}}</el-button>
      </el-dialog>
    </div>
</template>

<script>
import { Message,MessageBox  } from 'element-ui';
import httpServer from '@/components/httpServer/httpServer.js'
import axios from "axios";

export default {
  data(){
    return{
      dialogVisible: false,
      currentQuestion : {},
      questionList : [],
      type : 1,
      textarea : '',
      radio : '',
      checked : [],
      questionId : 1,
      instId : 0,
      startTime : '',
      endTime : '',
      transformChar : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      hour : 0,
      min : 0,
      sec : 0,
      timer : 0,
      onblurTime : 0,
    }
  },
  computed : {
    questionTypeText : function(){
      switch(this.type)
      {
        case 1://填空
          return '填空题';
          break;
        case 5://简答
          return '简答题';
          break;
        case 6://程序
          return '程序题';
          break;
        case 2://选择
          return '单选题';
          break;
        case 4://判断
          return '判断题';
          break;
        case 3://多选
          return '多选题';
          break;
      }
    }
  },
  methods:{
    initExam(){
      let that = this;
      window.onblur = function(){
        that.onblurTime ++;
        if(that.onblurTime == 99) {

          that.submitPaper();
          MessageBox("你已交卷", '提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
        }
        else {
          MessageBox("考试期间不能离开此页面哦~这一次只是提醒，下次离开就会直接交卷了哦", '提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
        }

      }
      this.timer = window.setInterval(()=>{

        let timeLast = new Date(this.endTime).getTime() - new Date().getTime();
        let hour = parseInt(timeLast/(1000*60*60));
        let min = parseInt((timeLast%(1000*60*60))/(1000*60));
        let sec = parseInt(((timeLast%(1000*60*60))%(1000*60))/1000);
        this.hour = hour < 10 ? '0' + hour : hour;
        this.min = min  < 10 ? '0' + min : min;
        this.sec = sec  < 10 ? '0' + sec : sec;

        if(this.hour==0 && this.min==0 && this.sec==0) {
          window.clearInterval(this.timer);
          this.submitPaper();
        }

      },1000)

      this.questionId = parseInt(this.$route.params.questionId)+1;//当前题号
      this.currentQuestion = this.questionList[this.$route.params.questionId];

      this.type = parseInt(this.currentQuestion.type);

      if(typeof this.currentQuestion.answer != 'undefined') {
        this.setAnswer(this.type,this.currentQuestion.answer);
      }
      if(this.type == 3) {
        for(let i =0;i<this.currentQuestion.choice.length;i++) {
          this.checked.push(false);
        }
      }
    },
    submitPaper(){
      window.onblur = null;
      this.saveAnswer(false);
      let answer = {};
      for(let i=0;i<this.questionList.length;i++) {

          switch(this.questionList[i].type)
          {
            case 1://填空
            case 5:
            case 6:
              answer[i] = this.questionList[i].answer;
              break;
            case 2://选择
              answer[i] = this.transformChar[this.questionList[i].answer];
              break;
            case 4://判断
              if(this.questionList[i].answer == '0') {
                answer[i] = '1';
              }
              else {
                answer[i] = '0';
              }
              break;
            case 3://多选
              answer[i] = '';
              for(let j =0;j<this.questionList[i].answer.length;j++) {
                if(this.questionList[i].answer[j]) {
                  answer[i] += this.transformChar[j];
                }
              }
              break;
          }

      }
      httpServer({
        url : '/exam/submit_paper'
      },{
        stuId : localStorage.getItem('stuId'),
        examId : this.$route.params.paperId,
        answer : JSON.stringify(answer),
        questionLength : this.questionList.length
      })
      .then((res)=>{
        if(res.data.code == '00000') {
          this.$router.push(`/main/homepage`);
        }
      })
    },
    clickAnswerCard(index){
      this.saveAnswer(false);
      this.$router.push(`/main/exam/${this.$route.params.paperId}/${index}`);
      this.dialogVisible = false;
    },
    saveAnswer(type){
      let questionId = parseInt(this.$route.params.questionId);

      let answer = '';
      switch(this.type)
      {
        case 1://填空
        case 5://简答
        case 6://程序
          answer = this.textarea;
          if(this.questionList.length-1 != questionId && type) {
            this.textarea = '';
          }
          break;
        case 2://选择
        case 4://判断
          answer = this.radio;
          if(this.questionList.length-1 != questionId && type) {
            this.radio = '';
          }
          break;
        case 3://多选
          answer = this.checked;
          if(this.questionList.length-1 != questionId && type) {
            this.checked = [];
          }
          break;
      }

      this.questionList[questionId].answer = answer;
    },
    nextQuestion(){
      let questionId = parseInt(this.$route.params.questionId);

      this.saveAnswer(true);


      if(this.questionList.length-1 == questionId) {
        Message.success({
          showClose: true,
          message: "这是最后一题啦",
          type: 'success'
        });
        return;
      }
      questionId ++;
      this.questionId = questionId+1;
      this.$router.push(`/main/exam/${this.$route.params.paperId}/${questionId}`);
    },
    setAnswer(type,answer){
      switch(type)
      {
        case 1://填空
        case 5://简答
        case 6://程序
          this.textarea = answer;
          break;
        case 2://选择
        case 4://判断
          this.radio = answer;
          break;
        case 3://多选
          this.checked = answer;
          break;
      }
    }
  },
  created(){
    //提示用户是否离开此页面（关闭、刷新或者点击后退等）
    window.addEventListener("beforeunload", ()=> {
      sessionStorage.questions = JSON.stringify(this.questionList);
    });
    //typeof sessionStorage.questions == "undefined"
    if(true) {
      httpServer({
        url : '/exam/get_question',
      },{
        paperId : this.$route.params.paperId,
        instId : sessionStorage.instId,
      })
      .then((res)=>{
        let respData = res.data.data;
        // let respData = {
        //   "respCode": "1",
        //   "instId" : 26,
        //   "startTime" : "2022-05-23 21:24:20",
        //   "endTime" : "2022-05-23 22:00:00",
        //   "questions": [{
        //     "content": "1111dsafdas",
        //     "choice": ["dafdsafa"],
        //     "type": 2
        //   }, {
        //     "content": "22222打发斯蒂芬打算发大水",
        //     "choice": ["fdsfd","dfsdfsd","5532g3fgfgf"],
        //     "type": 2
        //   }, {
        //     "content": "333333打发斯蒂芬打算发大水",
        //     "choice": ["dsfsdfdsfdfdfdfdfds","fffffffffffffffffffffffffff"],
        //     "questionType": 2
        //   }, {
        //     "content": "444444dfjaslkfjalksdjflkasjti题干？",
        //     "questionType": 1
        //   }, {
        //     "content": "5555的飞洒发斯蒂芬啊大丰收sad",
        //     "questionType": 1
        //   }, {
        //     "content": "666666请选择正确的答案。。。。。。。。",
        //     "choice": ["aaaaaaa", "bbbbbbbbbbbb", "cccccccccc", "ddddddddddddddddd"],
        //     "questionType": 3
        //   },{
        //     "content": "7777请选择正确的答案。。。。。。。。",
        //     "choice": ["aaaaaaa", "fffgdfgdfg", "cccccccccc", "ddddddddddddddddd","ddddddddddddddddd","ddddddddddddddddd"],
        //     "questionType": 3
        //   },{
        //     "content": "8888的飞洒发斯蒂芬啊大丰收sad",
        //     "questionType": 4
        //   }, {
        //     "content": "999999dfjaslkfjalksdjflkasjti题干？",
        //     "questionType": 4
        //   }, {
        //     "content": "10的飞洒发斯蒂芬啊大丰收sad",
        //     "questionType": 5
        //   }, {
        //     "content": "11的飞洒发斯蒂芬啊大丰收sad",
        //     "questionType": 5
        //   }, {
        //     "content": "12dfjaslkfjalksdjflkasjti题干？",
        //     "questionType": 6
        //   }, {
        //     "content": "13的飞洒发斯蒂芬啊大丰收sad",
        //     "questionType": 6
        //   }],
        // }

        this.questionList = respData.questions;
        this.startTime = respData.startTime;
        this.endTime = respData.endTime;
        this.instId = sessionStorage.instId;
        sessionStorage.startTime = respData.startTime;
        sessionStorage.endTime = respData.endTime;

        this.initExam();
      })
    }else {
      this.questionList = JSON.parse(sessionStorage.questions);
      this.startTime = sessionStorage.startTime;
      this.endTime = sessionStorage.endTime;
      this.instId = sessionStorage.instId;
      this.initExam();
    }


  },
  watch : {
    $route(to,from){
      this.questionId = parseInt(this.$route.params.questionId)+1;
      this.currentQuestion = this.questionList[this.$route.params.questionId];
      this.type = parseInt(this.currentQuestion.type);
      if(typeof this.currentQuestion.answer != 'undefined') {
        this.setAnswer(this.type,this.currentQuestion.answer);
      }
      if(this.type == 3) {
        for(let i =0;i<this.currentQuestion.choice.length;i++) {
          this.checked.push(false);
        }
      }
    }
  }
}
</script>

<style lang="css">
[v-cloak] {
  display: none;
}
.card-header {
  padding: 10px;
  font-size: 20px;
  margin-top: 30px
}
.answer-card {
  cursor: pointer;
}
.time,.answer-card{
  margin-top: 10px;
}
.answer-item {
  padding: 10px;
}
.question {
  padding: 10px 0;
}
.card-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
}

.card-content .box-card {
  min-height: 500px;
}

.el-button.stu-answer-item {
  margin: 10px;
  width: 60px;
  height: 60px
}
</style>
