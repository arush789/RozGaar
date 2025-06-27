import axios from "axios";

export const getUser = async ({ email }: { email: string }) => {
  try {
    const response = await axios.post("http://localhost:3001/get-user", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getRole = async ({ email }: { email: string }) => {
  try {
    const response = await axios.post("http://localhost:3001/get-role", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
};
