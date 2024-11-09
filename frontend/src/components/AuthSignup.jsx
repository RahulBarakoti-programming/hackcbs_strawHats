import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Formik } from "formik";
import { userSchema } from "@/validation/registerSchema.js";
import { signupUser } from "@/handler/authCallHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { encryptDataWithPass, generateKeyPair } from "@/web3functions/Keys";

function AuthSignup({ setStat }) {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          pass: "",
          secretPass: "",
        }}
        validationSchema={userSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            console.log("Signup attempt");

            // Generate public and private keys
            const { publicKey, privateKey } = generateKeyPair();

            // Encrypt private key using user-provided secret password
            const encryptedPrivateKey = encryptDataWithPass(
              privateKey,
              values.secretPass
            );

            // Make signup request
            const response = await signupUser({
              firstName: values.firstName,
              email: values.email,
              pass: values.pass,
              secretPass: values.secretPass,
              privateKey: encryptedPrivateKey,
              publicKey: publicKey,
            });

            toast("Successful", {
              description: "Signup successful",
              style: { color: "green" },
            });

            navigate("/");
          } catch (error) {
            console.error("Signup error:", error);

            setErrors({
              serverError:
                error.response?.data?.message ||
                "Signup failed, please try again.",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Card className="w-[350px] bg-samBlack">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Create New Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName" className="text-white">
                      Full Name / Company Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Rahul"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={
                        errors.firstName && touched.firstName
                          ? "border-red-600"
                          : ""
                      }
                    />
                    {errors.firstName && touched.firstName && (
                      <span className="text-xs text-red-600">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid w-full items-center gap-4 mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="example@gmail.com"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={
                        errors.email && touched.email ? "border-red-600" : ""
                      }
                    />
                    {errors.email && touched.email && (
                      <span className="text-xs text-red-600">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid w-full items-center gap-4 mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="secretPass" className="text-white">
                      Secret Password (Only for you)
                    </Label>
                    <Input
                      id="secretPass"
                      placeholder="********"
                      type="password"
                      name="secretPass"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.secretPass}
                      className={
                        errors.secretPass && touched.secretPass
                          ? "border-red-600"
                          : ""
                      }
                    />
                    {errors.secretPass && touched.secretPass && (
                      <span className="text-xs text-red-600">
                        {errors.secretPass}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid w-full items-center gap-4 mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="pass" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="pass"
                      placeholder="*******"
                      type="password"
                      name="pass"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pass}
                      className={
                        errors.pass && touched.pass ? "border-red-600" : ""
                      }
                    />
                    {errors.pass && touched.pass && (
                      <span className="text-xs text-red-600">
                        {errors.pass}
                      </span>
                    )}
                  </div>
                </div>

                {errors.serverError && (
                  <div className="text-xs text-red-600 mt-2">
                    {errors.serverError}
                  </div>
                )}

                <CardFooter className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => setStat("login")}>
                    Login
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Signup
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}
      </Formik>
    </div>
  );
}

export default AuthSignup;
