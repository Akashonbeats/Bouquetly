import { FLOWERS } from '../../utils/flowers';
import './FloatingPetals.css';

/**
 * Floating watercolor petals scattered across the background.
 * Used on every page for ambient decoration.
 * `count` controls density (default 8).
 */
const PETAL_CONFIGS = [
  { x: '7%',  y: '8%',  delay: '0s',   dur: '8s'  },
  { x: '88%', y: '6%',  delay: '1.2s', dur: '9s'  },
  { x: '4%',  y: '30%', delay: '2.5s', dur: '7s'  },
  { x: '92%', y: '28%', delay: '0.6s', dur: '10s' },
  { x: '12%', y: '55%', delay: '1.8s', dur: '8s'  },
  { x: '85%', y: '52%', delay: '3.2s', dur: '7s'  },
  { x: '6%',  y: '78%', delay: '0.4s', dur: '9s'  },
  { x: '90%', y: '75%', delay: '2.8s', dur: '8s'  },
  { x: '25%', y: '15%', delay: '1.5s', dur: '10s' },
  { x: '72%', y: '18%', delay: '3.5s', dur: '7s'  },
  { x: '18%', y: '68%', delay: '2.0s', dur: '9s'  },
  { x: '78%', y: '65%', delay: '0.8s', dur: '8s'  },
];

export default function FloatingPetals({ count = 8 }) {
  const petals = FLOWERS.slice(0, count);
  const configs = PETAL_CONFIGS.slice(0, count);

  return (
    <div className="floating-petals" aria-hidden="true">
      {petals.map((flower, i) => {
        const c = configs[i];
        const size = 28 + (i % 4) * 6; // 28–46px
        return (
          <div
            key={flower.id}
            className="floating-petals__petal"
            style={{
              left: c.x,
              top: c.y,
              animationDelay: c.delay,
              animationDuration: c.dur,
            }}
          >
            <img
              src={flower.image}
              alt=""
              style={{ width: size, height: size, objectFit: 'contain' }}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
