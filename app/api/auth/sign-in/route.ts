import prisma from '@/utils/prisma';
import { signInFormSchema } from '@/utils/schema/sign-in-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.json();
  const asAdmin = request.nextUrl.searchParams.get('as_admin');
  const credentials = await signInFormSchema.parseAsync(data);
  const existingUser = await prisma.user.findFirst({
    where: {
      role: asAdmin === 'true' ? 'admin' : 'user',
      phoneNumber: credentials.phoneNumber
    }
  });

  if (existingUser) {
    if (existingUser.password !== credentials.password) {
      return NextResponse.json({
        success: false,
        message: 'Неверный пароль, попробуйте другой',
        payload: null
      });
    }

    return NextResponse.json({
      success: true,
      message: null,
      payload: existingUser
    });
  }

  return NextResponse.json({
    success: false,
    message: 'Пользователя с указанным номером телефона не существует',
    payload: null
  });
}
