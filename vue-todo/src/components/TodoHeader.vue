<template>
  <header>
    <h1>TODO it!</h1>
  </header>
</template>

//scoped 컴포넌트 안에서만 유효한 스타일 속성
<style scoped>
  h1 {
    color: #2f3b52;
    font-weight: 900;
    /* rem : 폰트의 크기에 따라서 margin 비율이 달라짐 */
    margin: 2.5rem 0 1.5 rem;
  }
</style>