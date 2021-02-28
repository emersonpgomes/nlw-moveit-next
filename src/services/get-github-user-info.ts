import { IUser } from "../contexts/user";

export async function getGitHubUserInfo(username: string) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  return response.json() as unknown as IUser;
}
