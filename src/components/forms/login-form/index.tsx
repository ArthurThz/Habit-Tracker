import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().min(2, { message: "email can't be empty" }).email(),
  password: z.string().min(2, { message: "password can't be empty" }),
});

const LoginForm = () => {
  const error = useSearchParams().get("error");

  useEffect(() => {
    if (error === "CredentialsSignin") {
      toast.error("Email ou senha inválidos");
    }
  }, [error]);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!response) {
      toast.error("Something went wrong, try again");
    }

    if (response?.error) {
      if (response.error === "CredentialsSignin") {
        toast.error("Wrong email or password");
      } else {
        toast.error("Authentication error");
      }
      return;
    }

    if (response?.ok) {
      router.push("/home");
    }
  };

  return (
    <div className=" w-auto max-w-[400px] h-auto p-4 flex flex-col items-center gap-4">
      <div className="w-full h-auto rounded-lg flex items-center justify-center">
        <Image
          src="../login-image.svg"
          alt="login image"
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium font-quantico">Habit Tracker</h1>
        <p className="font-semibold text-sm text-neutral-300">
          Log in with your email and password to continue
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={form.formState.isSubmitting}
            className="bg-white hover:cursor-pointer"
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
