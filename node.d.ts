declare namespace NodeJS {
  // process
  interface Process {
    isServer: boolean;
  }
  // process.env
  interface ProcessEnv {
    isClient: boolean;
    NODE_ENV: string;
  }
}
