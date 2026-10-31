import React, { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, Copy, Check, Download, X, ExternalLink } from "lucide-react";

import {
  SQL_SKILLS_OUTPUT,
  SQL_PROJECTS_OUTPUT,
  SQL_EXPERIENCE_OUTPUT,
  SQL_EDUCATION_OUTPUT,
  SQL_CONTACT_OUTPUT,
  SQL_METRICS_OUTPUT,
  CAT_ABOUT_OUTPUT,
  TOUR_OUTPUT,
  WHOAMI_OUTPUT,
  CV_DOWNLOAD_OUTPUT,
  GOT_VALAR_MORGHULIS_OUTPUT,
  getRandomValarMorghulisOutput,
  SQL_PROFESSIONAL_SECURITY_LOGS,
  MYSQL_WELCOME_HEADER,
  LINUX_CLI_COMMANDS,
  MYSQL_CLI_COMMANDS,
} from "../constants/sqlData";
import { getRandomCrashDump } from "../constants/crashDump";

import HighlightedErrorText from "./HighlightedErrorText";
import LightningTypewriterText from "./LightningTypewriterText";
import SuggestionPopover from "./SuggestionPopover";
import ContactTable from "./ContactTable";

const CV_CONFIRM_SUGGESTIONS = [
  { cmd: "v", desc: "view CV_Tubagus_Rivan.pdf in new tab" },
  { cmd: "d", desc: "download CV_Tubagus_Rivan.pdf" },
  { cmd: "n", desc: "cancel" },
];

export default function Terminal({ onReturnToGame }) {
  const terminalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [terminalMode, setTerminalMode] = useState("linux"); // 'linux' or 'mysql'
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isTyping, setIsTyping] = useState(true); // Initially true for 1 second boot delay
  const [crashedState, setCrashedState] = useState(false);
  const [awaitingCvConfirm, setAwaitingCvConfirm] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [showHintBadge, setShowHintBadge] = useState(true);

  const [selectedSugIdx, setSelectedSugIdx] = useState(-1);
  const [hasNavigatedSug, setHasNavigatedSug] = useState(false);

  const [outputBuffer, setOutputBuffer] = useState([
    {
      id: "welcome",
      type: "system",
      content: `Linux kernel 6.8.0-generic x86_64\nWelcome to Tubagus Rivan's Software Developer Terminal Shell.\nType '/help' for system manual, '/game' to play RPS game, '/cv' to view or download CV, or 'mysql -u root -p' for database.`,
    },
  ]);

  const openCvNewTab = () => {
    window.open("/CV_Tubagus_Rivan.pdf", "_blank", "noopener,noreferrer");
  };

  const triggerCvDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV_Tubagus_Rivan.pdf";
    link.download = "CV_Tubagus_Rivan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1 Second Initial Boot Delay when first visiting terminal
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    return () => clearTimeout(bootTimer);
  }, []);

  // Autocomplete Suggestions Filter based on Terminal Mode & Confirmation State
  const searchTerm = inputVal.trim().toLowerCase();
  const currentCommandList = awaitingCvConfirm
    ? CV_CONFIRM_SUGGESTIONS
    : terminalMode === "mysql"
      ? MYSQL_CLI_COMMANDS
      : LINUX_CLI_COMMANDS;
  const filteredSuggestions =
    searchTerm.length > 0 && !crashedState && !isTyping
      ? currentCommandList.filter((sug) =>
          sug.cmd.toLowerCase().startsWith(searchTerm),
        )
      : [];

  useEffect(() => {
    setSelectedSugIdx(-1);
    setHasNavigatedSug(false);
  }, [inputVal]);

  const scrollToBottomRealtime = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottomRealtime();
  }, [outputBuffer, isTyping, inputVal]);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const focusInput = () => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  };

  const handleCvDecision = (action) => {
    setAwaitingCvConfirm(false);
    const cmdId = Date.now();
    const commandText = action === "view" ? "v" : action === "download" ? "d" : "n";
    const userEntry = {
      id: `cmd-${cmdId}`,
      type: "command",
      text: commandText,
      mode: terminalMode,
    };

    if (action === "view") {
      openCvNewTab();
      const viewEntry = {
        id: `resp-${cmdId}`,
        type: "typed-output",
        cmdKey: "cv-viewed",
        content: `[✓] Opening CV_Tubagus_Rivan.pdf in a new tab ...\n[i] Direct file link: /CV_Tubagus_Rivan.pdf`,
      };
      setIsTyping(false);
      setOutputBuffer((prev) => [...prev, userEntry, viewEntry]);
    } else if (action === "download") {
      triggerCvDownload();
      const acceptEntry = {
        id: `resp-${cmdId}`,
        type: "typed-output",
        cmdKey: "cv-confirmed",
        content: `[✓] Download confirmed! Initiating download for CV_Tubagus_Rivan.pdf ...\n[i] File transfer started. Direct link: /CV_Tubagus_Rivan.pdf`,
      };
      setIsTyping(false);
      setOutputBuffer((prev) => [...prev, userEntry, acceptEntry]);
    } else {
      const declineEntry = {
        id: `resp-${cmdId}`,
        type: "typed-output",
        cmdKey: "cv-cancelled",
        content: `[x] Action cancelled by user. Returning to terminal shell.`,
      };
      setIsTyping(false);
      setOutputBuffer((prev) => [...prev, userEntry, declineEntry]);
    }
    setInputVal("");
  };

  const handleCommandExecution = (cmdString) => {
    const rawCmd = cmdString.trim();
    if (!rawCmd && !crashedState && !awaitingCvConfirm) return;

    const cmd = rawCmd.toLowerCase();
    const cmdId = Date.now();

    setHistory((prev) => [rawCmd, ...prev]);
    setHistoryIndex(-1);

    const userEntry = {
      id: `cmd-${cmdId}`,
      type: "command",
      text: rawCmd,
      mode: terminalMode,
    };

    // SYSTEM REBOOT MODE [Y/n] WITH MULTI-PHASE REBOOT SEQUENCE
    if (crashedState) {
      if (cmd === "y" || cmd === "yes") {
        setIsTyping(true);
        setInputVal("");

        // Phase 1: Print restarting & failed reboot message in buffer
        const rebootInitEntry = {
          id: `reboot-init-${cmdId}`,
          type: "crash-output",
          cmdKey: "reboot",
          content: `[+] Initiating system kernel reboot sequence...\n[ERROR] Kernel panic recovery failed! System halted.`,
        };
        setOutputBuffer((prev) => [...prev, userEntry, rebootInitEntry]);

        // Phase 2: Wait 2 seconds (2000ms) before triggering full-screen centered overlay
        setTimeout(() => {
          setIsRebooting(true);
        }, 2000);
        return;
      } else {
        const repeatEntry = {
          id: `resp-${cmdId}`,
          type: "crash-output",
          cmdKey: "crash",
          content:
            `System remains in halted error state.\n` +
            getRandomCrashDump(rawCmd),
        };
        setIsTyping(true);
        setOutputBuffer((prev) => [...prev, userEntry, repeatEntry]);
        setInputVal("");
        return;
      }
    }

    // AWAITING CV ACTION [v/d/n]
    if (awaitingCvConfirm) {
      if (
        cmd === "v" ||
        cmd === "view" ||
        cmd === "open" ||
        cmd === "tab" ||
        cmd === "see" ||
        cmd === "1"
      ) {
        handleCvDecision("view");
        return;
      } else if (
        cmd === "d" ||
        cmd === "download" ||
        cmd === "2"
      ) {
        handleCvDecision("download");
        return;
      } else if (
        cmd === "y" ||
        cmd === "yes" ||
        cmd === "yep"
      ) {
        // Default positive confirmation to view in new tab
        handleCvDecision("view");
        return;
      } else if (
        cmd === "n" ||
        cmd === "no" ||
        cmd === "nope" ||
        cmd === "cancel" ||
        cmd === "c" ||
        cmd === "3"
      ) {
        handleCvDecision("cancel");
        return;
      } else if (cmd === "/clear" || cmd === "/cls") {
        setAwaitingCvConfirm(false);
        setOutputBuffer([]);
        setInputVal("");
        return;
      } else {
        const retryEntry = {
          id: `resp-${cmdId}`,
          type: "cv-prompt",
          cmdKey: "cv-prompt",
          content: `Choose an option for CV_Tubagus_Rivan.pdf: 'v' (view in new tab), 'd' (download), or 'n' (cancel):`,
        };
        setIsTyping(false);
        setOutputBuffer((prev) => [...prev, userEntry, retryEntry]);
        setInputVal("");
        return;
      }
    }

    // ----------------------------------------------------
    // MODE 1: LINUX KERNEL SHELL (tbrivan@dev-box:~$ )
    // ----------------------------------------------------
    if (terminalMode === "linux") {
      if (cmd === "/clear" || cmd === "/cls") {
        setOutputBuffer([]);
        setInputVal("");
        return;
      }

      if (cmd === "/game") {
        onReturnToGame();
        return;
      }

      if (cmd === "/exit" || cmd === "/quit" || cmd === "exit" || cmd === "quit") {
        const exitEntry = {
          id: `resp-${cmdId}`,
          type: "typed-output",
          cmdKey: cmd,
          content: `logout: Session active. Type '/game' to switch to RPS game arena, or '/help' for command reference.`,
        };
        setIsTyping(false);
        setOutputBuffer((prev) => [...prev, userEntry, exitEntry]);
        setInputVal("");
        return;
      }

      if (
        cmd === "/cv" ||
        cmd === "cv" ||
        cmd === "/download" ||
        cmd === "/download-cv" ||
        cmd === "download cv" ||
        cmd === "curl -o cv.pdf" ||
        cmd === "wget cv.pdf"
      ) {
        setAwaitingCvConfirm(true);
        const cvPromptEntry = {
          id: `resp-${cmdId}`,
          type: "cv-prompt",
          cmdKey: "cv-prompt",
          content: `Tubagus Rivan's CV (CV_Tubagus_Rivan.pdf): Choose to view in a new tab or download.`,
        };
        setIsTyping(false);
        setOutputBuffer((prev) => [...prev, userEntry, cvPromptEntry]);
        setInputVal("");
        return;
      }

      if (cmd.startsWith("mysql")) {
        setTerminalMode("mysql");
        const mysqlInitEntry = {
          id: `resp-${cmdId}`,
          type: "typed-output",
          cmdKey: "mysql",
          content: MYSQL_WELCOME_HEADER,
        };
        setIsTyping(true);
        setOutputBuffer((prev) => [...prev, userEntry, mysqlInitEntry]);
        setInputVal("");
        return;
      }

      if (cmd.startsWith("sudo rm -rf")) {
        setCrashedState(true);
        const crashEntry = {
          id: `resp-${cmdId}`,
          type: "crash-output",
          cmdKey: "crash",
          content: getRandomCrashDump(rawCmd),
        };
        setIsTyping(true);
        setOutputBuffer((prev) => [...prev, userEntry, crashEntry]);
        setInputVal("");
        return;
      }

      let responseContent = "";

      if (
        cmd === "cat about.md" ||
        cmd === "/about" ||
        cmd === "about" ||
        cmd === "/bio" ||
        cmd === "bio"
      ) {
        responseContent = CAT_ABOUT_OUTPUT;
      } else if (cmd === "/whoami") {
        responseContent = WHOAMI_OUTPUT;
      } else if (
        cmd === "/contact" ||
        cmd === "contact" ||
        cmd === "/email" ||
        cmd === "email"
      ) {
        setIsTyping(false);
        const contactEntry = {
          id: `resp-${cmdId}`,
          type: "typed-output",
          cmdKey: "contact",
          content: "",
        };
        setOutputBuffer((prev) => [...prev, userEntry, contactEntry]);
        setInputVal("");
        return;
      } else if (cmd === "/help") {
        responseContent = TOUR_OUTPUT;
      } else if (cmd === "/valar-morghulis") {
        responseContent = getRandomValarMorghulisOutput();
      } else if (cmd.startsWith("select") || cmd.includes("from")) {
        responseContent = `bash: SELECT: command not found. Enter MySQL database shell first using 'mysql -u root -p'.`;
      } else {
        responseContent = `bash: ${rawCmd}: command not found. Type '/help' for command reference.`;
      }

      const responseEntry = {
        id: `resp-${cmdId}`,
        type: "typed-output",
        cmdKey: cmd,
        content: responseContent,
      };

      setIsTyping(true);
      setOutputBuffer((prev) => [...prev, userEntry, responseEntry]);
      setInputVal("");
      return;
    }

    // ----------------------------------------------------
    // MODE 2: MYSQL DATABASE SHELL (mysql> )
    // ----------------------------------------------------
    if (terminalMode === "mysql") {
      if (cmd === "/game") {
        onReturnToGame();
        return;
      }

      if (
        cmd === "exit" ||
        cmd === "exit;" ||
        cmd === "quit" ||
        cmd === "quit;" ||
        cmd === "\\q"
      ) {
        setTerminalMode("linux");
        const exitEntry = {
          id: `resp-${cmdId}`,
          type: "text",
          content: "Bye",
        };
        setOutputBuffer((prev) => [...prev, userEntry, exitEntry]);
        setInputVal("");
        return;
      }

      if (cmd === "clear" || cmd === "/clear" || cmd === "cls") {
        setOutputBuffer([]);
        setInputVal("");
        return;
      }

      let responseContent = "";

      if (cmd.includes("drop")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.drop;
      } else if (cmd.includes("delete") || cmd.includes("truncate")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.delete;
      } else if (cmd.includes("update")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.update;
      } else if (cmd.includes("insert")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.insert;
      } else if (cmd.includes("alter")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.alter;
      } else if (cmd.includes("grant")) {
        responseContent = SQL_PROFESSIONAL_SECURITY_LOGS.grant;
      } else if (
        cmd === "select * from skills;" ||
        cmd === "select * from skills"
      ) {
        responseContent = SQL_SKILLS_OUTPUT;
      } else if (
        cmd === "select * from projects;" ||
        cmd === "select * from projects"
      ) {
        responseContent = SQL_PROJECTS_OUTPUT;
      } else if (
        cmd === "select * from experience;" ||
        cmd === "select * from experience"
      ) {
        responseContent = SQL_EXPERIENCE_OUTPUT;
      } else if (
        cmd === "select * from education;" ||
        cmd === "select * from education"
      ) {
        responseContent = SQL_EDUCATION_OUTPUT;
      } else if (
        cmd === "select * from cv;" ||
        cmd === "select * from cv" ||
        cmd === "download cv;" ||
        cmd === "download cv"
      ) {
        setAwaitingCvConfirm(true);
        const cvPromptEntry = {
          id: `resp-${cmdId}`,
          type: "cv-prompt",
          cmdKey: "cv-prompt",
          content: `Tubagus Rivan's CV (CV_Tubagus_Rivan.pdf): Choose to view in a new tab or download.`,
        };
        setIsTyping(false);
        setOutputBuffer((prev) => [...prev, userEntry, cvPromptEntry]);
        setInputVal("");
        return;
      } else if (
        cmd === "select * from metrics;" ||
        cmd === "select * from metrics"
      ) {
        responseContent = SQL_METRICS_OUTPUT;
      } else if (
        cmd.includes("show tables") ||
        cmd.includes("show databases")
      ) {
        responseContent = `+--------------------+
| Tables_in_portfolio|
+--------------------+
| skills             |
| projects           |
| career_history     |
| education          |
| system_metrics     |
+--------------------+
5 rows in set (0.001 sec)`;
      } else {
        responseContent = `ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '${rawCmd}' at line 1`;
      }

      const responseEntry = {
        id: `resp-${cmdId}`,
        type: "typed-output",
        cmdKey: cmd,
        content: responseContent,
      };

      const isContactCmd = cmd.includes("contact");
      setIsTyping(!isContactCmd);
      setOutputBuffer((prev) => [...prev, userEntry, responseEntry]);
      setInputVal("");
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      const selectedText = window.getSelection().toString();
      if (!selectedText) {
        e.preventDefault();
        const cmdId = Date.now();
        if (awaitingCvConfirm) {
          setAwaitingCvConfirm(false);
        }
        const cancelEntry = {
          id: `cmd-cancel-${cmdId}`,
          type: "command",
          text: inputVal + "^C",
        };
        setOutputBuffer((prev) => [...prev, cancelEntry]);
        setInputVal("");
        setSelectedSugIdx(0);
        return;
      }
    }

    const hasSuggestions =
      filteredSuggestions.length > 0 && !crashedState && !isTyping;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hasSuggestions) {
        setHasNavigatedSug(true);
        setSelectedSugIdx((prev) => {
          if (prev < 0) return 0;
          return (prev + 1) % filteredSuggestions.length;
        });
      } else if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hasSuggestions) {
        setHasNavigatedSug(true);
        setSelectedSugIdx((prev) => {
          if (prev <= 0) return filteredSuggestions.length - 1;
          return prev - 1;
        });
      } else if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (hasSuggestions) {
        const targetIdx = selectedSugIdx >= 0 ? selectedSugIdx : 0;
        setInputVal(filteredSuggestions[targetIdx].cmd);
        setSelectedSugIdx(-1);
        setHasNavigatedSug(false);
      }
    } else if (e.key === "Enter") {
      if (hasSuggestions && hasNavigatedSug && selectedSugIdx >= 0) {
        handleCommandExecution(filteredSuggestions[selectedSugIdx].cmd);
      } else {
        handleCommandExecution(inputVal);
      }
      setSelectedSugIdx(-1);
      setHasNavigatedSug(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("tbrivan22@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0c10",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* FULLSCREEN Solid Terminal Window */}
      <div
        onClick={focusInput}
        style={{
          width: "100vw",
          height: "100vh",
          background: "#0e1117",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Full-Screen Centered Red Reboot Overlay */}
        {isRebooting && (
          <RebootSequenceOverlay
            onFinish={() => {
              setIsRebooting(false);
              setCrashedState(false);
              setTerminalMode("linux");
              setOutputBuffer([
                {
                  id: `reboot-done-${Date.now()}`,
                  type: "system",
                  content: `[OK] System Kernel Rebooted successfully.\nWelcome back to Tubagus Rivan's Software Developer Shell.`,
                },
              ]);
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
              }, 800);
            }}
          />
        )}

        {/* macOS Full Width Header Bar */}
        <div
          style={{
            background: "#161b24",
            borderBottom: "1px solid #1e2636",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            userSelect: "none",
          }}
        >
          {/* macOS Traffic Lights */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: "#ef4444",
              }}
            ></span>
            <span
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            ></span>
            <span
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: "#10b981",
              }}
            ></span>
          </div>

          {/* Terminal Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <TermIcon size={15} color="var(--terminal-cyan)" />
            <span>tbrivan@dev-box: ~ (zsh)</span>
          </div>

          {/* Right Spacer */}
          <div style={{ width: "50px" }} />
        </div>

        {/* Fullscreen Content Area */}
        <div ref={scrollContainerRef} className="terminal-content-area">
          {/* Buffer Output Items */}
          {outputBuffer.map((item, idx) => {
            const isLast = idx === outputBuffer.length - 1;

            return (
              <div key={item.id || idx}>
                {item.type === "system" && (
                  <div style={{ color: "var(--terminal-green)" }}>
                    <LightningTypewriterText
                      text={item.content}
                      chunkSize={14}
                      intervalMs={1}
                      onTick={scrollToBottomRealtime}
                      onComplete={() => {}}
                    />
                  </div>
                )}

                {item.type === "command" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        color: crashedState
                          ? "#ef4444"
                          : item.text === "y" && awaitingCvConfirm
                            ? "var(--terminal-green)"
                            : item.mode === "mysql"
                              ? "#38bdf8"
                              : "var(--terminal-green)",
                      }}
                    >
                      {crashedState
                        ? "kernel-panic> "
                        : item.mode === "mysql"
                          ? "mysql> "
                          : "tbrivan@dev-box:~$ "}
                    </span>
                    <span>{item.text}</span>
                  </div>
                )}

                {item.type === "crash-output" && (
                  <div>
                    {isLast ? (
                      <HighlightedErrorText
                        text={item.content}
                        chunkSize={40}
                        intervalMs={1}
                        onTick={scrollToBottomRealtime}
                        onComplete={() => {
                          if (item.cmdKey !== "reboot") {
                            setIsTyping(false);
                          }
                        }}
                      />
                    ) : (
                      <HighlightedErrorText
                        text={item.content}
                        chunkSize={item.content.length}
                      />
                    )}
                  </div>
                )}

                {/* CV Action Options Prompt Card */}
                {item.type === "cv-prompt" && (
                  <div
                    style={{
                      margin: "0.5rem 0",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--terminal-amber)",
                        marginBottom: "0.5rem",
                        fontSize: "0.88rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        fontWeight: 600,
                      }}
                    >
                      <Download size={15} color="var(--terminal-amber)" />
                      <span>{item.content}</span>
                    </div>

                    {awaitingCvConfirm && isLast && (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.6rem",
                          alignItems: "center",
                          marginTop: "0.4rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCvDecision("view");
                          }}
                          className="chip-btn"
                          style={{
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: "0.3rem 0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            background: "rgba(6, 182, 212, 0.2)",
                            border: "1px solid var(--terminal-cyan)",
                            color: "var(--terminal-cyan)",
                          }}
                        >
                          <ExternalLink size={13} /> View in New Tab (v)
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCvDecision("download");
                          }}
                          className="chip-btn"
                          style={{
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: "0.3rem 0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            background: "rgba(16, 185, 129, 0.2)",
                            border: "1px solid var(--terminal-green)",
                            color: "var(--terminal-green)",
                          }}
                        >
                          <Download size={13} /> Download PDF (d)
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCvDecision("cancel");
                          }}
                          className="chip-btn"
                          style={{
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: "0.3rem 0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid #ef4444",
                            color: "#ef4444",
                          }}
                        >
                          <X size={13} /> Cancel (n)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {item.type === "typed-output" && (
                  <div>
                    {item.cmdKey.includes("contact") ? (
                      <ContactTable />
                    ) : item.cmdKey.startsWith("cv-") ? (
                      <div
                        style={{
                          margin: "0.45rem 0",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        <span
                          style={{
                            whiteSpace: "pre-wrap",
                            color:
                              item.cmdKey === "cv-confirmed" ||
                              item.cmdKey === "cv-viewed"
                                ? "var(--terminal-green)"
                                : "#f87171",
                            display: "block",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.content}
                        </span>
                      </div>
                    ) : isLast ? (
                      <LightningTypewriterText
                        text={item.content}
                        chunkSize={1}
                        intervalMs={10}
                        startDelayMs={120}
                        onTick={scrollToBottomRealtime}
                        onComplete={() => setIsTyping(false)}
                      />
                    ) : (
                      <span style={{ whiteSpace: "pre-wrap" }}>
                        {item.content}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Active Input Line & Suggestions (ONLY APPEARS ONCE STREAMING/BOOT DELAY IS DONE) */}
          {!isTyping && !isRebooting && (
            <div style={{ marginTop: "0.5rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    color: crashedState
                      ? "#ef4444"
                      : awaitingCvConfirm
                        ? "var(--terminal-amber)"
                        : terminalMode === "mysql"
                          ? "#38bdf8"
                          : "var(--terminal-green)",
                    fontWeight: 600,
                  }}
                >
                  {crashedState
                    ? "[REBOOT?] Y/n > "
                    : awaitingCvConfirm
                      ? "cv [v/d/n] > "
                      : terminalMode === "mysql"
                        ? "mysql> "
                        : "tbrivan@dev-box:~$ "}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  placeholder={
                    crashedState
                      ? "type 'Y' to restart..."
                      : awaitingCvConfirm
                        ? "type 'v' to view in new tab, 'd' to download, or 'n' to cancel..."
                        : terminalMode === "mysql"
                          ? "try 'SELECT * FROM skills;'"
                          : "try 'mysql -u root -p' or 'cat about.md'"
                  }
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: crashedState
                      ? "#ef4444"
                      : awaitingCvConfirm
                        ? "var(--terminal-amber)"
                        : terminalMode === "mysql"
                          ? "#38bdf8"
                          : "#ffffff",
                    fontFamily: "var(--font-mono)",
                  }}
                />
              </div>

              {/* Autocomplete Suggestions */}
              <SuggestionPopover
                suggestions={filteredSuggestions}
                selectedIndex={selectedSugIdx}
                onSelectIndex={setSelectedSugIdx}
                onExecuteCommand={handleCommandExecution}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Action Chips Footer */}
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="terminal-footer-bar"
        >
          {/* First-Time Visitor Onboarding Tip Banner */}
          {showHintBadge && (
            <div className="terminal-onboarding-hint">
              <span>
                [TIP] <strong>First time visiting?</strong>{" "}
                {terminalMode === "mysql"
                  ? "Type 'SELECT * FROM skills;' or 'exit;' to return to Linux."
                  : "Run '/cv' to view/download my CV or '/help' for full manual."}
              </span>
              <button
                className="hint-close-btn"
                title="Dismiss hint"
                onClick={() => setShowHintBadge(false)}
              >
                ✕
              </button>
            </div>
          )}

          {/* DESKTOP VIEW: Single Row with Hidden Scrollbar */}
          <div
            className="desktop-chip-view"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--text-dim)",
                whiteSpace: "nowrap",
              }}
            >
              {terminalMode === "mysql" ? "MYSQL COMMANDS:" : "QUICK COMMANDS:"}
            </span>
            <div className="chip-scroll-container" style={{ flex: 1 }}>
              {(terminalMode === "mysql"
                ? [
                    "SELECT * FROM skills;",
                    "SELECT * FROM projects;",
                    "SELECT * FROM experience;",
                    "SELECT * FROM education;",
                    "SELECT * FROM metrics;",
                    "SHOW TABLES;",
                    "exit;",
                  ]
                : [
                    "/cv",
                    "/help",
                    "/about",
                    "cat about.md",
                    "/whoami",
                    "/contact",
                    "mysql -u root -p",
                    "/valar-morghulis",
                    "/game",
                    "sudo rm -rf /",
                    "/clear",
                  ]
              ).map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommandExecution(c);
                  }}
                  className={`chip-btn ${c === "/cv" || c === "/help" || c === "mysql -u root -p" ? "chip-btn-tour" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW: Minimalist Select Dropdown */}
          <select
            className="mobile-cmd-select"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              const val = e.target.value;
              if (val) {
                handleCommandExecution(val);
                e.target.value = "";
                e.target.blur();
              }
            }}
          >
            <option value="">-- SELECT CLI COMMAND --</option>
            {terminalMode === "mysql" ? (
              <>
                <option value="SELECT * FROM skills;">
                  SELECT * FROM skills;
                </option>
                <option value="SELECT * FROM projects;">
                  SELECT * FROM projects;
                </option>
                <option value="SELECT * FROM experience;">
                  SELECT * FROM experience;
                </option>
                <option value="SELECT * FROM education;">
                  SELECT * FROM education;
                </option>
                <option value="SELECT * FROM metrics;">
                  SELECT * FROM metrics;
                </option>
                <option value="SHOW TABLES;">SHOW TABLES;</option>
                <option value="exit;">exit — exit mysql shell</option>
              </>
            ) : (
              <>
                <option value="/cv">/cv — view or download CV (PDF)</option>
                <option value="/help">
                  /help — system manual & command guide
                </option>
                <option value="/about">
                  /about — engineer bio & competencies
                </option>
                <option value="cat about.md">
                  cat about.md — engineer bio
                </option>
                <option value="/whoami">
                  /whoami — print user identity & role
                </option>
                <option value="/contact">
                  /contact — contact channels & links
                </option>
                <option value="mysql -u root -p">
                  mysql -u root -p — connect to mysql shell
                </option>
                <option value="/game">/game — play RPS game arena</option>
                <option value="sudo rm -rf /">sudo rm -rf /</option>
                <option value="/clear">/clear</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

function RebootSequenceOverlay({ onFinish }) {
  const [step, setStep] = useState(1);

  const line1 = "Critical system error! Purging cache & restarting kernel...";
  const line2 = "Nevermind...";
  const line3 = "This terminal Built with zero-downtime fault tolerance.";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0c10",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "var(--font-mono)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#ef4444",
          fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
          fontWeight: 600,
          lineHeight: 1.7,
          maxWidth: "680px",
          textAlign: "center",
        }}
      >
        {step === 1 && (
          <LightningTypewriterText
            text={line1}
            chunkSize={1}
            intervalMs={12}
            startDelayMs={150}
            onComplete={() => {
              setTimeout(() => {
                setStep(2);
              }, 2000);
            }}
          />
        )}

        {step === 2 && (
          <LightningTypewriterText
            text={line2}
            chunkSize={1}
            intervalMs={12}
            startDelayMs={0}
            onComplete={() => {
              setTimeout(() => {
                setStep(3);
              }, 1000);
            }}
          />
        )}

        {step === 3 && (
          <LightningTypewriterText
            text={line3}
            chunkSize={1}
            intervalMs={12}
            startDelayMs={0}
            onComplete={() => {
              setTimeout(() => {
                onFinish();
              }, 3000);
            }}
          />
        )}
      </div>
    </div>
  );
}
