import { SignUp } from "@clerk/nextjs";
import { fightReadyAppearance } from "@/lib/clerk-appearance";

export default function SignUpPage() {
  return <SignUp appearance={fightReadyAppearance} />;
}
