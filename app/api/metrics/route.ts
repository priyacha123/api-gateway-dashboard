import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma"
import { getUserFromRequest } from "@/lib/getUser"

export async function GET(req: NextRequest) {
    const userId = getUserFromRequest(req)
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))

    const where = {
        userId,
        createdAt: { gte: startOfDay }
    }

    const [
        totalToday,
        avgResponseTime,
        errorRate4xx,
        errorRate5xx,
        recentLogs
    ] = await Promise.all([             
        prisma.requestLog.count({
            where,
        }),
        prisma.requestLog.aggregate({
            _avg: { responseTime: true },
            where,
        }),
        prisma.requestLog.count({
            where: {
                ...where,
                statusCode: { gte: 400, lt: 500 }
            }
        }),
        prisma.requestLog.count({
            where: {
                ...where,
                statusCode: { gte: 500 }
            }
        }),
        prisma.requestLog.findMany({
            take: 100,
            orderBy: { createdAt: 'desc' },
            where: { userId },
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