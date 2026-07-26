import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'
import { getUserFromRequest } from "@/lib/getUser"

const PLAN_LIMITS: Record<string, number> = {
    FREE: 60,
    PRO: 1000,
}

export async function GET(req: NextRequest) {
    const userId = getUserFromRequest(req)
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            projects: {
                include: {
                    apiKeys: {
                        where: { isActive: true },
                        select: { id: true, keyPrefix: true, rateLimit: true }
                    }
                }
            }
        }
    })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const allKeys = user.projects.flatMap(p => p.apiKeys)

    const usageData = await Promise.all(
        allKeys.map(async (key) => {
            const count = await redis.zcard(`rate:${key.id}`)
            const limit = key.rateLimit
            return {
                keyPrefix: key.keyPrefix,
                used: count,
                limit,
                remaining: Math.max(0, limit - count),
                percent: Math.round((count / limit) * 100)
            }
        })
    )

    return NextResponse.json({ usage: usageData})
}