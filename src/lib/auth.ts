import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export { authOptions } from "./authOptions";

export const auth = async () => {
  return await getServerSession(authOptions);
};