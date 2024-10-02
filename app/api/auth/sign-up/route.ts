import prisma from '@/utils/prisma';
import { signUpFormSchema } from '@/utils/schema/sign-up-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.json();
  const asAdmin = request.nextUrl.searchParams.get('as_admin');
  const credentials = await signUpFormSchema.parseAsync(data);
  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: credentials.phoneNumber
    }
  });

  if (existingUser) {
    return NextResponse.json({
      success: false,
      message: 'Пользователь с указанным номером телефона уже существует',
      payload: null
    });
  }

  const createdUser = await prisma.user.create({
    data: {
      role: asAdmin === 'true' ? 'admin' : 'user',
      ...credentials
    }
  });

  return NextResponse.json({
    success: true,
    message: null,
    payload: createdUser
  });
}
