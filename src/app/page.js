import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-x-10">
      <Link
        href="/sign-in"
        className="px-10 py-3 bg-slate-400 rounded-lg hover:bg-slate-300"
      >
        Sign In
      </Link>

      <Link
        href="/sign-up"
        className="px-10 py-3 bg-slate-400 rounded-lg hover:bg-slate-300"
      >
        Sign Up
      </Link>
    </div>
  );
}
