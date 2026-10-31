import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RotateCcw, ArrowRight, Trophy, ShieldCheck } from "lucide-react";

// Detailed Anatomical Human Hand SVGs
function HumanHandSvg({ gesture, side = "player", color = "#06b6d4" }) {
  const isRightSide = side === "ai";
  const transformScale = isRightSide ? "scaleX(-1)" : "none";

  return (
    <div
      style={{
        width: "clamp(180px, 24vw, 380px)",
        height: "clamp(180px, 24vw, 380px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: transformScale,
        filter: `drop-shadow(0 15px 35px ${color}45)`,
      }}
    >
      {gesture === "rock" && (
        <svg
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 0 55 C 10 55, 18 52, 28 50 L 38 45 C 45 42, 50 40, 58 40 L 80 40 C 92 40, 98 48, 98 58 C 98 64, 94 70, 88 72 C 94 74, 96 80, 92 86 C 88 92, 80 94, 70 94 L 50 94 C 38 94, 25 85, 18 80 L 0 75 Z"
            fill="#10141e"
          />
          <path
            d="M 58 40 C 65 48, 72 52, 78 52 C 84 52, 88 46, 88 42"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 56 54 C 64 60, 72 64, 78 64 L 88 62"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 54 68 C 62 74, 70 76, 76 76 L 86 74"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 50 82 C 58 86, 64 88, 70 88"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 32 48 C 36 38, 48 38, 54 48 C 58 56, 56 68, 48 72 C 40 76, 32 65, 32 48 Z"
            fill="#182030"
            stroke="#f59e0b"
            strokeWidth="4"
          />
          <path
            d="M 44 44 C 48 50, 48 60, 42 66"
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </svg>
      )}

      {gesture === "paper" && (
        <svg
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 0 65 L 18 60 L 32 48 C 36 38, 44 20, 52 14 C 55 12, 59 14, 58 18 L 48 45 L 72 12 C 75 8, 79 10, 78 15 L 64 45 L 88 16 C 91 12, 95 14, 94 19 L 76 52 L 102 26 C 105 22, 109 25, 107 30 L 85 70 C 75 92, 50 96, 25 85 L 0 78 Z"
            fill="#10141e"
          />
          <path d="M 48 45 L 56 32" stroke={color} strokeWidth="2.5" />
          <path d="M 64 45 L 74 28" stroke={color} strokeWidth="2.5" />
          <path d="M 76 52 L 85 36" stroke={color} strokeWidth="2.5" />
          <path
            d="M 28 60 C 35 55, 42 58, 48 68 C 52 78, 42 88, 30 80 Z"
            fill="#182030"
            stroke="#f59e0b"
            strokeWidth="4"
          />
          <path
            d="M 32 62 C 45 65, 58 72, 65 80"
            stroke={color}
            strokeWidth="2.5"
          />
        </svg>
      )}

      {gesture === "scissors" && (
        <svg
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 0 68 L 18 62 L 32 52 L 78 12 C 82 8, 87 11, 85 16 L 52 50 L 94 20 C 98 16, 102 20, 100 25 L 60 60 C 72 60, 85 68, 85 78 C 85 92, 60 94, 38 88 L 0 80 Z"
            fill="#10141e"
          />
          <path d="M 52 50 L 68 34" stroke={color} strokeWidth="2.5" />
          <path d="M 60 60 L 80 38" stroke={color} strokeWidth="2.5" />
          <path
            d="M 50 64 C 58 68, 65 72, 70 72 C 75 72, 78 68, 75 64"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 45 74 C 54 78, 60 80, 65 80"
            stroke={color}
            strokeWidth="3"
          />
          <path
            d="M 28 58 C 34 50, 46 52, 50 62 C 54 72, 42 78, 30 72 Z"
            fill="#182030"
            stroke="#f59e0b"
            strokeWidth="4"
          />
        </svg>
      )}
    </div>
  );
}

const PLAYER_HANDS = {
  rock: { id: "rock", name: "rock", beats: "scissors" },
  paper: { id: "paper", name: "paper", beats: "rock" },
  scissors: { id: "scissors", name: "scissors", beats: "paper" },
};

// Westeros Quotes for Match Results
const WIN_QUOTE =
  "No man could ask for a braver champion. Stand tall, ser.";

const LOSE_QUOTES = [
  "Every hurt is a lesson, and every lesson makes you better.",
  "When you play the game of thrones, you win or you die. There is no middle ground.",
  "The idea that we control the dragons is an illusion. They are a power man should never have trifled with.",
  "Dunk the lunk, thick as a castle wall... yet a true knight rises and holds his shield again.",
  "Can a man still be brave if he's afraid? That is the only time a man can be brave.",
];

const getRandomLoseQuote = () => {
  const index = Math.floor(Math.random() * LOSE_QUOTES.length);
  return LOSE_QUOTES[index];
};

export default function RpsGame({ onStartPortfolio }) {
  const containerRef = useRef(null);
  const userHandRef = useRef(null);
  const aiHandRef = useRef(null);
  const quoteRef = useRef(null);
  const overlayRef = useRef(null);

  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const [phase, setPhase] = useState("selecting");
  const [winner, setWinner] = useState(null);
  const [loseQuote, setLoseQuote] = useState(() => getRandomLoseQuote());
  const [selectedUserMove, setSelectedUserMove] = useState(null);
  const [selectedAiMove, setSelectedAiMove] = useState(null);
  const [roundResultText, setRoundResultText] = useState("");
  const [roundCount, setRoundCount] = useState(1);

  // Match Round Target (1, 3, or 5 rounds)
  const [targetRounds, setTargetRounds] = useState(3);

  useGSAP(
    () => {
      if (phase === "gameover" && quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" },
        );
      }
    },
    { scope: containerRef, dependencies: [phase] },
  );

  const handleSelectMove = (moveId) => {
    if (phase !== "selecting" && phase !== "next_overlay") return;

    const userMove = PLAYER_HANDS[moveId];

    const rand = Math.random();
    let aiMoveId;

    if (rand < 0.4) {
      aiMoveId =
        userMove.id === "rock"
          ? "paper"
          : userMove.id === "paper"
            ? "scissors"
            : "rock";
    } else if (rand < 0.75) {
      aiMoveId =
        userMove.id === "rock"
          ? "scissors"
          : userMove.id === "paper"
            ? "rock"
            : "paper";
    } else {
      aiMoveId = moveId;
    }

    const isUserRoundWin =
      (userMove.id === "rock" && aiMoveId === "scissors") ||
      (userMove.id === "paper" && aiMoveId === "rock") ||
      (userMove.id === "scissors" && aiMoveId === "paper");

    if (userHandRef.current && aiHandRef.current) {
      gsap.set(userHandRef.current, { x: "-100vw", opacity: 0 });
      gsap.set(aiHandRef.current, { x: "100vw", opacity: 0 });
    }

    if (phase === "next_overlay" && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    }

    setSelectedUserMove(userMove.id);
    setSelectedAiMove(aiMoveId);
    setPhase("animating");

    requestAnimationFrame(() => {
      gsap.fromTo(
        userHandRef.current,
        { x: "-100vw", opacity: 0, scale: 1.2 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        aiHandRef.current,
        { x: "100vw", opacity: 0, scale: 1.2 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => {
            gsap.to(aiHandRef.current, {
              rotate: isUserRoundWin ? 15 : -15,
              duration: 0.15,
              repeat: 3,
              yoyo: true,
              ease: "sine.inOut",
              onComplete: () => {
                let newPlayerScore = scores.player;
                let newAiScore = scores.ai;

                if (userMove.id === aiMoveId) {
                  setRoundResultText("ROUND DRAW");
                } else if (isUserRoundWin) {
                  newPlayerScore += 1;
                  setRoundResultText("VISITOR WON THIS ROUND");
                } else {
                  newAiScore += 1;
                  setRoundResultText("RIVAN WON THIS ROUND");
                }

                setScores({ player: newPlayerScore, ai: newAiScore });

                if (newPlayerScore >= targetRounds) {
                  setWinner("player");
                  setPhase("gameover");
                } else if (newAiScore >= targetRounds) {
                  setWinner("ai");
                  setLoseQuote(getRandomLoseQuote());
                  setPhase("gameover");
                } else {
                  setPhase("result");
                }
              },
            });
          },
        },
      );
    });
  };

  const handleOpenNextOverlay = () => {
    setRoundCount((prev) => prev + 1);
    setPhase("next_overlay");

    setTimeout(() => {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
        );
      }
    }, 10);
  };

  const resetGame = () => {
    setScores({ player: 0, ai: 0 });
    setWinner(null);
    setLoseQuote(getRandomLoseQuote());
    setRoundCount(1);
    setPhase("selecting");
    setSelectedUserMove(null);
    setSelectedAiMove(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(1rem, 2.5vw, 2rem) 0",
        background: "#0a0c10",
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Right Skip Link */}
      <button
        onClick={onStartPortfolio}
        style={{
          position: "absolute",
          top: "clamp(0.75rem, 2vw, 1.5rem)",
          right: "clamp(0.75rem, 2.5vw, 2rem)",
          background: "none",
          border: "none",
          color: "var(--text-dim)",
          fontSize: "clamp(0.75rem, 1.8vw, 0.9rem)",
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          cursor: "pointer",
          zIndex: 50,
          opacity: 0.75,
          transition: "opacity 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.color = "var(--terminal-cyan)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.75";
          e.currentTarget.style.color = "var(--text-dim)";
        }}
      >
        Back to Terminal ➔
      </button>

      {/* Dynamic Animated Header */}
      <div
        style={{
          maxWidth: "640px",
          width: "100%",
          textAlign: "center",
          padding: "0 1rem",
          zIndex: 10,
          minHeight: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "selecting" ? (
            <motion.div
              key="intro-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <div
                style={{
                  fontSize: "clamp(1.1rem, 2.4vw, 1.45rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  marginBottom: "0.35rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Tubagus Rivan —{" "}
                <span style={{ color: "var(--terminal-cyan)" }}>
                  Software Developer
                </span>
              </div>

              <div
                style={{
                  fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
                  fontWeight: 400,
                  color: "#cbd5e1",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.5,
                  maxWidth: "540px",
                }}
              >
                Beat me in Rock Paper Scissors to unlock my terminal portfolio!
              </div>
            </motion.div>
          ) : phase === "gameover" ? (
            <motion.div
              key="gameover-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <div
                style={{
                  fontSize: "clamp(1.1rem, 2.4vw, 1.45rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  marginBottom: "0.35rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Tubagus Rivan —{" "}
                <span style={{ color: "var(--terminal-cyan)" }}>
                  Software Developer
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scoreboard-header"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <div
                style={{
                  fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--text-main)",
                  marginBottom: "0.3rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                VISITOR vs RIVAN
              </div>

              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span style={{ color: "var(--terminal-cyan)" }}>
                  {scores.player}
                </span>
                <span style={{ margin: "0 0.6rem", color: "var(--text-dim)" }}>
                  /
                </span>
                <span style={{ color: "var(--terminal-green)" }}>
                  {scores.ai}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULLSCREEN BATTLE ARENA */}
      <div
        style={{
          width: "100vw",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Phase 1: PURE MINIMALIST TEXT MOVE SELECTION */}
        {phase === "selecting" && (
          <div style={{ textAlign: "center", zIndex: 10, padding: "0 1rem" }}>
            <div
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "2rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              SELECT MOVE
            </div>

            <div
              style={{
                display: "flex",
                gap: "clamp(1.25rem, 4vw, 3rem)",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "2.5rem",
              }}
            >
              {Object.values(PLAYER_HANDS).map((gesture) => (
                <motion.button
                  key={gesture.id}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectMove(gesture.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-main)",
                    cursor: "pointer",
                    fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
                    fontWeight: 500,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                    padding: "0.5rem 0",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--terminal-cyan)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-main)")
                  }
                >
                  {gesture.name}
                </motion.button>
              ))}
            </div>

            {/* Clean Inline Round Selector (Below RPS selection, no box background) */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.74rem",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span style={{ marginRight: "0.2rem" }}>MATCH TARGET:</span>
              {[1, 3, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setTargetRounds(r)}
                  style={{
                    background:
                      targetRounds === r
                        ? "rgba(6, 182, 212, 0.12)"
                        : "transparent",
                    border:
                      targetRounds === r
                        ? "1px solid var(--terminal-cyan)"
                        : "1px solid transparent",
                    color:
                      targetRounds === r
                        ? "var(--terminal-cyan)"
                        : "var(--text-dim)",
                    borderRadius: "3px",
                    padding: "0.1rem 0.45rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: targetRounds === r ? 700 : 400,
                    transition: "all 0.15s ease",
                  }}
                >
                  {r} {r === 1 ? "WIN" : "WINS"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2, 3, & Next Overlay: Giant Edge-to-Edge Human Hands Stage */}
        {(phase === "animating" ||
          phase === "result" ||
          phase === "next_overlay") && (
          <div
            style={{
              width: "100vw",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 4vw",
              position: "relative",
            }}
          >
            {/* LEFT SIDE: VISITOR */}
            <div style={{ textAlign: "center", zIndex: 20 }}>
              <div
                style={{
                  fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
                  color: "var(--terminal-cyan)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                VISITOR
              </div>
              <div ref={userHandRef}>
                <HumanHandSvg
                  gesture={selectedUserMove}
                  side="player"
                  color="var(--terminal-cyan)"
                />
              </div>
              <div
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginTop: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                {selectedUserMove}
              </div>
            </div>

            {/* Center Versus Badge */}
            <div
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                zIndex: 10,
              }}
            >
              VS
            </div>

            {/* RIGHT SIDE: RIVAN */}
            <div style={{ textAlign: "center", zIndex: 20 }}>
              <div
                style={{
                  fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
                  color: "var(--terminal-green)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                RIVAN
              </div>
              <div ref={aiHandRef}>
                <HumanHandSvg
                  gesture={selectedAiMove}
                  side="ai"
                  color="var(--terminal-green)"
                />
              </div>
              <div
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginTop: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                {selectedAiMove}
              </div>
            </div>

            {/* Result Bar Banner at Bottom (PERFECTLY CENTERED PURE TEXT) */}
            <AnimatePresence>
              {phase === "result" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    bottom: "6%",
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    width: "100%",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    zIndex: 40,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "0.85rem",
                      letterSpacing: "0.05em",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {roundResultText}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenNextOverlay}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--terminal-cyan)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                      transition: "color 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--terminal-green)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--terminal-cyan)")
                    }
                  >
                    Play Next Round ➔
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NEXT ROUND SELECTION OVERLAY (PURE CLEAN TEXT, NO BOX CONTAINER) */}
            <AnimatePresence>
              {phase === "next_overlay" && (
                <motion.div
                  ref={overlayRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 50,
                    background: "rgba(10, 12, 16, 0.88)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--terminal-amber)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    ROUND {roundCount}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      marginBottom: "2.5rem",
                    }}
                  >
                    SELECT NEXT MOVE
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "clamp(1.25rem, 4vw, 3rem)",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {Object.values(PLAYER_HANDS).map((gesture) => (
                      <motion.button
                        key={gesture.id}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleSelectMove(gesture.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-main)",
                          cursor: "pointer",
                          fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
                          fontWeight: 500,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.05em",
                          padding: "0.5rem 0",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--terminal-cyan)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-main)")
                        }
                      >
                        {gesture.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Phase 4: Game Over (Clean Engineering Quote State) */}
        {phase === "gameover" && (
          <div
            ref={quoteRef}
            style={{
              textAlign: "center",
              maxWidth: "min(750px, 92vw)",
              padding: "clamp(0.5rem, 2vw, 1rem)",
              zIndex: 20,
              width: "100%",
            }}
          >
            {winner === "player" ? (
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.85rem",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid var(--terminal-green)",
                    borderRadius: "4px",
                    color: "var(--terminal-green)",
                    fontSize: "clamp(0.72rem, 2vw, 0.9rem)",
                    marginBottom: "clamp(0.75rem, 2.5vw, 1.5rem)",
                    fontWeight: 700,
                  }}
                >
                  <Trophy size={15} /> VISITOR WON THE MATCH ({targetRounds}-
                  {scores.ai})
                </div>

                <blockquote
                  style={{
                    fontSize: "clamp(0.88rem, 2.2vw, 1.25rem)",
                    lineHeight: 1.65,
                    color: "#ffffff",
                    fontStyle: "normal",
                    background: "#121622",
                    borderLeft: "4px solid var(--terminal-cyan)",
                    padding: "clamp(0.9rem, 3vw, 1.75rem) clamp(0.9rem, 3vw, 2rem)",
                    borderRadius: "0 8px 8px 0",
                    textAlign: "left",
                    marginBottom: "clamp(1rem, 3vw, 2rem)",
                  }}
                >
                  "{WIN_QUOTE}"
                </blockquote>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "4px",
                    color: "var(--text-muted)",
                    fontSize: "clamp(0.72rem, 2vw, 0.9rem)",
                    marginBottom: "clamp(0.75rem, 2.5vw, 1.5rem)",
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={15} /> RIVAN WON THE MATCH ({scores.player}
                  -{targetRounds})
                </div>

                <blockquote
                  style={{
                    fontSize: "clamp(0.88rem, 2.2vw, 1.25rem)",
                    lineHeight: 1.65,
                    color: "#ffffff",
                    fontStyle: "normal",
                    background: "#121622",
                    borderLeft: "4px solid var(--terminal-green)",
                    padding: "clamp(0.9rem, 3vw, 1.75rem) clamp(0.9rem, 3vw, 2rem)",
                    borderRadius: "0 8px 8px 0",
                    textAlign: "left",
                    marginBottom: "clamp(1rem, 3vw, 2rem)",
                  }}
                >
                  "{loseQuote}"
                </blockquote>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(0.65rem, 2vw, 1.25rem)",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={onStartPortfolio}
                className="term-btn term-btn-primary"
                style={{
                  fontSize: "clamp(0.82rem, 2vw, 1rem)",
                  padding: "clamp(0.55rem, 1.5vw, 0.9rem) clamp(1rem, 3vw, 2.2rem)",
                }}
              >
                Back to Terminal <ArrowRight size={16} />
              </button>

              <button
                onClick={resetGame}
                className="term-btn"
                style={{
                  fontSize: "clamp(0.82rem, 2vw, 1.05rem)",
                  padding: "clamp(0.55rem, 1.5vw, 0.9rem) clamp(0.9rem, 2.5vw, 1.8rem)",
                }}
              >
                <RotateCcw size={15} /> Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
