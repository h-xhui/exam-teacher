import Vue from 'vue'
import Router from 'vue-router'
import login from '@/containers/login/login'
import main from '@/containers/main/main'
import changePass from '@/containers/main/personalCenter/changePass'
import homepage from '@/containers/main/homepage/index'
import examCard from '@/containers/main/examCard/index'
import singleQuestion from "@/containers/main/submitQuestion/SingleQuestion"
import paper from "@/containers/main/createPaper/main"
import score from "@/containers/main/score/searchScore"
import createExam from "@/containers/main/exam/CreateExam"
import showClassExam from "@/containers/main/exam/ShowClassExam";
import showStuExam from "../containers/main/exam/ShowStuExam";
import checkPaper from "../containers/main/exam/CheckPaper";
import tag from "../containers/main/tag/Tag";
import classExamList from "../containers/main/score/ClassExamList";
import showPaper from "../containers/main/exam/ShowPaper";
import createPaper from "../containers/main/createPaper/CreatePaper";
import questionFile from "../containers/main/submitQuestion/QuestionFile";

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: 'exam/:paperId/:questionId',
          component: examCard,
        },
        {
          path: 'homepage',
          component: homepage,
        },
        {
          path: 'personalCenter/changePass',
          name: 'changePass',
          component: changePass,
        },
        {
          path: 'singleQuestion',
          name: 'submitSingleQuestion',
          component: singleQuestion,
        },
        {
          path: 'createPaperByRandom',
          name: 'createPaperByRandom',
          component: paper,
        },
        {
          path: 'searchScore',
          name: 'searchScore',
          component: score,
        },
        {
          path: 'createExam',
          name: 'createExam',
          component: createExam
        },
        {
          path: 'showClassExam',
          name: 'showClassExam',
          component: showClassExam
        },
        {
          path: 'showStuExam',
          name: 'showStuExam',
          component: showStuExam
        },
        {
          path: 'checkPaper',
          name: 'checkPaper',
          component: checkPaper
        },
        {
          path: 'tags',
          name: 'tags',
          component: tag
        },
        {
          path: 'classExamList',
          name: 'classExamList',
          component: classExamList
        },{
          path: 'showPaper',
          name: 'showPaper',
          component: showPaper
        },{
          path: 'createPaperByQuestion',
          name: 'createPaperByQuestion',
          component: createPaper
        },{
          path: 'questionFile',
          name: 'questionFile',
          component: questionFile
        }
      ]
    }
  ]
})
