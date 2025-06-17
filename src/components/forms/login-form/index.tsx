import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
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
    console.log(values);

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
    <div className=" w-auto h-auto p-4 flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md p-4 flex flex-col gap-4 "
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
                <FormDescription>
                  <span className="text-green-500 font-medium font-quantico">
                    little reminder:{" "}
                  </span>{" "}
                  {`New habits cant take 60 days to develop. Dont't give up!`}
                </FormDescription>
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
