"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function FramerMotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
