import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, register } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    aboutme: "Portfolio owner and developer",
    phone: "",
    portfolioURL: "",
    gitHubURL: "",
    linkedInURL: "",
    instagramURL: "",
    twitterURL: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "avatar") {
      setAvatar(file);
    } else if (type === "resume") {
      setResume(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!avatar || !resume) {
      toast.error("Please select both avatar and resume files!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("aboutme", formData.aboutme);
    data.append("phone", formData.phone);
    data.append("portfolioURL", formData.portfolioURL);
    data.append("gitHubURL", formData.gitHubURL);
    data.append("linkedInURL", formData.linkedInURL);
    data.append("instagramURL", formData.instagramURL);
    data.append("twitterURL", formData.twitterURL);
    data.append("avatar", avatar);
    data.append("resume", resume);

    dispatch(register(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, dispatch]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex min-h-[100vh] items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to create your portfolio dashboard account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="aboutme">About Me</Label>
              <Input
                id="aboutme"
                name="aboutme"
                type="text"
                value={formData.aboutme}
                onChange={handleInputChange}
                placeholder="Brief description about yourself"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1234567890"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar">Profile Picture *</Label>
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "avatar")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resume">Resume/CV *</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "resume")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gitHubURL">GitHub URL</Label>
              <Input
                id="gitHubURL"
                name="gitHubURL"
                type="url"
                value={formData.gitHubURL}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedInURL">LinkedIn URL</Label>
              <Input
                id="linkedInURL"
                name="linkedInURL"
                type="url"
                value={formData.linkedInURL}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Creating Account"} />
            ) : (
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            )}
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/login.png"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Register;
