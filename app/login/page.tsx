import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/"); // Redirect to home if user is already logged in
  }
  return <Form />;
};

export default page;
