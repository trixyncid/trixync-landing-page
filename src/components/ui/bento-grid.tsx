import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-5 md:auto-rows-[minmax(18rem,auto)] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/30 transition duration-300 hover:border-border/70 hover:bg-card/50",
        className,
      )}
    >
      {header}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {icon && <div className="mb-2">{icon}</div>}
        <div className="font-heading text-[0.9375rem] font-medium text-foreground md:text-base">
          {title}
        </div>
        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
