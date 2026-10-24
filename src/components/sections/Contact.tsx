"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // No endpoint configured yet — confirm locally without pretending to send.
    if (!siteConfig.contactEndpoint) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const message = {
    idle: null,
    sending: { text: "Sending…", className: "text-ink-secondary" },
    sent: siteConfig.contactEndpoint
      ? { text: "Thanks — your message has been sent.", className: "text-success" }
      : {
          text: "Form works — set NEXT_PUBLIC_CONTACT_ENDPOINT to actually send it.",
          className: "text-ink-secondary",
        },
    error: {
      text: "Something went wrong. Please try again or email me directly.",
      className: "text-destructive",
    },
  }[status];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="type-heading text-ink">Contact</h2>
      <p className="type-body text-ink-secondary">
        Have a project in mind? Send a message and I&apos;ll get back to you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-sm bg-canvas-soft p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="type-ui text-ink">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              className="bg-background"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="type-ui text-ink">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="bg-background"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject" className="type-ui text-ink">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="What is this about?"
            className="bg-background"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="type-ui text-ink">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project…"
            className="bg-background"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {message ? (
            <p className={`type-ui ${message.className}`} role="status">
              {message.text}
            </p>
          ) : (
            <span />
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="type-button h-12 rounded-full px-8 hover:bg-store-blue"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
