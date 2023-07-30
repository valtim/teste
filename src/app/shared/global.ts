export const SERVER_API_URL: string = 
window.location.host === "localhost:4200"
  ? "https://localhost:44343/api/"
  : "https://api.bristow.sistemasol.com.br/api/";

// renomeie esse arquivo para "globals.ts"
// coloque o link para api que deseja.
// é importante que termine com a '/' 