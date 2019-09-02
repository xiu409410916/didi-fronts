<template>
  <div class="dashboard-container">
    <span style="width: 100%;margin: 20px;display: inline-block;font-size: 26px;">欢迎您～</span>
    <!-- <component :is="currentRole"/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      // currentRole: 'adminDashboard'

    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },


}
</script>
