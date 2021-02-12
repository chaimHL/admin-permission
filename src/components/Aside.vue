<template>
  <div class="aside">
    <el-menu
      background-color="#1f2d3d"
      text-color="#fff"
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <el-submenu class="nav-title" index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">{{subItem.authName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 侧边栏数据
      menuList: [],
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    // 初始化侧边栏数据
    this.menuList = this.leftList
  },
  methods: {
    saveNavState (activePath) {
      this.activePath = activePath
      this.$router.push('/home/' + activePath)
    }
  },
  computed: {
    ...mapState(['leftList'])
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  & /deep/ i {
    color: #fff;
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>
