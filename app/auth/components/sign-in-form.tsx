import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignInFormData,
  signInFormSchema
} from '@/utils/schema/sign-in-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/utils/actions/auth-actions';

interface Properties {
  asAdmin: boolean;
}

export default function SignInForm({ asAdmin }: Readonly<Properties>) {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  });

  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: (data: SignInFormData) => signIn(data, asAdmin),

    onSuccess: (user) => {
      toast.success(
        'Вы успешно вошли в аккаунт '.concat(
          asAdmin ? 'администратора' : 'пользователя'
        )
      );

      localStorage.setItem('current_user', JSON.stringify(user));

      setTimeout(() => {
        if (asAdmin) {
          router.push('/www/dashboard');
        } else {
          router.push('/www/home');
        }
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
        onSubmit={form.handleSubmit((data) => signInMutation.mutate(data))}
        className="max-w-xl w-full flex flex-col gap-4"
      >
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
