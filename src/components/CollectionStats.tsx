interface CollectionStatsProps {
  inCellarCount: number;
  tastedCount: number;
  wishlistCount: number;
}

export default function CollectionStats({ inCellarCount, tastedCount, wishlistCount }: CollectionStatsProps) {
  return (
    <div className="collection-stats">
      <div className="stat-card">
        <span className="stat-number">{inCellarCount}</span>
        <span className="stat-label">Lagret</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{tastedCount}</span>
        <span className="stat-label">Prøvd</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{wishlistCount}</span>
        <span className="stat-label">Ønskeliste</span>
      </div>
    </div>
  );
}
