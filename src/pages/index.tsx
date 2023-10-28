import { useRouter } from "next/router";

export default function Home() {
  if (typeof window !== "undefined") {
    const router = useRouter();
    router.replace("/dashboard");
  }
}
