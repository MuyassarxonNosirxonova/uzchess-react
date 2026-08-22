import {createRoot} from "react-dom/client";
import "./style.css"
import {createBrowserRouter, RouterProvider} from "react-router";
import CoursePage from "./features/courses/pages/CoursePage.tsx";
import CourseDetailPage from "./features/courses/pages/CourseDetailPage.tsx";
import LessonPlayerPage from "./features/courses/pages/LessonPlayerPage.tsx";
import BooksPage from "./features/library/page/BooksPage.tsx";
import {NewsPage} from "./features/news/pages/NewsPage.tsx";
import {MainPage} from "./features/main/pages/MainPage.tsx";
import {MainLayout} from "./features/common/layouts/MainLayout.tsx";
import {AuthProvider} from "./features/auth/context/AuthContext.tsx";
import LoginPage from "./features/auth/pages/LoginPage.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "main", element: <MainPage /> },

      { path: "courses", element: <CoursePage /> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "courses/:courseId/lessons/:lessonId", element: <LessonPlayerPage /> },
      { path: "library", element: <BooksPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "login", element: <LoginPage /> },
      {path:"/register",element:<RegisterPage/>}
    ],
  },
]);

const root = document.getElementById('root')!;

createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);