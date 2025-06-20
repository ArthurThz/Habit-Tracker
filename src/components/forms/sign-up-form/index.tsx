import { useRouter } from "next/navigation";
import FormContainer from "../form-container";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useSignUp } from "@/hooks/react-query/useSignUp";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name can't be empty" }),
  email: z
    .string()
    .email({ message: "Email invalid" })
    .min(1, { message: "Email can't be empty" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type formSchemaType = z.infer<typeof formSchema>;
const SignUpForm = () => {
  const newUserMutation = useSignUp();
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    newUserMutation.mutate(
      { email: values.email, name: values.name, password: values.password },
      {
        onSuccess: async () => {
          const response = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (response?.ok) {
            toast.success("Signed up successfully!");
            router.push("/home");
            form.reset();
          } else {
            toast.error("Login failed after sign up. Try logging in manually.");
            // router.push("/auth/login");
          }
        },

        onError: (data) => {
          toast.error(data.message);
        },
      }
    );
  };
  return (
    <FormContainer
      title="Welcome to Habit Tracker"
      subtitle="Fill the form to sign up"
      image="../Sign up-amico.svg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
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
              <LoaderCircle className="animate-spin" aria-hidden />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
        <p className="font-quantico">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="underline underline-offset-2 text-green-500 font-bold hover:cursor-pointer"
          >
            Log In
          </span>
        </p>
      </Form>
    </FormContainer>
  );
};

export default SignUpForm;
