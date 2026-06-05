import { SignIn } from "@clerk/nextjs";
import { fightReadyAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return <SignIn appearance={fightReadyAppearance} />;
}
