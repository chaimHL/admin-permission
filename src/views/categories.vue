<template>
  <div class="page">
    categories商品管理
    <el-button type="primary" v-permission="{action: 'view'}">view</el-button>
    <el-button type="primary" v-permission="{action: 'edit', effect: 'disabled'}">edit</el-button>
    <el-button type="primary" v-permission="{action: 'add', effect: 'disabled'}">add</el-button>
    <el-button type="primary" @click="handleDelete" v-permission="{action: 'delete', effect: 'disabled'}">delete</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    handleDelete() {
      this.$confirm('你确定要删除这一条数据吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$api.deleteList({
          id: 1
        }).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            customClass: 'v-message',
            offset: 100
          })
        })
      }).catch(err => err)
    }
  }
}
</script>
<style lang="less">
  .page {
    height: 100%;
    overflow-y: scroll;
  }
</style>
