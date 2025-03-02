// app/(protected)/dashboard/components/LastPostInfo.tsx
import { platformConfig } from "@/utils/icon";
import { SocialMedia } from "@/types";

interface SocialMediaLinksProps {
    social: SocialMedia[];
}

export default function SocialMediaLinks({ social }: SocialMediaLinksProps) {
    if (social.length === 0) return null;

    return (
        <div className="flex items-center">
            <div className="flex space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                {social.map(({ platform, link }) => {
                    const platformInfo = platformConfig[platform];
                    if (!platformInfo) return null;
                    const { icon: Icon, color } = platformInfo;

                    return (
                        <a
                            key={platform}
                            href={link}
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