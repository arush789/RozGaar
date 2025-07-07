import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <Form />;
};

export default page;
