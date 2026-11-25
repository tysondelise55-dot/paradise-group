import { RouteMotion } from '@/components/PageMotion';

/* RouteMotion remounts PageMotion on every pathname change, which reruns the
   page intro and rebuilds its ScrollTriggers (all reverted on the next route). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteMotion>{children}</RouteMotion>;
}
