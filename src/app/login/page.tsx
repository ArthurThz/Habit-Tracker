import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8">
      <Card className="w-full lg:w-1/4 h-1/2">
        <CardHeader>
          <CardTitle className="text-lg">
            Welcome to the Habit Tracker App
          </CardTitle>
          <CardDescription>
            Log in with your email and password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>{/* form */}</CardContent>
        <CardFooter>
          <p>
            Does not have an account? {""}
            <span className="underline hover:cursor-pointer">Sign Up</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
