import { useState } from "react";
import { Code2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenPdvDialog } from "@/components/TokenPdvDialog";

export const ApiDocHeader = () => {
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">API Documentation</h1>
              <p className="text-xs text-muted-foreground">LC PAY - PIX API v1</p>
            </div>
          </div>

          <Button onClick={() => setTokenDialogOpen(true)} className="gap-2">
            <KeyRound className="h-4 w-4" />
            Como Gerar Token PDV
          </Button>
        </div>
      </header>

      <TokenPdvDialog open={tokenDialogOpen} onOpenChange={setTokenDialogOpen} />
    </>
  );
};
