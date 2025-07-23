import { createContext, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext()

export const AppCondextProvider = (props) => {

    const [allCourses, setAllCourses] = useState(dummyCourses);

    const calculateRating = async (courseData) => {
        if (courseData?.courseRatings && courseData?.courseRatings.length == 0) return 0;

        // let totalRating = 0;
        // course.courseRatings.forEach(rating => {
        //     totalRating += rating.rating;
        // })
        // averageRating = totalRating / course.courseRatings.length

        const averageRating = courseData.courseRatings.reduce((acc, rating) => (acc + rating.rating), 0) / courseData.courseRatings.length;
        return averageRating;
    }

    const value = {
        allCourses, setAllCourses,
        calculateRating,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}