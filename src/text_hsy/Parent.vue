<template>
  <div>
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
        transitionName: 'slide-left'
    }
  },
  components: {
  },
  watch: {
   '$route' (to, from) {
     const toDepth = to.path.split('/').length
     const fromDepth = from.path.split('/').length
     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
   }
}
}
</script>

<style>
</style>
