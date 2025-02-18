import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300">
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
        </div>
    );
}