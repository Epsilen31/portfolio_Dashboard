import { forgotPassword } from "@/store/slices/forgotResetPasswordSlice";
import { clearAllForgotPasswordError } from "@/store/slices/forgotResetPasswordSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  // State to hold the email input
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  // Extracting necessary state from the Redux store
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handler for form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordError());
    }
    if (message !== null) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, isAuthenticated, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex min-h-[100vh] items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>
          <form onSubmit={handleForgotPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  Back to Login Page?
                </Link>
              </div>
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Submitting..."} />
            ) : (
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            )}
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center">
        <img
          src="/forgot.png"
          alt="Image"
          className="h-100 w-100 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
