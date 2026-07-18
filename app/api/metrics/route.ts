import { prisma } from "@/lib/prisma"
import { NextResponse } from 'next/server'

export async function GET() {
    const now = new Date()
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))

    const [
        totalToday,
        avgResponseTime,
        errorRate4xx,
        errorRate5xx,
        recentLogs
    ] = await Promise.all([
        prisma.requestLog.count({
            where: { createdAt: { gte: startOfDay }}
        }),
        prisma.requestLog.aggregate({
            _avg: { responseTime: true },
            where: { createdAt: { gte: startOfDay }}
        }),
        prisma.requestLog.count({
            where: {
                createdAt: { gte: startOfDay },
                statusCode: { gte: 400, lt: 500 }
            }
        }),
        prisma.requestLog.count({
            where: {
                createdAt: { gte: startOfDay },
                statusCode: { gte: 500 }
            }
        }),
        prisma.requestLog.findMany({
            take: 100,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true, plan: true}}}
        })
    ])
    return NextResponse.json({
        totalToday,
        avgResponseTime: Math.round(avgResponseTime._avg.responseTime || 0),
        errorRate4xx,
        errorRate5xx,
        recentLogs
    })
}