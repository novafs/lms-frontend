import { createBrowserRouter, redirect } from "react-router-dom";
import ManagerHomePage from "../pages/manager/home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import ManageCoursesPage from "../pages/manager/courses";
import LayoutDashboard from "../components/layout";
import ManageCreateCoursePage from "../pages/manager/create-course/index.jsx";
import ManageCourseDetailPage from "../pages/manager/course-details/index.jsx";
import ManageCreateContentPage from "../pages/manager/create-course-content/index.jsx";
import ManageCoursePreviewPage from "../pages/manager/course-preview/index.jsx";
import ManageStudentsPage from "../pages/manager/students/index.jsx";
import ManageStudentCreatePage from "../pages/manager/students-create/index.jsx";
import StudentPage from "../pages/student/StudentOverview/index.jsx";
import secureLocalStorage from "react-secure-storage";
import {
  MANAGER_SESSION,
  STORAGE_KEY,
  STUDENT_SESSION,
} from "../utils/const.js";
import {
  getCategories,
  getCourseDetail,
  getCourses,
  getDetailContent,
  getStudentsCourse,
} from "../services/courseService.js";
import {
  getCoursesStudents,
  getDetailStudent,
  getStudents,
} from "../services/studentService.js";
import StudentCourseList from "../pages/manager/student-course/index.jsx";
import StudentForm from "../pages/manager/student-course/student-form.jsx";
import { getOverviews } from "../services/overviewService.js";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      throw redirect("/manager");
    },
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }
      return true;
    },
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }
      return true;
    },
    element: <SignUpPage />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "manager") {
        throw redirect("/manager/sign-in");
      }
      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          const overviews = await getOverviews();

          return overviews?.data;
        },
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const data = await getCourses();
          console.log(data);

          return data;
        },
        element: <ManageCoursesPage />,
      },
      {
        path: "/manager/courses/create",
        loader: async () => {
          const categories = await getCategories();

          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course?.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          console.log(course);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <ManageCreateContentPage />,
      },
      {
        path: "/manager/courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = await getDetailContent(params.contentId);
          return content?.data;
        },
        element: <ManageCreateContentPage />,
      },
      {
        path: "/manager/courses/:id/preview",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);
          return course?.data;
        },
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        loader: async () => {
          const students = await getStudents();
          return students?.data;
        },
        element: <ManageStudentsPage />,
      },
      {
        path: "/manager/students/create",
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/students/edit/:id",
        loader: async ({ params }) => {
          const student = await getDetailStudent(params.id);

          return student?.data;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/courses/students/:id",
        loader: async ({ params }) => {
          const course = await getStudentsCourse(params.id);
          return course?.data;
        },
        element: <StudentCourseList />,
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async () => {
          const students = await getStudents();
          return students?.data;
        },
        element: <StudentForm />,
      },
    ],
  },
  {
    path: "/student",
    id: STUDENT_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "student") {
        throw redirect("/student/sign-in");
      }
      return session;
    },
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        loader: async () => {
          const courses = await getCoursesStudents()

          return courses?.data
        },
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);
          return course?.data;
        },
        element: <ManageCoursePreviewPage isAdmin={false}/>,
      },
    ],
  },
  {
    path: "/student/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "student") {
        throw redirect("/student");
      }
      return true;
    },
    element: <SignInPage type="student" />,
  },
]);

export default router;
