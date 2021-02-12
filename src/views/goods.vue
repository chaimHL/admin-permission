<template>
  <div class="page">
    goods商品管理
    <el-button type="primary" v-permission="{action: 'view'}">view</el-button>
    <el-button type="primary" v-permission="{action: 'edit', effect: 'disabled'}">edit</el-button>
    <el-button type="primary" v-permission="{action: 'add', effect: 'disabled'}">add</el-button>
    <el-button type="primary" v-permission="{action: 'delete', effect: 'disabled'}">delete</el-button>
  </div>
</template>

<style lang="less">
.page {
  height: 100%;
  overflow-y: scroll;
}
</style>
