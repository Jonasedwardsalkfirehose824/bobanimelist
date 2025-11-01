import type { IconProps } from "./icon.model";
import classNames from "classnames";
import styles from './LogoIcon.module.scss';

function LogoIcon({ size, className }: IconProps) {
    const logoIconClass = classNames(styles.logoIcon, className);
    
    return (
        <img 
            src={`${import.meta.env.BASE_URL}icon.png`} 
            width={size} 
            height={size} 
            style={{ width: size, height: size, objectFit: 'contain' }}
            className={logoIconClass}
            alt="Logo"
        />
    );
}

export default LogoIcon;