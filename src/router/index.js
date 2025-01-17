import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/pages/drawingboard/index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    meta: {
      keepalive: true,
      title: '夸克画板'
    }
  }
];

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  mode: 'history'
});

//路由守卫
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;
