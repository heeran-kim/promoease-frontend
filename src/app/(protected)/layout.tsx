"use client";

import Header from "@/components/common/Header";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_ITEMS } from "@/constants/navItems";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    if (!user) return <>{children}</>;

    let currentNav = NAV_ITEMS.find((item) => pathname.startsWith(item.href));
    let backTo: string | null = null;

    if (currentNav?.subPages?.length) {
        const subPage = currentNav.subPages.find((sub) => pathname === sub.href);
        if (subPage) {
            backTo = currentNav.href;
            currentNav = subPage;
        }
    } else {
        const parentNav = NAV_ITEMS.find((item) =>
            item.subPages?.some((sub) => pathname.startsWith(sub.href))
        );
        if (parentNav) {
            const subPage = parentNav.subPages?.find((sub) => pathname.startsWith(sub.href));
            currentNav = subPage || parentNav;
            if (subPage) backTo = parentNav.href;
        }
    }

    const actions = currentNav?.actions?.(router) || [];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Header
                title={currentNav?.name || "Page"}
                description={currentNav?.description}
                actions={actions}
                backTo={backTo ?? undefined}
            />
            {children}
        </div>
    );
}