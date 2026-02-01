import { ColorInput } from "@/components/ui/color-picker";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGrid, ItemTitle } from "@/components/ui/item";
import { NumberInput } from "@/components/ui/number-input";
import { Switch } from "@/components/ui/switch";
import { useKeyEvent } from "@/stores/key_event";
import { useKeyStyle } from '@/stores/key_style';
import { ArrowExpand02Icon, Cursor01Icon, CursorCircleSelection01Icon, CursorEdit01Icon, CursorMagicSelection03FreeIcons, Drag03Icon, KeyboardIcon, Link02Icon, MouseLeftClick05Icon, PaintBoardIcon, Unlink02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NumberScrubber } from "../ui/number-input-scrub";
import { useState } from "react";
import { Toggle } from "../ui/toggle";


export const MouseSettings = () => {
    const mouse = useKeyStyle(state => state.mouse);
    const setMouseStyle = useKeyStyle(state => state.setMouse);

    const dragThreshold = useKeyEvent(state => state.dragThreshold);
    const setDragThreshold = useKeyEvent(state => state.setDragThreshold);

    const showMouseEvents = useKeyEvent(state => state.showMouseEvents);
    const setShowMouseEvents = useKeyEvent(state => state.setShowMouseEvents);

    const [offsetLinked, setOffsetLinked] = useState(true);

    return <div className="flex flex-col gap-y-4 p-6">
        <h1 className="text-xl font-semibold">鼠标</h1>

        <h2 className="text-sm text-muted-foreground font-medium">光标高亮</h2>
        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={CursorMagicSelection03FreeIcons} size="1em" /> 鼠标点击动画
                </ItemTitle>
                <ItemDescription>
                    鼠标按钮按下时显示光环动画。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Switch
                    checked={mouse.showClicks}
                    onCheckedChange={(showClicks) => setMouseStyle({ showClicks })}
                />
            </ItemActions>
        </Item>

        <ItemGrid>
            <Item variant="muted">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={CursorCircleSelection01Icon} size="1em" /> 大小
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <NumberInput
                        step={10}
                        className="w-32 h-8"
                        value={mouse.size}
                        onChange={(size) => setMouseStyle({ size })}
                    />
                </ItemActions>
            </Item>

            <Item variant="muted">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={PaintBoardIcon} size="1em" /> 颜色
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ColorInput
                        className="w-32"
                        value={mouse.color}
                        onChange={(color) => setMouseStyle({ color })}
                        disabled={!mouse.showClicks}
                    />
                </ItemActions>
            </Item>
        </ItemGrid>

        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={Cursor01Icon} size="1em" /> 保持显示
                </ItemTitle>
                <ItemDescription>
                    一直显示光标光环和按键指示器。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Switch
                    checked={mouse.keepHighlight}
                    onCheckedChange={(keepHighlight) => setMouseStyle({ keepHighlight })}
                    disabled={!mouse.showClicks && !mouse.showIndicator}
                />
            </ItemActions>
        </Item>

        <h2 className="text-sm text-muted-foreground font-medium mt-2">按键指示器</h2>
        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={MouseLeftClick05Icon} size="1em" /> 按键指示器
                </ItemTitle>
                <ItemDescription>
                    在光标旁显示鼠标点击和滚动指示图标。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Switch
                    checked={mouse.showIndicator}
                    onCheckedChange={(showIndicator) => setMouseStyle({ showIndicator })}
                />
            </ItemActions>
        </Item>

        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={CursorEdit01Icon} size="1em" /> 大小
                </ItemTitle>
            </ItemContent>
            <ItemActions>
                <NumberInput
                    className="w-32 h-8"
                    value={mouse.indicatorSize}
                    onChange={(indicatorSize) => setMouseStyle({ indicatorSize })}
                />
            </ItemActions>
        </Item>

        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={ArrowExpand02Icon} size="1em" /> 位置
                </ItemTitle>
                <ItemDescription>
                    光标到指示器的距离。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <NumberScrubber
                    value={mouse.indicatorOffsetX}
                    onChange={offsetLinked ? (indicatorOffsetX => { setMouseStyle({ indicatorOffsetX }); setMouseStyle({ indicatorOffsetY: indicatorOffsetX }); }) : (indicatorOffsetX => setMouseStyle({ indicatorOffsetX }))}
                    step={1}
                    icon={<span className="ml-0.5 text-xs font-medium">X</span>}
                    className="w-18"
                />
                <Toggle
                    variant="default"
                    pressed={offsetLinked}
                    onPressedChange={(pressed) => {
                        setOffsetLinked(pressed);
                        if (pressed) {
                            setMouseStyle({ indicatorOffsetY: mouse.indicatorOffsetX });
                        }
                    }}
                    aria-label="锁定位置长宽"
                >
                    <HugeiconsIcon icon={offsetLinked ? Link02Icon : Unlink02Icon} size="1em" />
                </Toggle>
                <NumberScrubber
                    value={mouse.indicatorOffsetY}
                    onChange={(indicatorOffsetY) => setMouseStyle({ indicatorOffsetY })}
                    step={1}
                    icon={<span className="ml-0.5 text-xs font-medium">Y</span>}
                    className="w-18"
                    disabled={offsetLinked}
                />
            </ItemActions>
        </Item>

        <h2 className="text-sm text-muted-foreground font-medium mt-2">事件</h2>
        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={Drag03Icon} size="1em" /> 拖动阈值
                </ItemTitle>
                <ItemDescription>
                    判定为拖动的最小移动距离。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <NumberInput
                    className="w-32 h-8"
                    value={dragThreshold}
                    onChange={setDragThreshold}
                />
            </ItemActions>
        </Item>

        <Item variant="muted">
            <ItemContent>
                <ItemTitle>
                    <HugeiconsIcon icon={KeyboardIcon} size="1em" /> 鼠标事件
                </ItemTitle>
                <ItemDescription>
                    将鼠标按钮的动作，比如点击、拖动等，与快捷键显示在一起。
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Switch
                    checked={showMouseEvents}
                    onCheckedChange={(checked) => setShowMouseEvents(checked)}
                />
            </ItemActions>
        </Item>
    </div>;
}