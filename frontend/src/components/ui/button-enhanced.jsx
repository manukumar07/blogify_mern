// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";
// import { cn } from "@/lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground hover:bg-primary/90 hover-lift shadow-md",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover-lift shadow-md",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover-lift",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover-lift shadow-md",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//         hero: "bg-gradient-primary text-white hover:shadow-glow hover-lift font-semibold animate-glow",
//         premium:
//           "bg-gradient-to-r from-primary via-accent to-primary-light text-white hover:shadow-glow hover-lift font-semibold bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500",
//         glass:
//           "glass text-white hover:bg-white/20 backdrop-blur-xl border border-white/20 hover-lift shadow-lg",
//         minimal:
//           "text-foreground hover:text-primary hover:bg-primary/5 transition-colors",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-lg px-3",
//         lg: "h-12 rounded-lg px-8",
//         xl: "h-14 rounded-lg px-10 text-base",
//         icon: "h-10 w-10",
//         "icon-sm": "h-8 w-8",
//         "icon-lg": "h-12 w-12",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Variant and size maps (pure Tailwind + hex codes)
const buttonVariants = {
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group font-[Inter]",

  variants: {
    default:
      "bg-[#3366FF] text-[#FFFFFF] hover:bg-[#3366FF]/90 shadow-md hover:scale-105",
    destructive:
      "bg-[#EF4444] text-[#FFFFFF] hover:bg-[#DC2626] shadow-md hover:scale-105",
    outline:
      "border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#00CCCC] hover:text-[#FFFFFF]",
    secondary:
      "bg-[#6633CC] text-[#FFFFFF] hover:bg-[#5522AA] shadow-md hover:scale-105",
    ghost: "hover:bg-[#00CCCC]/10 hover:text-[#00CCCC]",
    link: "text-[#3366FF] underline-offset-4 hover:underline",
    hero: "bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-[#FFFFFF] font-semibold shadow-md hover:shadow-lg hover:scale-105 animate-[glow_2s_ease-in-out_infinite_alternate]",
    premium:
      "bg-gradient-to-r from-[#3366FF] via-[#00CCCC] to-[#99BBFF] text-[#FFFFFF] font-semibold shadow-md hover:shadow-lg hover:scale-105 bg-[length:200%_200%] bg-left hover:bg-right transition-all duration-500",
    glass:
      "backdrop-blur-xl border border-white/20 bg-white/10 text-[#FFFFFF] shadow-lg hover:bg-white/20 hover:scale-105",
    minimal:
      "text-[#0B0F19] hover:text-[#3366FF] hover:bg-[#3366FF]/5 transition-colors",
  },

  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-lg px-3",
    lg: "h-12 rounded-lg px-8",
    xl: "h-14 rounded-lg px-10 text-base",
    icon: "h-10 w-10",
    "icon-sm": "h-8 w-8",
    "icon-lg": "h-12 w-12",
  },
};

// Simple helper to resolve classes
function getButtonClasses(
  variant = "default",
  size = "default",
  className = ""
) {
  return cn(
    buttonVariants.base,
    buttonVariants.variants[variant],
    buttonVariants.sizes[size],
    className
  );
}

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={getButtonClasses(variant, size, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
