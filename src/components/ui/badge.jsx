import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, style, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all",
      className
    )}
    style={style}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
