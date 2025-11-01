import type { IconProps } from "./icon.model";
import { cssColorVar } from "../../../shared/design-system/util";

function LogoIcon({ size, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width={size} height={size}>
            <path
                fill="#8B0000"
                d="M87 55c17-1 34 0 51 1 18 1 36 5 49 17 10 9 15 21 15 35 0 16-8 29-22 38 16 6 28 16 33 32 6 19 2 36-10 51-12 14-28 22-46 24-12 2-24 3-36 3H77c-1 0-2 0-3-1l1-2c3-4 3-8 3-12V70c0-4 0-9-2-13l-1-2c1 0 2 0 3 0h9zm33 72h25c10 0 18-2 25-8 7-6 10-13 9-23-2-11-9-18-21-20-12-2-24-1-37-1h-1v52zm0 97h29c9 0 18-2 25-8 9-6 13-15 12-26-2-12-9-21-22-25-6-2-12-3-19-3h-25v62z"
            />
        </svg>

    );
}

export default LogoIcon;