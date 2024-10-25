import { useMemo, useState } from "react";
import { Router } from "@toolpad/core/AppProvider";

export function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}
