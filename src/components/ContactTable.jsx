import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Check, X } from "lucide-react";

const CONTACT_ITEMS = [
  {
    channel: "Email",
    address: "tbrivan22@gmail.com",
    href: "mailto:tbrivan22@gmail.com",
    isMail: true,
  },
  {
    channel: "Phone",
    address: "+62 81210903492",
    href: "tel:+6281210903492",
    isCopy: true,
  },
  {
    channel: "Location",
    address: "Bogor, Indonesia",
    href: "https://maps.google.com/?q=Bogor,Indonesia",
  },
  {
    channel: "GitHub",
    address: "github.com/tbrivan",
    href: "https://github.com/tbrivan",
  },
  {
    channel: "LinkedIn",
    address: "linkedin.com/in/tubagus-rivan",
    href: "https://linkedin.com/in/tubagus-rivan",
  },
  {
    channel: "CV / Resume",
    address: "CV_Tubagus_Rivan.pdf (Click to View / Download)",
    href: "/CV_Tubagus_Rivan.pdf",
    isDownload: true,
  },
];

export default function ContactTable() {
  const [copiedChannel, setCopiedChannel] = useState(null);
  const [showCvConfirm, setShowCvConfirm] = useState(false);

  const handleRowClick = (item) => {
    if (item.isDownload) {
      if (!showCvConfirm) {
        setShowCvConfirm(true);
        return;
      }
      return;
    }

    if (item.isMail) {
      navigator.clipboard.writeText(item.address);
      setCopiedChannel(item.channel);
      setTimeout(() => setCopiedChannel(null), 1800);
      window.location.href = item.href;
    } else if (item.isCopy) {
      navigator.clipboard.writeText(item.address);
      setCopiedChannel(item.channel);
      setTimeout(() => setCopiedChannel(null), 1800);
    } else {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleViewNewTab = (e) => {
    e.stopPropagation();
    window.open("/CV_Tubagus_Rivan.pdf", "_blank", "noopener,noreferrer");
    setShowCvConfirm(false);
  };

  const handleConfirmDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = "/CV_Tubagus_Rivan.pdf";
    link.download = "CV_Tubagus_Rivan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCvConfirm(false);
    setCopiedChannel("CV / Resume");
    setTimeout(() => setCopiedChannel(null), 2200);
  };

  const handleCancelDownload = (e) => {
    e.stopPropagation();
    setShowCvConfirm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ margin: "0.4rem 0", fontFamily: "var(--font-mono)" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, delay: 0.05 }}
        style={{
          color: "var(--text-muted)",
          marginBottom: "0.6rem",
          fontSize: "0.85rem",
        }}
      >
        [+] Direct Communication Channels & Profile Links (Click to open / download):
      </motion.div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          maxWidth: "560px",
        }}
      >
        {CONTACT_ITEMS.map((item, idx) => {
          const isCopied = copiedChannel === item.channel;
          const isCvRow = item.isDownload;

          return (
            <motion.div
              key={item.channel}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.24,
                delay: 0.08 + idx * 0.06,
                ease: "easeOut",
              }}
              onClick={() => handleRowClick(item)}
              className="contact-line-row"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 0.8rem",
                borderRadius: "4px",
                background: isCvRow
                  ? showCvConfirm
                    ? "rgba(245, 158, 11, 0.1)"
                    : "rgba(6, 182, 212, 0.08)"
                  : "transparent",
                border: isCvRow
                  ? showCvConfirm
                    ? "1px solid var(--terminal-amber)"
                    : "1px dashed rgba(6, 182, 212, 0.3)"
                  : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.18s ease-in-out",
                userSelect: "none",
              }}
            >
              {isCvRow && showCvConfirm ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "var(--terminal-amber)",
                      fontSize: "0.84rem",
                      fontWeight: 600,
                    }}
                  >
                    CV_Tubagus_Rivan.pdf:
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={handleViewNewTab}
                      style={{
                        background: "rgba(6, 182, 212, 0.2)",
                        border: "1px solid var(--terminal-cyan)",
                        color: "var(--terminal-cyan)",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <ExternalLink size={12} /> View in Tab
                    </button>
                    <button
                      onClick={handleConfirmDownload}
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid var(--terminal-green)",
                        color: "var(--terminal-green)",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Download size={12} /> Download
                    </button>
                    <button
                      onClick={handleCancelDownload}
                      style={{
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <X size={12} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="contact-prefix"
                    style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}
                  >
                    &gt;
                  </span>
                  <span
                    style={{
                      color: item.isDownload
                        ? "var(--terminal-green)"
                        : "var(--terminal-cyan)",
                      fontWeight: 600,
                      minWidth: "95px",
                      fontSize: "0.88rem",
                    }}
                  >
                    {item.channel}
                  </span>
                  <span
                    className="contact-address"
                    style={{
                      color: isCopied
                        ? "var(--terminal-green)"
                        : item.isDownload
                          ? "var(--terminal-cyan)"
                          : "var(--text-main)",
                      fontSize: "0.88rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isCopied
                      ? item.isDownload
                        ? "✓ Download Started!"
                        : "✓ Copied to Clipboard!"
                      : item.address}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
