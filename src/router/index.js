import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
/*  import componentsRouter from './modules/components'
 import chartsRouter from './modules/charts'
 import tableRouter from './modules/table'
 import nestedRouter from './modules/nested' */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }

 

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/components1',
    component: Layout,
    redirect: '/components/sys',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/components/sysmanagement/user/user'),
        name: 'user',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        component: () => import('@/views/components/sysmanagement/role/role'),
        name: 'role',
        meta: {
          title: '角色管理'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'RolePermission',
        component: () => import('@/views/components/sysmanagement/role/rolePermission'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/components2',
    component: Layout,
    redirect: '/components/product',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'productList',
        component: () => import('@/views/components/product/product/product'),
        name: 'productList',
        meta: {
          title: '商品列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addProduct',
        component: () => import('@/views/components/product/addProduct/addProduct'),
        name: 'addProduct',
        meta: {
          title: '添加商品'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'productShenHe',
        component: () => import('@/views/components/product/shenhe/productShenHe'),
        name: 'productShenHe',
        meta: {
          title: '商品审核',
          roles: ['admin']
        }
      },
      {
        path: 'productModel',
        component: () => import('@/views/components/product/productModel/productModel'),
        name: 'productModel',
        meta: {
          title: '规格参数',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/components3',
    component: Layout,
    redirect: '/components/order',
    alwaysShow: true, // will always show the root menu
    name: 'order',
    meta: {
      title: '订单',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/components/order/orderList/orderList'),
        name: 'orderList',
        meta: {
          title: '订单列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'returnProduct',
        component: () => import('@/views/components/order/returnProduct/returnProduct'),
        name: 'returnProduct',
        meta: {
          title: '退货申请处理'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'returnMoney',
        component: () => import('@/views/components/order/returnMoney/returnMoney'),
        name: 'returnMoney',
        meta: {
          title: '退款申请处理',
          roles: ['admin']
        }
      },
      {
        path: 'returnProductReason',
        component: () => import('@/views/components/order/returnProductReason/returnProductReason'),
        name: 'returnProductReason',
        meta: {
          title: '退货原因设置',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/components4',
    component: Layout,
    redirect: '/components/customer',
    alwaysShow: true, // will always show the root menu
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'customerList',
        component: () => import('@/views/components/customer/customerList/customer'),
        name: 'customerList',
        meta: {
          title: '订单列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'customerAdd',
        component: () => import('@/views/components/customer/addCustomer/add'),
        name: 'customerAdd',
        meta: {
          title: '添加客户'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/components5',
    component: Layout,
    redirect: '/components/statistics',
    alwaysShow: true, // will always show the root menu
    name: 'statistics',
    meta: {
      title: '统计',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'productStatistics',
        component: () => import('@/views/components/statistics/productStatistics/productStatistics'),
        name: 'productStatistics',
        meta: {
          title: '商品统计',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'customerStatistics',
        component: () => import('@/views/components/statistics/customerStatistics/customerStatistics'),
        name: 'customerStatistics',
        meta: {
          title: '客户统计'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'payStatistics',
        component: () => import('@/views/components/statistics/payStatistics/payStatistics'),
        name: 'payStatistics',
        meta: {
          title: '交易统计'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },



  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  

 




  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
