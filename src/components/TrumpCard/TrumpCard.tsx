import { STAT_KEYS, STAT_LABELS } from "@/types/card";
import type { PlayerCard } from "@/types/card";
import { StatPipes } from "@/components/StatPipes";
import { nationalityToFlagUrl, getFlagSrcSet, getPlayerImageUrl, getCountryCode } from "@/utils/flag";
import logoUrl from "@/data/logo.png";
import grassBgUrl from "@/data/player-images/grass-bg.png";
import playerFallbackUrl from "@/data/player-images/placeholder.png";
import "./TrumpCard.css";

interface TrumpCardProps {
  card: PlayerCard;
}

export function TrumpCard({ card }: TrumpCardProps) {
  const flagUrl = nationalityToFlagUrl(card.nationality, 40);
  const flagSrcSet = getFlagSrcSet(card.nationality, 40);
  const playerImgUrl = getPlayerImageUrl(card.nationality, card.number);
  const countryCode = getCountryCode(card.nationality);

  return (
    <article className="iss-card" aria-label={`${card.name} player card`}>
      <div className="iss-card__header-row">
        <span className="iss-card__badge">
          <span className="iss-card__badge-country">{countryCode}</span>
          <span className="iss-card__badge-number">{card.number}</span>
        </span>

        <header className="iss-card__banner">
          <div className="iss-card__brand">
            <img
              className="iss-card__logo"
              src={logoUrl}
              alt="International Superstar Soccer"
            />
          </div>
          <img
            className="iss-card__flag-img"
            src={flagUrl}
            srcSet={flagSrcSet}
            height={40}
            alt={card.nationality}
            loading="lazy"
          />
        </header>
      </div>

      <div className="iss-card__portrait" style={{ backgroundImage: `url(${grassBgUrl})` }}>
        {card.star && <span className="iss-card__star-badge">★</span>}
        <img
          className="iss-card__player-img"
          src={playerImgUrl}
          alt=""
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== playerFallbackUrl) {
              target.src = playerFallbackUrl;
            }
          }}
          loading="lazy"
        />
      </div>

      <div className="iss-card__name-plate">
        <h2 className="iss-card__name">{card.name}</h2>
        <span className="iss-card__position-tag">{card.position}</span>
      </div>

      <ul className="iss-card__stats">
        {STAT_KEYS.map((key) => (
          <li key={key} className="iss-card__stat">
            <span className="iss-card__stat-label">{STAT_LABELS[key]}</span>
            <div className="iss-card__stat-row">
              <StatPipes value={card.stats[key]} label={STAT_LABELS[key]} />
              <span className="iss-card__stat-value">{card.stats[key]}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
