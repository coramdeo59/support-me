import { Poppins, Geist } from "next/font/google";

// Configure Poppins font
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// Configure Geist font (fallback to a system font if Geist isn't available)
export const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
}); 