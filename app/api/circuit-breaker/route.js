import { NextResponse } from 'next/server'
import redis from '@/lib/redis'

const SERVICES = ['service-a', 'service-b']

export async function GET() {
    const statuses = await Promise.all(
        SERVICES.map(async (service) => {
            const state = await redis.get(`cb:state:${service}`) || 'CLOSED'
            const failures = await redis.get(`cb:failures:${service}`) || '0'
            return { service, state, failures: parseInt(failures)}
        })
    )
    return NextResponse.json({ statuses })
}