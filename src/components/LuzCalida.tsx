// Lucecita cute con carita: brilla suave (cálida y cómoda a la vista) y tiene destellos.
// Es un SVG animado con CSS: pesa muy poco, se ve nítido en cualquier pantalla y
// las animaciones se desactivan solas si la persona prefiere "menos movimiento".

const DESTELLOS = [
  { x: 4, y: 7, retraso: '0s', tamano: 1 },
  { x: 28, y: 9, retraso: '0.8s', tamano: 0.8 },
  { x: 27, y: 26, retraso: '1.6s', tamano: 0.7 },
]

export function LuzCalida() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center"
    >
      {/* Resplandor suave detrás */}
      <span className="absolute inset-1 animate-resplandor rounded-full bg-amber-300/70 blur-md motion-reduce:animate-none dark:bg-amber-300/40" />

      <svg viewBox="0 0 32 32" className="relative h-8 w-8">
        <defs>
          <radialGradient id="luz-cuerpo" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFF3C4" />
            <stop offset="100%" stopColor="#FFC85C" />
          </radialGradient>
        </defs>

        {/* Destellos */}
        {DESTELLOS.map((d) => (
          <g
            key={`${d.x}-${d.y}`}
            transform={`translate(${d.x} ${d.y}) scale(${d.tamano})`}
          >
            <path
              d="M0 -3 Q0 0 3 0 Q0 0 0 3 Q0 0 -3 0 Q0 0 0 -3Z"
              fill="#FFD86B"
              className="animate-destello motion-reduce:animate-none"
              style={{ animationDelay: d.retraso }}
            />
          </g>
        ))}

        {/* Cuerpo de la luz */}
        <circle cx="16" cy="16" r="9.5" fill="url(#luz-cuerpo)" />

        {/* Carita */}
        <ellipse cx="12.7" cy="15.3" rx="1.1" ry="1.5" fill="#6B3E26" />
        <ellipse cx="19.3" cy="15.3" rx="1.1" ry="1.5" fill="#6B3E26" />
        <ellipse cx="10.3" cy="18.6" rx="1.9" ry="1.1" fill="#FF9FB5" opacity="0.85" />
        <ellipse cx="21.7" cy="18.6" rx="1.9" ry="1.1" fill="#FF9FB5" opacity="0.85" />
        <path
          d="M14.5 18.6 Q16 20.4 17.5 18.6"
          fill="none"
          stroke="#6B3E26"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
