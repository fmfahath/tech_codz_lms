import { Routes, Route } from 'react-router-dom'
import Loading from "./components/student/Loading"
import AddCourses from "./pages/educator/AddCourses"
import Dashboard from "./pages/educator/Dashboard"
import Educator from "./pages/educator/Educator"
import MyCourses from "./pages/educator/MyCourses"
import StudentEnrolled from "./pages/educator/StudentEnrolled"
import CourseDetails from "./pages/student/CourseDetails"
import CourseList from "./pages/student/CourseList"
import Home from "./pages/student/Home"
import Player from "./pages/student/Player"
import MyEnrollments from './pages/student/MyEnrollments'
import Navbar from './components/student/Navbar'


function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path='add-course' element={<AddCourses />} />
          <Route path='my-course' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
