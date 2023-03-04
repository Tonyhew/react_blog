import React from 'react'
import Login from '../Pages/Login'
import AdminIndex from '../Pages/AdminIndex'
import Index from '../Pages/Index'
import AddArticle from '../Pages/AddArticle'
import ArticleList from '../Pages/ArticleList'
import ArticleType from '../Pages/ArticleType'
import NavManage from '../Pages/NavManage'
import UserManage from '../Pages/UserManage'

const Routes = [
  {
    path: '/login',
    caseSensitive: true,
    element: <Login />,
  },
  {
    path: '/',
    element: <AdminIndex />,
    children: [
      {
        path: '/index/',
        caseSensitive: true,
        element: <Index />,
      },
      {
        path: '/index/list/add/',
        caseSensitive: true,
        element: <AddArticle />,
      },
      {
        path: '/index/list/',
        caseSensitive: true,
        element: <ArticleList />,
      },
      {
        path: '/index/list/add/:id',
        caseSensitive: true,
        element: <AddArticle />,
      },
      {
        path: '/index/type/',
        caseSensitive: true,
        element: <ArticleType />,
      },
      {
        path: '/index/navManage/',
        caseSensitive: true,
        element: <NavManage />,
      },
      {
        path: '/index/navManage/:id',
        caseSensitive: true,
        element: <NavManage />,
      },
      {
        path: '/index/userManage/',
        caseSensitive: true,
        element: <UserManage />,
      },

      // 404 页面
      {
        path: '*',
        index: true,
        element: <AdminIndex />,
      },
    ],
  },
]

export default Routes
