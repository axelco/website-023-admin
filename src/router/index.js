import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('../views/AuthView.vue'),
      redirect: {name: 'login'},
      children: [
        { 
          path: 'login', 
          name :'login', 
          component:() => import('../views/auth/LoginView.vue'),
          meta : {
            public: true,
          }
        },             
      ],
    },    
    {
      path: '/app',
      component: () => import('../views/AppView.vue'),
      redirect: {name: 'home'},
      children: [
        { 
          path: 'home', 
          name :'home', 
          component:() => import('../views/app/HomeView.vue'),
        },   
        { 
          path: 'experiences', 
          name :'experiences', 
          component:() => import('../views/app/ExperiencesView.vue'),
        },     
        { 
          path: 'company/add', 
          name :'addCompany', 
          component:() => import('../views/app/CompanyView.vue'),
        },     
        { 
          path: 'company/edit/:id', 
          name :'editCompany', 
          component:() => import('../views/app/CompanyView.vue'),
        },                                    
      ],
    },  
    {
      path: '/:pathMatch(.*)*',
      redirect: {name: 'home'},
    },       
  
  ],
});

router.beforeEach((to, from, next)=>{

  const loggedIn = localStorage.getItem('user');
  if (!to.meta.public && !loggedIn) {
    next('/auth/login');
  } else {
    next();
  }

})

export default router;
