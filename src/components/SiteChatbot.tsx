"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

type Topic = {
  id: string;
  label: string;
  answer: string;
};

type Message =
  | { role: "bot"; text: string }
  | { role: "user"; text: string }
  | { role: "whatsapp"; topic?: string };

const topics: Topic[] = [
  {
    id: "location",
    label: "Where is Bellevue?",
    answer: `${site.name} is in ${site.location}, on the Chaliyar riverfront — connected to NH66, Feroke Railway Station, and Calicut International Airport.`,
  },
  {
    id: "homes",
    label: "What homes are available?",
    answer: `There are ${site.units} residences across ${site.towers}, ${site.floors}. Plans range from ${site.sizeRange}, including 3 BHK and 4 BHK layouts.`,
  },
  {
    id: "price",
    label: "What is the starting price?",
    answer: `Pricing starts from ${site.priceFrom} Prices are indicative and subject to change — continue on WhatsApp for current availability.`,
  },
  {
    id: "visit",
    label: "Book a site visit",
    answer: `We can arrange a private site visit. Continue on WhatsApp and share a preferred day — our team will confirm.`,
  },
  {
    id: "brochure",
    label: "Get brochure / plans",
    answer: `You can download the brochure and plans from the site after sharing your details, or continue on WhatsApp and we will send them to you.`,
  },
];

function whatsappHref() {
  const text = `Hi, I am interested to know more about ${site.name}.`;
  return `https://wa.me/919946450723?text=${encodeURIComponent(text)}`;
}

const greeting =
  `Hi — I can help with ${site.shortName} by ${site.brand}. Pick a question, then continue on WhatsApp with our team.`;

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: greeting },
  ]);
  const [highlightTopics, setHighlightTopics] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;
    const answer = answerRef.current;
    const top = answer ? Math.max(0, answer.offsetTop - 8) : container.scrollHeight;
    container.scrollTo({ top, behavior: "smooth" });
  }, [messages, open]);

  const ask = (topic: Topic) => {
    setHighlightTopics(false);
    setMessages((current) => [
      ...current,
      { role: "user", text: topic.label },
      { role: "bot", text: topic.answer },
      { role: "whatsapp", topic: topic.label },
    ]);
  };

  const reset = () => {
    setMessages([{ role: "bot", text: greeting }]);
    setHighlightTopics(true);
  };

  const latestAnswerIndex = messages.findLastIndex(
    (item, itemIndex) => item.role === "bot" && itemIndex > 0,
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-5">
      {open && (
        <div className="pointer-events-auto mb-3 flex w-full max-w-[22rem] flex-col overflow-hidden rounded-2xl border border-line bg-sand shadow-[0_24px_80px_rgba(26,26,24,0.28)] sm:mb-4">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div>
              <p className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
                {site.brand}
              </p>
              <p className="font-display text-lg leading-tight">
                {site.shortName} chat
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="relative flex max-h-[min(16rem,36vh)] flex-col gap-3 overflow-y-auto px-3 py-3 sm:max-h-[min(18rem,40vh)]"
          >
            {messages.map((message, index) => {
              const isLatestAnswer =
                message.role === "bot" && index === latestAnswerIndex;

              if (message.role === "bot") {
                return (
                  <div
                    key={`bot-${index}`}
                    ref={isLatestAnswer ? answerRef : undefined}
                    className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink shadow-sm"
                  >
                    {message.text}
                  </div>
                );
              }
              if (message.role === "user") {
                return (
                  <div
                    key={`user-${index}`}
                    className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-teal px-3.5 py-2.5 text-sm leading-relaxed text-white"
                  >
                    {message.text}
                  </div>
                );
              }
              return (
                <a
                  key={`wa-${index}`}
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-95"
                >
                  <WhatsAppIcon />
                  Continue on WhatsApp
                </a>
              );
            })}
          </div>

          <div className="border-t border-line bg-sand px-3 py-3">
            <p
              className={`mb-2 text-[11px] font-medium tracking-wide text-teal uppercase ${
                highlightTopics ? "chat-topic-hint" : ""
              }`}
            >
              Tap a question
            </p>
            <div className="relative">
              {highlightTopics ? (
                <span
                  aria-hidden
                  className="chat-topic-ring pointer-events-none absolute -inset-2 rounded-2xl border-2 border-teal/45"
                />
              ) : null}
              <div className="relative flex max-h-[min(12rem,28vh)] flex-col gap-2 overflow-y-auto">
                {topics.map((topic, topicIndex) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => ask(topic)}
                    className={`chat-topic-btn group flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-teal/35 bg-white px-3.5 py-2.5 text-left text-sm text-ink shadow-sm transition hover:border-teal hover:bg-teal/5 active:scale-[0.99] ${
                      highlightTopics && topicIndex === 0
                        ? "chat-topic-btn-pulse"
                        : ""
                    }`}
                  >
                    <span>{topic.label}</span>
                    <span
                      aria-hidden
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white"
                    >
                      <TapChevron />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="pointer-events-auto ml-auto flex h-14 items-center gap-2 rounded-full bg-teal px-5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(42,85,83,0.45)] transition hover:bg-teal-deep"
      >
        <ChatIcon />
        <span className="pr-0.5">{open ? "Close" : "Chat"}</span>
      </button>
    </div>
  );
}

function TapChevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a8 8 0 0 1-11.7 7.1L3 20l1.1-5.3A8 8 0 1 1 21 12z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 3.2 17.9L2 22l4.2-1.1A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3a9 9 0 1 1 7.1 3.7zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.2-.4s0-.3 0-.4-.6-1.5-.8-2-.2-.5-.5-.5h-.4c-.1 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.6 9.6 0 0 0 3.7 3.1c.5.2.9.4 1.2.5.5.2 1 .2 1.3.1.4-.1 1.6-.7 1.8-1.3s.2-1.2.2-1.3 0-.2-.2-.3z" />
    </svg>
  );
}
