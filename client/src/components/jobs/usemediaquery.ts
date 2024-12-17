import { useEffect, useState } from "react";

const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detecta se estamos em mobile

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
    setIsMobile(e.matches); // Atualiza o estado isMobile com base na largura
  };

  handleMediaChange(mediaQuery); // Verifica o estado inicial

  mediaQuery.addEventListener("change", handleMediaChange); // Escuta mudanças na largura

  return () => {
    mediaQuery.removeEventListener("change", handleMediaChange); // Remove listener ao desmontar
  };
}, []);
