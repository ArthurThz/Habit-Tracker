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
import { toast } from "sonner";

import { useState } from "react";
import FormContainer from "../form-container";

const formSchema = z.object({
  email: z.string().min(2, { message: "email can't be empty" }).email(),
  password: z.string().min(2, { message: "password can't be empty" }),
});

const LoginForm = () => {
  const [responseError, setResponseError] = useState<string | null>(null);
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
        setResponseError("Wrong email or password");
        // toast.error("Wrong email or password", {
        //   position: "top-center",
        // });
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
    <FormContainer
      title="Habit Tracker App"
      subtitle="Log in with your email and password to continue"
      image="../login-image.svg"
      errorMessage={responseError}
    >
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
    </FormContainer>
  );
};

export default LoginForm;
