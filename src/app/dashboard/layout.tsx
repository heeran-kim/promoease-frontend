export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-50 p-6 dark:bg-black">{children}</div>
    );
}