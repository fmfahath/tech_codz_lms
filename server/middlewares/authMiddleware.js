import { clerkClient } from "@clerk/express";

export const verifyEducatorRole = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const user = await clerkClient.users.getUser(userId)

        if (user.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: "Access denied. Educator resource only." })
        }

        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}