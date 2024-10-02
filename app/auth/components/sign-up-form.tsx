'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SignUpFormData,
  signUpFormSchema
} from '@/utils/schema/sign-up-schema';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/utils/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Properties {
  asAdmin: boolean;
}

export default function SignUpForm({ asAdmin }: Readonly<Properties>) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema)
  });

  const router = useRouter();
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpFormData) => signUp(data, asAdmin),

    onSuccess: () => {
      toast.success('Вы успешно создали аккаунт');

      setTimeout(() => {
        router.push('/auth/sign-in?as_admin=' + asAdmin);
      }, 1000);
    },

    onError: (error) => {
      form.reset();
      toast.error(error.message);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => signUpMutation.mutate(data))}
        className="max-w-xl w-full flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Ваша фамилия" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше отчество" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата рождения</FormLabel>
                <FormControl>
                  <Input placeholder="01.01.2000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+375 (XX) XXX-XX-XX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="• • • • • •" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Убедитесь, что вы запомнили ваш пароль. В случае чего, сменить
                пароль сможет только администратор.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </Form>
  );
}
