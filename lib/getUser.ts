import { NextRequest } from 'next/server'

export const getUserFromRequest = (req: NextRequest): string | null => {
    try {
        const auth = req.headers.get('authorization')
        if (!auth?.startsWith('Bearer ')) return null
        const token = auth.split(' ')[1]
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 < Date.now()) return null
        return payload.userId
    } catch {
        return null
    }
} 