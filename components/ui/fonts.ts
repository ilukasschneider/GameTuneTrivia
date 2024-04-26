import { Inter, Josefin_Sans, Pixelify_Sans } from "next/font/google";
import { Manrope } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
