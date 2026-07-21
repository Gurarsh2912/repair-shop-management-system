import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
    return (
        <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
            <h1>Repair Shop</h1>

            <LoginLink className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Sign In
            </LoginLink>
        </main>
    );
}