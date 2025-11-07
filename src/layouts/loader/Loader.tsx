import AnimatedLogo from '../../components/atoms/animated-logo';
import { motion, type Variants } from "motion/react";
import styles from './Loader.module.scss';

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9,
        rotateY: -20,
    },
    in: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    out: {
        opacity: 0,
        scale: 0.95,
        rotateY: 20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        },
    },
};

function Loader() {
    return (
        <motion.div
            key={"page-loader"}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className={styles.loader}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1200,
            }}
        >
            <AnimatedLogo />
        </motion.div>
    );
}

export default Loader;