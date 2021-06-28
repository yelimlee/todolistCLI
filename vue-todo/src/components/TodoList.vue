<template>
  <div>
    <transition-group name="list" tag="ul">
      <!-- index : 할일 순서 -->
      <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted:todoItem.completed}"
          v-on:click="toggleComplete(todoItem, index)"></i>
        <!-- v-bind:class : 기존의 html속성에 동적인 기능 추가 -->
        <!-- completed가 true인 순간 textCompleted기능 수행 -->
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
props:['propsdata'],
methods: {
  removeTodo(todoItem, index) {
    this.$emit('removeItem',todoItem, index);
  },
  toggleComplete(todoItem,index){
    this.$emit('toggleItem',todoItem,index);
  }
},
  
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li{
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted{
  color: #b3adad;
}

.textCompleted{
  text-decoration: line-through;
  color: #b3adad;
}
/* 리스트 아이템 트랜지션 효과 */
.list-enter-active, .list-leave-active {
  /* 트랜지션이 1초 지속 */
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>