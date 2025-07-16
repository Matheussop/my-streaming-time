import React, { useState } from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@components/ui/button";

interface BackendLoadingProps {
  message?: string;
  attempt?: number;
  maxAttempts?: number;
  elapsedTime?: number;
  onRetry?: () => void;
}

export const BackendLoading: React.FC<BackendLoadingProps> = ({
  message = "Conectando ao servidor...",
  attempt,
  maxAttempts,
  elapsedTime,
  onRetry,
}) => {
  const [showLongWaitMessage, setShowLongWaitMessage] = useState(false);

  // Show long wait message after 1 minute
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLongWaitMessage(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-md flex-col items-center space-y-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />

        <div className="space-y-2 text-center">
          <p className="text-muted-foreground text-sm">{message}</p>

          {attempt && maxAttempts && (
            <p className="text-muted-foreground text-xs">
              Tentativa {attempt} de {maxAttempts}
            </p>
          )}

          {elapsedTime && (
            <p className="text-muted-foreground text-xs">
              Tempo decorrido: {formatTime(elapsedTime)}
            </p>
          )}
        </div>

        {showLongWaitMessage && (
          <div className="mt-4 space-y-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
            <AlertCircle className="mx-auto h-5 w-5 text-yellow-600" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-yellow-800">
                Servidor demorando para responder
              </p>
              <p className="text-xs text-yellow-700">
                O servidor pode estar iniciando. Isso é normal em serviços
                gratuitos.
              </p>
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="mt-2"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tentar novamente
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
