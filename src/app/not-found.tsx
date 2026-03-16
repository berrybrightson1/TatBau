import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted">Page not found.</p>
      <Link
        href="/"
        className="text-accent hover:underline font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
}
