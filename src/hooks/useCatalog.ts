import { useMemo } from "react";
import catalogData from "@/data/catalog.json";
import type { CardCatalog, PlayerCard } from "@/types/card";

const catalog = catalogData as CardCatalog;

export function useCatalog() {
  return useMemo(
    () => ({
      title: catalog.title,
      subtitle: catalog.subtitle,
      cards: catalog.cards,
    }),
    [],
  );
}

export function useCard(cardId?: string): PlayerCard | undefined {
  const { cards } = useCatalog();
  return useMemo(
    () => (cardId ? cards.find((c) => c.id === cardId) : cards[0]),
    [cards, cardId],
  );
}
