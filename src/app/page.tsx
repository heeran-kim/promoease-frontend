import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";

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