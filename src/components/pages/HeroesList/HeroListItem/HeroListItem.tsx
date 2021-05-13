import { Link } from 'react-router-dom';

import Hero from '../../../../types/Hero';

import './HeroListItem.scss';

const HeroListItem = ({ hero }: { hero: Hero }): JSX.Element => (
  <li className="hero-list-item">
    <Link className="hero-list-item__card" to={`/details/${hero.id}`}>
      {/* Mobile */}
      <div className="hero-list-item__details hero-list-item__details--mobile">
        <img alt={hero.full_name} className="hero-list-item__avatar" src={hero.avatar_url} />
        <div>
          <h2 className="hero-list-item__name">{hero.full_name}</h2>
          <p className="hero-list-item__type">{hero.type.name}</p>
        </div>
      </div>
      {/* Desktop */}
      <div className="hero-list-item__details hero-list-item__details--desktop">
        <img alt={hero.full_name} className="hero-list-item__avatar" src={hero.avatar_url} />
        <h2 className="hero-list-item__name">{hero.full_name}</h2>
      </div>
      <p className="hero-list-item__type hero-list-item__type--desktop">{hero.type.name}</p>

      <p className="hero-list-item__description">{hero.description}</p>
    </Link>
  </li>
);

export default HeroListItem;
