<template lang="html">
  <div class="main">
    <div class="left-menu">
      <img class="logo" src="../../assets/images/logo.jpg" />
      <el-menu
        @select="selectItem"
        default-active="2"
        class="el-menu-vertical-demo">
        <el-submenu index="Question">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">试题录入</span>
          </template>
          <el-menu-item index="submitQuestion">录入</el-menu-item>
          <el-menu-item index="submitQuestionByFile">文件批量导入</el-menu-item>
        </el-submenu>
        <el-submenu index="createPaper">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">出卷</span>
          </template>
          <el-menu-item index="createPaperByRandom">随机出卷</el-menu-item>
          <el-menu-item index="createPaperByQuestion">选题出卷</el-menu-item>
        </el-submenu>
        <el-menu-item index="searchScore">
          <i class="el-icon-search"></i>
          <span slot="title">成绩查询</span>
        </el-menu-item>
        <el-menu-item index="tag">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">知识点管理</span>
        </el-menu-item>
        <el-submenu index="exam">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>考试管理</span>
          </template>
          <el-menu-item index="createExam">创建考试</el-menu-item>
          <el-menu-item index="checkExam">在线阅卷</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item index="changePass">修改密码</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right-box">
      <div class="top-bar clearfix">
        <el-dropdown class="f-r" @command="handleCommand">
          <el-button type="text" class="user-menu">
            <i class="el-icon-user"></i>
            {{userName}}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
            <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import httpServer from '@/components/httpServer/httpServer.js'

export default {
  data() {
    return {
      userName: '',
      tagInfo:{},
      test:'aaa'
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'exit') {
        localStorage.removeItem('username');
        this.$router.push('/');
      } else if (command === 'changePass') {
        this.$router.push('/main/personalCenter/changePass');
      }
    },
    selectItem(i) {
      if (i === 'submitQuestion') { //点击试题录入
        this.$router.push('/main/singleQuestion');
      } else if (i === 'submitQuestionByFile'){
        this.$router.push('/main/questionFile')
      } else if (i === 'changePass') {
        this.$router.push('/main/personalCenter/changePass');
      } else if (i === 'createPaperByRandom') {
        this.$router.push('/main/createPaperByRandom');
      } else if (i === 'createPaperByQuestion') {
        httpServer({
          url:'/question/getQuestionList'
        }).then((res)=>{
          let pageSize = 3;
          let totalPage = (res.data.data.length%pageSize === 0?res.data.data.length/pageSize : res.data.data.length/pageSize+1);
          let totalData = res.data.data;
          let pageData = totalData.slice(0,pageSize);
          this.$router.push({
            name:'createPaperByQuestion',
            params:{
              totalData:res.data.data,
              totalPage:totalPage,
              pageSize:pageSize,
              pageData:pageData
            }
          })
        })
      } else if (i === 'searchScore') {
        httpServer({
          url:'exam/get_exam_list'
        }).then((res)=>{
          this.$router.push({
            name:'classExamList',
            params:{
              index1:res.data.data
            }
          });
        })
      } else if (i === 'createExam') {
        this.$router.push('/main/createExam');
      } else if (i === 'checkExam') {
        httpServer({
          url:'exam/get_exam_list'
        }).then((res)=>{
          this.$router.push({
            name:'showClassExam',
            params:{
              index1:res.data.data
            }
          });
        })

      } else if (i === 'tag') {
        httpServer({
          url:'/tag/tag_getList',
          method: 'get'
        },{}).then((res)=>{
          this.$router.push({
            name:'tags',
            params:{
              tags:res.data.data
            }
          });
        })

      }
    }
  },
  created() {
    this.userName = localStorage.username;
  },
  beforeCreate() {
    if (!localStorage.username) {
      this.$router.push('/login');
    }
  }

}
</script>

<style lang="css">
.left-menu {
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #e9e9e9;
  overflow-y: auto;
  overflow-x: hidden;
}

.left-menu .logo{
  display: block;
  width: 130px;
  margin: 50px auto;
}

.el-menu {
  border-right : none;
}

.right-box {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 700px;
  padding: 20px 20px 0;
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.top-bar {
  border: 0;
  border-bottom: 1px solid #e8e8e8;
  -webkit-box-shadow: none;
  box-shadow: none;
  line-height: 46px;
}
.right-box .user-menu {
  cursor: pointer;
  padding: 0 20px;
}

.el-button--text {
  color: #000
}

.el-button--text:hover {
  color: #000
}

</style>
