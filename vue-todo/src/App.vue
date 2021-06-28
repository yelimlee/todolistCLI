<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem"
    v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'



export default {
  data(){
    return{
      todoItems: []
    }
  },
  methods:{
    addOneItem(todoItem){
      //completed: checkbox가 체크되었는지 진위여부
      const obj= {completed: false, item: todoItem}
      //console.log(this.newTodoItem);
      //storage.setItem(keyName, keyValue) : 입력값을 저장하는 로직 
      //개발자도구 >> Application >> Local Storage에서 확인 가능 
      //JOSN.stringfy : 자바스크립트 객체를 string으로 보여주는 api
      localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index){
       //console.log(todoItem, index);
      localStorage.removeItem(todoItem.item);
      //splice: index번째 요소부터 1개의 요소를 삭제 
      this.todoItems.splice(index,1);
    },
    toggleOneItem(todoItem,index){
      //todoItem.completed =!todoItem.completed;
      //상위 컴포넌트에서 선언한 data는 하위 컴포넌트에서 변경하지 말아야함
      //TodoList 라는 컴포넌트의 데이터를 다른 컴포넌트에서 다루는 경우 데이터 변경이 
      //필요할 때 TodoList 컴포넌트에 요청해서 바꾸는 방식으로 설계
      this.todoItems[index].completed = !this.todoItems[index].completed;
    //로컬스토리지의 데이터 갱신
    localStorage.removeItem(todoItem.item);
    localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems(){
      localStorage.clear();
      this.todoItems = [];
    }
  },
//created(vue lifrcyle) : 인스턴스가 생성되자마자 호출되는 라이프 사이클
  created(){
    //console.log('created');
    //localStorage가 있는 경우 
    if(localStorage.length > 0){
      for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          //꺼내올 때는 string말고 객체로 변환하여 사용
         //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
         this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
         // this.todoItems.push(localStorage.key(i));
        //console.log(localStorage.key(i));
        }
      }
    }
  },
  components: {
    //컴포넌트 태그명 : 컴포넌트 내용
    //같으면 동일
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
body{
  text-align: center;
  background: #f6f6f6;
}
input {
  border-style: groove;
  width: 90%;
}
button{
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
</style>
