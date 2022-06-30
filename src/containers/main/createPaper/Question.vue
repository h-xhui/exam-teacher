<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span v-text="type">选择题</span>
      </div>
      <!-- 总个数与分值 -->
      <div class="box1">
        <span>总个数:{{all}}</span>
        <span>分值:  <el-input v-model="score" placeholder="请输入内容"></el-input></span>
      </div>
      <!-- 知识点与个数块，可以自由添加 -->
      <div v-for="(item,index) in list" :key="index" class="box1">
        <span >知识点:
        <el-select v-model="knowledge[index]" placeholder="请选择知识点" @focus="findAllTag">
          <el-option
            v-for="obj in options"
            :key="obj.id"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </span>
        <span>个数:  <el-input v-model="num[index]" placeholder="请输入个数" ></el-input></span>
        <el-button @click="deleteAll(index)"><i class="el-icon-delete"></i></el-button>
      </div>
      <el-button type="primary" @click="add" class="btn">
        新增知识点
      </el-button>
    </el-card>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
    name: 'Single',
    data(){
      return{
        // 分值
        score:0,
        // 知识点
        knowledge:[],
        // 个数
        num:[0],
        // 知识点与个数块源
        list:[{},{}],
        // 知识点源
        options: '',
      }
    },
    props: ['type'],
    computed:{
      // 计算属性，计算总的个数
      all(){
        let sum = 0
        for(let i=0;i<this.num.length;i++){
            this.num[i]-= 0
            sum += this.num[i]
        }
        return sum
      }
    },
    methods:{
      // 删除块
      deleteAll(i){
          this.list.splice(i,1)
          this.num.splice(i,1)
          this.knowledge.splice(i,1)
      },
      // 添加块
      add(){
          this.list.push({})
      },
      findAllTag() {
        if (this.options === '') {
          httpServer({
            url:'/tag/tag_getList',
            method:'get'
          }).then((res)=>{
            this.options = res.data.data;
          })
        }
      }
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
</style>
