import { useEffect, useState } from "react";

export default function useMediaQuery(mediaQuery: string) {
  const [matches, setmatches] = useState(false); // este é o nosso estado inicial

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery); // criar um objeto media query list

    const handleMediaChange = (e: MediaQueryListEvent) => {
      //atualiza sempre que o estado do ecra mudar
      setmatches(e.matches); //define matches como verdadeiro e falso
    };
    setmatches(mediaQueryList.matches); // atualiza o estado inicial com o valor atual da media query
    mediaQueryList.addEventListener("change", handleMediaChange); // Esta atento a mudancas no ecra
    return () => {
      mediaQueryList.removeEventListener("change", handleMediaChange);
    };
  });

  return matches;
}
