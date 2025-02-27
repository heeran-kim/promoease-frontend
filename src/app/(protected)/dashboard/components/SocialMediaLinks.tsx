import { platformConfig } from "@/constants/platforms";

interface SocialMediaLinksProps {
    links: Record<keyof typeof platformConfig, string>;
}

export default function SocialMediaLinks({ links }: SocialMediaLinksProps) {
    if (Object.keys(links).length === 0) return null;

    return (
        <div className="flex items-center">
            <div className="flex space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                {Object.entries(platformConfig).map(([key, { icon: Icon, color }]) => {
                    const url = links[key as keyof typeof platformConfig];

                    if (!url) return null;

                    return (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Icon className={`${color} text-sm hover:opacity-80 transition`} />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}