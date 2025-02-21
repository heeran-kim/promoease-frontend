import SubNavbar from "@/components/layout/SubNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-6">{children}</div>
    );
}