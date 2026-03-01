import { useEffect, useRef, useState } from "react";
import type { Note } from "./backend.d";
import { useGetNotes, useInitializeAndGetDay } from "./hooks/useQueries";

// ──────────────────────────────────────────────
// Floating heart particle
// ──────────────────────────────────────────────
interface FloatingHeart {
  id: number;
  x: number;
  duration: number;
  size: number;
  emoji: string;
}

const HEART_EMOJIS = ["💕", "💖", "💗", "🌸", "✨", "💝", "🌹"];

const HEADER_HEARTS = [
  { emoji: "💗", delay: "0s" },
  { emoji: "💖", delay: "0.3s" },
  { emoji: "💗", delay: "0.6s" },
];

function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++;
      const heart: FloatingHeart = {
        id,
        x: Math.random() * 90 + 5,
        duration: Math.random() * 4 + 5,
        size: Math.random() * 14 + 12,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      };
      setHearts((prev) => [...prev.slice(-12), heart]);
      setTimeout(
        () => {
          setHearts((prev) => prev.filter((h) => h.id !== id));
        },
        (heart.duration + 0.5) * 1000,
      );
    };

    // Spawn a few immediately
    for (let i = 0; i < 4; i++) {
      setTimeout(spawn, i * 600);
    }

    const interval = setInterval(spawn, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart select-none"
          style={{
            left: `${h.x}%`,
            bottom: "-2rem",
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Note Modal
// ──────────────────────────────────────────────
interface NoteModalProps {
  note: Note;
  dayNumber: number;
  onClose: () => void;
}

function NoteModal({ note, dayNumber, onClose }: NoteModalProps) {
  // Close on backdrop click or Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onClose();
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-full max-h-full m-0"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={handleBackdropKeyDown}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="modal-enter relative w-full max-w-md mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.99 0.012 40)",
          boxShadow:
            "0 32px 80px -12px oklch(0.22 0.04 15 / 0.28), 0 12px 32px oklch(0.22 0.04 15 / 0.12)",
        }}
      >
        {/* Heart pattern background overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ctext x='10' y='28' font-size='20' fill='%23c0507a'%3E%E2%99%A5%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Top decorative strip */}
        <div
          className="h-2 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.14 8), oklch(0.58 0.18 8), oklch(0.72 0.14 8))",
          }}
        />

        <div className="relative p-8 pt-6">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
            style={{ background: "oklch(0.92 0.04 20 / 0.6)" }}
            aria-label="Close note"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Close"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Day badge */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-xs font-sans font-medium tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.88 0.08 15)",
                color: "oklch(0.45 0.14 10)",
              }}
            >
              Day {dayNumber}
            </span>
            <span className="text-rose heart-animate">💕</span>
          </div>

          {/* Divider */}
          <hr className="love-divider mb-5" />

          {/* Title */}
          <h2
            id="modal-title"
            className="text-2xl leading-snug mb-5"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              color: "oklch(0.32 0.1 10)",
            }}
          >
            {note.title}
          </h2>

          {/* Body */}
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: "Crimson Pro, Georgia, serif",
              fontSize: "1.15rem",
              color: "oklch(0.28 0.05 15)",
              lineHeight: 1.75,
            }}
          >
            {note.body}
          </p>

          {/* Footer */}
          <div className="mt-7 pt-5 border-t border-border flex items-center justify-between">
            <span
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "oklch(0.55 0.1 10)",
              }}
            >
              yours always, meri jaan ♡
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-sm font-sans font-medium transition-all active:scale-95"
              style={{
                background: "oklch(0.58 0.18 8)",
                color: "oklch(0.99 0.008 30)",
                boxShadow: "0 4px 14px oklch(0.58 0.18 8 / 0.35)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// ──────────────────────────────────────────────
// Note Card
// ──────────────────────────────────────────────
interface NoteCardProps {
  note: Note;
  dayNumber: number;
  currentDay: number;
  index: number;
}

function NoteCard({ note, dayNumber, currentDay, index }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const daysUntil = dayNumber - currentDay;
  const isToday = dayNumber === currentDay;

  const handleOpen = () => {
    if (note.isUnlocked) setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={`
          relative overflow-hidden rounded-2xl cursor-pointer fade-in-up text-left w-full
          ${note.isUnlocked ? "note-card-unlocked" : "note-card-locked opacity-75"}
        `}
        style={{
          animationDelay: `${index * 80}ms`,
          background: note.isUnlocked
            ? "oklch(0.99 0.012 40)"
            : "oklch(0.95 0.018 30)",
          boxShadow: note.isUnlocked
            ? "0 4px 24px -4px oklch(0.58 0.18 8 / 0.14), 0 1px 4px oklch(0.58 0.18 8 / 0.08)"
            : "0 2px 12px oklch(0.22 0.04 15 / 0.06)",
          border: note.isUnlocked
            ? "1.5px solid oklch(0.88 0.06 20)"
            : "1.5px solid oklch(0.88 0.03 25)",
        }}
        onClick={handleOpen}
        aria-label={
          note.isUnlocked
            ? `Open Day ${dayNumber}: ${note.title}`
            : `Day ${dayNumber} — locked`
        }
        disabled={!note.isUnlocked}
      >
        {/* Envelope flap (decorative) */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "30%" }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            style={{
              background: note.isUnlocked
                ? "linear-gradient(135deg, oklch(0.92 0.055 20 / 0.45) 0%, oklch(0.88 0.08 15 / 0.3) 100%)"
                : "linear-gradient(135deg, oklch(0.88 0.03 25 / 0.4) 0%, oklch(0.85 0.02 25 / 0.3) 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </div>

        <div className="relative p-6 pt-8">
          {/* Day badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs tracking-widest uppercase font-sans font-semibold"
              style={{
                color: note.isUnlocked
                  ? "oklch(0.55 0.14 10)"
                  : "oklch(0.55 0.04 25)",
              }}
            >
              Day {dayNumber}
            </span>

            {/* Heart or lock icon */}
            <span
              className="text-lg"
              style={{
                filter: note.isUnlocked
                  ? "none"
                  : "grayscale(0.5) opacity(0.6)",
              }}
              aria-hidden="true"
            >
              {note.isUnlocked ? (isToday ? "💌" : "💕") : "🔒"}
            </span>
          </div>

          {/* Content */}
          {note.isUnlocked ? (
            <>
              <h3
                className="text-lg leading-snug mb-2 line-clamp-2"
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "oklch(0.3 0.09 10)",
                }}
              >
                {note.title}
              </h3>
              <p
                className="text-sm line-clamp-2 mb-4"
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  fontSize: "0.95rem",
                  color: "oklch(0.45 0.06 15)",
                  lineHeight: 1.6,
                }}
              >
                {note.body}
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="text-xs font-sans"
                  style={{ color: "oklch(0.58 0.14 10)" }}
                >
                  Tap to read
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.58 0.14 10)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </>
          ) : (
            <div className="mt-2">
              {/* Wax seal */}
              <div
                className="wax-seal w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, oklch(0.65 0.16 10), oklch(0.45 0.16 10))",
                  boxShadow:
                    "0 4px 12px oklch(0.52 0.16 10 / 0.35), inset 0 1px 2px rgba(255,255,255,0.2)",
                }}
                aria-hidden="true"
              >
                <span className="text-xl">♥</span>
              </div>
              <p
                className="text-sm"
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontStyle: "italic",
                  color: "oklch(0.5 0.05 25)",
                }}
              >
                {daysUntil === 1
                  ? "Opens tomorrow…"
                  : `Opens in ${daysUntil} days`}
              </p>
            </div>
          )}

          {/* Today indicator */}
          {isToday && (
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase"
              style={{
                background: "oklch(0.88 0.08 15)",
                color: "oklch(0.45 0.14 10)",
              }}
            >
              Today ✨
            </div>
          )}
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <NoteModal
          note={note}
          dayNumber={dayNumber}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// ──────────────────────────────────────────────
// Loading skeleton
// ──────────────────────────────────────────────
function NoteCardSkeleton({ skeletonKey }: { skeletonKey: number }) {
  return (
    <div
      className="rounded-2xl p-6 pt-8 animate-pulse"
      style={{
        background: "oklch(0.96 0.015 35)",
        border: "1.5px solid oklch(0.9 0.03 20)",
      }}
      aria-label={`Loading note ${skeletonKey}`}
    >
      <div
        className="h-3 w-12 rounded-full mb-4"
        style={{ background: "oklch(0.9 0.04 20)" }}
      />
      <div
        className="h-5 w-3/4 rounded-full mb-2"
        style={{ background: "oklch(0.9 0.04 20)" }}
      />
      <div
        className="h-4 w-full rounded-full mb-1"
        style={{ background: "oklch(0.92 0.03 20)" }}
      />
      <div
        className="h-4 w-2/3 rounded-full"
        style={{ background: "oklch(0.92 0.03 20)" }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────
// Header decorative hearts
// ──────────────────────────────────────────────
function HeaderHearts() {
  return (
    <div
      className="flex items-center justify-center gap-2 mb-3"
      aria-hidden="true"
    >
      {HEADER_HEARTS.map((item) => (
        <span
          key={item.delay}
          className="text-2xl"
          style={{
            animation: `heartbeat 2s ease-in-out ${item.delay} infinite`,
            display: "inline-block",
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main App
// ──────────────────────────────────────────────
export default function App() {
  const dayQuery = useInitializeAndGetDay();
  const notesQuery = useGetNotes();

  const currentDay = dayQuery.data ? Number(dayQuery.data) : 1;
  const notes = notesQuery.data ?? [];
  const isLoading = dayQuery.isLoading || notesQuery.isLoading;
  const isError = dayQuery.isError || notesQuery.isError;

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/generated/love-bg.dim_1200x800.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      {/* Background overlay for readability */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.012 45 / 0.55) 0%, oklch(0.95 0.018 30 / 0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating hearts */}
      <FloatingHearts />

      {/* Header */}
      <header className="relative z-20 text-center pt-14 pb-6 px-6">
        <HeaderHearts />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-3"
          style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            color: "oklch(0.28 0.09 10)",
            textShadow: "0 2px 24px oklch(0.99 0.008 30 / 0.8)",
          }}
        >
          For You, Aarna
        </h1>
        <p
          className="text-lg sm:text-xl max-w-sm mx-auto"
          style={{
            fontFamily: "Crimson Pro, Georgia, serif",
            fontStyle: "italic",
            color: "oklch(0.45 0.08 12)",
            lineHeight: 1.6,
          }}
        >
          Eight little notes, wrapped in love,
          <br />
          one for each day — just for you, meri jaan.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <hr className="love-divider w-16" />
          <span
            className="text-lg"
            style={{
              animation: "heartbeat 2.5s ease-in-out infinite",
              display: "inline-block",
            }}
            aria-hidden="true"
          >
            ❧
          </span>
          <hr className="love-divider w-16" />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-20 flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        {isError && (
          <div
            className="rounded-2xl p-6 mb-8 text-center"
            style={{
              background: "oklch(0.99 0.008 30 / 0.9)",
              border: "1.5px solid oklch(0.88 0.06 20)",
            }}
          >
            <p
              className="text-base"
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "oklch(0.5 0.12 15)",
              }}
            >
              Something went wrong loading your notes. Please refresh the page.
            </p>
          </div>
        )}

        {/* Notes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <NoteCardSkeleton key={`skeleton-${n}`} skeletonKey={n} />
              ))
            : notes.map((note, i) => (
                <NoteCard
                  key={`note-day-${i + 1}`}
                  note={note}
                  dayNumber={i + 1}
                  currentDay={currentDay}
                  index={i}
                />
              ))}
        </div>

        {/* Empty state (shouldn't normally happen) */}
        {!isLoading && !isError && notes.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-xl"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
                color: "oklch(0.5 0.08 15)",
              }}
            >
              Loading your love notes…
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center py-6 px-4">
        <p
          className="text-xs font-sans"
          style={{ color: "oklch(0.55 0.06 15)" }}
        >
          Made with{" "}
          <span className="heart-animate inline-block" aria-label="love">
            ♥
          </span>{" "}
          ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.55 0.06 15)" }}
          >
            Built with caffeine.ai
          </a>{" "}
          · © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
