import { NextResponse } from 'next/server';
import { chats } from '@/app/friends/data/chats';

export async function GET() {
  return NextResponse.json(chats);
}