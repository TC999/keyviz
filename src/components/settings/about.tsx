import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { DiscordIcon, GithubIcon, LinkSquare02Icon, BubbleChatTranslateIcon, SparklesIcon, StarsIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { openUrl } from "@tauri-apps/plugin-opener"
import { motion } from "motion/react"
import { useState } from "react"
import { toast } from "sonner"

export const VERSION = "2.1.0"

export const AboutPage = () => {
    const [checking, setChecking] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [hovered, setHovered] = useState(false);

    const visitReleasePage = () => {
        openUrl('https://github.com/zetaloop/keyviz/releases');
    }

    const checkForUpdates = async () => {
        setChecking(true);
        try {
            const response = await fetch('https://api.github.com/repos/zetaloop/keyviz/releases/latest')
            const data = await response.json()
            const latestVersion = data.tag_name.substring(1, 6);
            if (latestVersion !== VERSION) {
                setUpdateAvailable(true);
                toast.success(
                    `有新版本：v${latestVersion}`,
                    {
                        action: { label: '查看', onClick: visitReleasePage }
                    }
                );
            } else {
                toast.info("您使用的就是最新版！");
            }
        } catch (error) {
            toast.error("无法检查更新。");
        }
        setChecking(false);
    }

    return <div>
        <div className="py-6 flex flex-col items-center bg-linear-to-b from-secondary to-background">
            <div className="relative w-24 h-24">
                <motion.img
                    animate={{
                        scale: hovered ? 0.8 : 1,
                        opacity: hovered ? 0 : 1,
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                    src="./logo.svg"
                    alt="logo"
                />
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{
                        scale: hovered ? 1 : 1.2,
                        opacity: hovered ? 1 : 0,
                        filter: hovered ? "" : ["hue-rotate(0deg)", "hue-rotate(360deg)"],
                        transition: {
                            delay: 0.1,
                            filter: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "linear",
                            }
                        }
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                    src="./logo-pro.svg"
                    alt="logo-pro"
                />
            </div>
            <h1 className="mt-4 mb-2 text-xl font-semibold">{
                hovered ? "Keyviz Pro" : "Keyviz"
            }</h1>
            <p className="text-center text-sm text-muted-foreground">
                v{VERSION}-beta <br />
                © 2026 Rahul Mula
            </p>
        </div>

        <div className="mt-6 px-6 flex flex-col gap-4">
            <motion.div
                animate={{
                    scale: hovered ? 1.02 : 1,
                    borderColor: hovered ? ["#FFCA94", "#B3FF88", "#00FFF5", "#B367FF", "#FFCA94"] : "transparent",
                }}
                transition={{
                    borderColor: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "linear",
                    }
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="peer border rounded-lg"
            >
                <Item
                    variant="muted"
                    className="hover:bg-muted"
                >
                    <ItemContent>
                        <ItemTitle>
                            <HugeiconsIcon icon={SparklesIcon} size="1em" /> 升级 Pro
                        </ItemTitle>
                        <ItemDescription>
                            觉得 Keyviz 好用吗？升级 Pro 可以获享更多功能，支持项目发展。
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant={hovered ? "default" : "outline"}
                            onClick={() => openUrl('https://keyviz.org/pro')}
                        >
                            升级
                        </Button>
                    </ItemActions>
                </Item>
            </motion.div>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={StarsIcon} size="1em" /> 检查更新
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    {
                        updateAvailable
                            ? <Button className="cursor-pointer" onClick={visitReleasePage}>有新版本</Button>
                            : <Button variant="outline" onClick={checkForUpdates} disabled={checking}>检查</Button>
                    }
                </ItemActions>
            </Item>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={GithubIcon} size="1em" /> 开源
                    </ItemTitle>
                    <ItemDescription className="max-w-100">
                        代码托管于 GitHub，欢迎查阅、赞助、点亮星标、参与贡献。
                    </ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="icon" onClick={() => openUrl('https://github.com/mulaRahul/keyviz')}>
                        <HugeiconsIcon icon={LinkSquare02Icon} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openUrl('https://github.com/zetaloop/keyviz')}>
                        <HugeiconsIcon icon={BubbleChatTranslateIcon} />
                    </Button>
                </ItemActions>
            </Item>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={DiscordIcon} size="1em" /> Discord
                    </ItemTitle>
                    <ItemDescription className="max-w-100">
                        加入我们的 Discord 社区。
                    </ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="icon" onClick={() => openUrl('https://discord.gg/er9pddccyS')}>
                        <HugeiconsIcon icon={LinkSquare02Icon} />
                    </Button>
                </ItemActions>
            </Item>
        </div>
    </div>
}