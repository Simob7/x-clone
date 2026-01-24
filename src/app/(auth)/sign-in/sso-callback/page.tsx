import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div id="clerk-captcha"></div>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}
