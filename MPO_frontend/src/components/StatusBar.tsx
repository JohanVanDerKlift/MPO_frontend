import {ProgressBar} from "react-bootstrap";
import './StatusBar.css';

enum Status {
    Ingepland,
    Productie,
    Testen,
    Verzenden,
    Compleet,
    Afgehandeld
}

const statusProgressMap: Record<string, { percent: number; variant: string }> = {
    Ingepland: { percent: 0, variant: 'ingepland' },
    Productie: { percent: 20, variant: 'Productie' },
    Testen: { percent: 40, variant: 'Testen' },
    Verzenden: { percent: 60, variant: 'Verzenden' },
    Compleet: { percent: 80, variant: 'Compleet' },
    Afgehandeld: { percent: 100, variant: 'Afgehandeld' },
}

function StatusBar({ status }: { status: number }) {
  const label = Status[status];
  const { percent, variant } = statusProgressMap[label] || { percent: 0, variant: 'secondary' };

  return (
    <ProgressBar
      now={percent}
      label={label}
      className={`custom-progress ${variant}`}
      style={{ minWidth: '150px' }}
    />
  );
}

export { StatusBar };