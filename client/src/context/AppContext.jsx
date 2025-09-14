import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppCondextProvider = (props) => {

    const [allCourses, setAllCourses] = useState('');
    const { getToken } = useAuth()
    const { user } = useUser()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [userData, setUserData] = useState(null)
    const [isEducator, setIsEducator] = useState(false)

    //fetch all courses-----------------------------------------------
    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/course/all`)

            if (data.success) {
                setAllCourses(data.coursesData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //fetch user data------------------------------------------------
    const fetchUserData = async () => {

        if (user.publicMetadata.role === 'educator') {
            setIsEducator(true)
        }

        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/user-data`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //calculate course ratings----------------------------------------
    const calculateRating = (courseData) => {

        if (courseData?.courseRatings && courseData?.courseRatings.length == 0) return 0;

        // let totalRating = 0;
        // courseData.courseRatings.forEach(rating => {
        //     totalRating += rating.rating;
        // })
        // averageRating = totalRating / courseData.courseRatings.length

        const averageRating = courseData.courseRatings.reduce((acc, rating) => (acc + rating.rating), 0) / courseData.courseRatings.length;
        return averageRating;
    }

    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    useEffect(() => {
        fetchAllCourses()
    }, [])

    const value = {
        allCourses, setAllCourses,
        calculateRating, userData, setUserData, backendUrl, getToken,
        fetchAllCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}