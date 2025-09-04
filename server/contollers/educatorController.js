
import { clerkClient } from '@clerk/express'

//update role from student to educator----------------------------------------------------
export const updateRoleToEducator = async () => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role: 'educator' }
        })

        res.json({ success: true, message: "Role updated to educator. Please re-login to see the changes." })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}