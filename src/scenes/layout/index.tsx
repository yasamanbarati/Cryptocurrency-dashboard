import React from "react";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useDemoRouter } from "services/hooks/useDemoRouter";
import { demoTheme } from "setup/theme/theme";
import { ThemeProviderWrapper } from "components/ThemeSwitcher";
import { NAVIGATION } from "services/server/mock";
import { CssBaseline } from "@mui/material";
import Sidebar from "components/sidebar";
import "./index.css";

const MasterLayout = ({
  children,
  window,
}: Readonly<{
  children: React.ReactNode;
  window?: () => Window;
}>) => {
  const router = useDemoRouter("/");
  const demoWindow = window ? window() : undefined;
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
        branding={{
          logo: <img src="/logo1.webp" alt="logo" />,
          title: "",
        }}
      >
        <DashboardLayout slots={{ toolbarActions: Sidebar }}>
          {children}
        </DashboardLayout>
      </AppProvider>
    </ThemeProviderWrapper>
  );
};

export default MasterLayout;
