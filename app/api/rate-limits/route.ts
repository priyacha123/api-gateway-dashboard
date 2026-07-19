import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import redis from '@/lib/redis'

const PLAN_LIMITS: Record<string, number> = {
    FREE: 10,
    PLAN: 100,
}

export async function GET() {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, plan: true}
    })

    const usageData = await Promise.all(
        users.map(async (user) => {
            const count = await redis.zcard(`rate:${user.id}`)
            const limit = PLAN_LIMITS[user.plan] || 10
            return {
                email: user.email,
                plan: user.plan,
                usage: count,
                limit: limit,
                remaining: Math.max(0, limit - count),
                percent: Math.round((count / limit) * 100)
            }
        })
    )

    return NextResponse.json({ usage: usageData})
}