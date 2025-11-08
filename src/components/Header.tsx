import { useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div>
          <div className="logo">Luberon på Glass</div>
          <div className="logo-subtitle">Oppdag viner fra Luberon</div>
        </div>
        <div className="header-icon">📚</div>
      </div>
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Søk etter vin eller matpairing..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </header>
  );
}
