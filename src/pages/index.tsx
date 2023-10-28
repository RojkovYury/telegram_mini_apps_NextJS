import { useRouter } from "next/router";

export default function Home() {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace("/dashboard");
  }
}
