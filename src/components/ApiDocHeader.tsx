import { Code2 } from "lucide-react";

export const ApiDocHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">API Documentation</h1>
            <p className="text-xs text-muted-foreground">LC PAY - PIX API v1.5.1</p>
          </div>
        </div>
      </div>
    </header>
  );
};
