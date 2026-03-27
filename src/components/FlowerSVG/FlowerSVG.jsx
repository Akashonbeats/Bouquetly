/**
 * FlowerSVG — Renders unique pastel SVG illustrations for each flower type.
 */

export default function FlowerSVG({ type, size = 120, className = '' }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  const flowers = {
    tulip: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <defs>
          <radialGradient id="tulip-g" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#FFD0DC" />
            <stop offset="100%" stopColor="#F8C8D4" />
          </radialGradient>
        </defs>
        <path d={`M${cx} ${s*0.85} Q${cx} ${s*0.5} ${cx} ${s*0.5}`} stroke="#8BAF7A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <ellipse cx={cx-s*0.08} cy={s*0.65} rx={s*0.12} ry={s*0.06} fill="#8BAF7A" opacity="0.6" transform={`rotate(-30 ${cx-s*0.08} ${s*0.65})`}/>
        <path d={`M${cx} ${s*0.15} Q${cx-s*0.2} ${s*0.25} ${cx-s*0.15} ${s*0.5} Q${cx} ${s*0.55} ${cx} ${s*0.5}`} fill="url(#tulip-g)" opacity="0.9"/>
        <path d={`M${cx} ${s*0.15} Q${cx+s*0.2} ${s*0.25} ${cx+s*0.15} ${s*0.5} Q${cx} ${s*0.55} ${cx} ${s*0.5}`} fill="#F5B0C0" opacity="0.8"/>
        <path d={`M${cx} ${s*0.13} Q${cx-s*0.05} ${s*0.3} ${cx} ${s*0.52} Q${cx+s*0.05} ${s*0.3} ${cx} ${s*0.13}`} fill="#FFD8E4" opacity="0.5"/>
      </svg>
    ),
    sunflower: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.85} L${cx} ${s*0.55}`} stroke="#7A9F5A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <ellipse cx={cx-s*0.1} cy={s*0.7} rx={s*0.14} ry={s*0.05} fill="#7A9F5A" opacity="0.5" transform={`rotate(-40 ${cx-s*0.1} ${s*0.7})`}/>
        {Array.from({length: 12}, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const pr = s * 0.22;
          const px = cx + Math.cos(angle) * pr;
          const py = s * 0.38 + Math.sin(angle) * pr;
          return <ellipse key={i} cx={px} cy={py} rx={s*0.08} ry={s*0.14}
            fill={i % 2 === 0 ? '#FFE4A0' : '#FFD470'} opacity="0.85"
            transform={`rotate(${i*30} ${px} ${py})`}/>;
        })}
        <circle cx={cx} cy={s*0.38} r={s*0.12} fill="#D4A060"/>
        <circle cx={cx} cy={s*0.38} r={s*0.08} fill="#C08840" opacity="0.6"/>
      </svg>
    ),
    carnation: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.85} L${cx} ${s*0.55}`} stroke="#82A87A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {Array.from({length: 8}, (_, i) => {
          const angle = (i * 45 + 22) * Math.PI / 180;
          const r = s * 0.18;
          const px = cx + Math.cos(angle) * r;
          const py = s * 0.36 + Math.sin(angle) * r;
          return <circle key={`o${i}`} cx={px} cy={py} r={s*0.1}
            fill={i % 2 === 0 ? '#FFB8C8' : '#FF9CB0'} opacity="0.7"/>;
        })}
        {Array.from({length: 5}, (_, i) => {
          const angle = (i * 72) * Math.PI / 180;
          const r = s * 0.08;
          const px = cx + Math.cos(angle) * r;
          const py = s * 0.36 + Math.sin(angle) * r;
          return <circle key={`i${i}`} cx={px} cy={py} r={s*0.08}
            fill="#FFD0D8" opacity="0.8"/>;
        })}
      </svg>
    ),
    daisy: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.85} L${cx} ${s*0.55}`} stroke="#88B478" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {Array.from({length: 10}, (_, i) => {
          const angle = (i * 36) * Math.PI / 180;
          const pr = s * 0.2;
          const px = cx + Math.cos(angle) * pr;
          const py = s * 0.38 + Math.sin(angle) * pr;
          return <ellipse key={i} cx={px} cy={py} rx={s*0.06} ry={s*0.14}
            fill="white" stroke="#F0ECD0" strokeWidth="0.5" opacity="0.9"
            transform={`rotate(${i*36} ${px} ${py})`}/>;
        })}
        <circle cx={cx} cy={s*0.38} r={s*0.1} fill="#FFE070"/>
        <circle cx={cx} cy={s*0.38} r={s*0.06} fill="#FFD040" opacity="0.6"/>
      </svg>
    ),
    peony: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.88} L${cx} ${s*0.58}`} stroke="#7AAF6A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {Array.from({length: 7}, (_, i) => {
          const angle = (i * 51.4 + 10) * Math.PI / 180;
          const r = s * 0.2;
          const px = cx + Math.cos(angle) * r;
          const py = s * 0.38 + Math.sin(angle) * r;
          return <ellipse key={`o${i}`} cx={px} cy={py} rx={s*0.12} ry={s*0.1}
            fill={i % 2 === 0 ? '#F0C0D0' : '#FFD8E8'} opacity="0.7"
            transform={`rotate(${i*51.4} ${px} ${py})`}/>;
        })}
        {Array.from({length: 5}, (_, i) => {
          const angle = (i * 72 + 36) * Math.PI / 180;
          const r = s * 0.09;
          const px = cx + Math.cos(angle) * r;
          const py = s * 0.38 + Math.sin(angle) * r;
          return <circle key={`i${i}`} cx={px} cy={py} r={s*0.08}
            fill="#FFE0EC" opacity="0.8"/>;
        })}
        <circle cx={cx} cy={s*0.38} r={s*0.06} fill="#D898A8" opacity="0.7"/>
      </svg>
    ),
    lavender: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.9} Q${cx-s*0.02} ${s*0.5} ${cx} ${s*0.2}`} stroke="#7A9F6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx={cx+s*0.08} cy={s*0.75} rx={s*0.1} ry={s*0.04} fill="#7A9F6A" opacity="0.5" transform={`rotate(20 ${cx+s*0.08} ${s*0.75})`}/>
        {Array.from({length: 7}, (_, i) => {
          const y = s * 0.2 + i * s * 0.06;
          const xOff = Math.sin(i * 0.8) * s * 0.02;
          return <g key={i}>
            <ellipse cx={cx + xOff - s*0.04} cy={y} rx={s*0.05} ry={s*0.03} fill="#C8B8E8" opacity={0.9 - i * 0.05}/>
            <ellipse cx={cx + xOff + s*0.04} cy={y} rx={s*0.05} ry={s*0.03} fill="#DDD0F0" opacity={0.85 - i * 0.05}/>
          </g>;
        })}
      </svg>
    ),
    rose: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <defs>
          <radialGradient id="rose-g" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFC0CB" />
            <stop offset="100%" stopColor="#F4B6C1" />
          </radialGradient>
        </defs>
        <path d={`M${cx} ${s*0.85} Q${cx+s*0.05} ${s*0.6} ${cx} ${s*0.55}`} stroke="#6E9E5E" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <ellipse cx={cx-s*0.1} cy={s*0.68} rx={s*0.08} ry={s*0.04} fill="#6E9E5E" opacity="0.6" transform={`rotate(-25 ${cx-s*0.1} ${s*0.68})`}/>
        <circle cx={cx} cy={s*0.38} r={s*0.2} fill="url(#rose-g)" opacity="0.6"/>
        {Array.from({length: 5}, (_, i) => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const r = s * 0.13;
          const px = cx + Math.cos(angle) * r;
          const py = s * 0.38 + Math.sin(angle) * r;
          return <ellipse key={i} cx={px} cy={py} rx={s*0.1} ry={s*0.12}
            fill={i % 2 === 0 ? '#F4B6C1' : '#FFD0D8'} opacity="0.75"
            transform={`rotate(${i*72+20} ${px} ${py})`}/>;
        })}
        <circle cx={cx} cy={s*0.36} r={s*0.06} fill="#D4909C" opacity="0.8"/>
        <path d={`M${cx-s*0.03} ${s*0.33} Q${cx} ${s*0.28} ${cx+s*0.03} ${s*0.33} Q${cx} ${s*0.38} ${cx-s*0.03} ${s*0.33}`} fill="#E8A0AC" opacity="0.7"/>
      </svg>
    ),
    anemone: (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={className}>
        <path d={`M${cx} ${s*0.85} L${cx} ${s*0.55}`} stroke="#80A870" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {Array.from({length: 6}, (_, i) => {
          const angle = (i * 60 - 90) * Math.PI / 180;
          const pr = s * 0.2;
          const px = cx + Math.cos(angle) * pr;
          const py = s * 0.38 + Math.sin(angle) * pr;
          return <ellipse key={i} cx={px} cy={py} rx={s*0.1} ry={s*0.14}
            fill={i % 2 === 0 ? '#E8D8F0' : '#D0C0E0'} opacity="0.8"
            transform={`rotate(${i*60} ${px} ${py})`}/>;
        })}
        <circle cx={cx} cy={s*0.38} r={s*0.09} fill="#2D2040"/>
        <circle cx={cx} cy={s*0.38} r={s*0.05} fill="#3D3060" opacity="0.6"/>
      </svg>
    ),
  };

  return flowers[type] || flowers.rose;
}
