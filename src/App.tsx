import { useState, useEffect, useRef, useMemo } from "react";
import type { PlayerCard } from "@/types/card";
import { TrumpCard } from "@/components/TrumpCard";
import { useCatalog } from "@/hooks/useCatalog";
import { nationalityToIso2 } from "@/utils/flag";
import "./App.css";
import logoUrl from "@/data/logo.png";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { cards } = useCatalog();
  const [index, setIndex] = useState(0);
  const [navDir, setNavDir] = useState<'prev' | 'next' | null>(null);
  // During animation, keep the outgoing card in its grid slot so positioning is pixel-perfect
  const [capturedSlot, setCapturedSlot] = useState<PlayerCard | null>(null);
  const card = cards[index];
  const animating = useRef(false);

  // Compute country indices: first player (GK) of each country
  const countryIndices = useMemo(() => {
    const seen = new Set<string>();
    const result: { nationality: string; firstIndex: number }[] = [];
    cards.forEach((card, i) => {
      if (!seen.has(card.nationality)) {
        seen.add(card.nationality);
        result.push({ nationality: card.nationality, firstIndex: i });
      }
    });
    return result;
  }, [cards]);

  const goToCountry = (firstIndex: number) => {
    if (animating.current || firstIndex === index) return;
    animating.current = true;
    // Determine direction based on relative position
    const diff = ((firstIndex - index) % cards.length + cards.length) % cards.length;
    const dir = diff <= cards.length / 2 ? 'next' : 'prev';
    setCapturedSlot(null);
    setNavDir(dir);
    setIndex(firstIndex);
  };

  const getCardAt = (offset: number) => {
    const wrappedIndex = (index + offset + cards.length) % cards.length;
    return cards[wrappedIndex];
  };

  const prev = () => {
    if (animating.current) return;
    animating.current = true;
    // Capture the old right card so it stays in the 'next' slot during fade-out
    setCapturedSlot(getCardAt(1));
    setNavDir('prev');
    setIndex((i) => (i === 0 ? cards.length - 1 : i - 1));
  };

  const next = () => {
    if (animating.current) return;
    animating.current = true;
    // Capture the old left card so it stays in the 'previous' slot during fade-out
    setCapturedSlot(getCardAt(-1));
    setNavDir('next');
    setIndex((i) => (i === cards.length - 1 ? 0 : i + 1));
  };

  // Clear animation state after it completes
  useEffect(() => {
    if (navDir) {
      const t = setTimeout(() => {
        setNavDir(null);
        setCapturedSlot(null);
        animating.current = false;
      }, 420);
      return () => clearTimeout(t);
    }
  }, [navDir]);

  // Keyboard navigation with arrow keys
  const prevRef = useRef(prev);
  prevRef.current = prev;
  const nextRef = useRef(next);
  nextRef.current = next;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevRef.current();
      if (e.key === 'ArrowRight') nextRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!card) {
    return <p className="app__empty">NO PLAYERS IN ROSTER</p>;
  }

  const stageClass = navDir
    ? `app__stage app__stage--nav-${navDir}`
    : 'app__stage';

  // During NEXT animation, the 'previous' slot shows the captured (old left) card fading out
  // During PREV animation, the 'next' slot shows the captured (old right) card fading out
  const showCapturedAsPrev = navDir === 'next' && capturedSlot;
  const showCapturedAsNext = navDir === 'prev' && capturedSlot;

  return (
    <main className="app">
      {showIntro && (
        <div className="app__intro">
          <p className="app__intro-text">
            This project was created by a special fan of Konami's International Superstar Soccer for the Super Nintendo.<br/><br/>All credits to Konami for the original game.
          </p>
          <button
            type="button"
            className="app__intro-close"
            onClick={() => setShowIntro(false)}
            aria-label="Close introduction"
          >
            ✕
          </button>
        </div>
      )}

      <header className="app__topbar">
        <div className="app__identity">
          <img
            className="app__logo"
            src={logoUrl}
            alt=""
          />
        </div>
      </header>

      <section className="app__hero" aria-live="polite">
        <div className={stageClass}>
          {/* Previous card — uses captured data during NEXT animation so it stays in-grid */}
          <div className={`app__card-slot app__card-slot--previous${showCapturedAsPrev ? ' app__card-slot--exiting-left' : ''}`}>
            <button type="button" className="app__nav-btn app__nav-btn--prev" onClick={prev}>
              ◀ PREV
            </button>
            <div className="app__card-dimmer">
              <TrumpCard
                card={showCapturedAsPrev ? capturedSlot! : getCardAt(-1)}
              />
            </div>
          </div>

          {/* Current card */}
          <div className="app__card-slot app__card-slot--current">
            <TrumpCard
              key={index}
              card={getCardAt(0)}
            />
            <span className="app__card-counter">
              {String(index + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}
            </span>
          </div>

          {/* Next card — uses captured data during PREV animation so it stays in-grid */}
          <div className={`app__card-slot app__card-slot--next${showCapturedAsNext ? ' app__card-slot--exiting-right' : ''}`}>
            <button type="button" className="app__nav-btn app__nav-btn--next" onClick={next}>
              NEXT ▶
            </button>
            <div className="app__card-dimmer">
              <TrumpCard
                card={showCapturedAsNext ? capturedSlot! : getCardAt(1)}
              />
            </div>
          </div>
        </div>

        {/* Country flag pagination */}
        <nav className="app__pagination" aria-label="Select country">
          {(() => {
            const currentCountryFirst = countryIndices.find(c => c.nationality === card.nationality)?.firstIndex ?? -1;
            return countryIndices.map(({ nationality, firstIndex }) => {
              const flagCode = nationalityToIso2(nationality);
              const isCurrent = firstIndex === currentCountryFirst;
              return (
                <button
                  key={nationality}
                  type="button"
                  className={`app__pagination-btn${isCurrent ? ' app__pagination-btn--active' : ''}`}
                  onClick={() => goToCountry(firstIndex)}
                  title={nationality}
                  aria-label={`${nationality} team`}
                >
                  <span className={`fi fi-${flagCode}`}></span>
                </button>
              );
            });
          })()}
        </nav>
      </section>
    </main>
  );
}
