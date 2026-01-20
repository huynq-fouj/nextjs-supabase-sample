import { NextRequest, NextResponse } from "next/server"

type Params = {
    params: {
        id: string;
    }
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params;
  return NextResponse.json({ id });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  return NextResponse.json({ id: params.id, ...body });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return NextResponse.json({ success: true, id: params.id });
}