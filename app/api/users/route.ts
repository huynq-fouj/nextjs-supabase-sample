import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
        name: 'Huy',
        id: 0,
        age: 22,
        address: 'Ha Noi'
    }
  ])
}