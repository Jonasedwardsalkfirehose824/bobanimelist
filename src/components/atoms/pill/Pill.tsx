import classNames from "classnames";
import type { IconProps } from "../icons/icon.model";
import Label from "../label";
import styles from "./Pill.module.scss";

interface PillProps {
    icon: React.ComponentType<IconProps>;
    text: string;
    active?: boolean;
}

function Pill({ icon: Icon, text, active }: PillProps) {
    const iconColor = active ? 's-color-bg-secondary' : 's-color-fg-primary';
    return (
        <div className={classNames({ [styles.pill]: true, [styles['pill--active']]: active })}>
            <Icon size={20} color={iconColor} />
            <Label as='span' font='typo-primary-m-medium' className={classNames({ [styles.pill__text]: true, [styles['pill__text--active']]: active })} style={active ? { color: `var(--${iconColor})` } : undefined}>{text}</Label>
        </div>
    );
}

export default Pill;