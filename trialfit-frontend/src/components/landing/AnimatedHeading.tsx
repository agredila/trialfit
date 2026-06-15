import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}

export function AnimatedHeading({
  children,
  className,
  as: As = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  const MotionTag = motion.create(As);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className, delay = 0.15 }: AnimatedTextProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.p>
  );
}

interface MaskedImageProps extends Omit<HTMLMotionProps<"div">, "children"> {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function MaskedImage({ src, alt, className, delay = 0, ...rest }: MaskedImageProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      {...rest}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}
