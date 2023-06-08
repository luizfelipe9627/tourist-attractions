// Está puxando uma class de outro arquivo JS.
import { touristSpots } from "./components/touristSpots";

// Adiciona um evento de espera do DOM quando ele estiver carregado vai seguir o bloco de comandos.
document.addEventListener("DOMContentLoaded", () => {
    // Está iniciado a classe assim executando o constructor presente no outro arquivo JS.
    new touristSpots();
});
