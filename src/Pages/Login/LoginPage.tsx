import { FaApple, FaStar } from "react-icons/fa";
import "./index.css";
import { FaMeta } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import GlobalToast from "../../components/GlobalToast";
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      email: yup.string().required("Email is required"),
      password: yup.string().min(8).required("Password is required"),
    }),
    onSubmit: () => {},
  });
  const handleSubmit = ({ firstName }: { firstName: string }) => {
    formik.handleSubmit();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        GlobalToast({
          message: Object.values(errors)[0],
          messageTimer: 1100,
          messageType: "error",
        });
      } else {
        localStorage.setItem("username", firstName);
        navigate("/dashboard");
      }
    });
  };
  return (
    <div className="main relative">
      <div className="flex relative justify-between items-center gap-3.5 p-20 min-h-full">
        <div className="max-w-117.5 flex flex-col justify-between ">
          <div className="">
            <h2 className="login-heading-text">
              Expert level Cybersecurity in{" "}
              <span className="text-primary">hours </span>
              not weeks.
            </h2>
            <h1 className="mb-2.5">What's included</h1>
            <div className="features-list">
              <p className="">
                <span className="text-sm text-green-800 mr-2">&#10004;</span>
                Effortlessly spider and map targets to uncover hidden security
                flaws
              </p>
              <p className="">
                <span className="text-sm text-green-800 mr-2">&#10004;</span>
                Deliver high-quality, validated findings in hours, not weeks.
              </p>
              <p className="">
                <span className="text-sm text-green-800 mr-2">&#10004;</span>
                Generate professional, enterprise-grade security reports
                automatically.
              </p>
            </div>
          </div>
          <div className="mt-35">
            <div className="text-sm flex gap-2 items-center mb-2.5">
              <FaStar className="text-[#00b579]" />
              Trustpilot
            </div>
            <div className="flex items-start gap-1.5">
              Rated 4.5/5.0{" "}
              <span className="text-xs text-[#9e9e9e] mt-0.75">
                (100k+ reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <div className="login-tab">
            <header className="text-center">
              <h1 className="text-3xl mb-3">Sign up</h1>
              <span className="">
                Already have an account?{" "}
                <a href="/login" className="text-primary">
                  Log in
                </a>
              </span>
            </header>
            <form action="" className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="First name*"
                name="firstName"
                onChange={formik.handleChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Last name*"
                name="lastName"
                onChange={formik.handleChange}
              />
              <input
                type="email "
                className="form-control"
                placeholder="Email address*"
                name="email"
                onChange={formik.handleChange}
              />
              <div className="relative w-full">
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control w-full"
                  placeholder="Password (8+ character)*"
                  name="password"
                  onChange={formik.handleChange}
                  maxLength={10}
                />
                <button
                  className="absolute right-5 top-4"
                  type="button"
                  onClick={() => setshowPass((prev) => !prev)}
                >
                  {showPass ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              <fieldset>
                <input type="checkbox" name="" id="terms" />
                <label htmlFor="terms" className="ml-2 text-sm text-[#342d2d]">
                  I agree to the Aps's{" "}
                  <a href="" className="text-blue-500">
                    Terms & Conditions
                  </a>{" "}
                  and acknowledge the{" "}
                  <a href="" className="text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </fieldset>
              <button
                className="bg-btn-primary rounded-full text-white p-2"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit(formik.values);
                }}
              >
                Create account
              </button>
              <div className="flex gap-2">
                <button className="grow bg-black text-white p-2.5 rounded-full flex justify-center text-2xl">
                  <FaApple />
                </button>
                <button className="grow bg-[#f9f2ef] p-2.5 rounded-full flex justify-center text-2xl">
                  <img src="/google.svg" alt="" className="h-6" />
                </button>
                <button className="grow bg-[#3d6ddf] text-white p-2.5 rounded-full flex justify-center text-2xl">
                  <FaMeta />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <img src="/Logo.png" alt="" className="h-15" />
      </div>
    </div>
  );
};

export default LoginPage;
