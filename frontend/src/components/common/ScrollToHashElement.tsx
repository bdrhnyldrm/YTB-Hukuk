import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router değiştiğinde URL'deki #hash kısmına göre otomatik scroll yapar.
 * Örn: /dava-alanlari#ceza-hukuku
 */
export default function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}
