// difficulty.ts
export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}


declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData?: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        ready: () => void;
        close: () => void;
        expand: () => void;
        isExpanded: boolean;
        version: string;
        platform: string;
        colorScheme: string;
      };
    };
  }
}

export {};

