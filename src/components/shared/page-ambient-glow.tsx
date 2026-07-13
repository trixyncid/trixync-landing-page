/**
 * Single fixed viewport background — base color, gradient wash, and soft orbs.
 * Keeps ambient consistent on every page and visible through the glass header.
 * Mobile drops the large CSS blur orbs (expensive during scroll / menu open).
 */
export function PageAmbientGlow() {
  return (
    <div
      aria-hidden
      className="page-ambient-glow pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-ambient-wash" />
      <div className="absolute left-1/2 top-[-18rem] hidden h-[36rem] w-[min(110rem,200vw)] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[120px] dark:bg-brand/[0.14] md:block" />
      <div className="absolute -right-40 top-[8%] hidden h-[28rem] w-[28rem] rounded-full bg-brand-light/[0.05] blur-[100px] dark:bg-brand-light/[0.1] md:block" />
      <div className="absolute -left-36 top-[38%] hidden h-[24rem] w-[24rem] rounded-full bg-brand/[0.04] blur-[100px] dark:bg-brand/[0.08] md:block" />
      <div className="absolute bottom-[-8rem] left-1/2 hidden h-[26rem] w-[min(90rem,160vw)] -translate-x-1/2 rounded-full bg-brand/[0.035] blur-[110px] dark:bg-brand/[0.07] md:block" />
    </div>
  );
}
