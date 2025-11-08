import AnimatedLogo from '../../components/atoms/animated-logo';
import { motion, type Variants } from "motion/react";
import { useState, useEffect } from 'react';
import styles from './Loader.module.scss';

const pageVariants: Variants = {
    initial: {
        opacity: 1,
    },
    in: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    out: {
        opacity: 1,
        transition: {
            duration: 0.8,
        },
    },
};

function Loader() {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            key={"page-loader"}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className={styles.loader}
        >
            <AnimatedLogo isExiting={isExiting} />
        </motion.div>
    );
}

export default Loader;