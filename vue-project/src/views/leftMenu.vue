<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="2" router class="el-menu-vertical-demo">
        <el-menu-item index="/">
          <el-icon><ChatSquare /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><ChatSquare /></el-icon>
          <span>About</span>
        </el-menu-item>
        <el-menu-item index="/index">
          <el-icon><ChatSquare /></el-icon>
          <span>Index</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup></script>
<style scoped></style>
