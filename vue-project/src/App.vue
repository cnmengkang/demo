<template>
  <div class="layout">
    <el-container>
      <el-header>
        <!-- top -->
      </el-header>
      <el-container>
        <el-aside class="hidden-xs-only">
          <!-- leftMenu -->
          <leftMenu></leftMenu>
        </el-aside>
        <el-main>
          <router-view />
          <!-- 占位符 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import leftMenu from "./views/leftMenu.vue";
</script>
<style scoped lang="less">
.layout {
  .el-header {
    background-color: #000;
  }
  .el-aside {
    background-color: pink;
  }
  .el-main {
    background-color: antiquewhite;
    padding: 0px;
  }
}
</style>
