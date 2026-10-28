export const CURSED_REPOSITORIES_SAMPLES = [
  {
    name: "Haunted Auth Service (Node/TS)",
    description: "Contains ancient 2021 TODOs, dead JWT fallback functions, and unreachable returns.",
    files: [
      {
        path: "services/authGhost.ts",
        content: `import { verifyToken } from "./jwtHelper";

// TODO: (2021) Replace this hack with OAuth2 refresh tokens once DevOps responds
const TEMPORARY_HARDCODED_SECRET = "sk_haunted_666_eternal_limbo";

export async function authenticateSpirit(token: string) {
  if (!token) {
    throw new Error("No token provided to the séance");
    // Execution will never reach here:
    console.log("Ghostly whispering in unreachable void");
  }

  // FIXME: This breaks on leap years or full moons
  const isSuperUser = token.includes("elder_daemon");

  // function deprecatedSessionBypass() {
  //   return { role: "admin", bypassed: true };
  // }

  return { success: true, isSuperUser };
}
`
      },
      {
        path: "utils/cursedPayment.ts",
        content: `// HACK: Temporary hotfix for Black Friday 2022
export function processSpectralPayment(amount: number) {
  if (amount < 0) {
    return false;
  }
  
  // const legacyStripeCharge = () => chargeV1(amount);
  
  return true;
}
`
      }
    ]
  },
  {
    name: "Possessed E-Commerce Cart",
    description: "Filled with deeply nested callback catacombs and commented-out discount logic.",
    files: [
      {
        path: "cart/checkoutDaemon.ts",
        content: `export function calculateSpectralDiscounts(cart: any) {
  // DEPRECATED: Do not use this discount logic anymore, but leaving here just in case
  // const HalloweenDiscount2020 = 0.31;
  // const DiaDeLosMuertosDiscount = 0.50;

  if (cart) {
    if (cart.items) {
      if (cart.items.length > 0) {
        if (cart.user) {
          if (cart.user.isVip) {
            if (cart.coupon === "SPOOKY") {
              return cart.total * 0.7;
            }
          }
        }
      }
    }
  }

  // TODO: Add logging so we know why carts get abandoned at midnight
  return cart ? cart.total : 0;
}
`
      }
    ]
  }
];
