import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import{Signup,Login,AllPosts,Post,AddPost,Home, EditPost} from './pages/index.js'
import { AuthLayout } from './components/index.js';
const router = createBrowserRouter([
{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home/>,

    } ,
    {
      path:"/login",
      element:(
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path:'/signup',
      element:(
        <AuthLayout authentication={false}>
          <Signup/>
        </AuthLayout>
      )
    },
    {
      path:'/all-posts',
      element:(
        <AuthLayout >
          <AllPosts/>
        </AuthLayout>
      )
    },
    {
      path:'/add-post',
      element:(
        <AuthLayout authentication={true}>
          {" "}
          <AddPost/>
          </AuthLayout>
      )
    },
    {
path:'/post/:slug',
element:(
  <AuthLayout >
    {""}
    <EditPost/>
  </AuthLayout>
)
    }
    ,
    {
      path:'/post/:slug',
      element:(
        <AuthLayout>
          {""}
          <Post/>
        </AuthLayout>
      )
    }
  ]

}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   

   <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
    
  
)
