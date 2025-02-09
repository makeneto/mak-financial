import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/src/context/AppContext";
import "../src/css/style.css";

export const metadata = {
  title: "The Mak Financial",
  description: "The Mak Financial is a modern financial application built with Next.js, designed to help users efficiently manage their finances.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3500,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "90%",
              padding: "16px 24px",
              backgroundColor: "#152126",
              color: "white",
            },
          }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}