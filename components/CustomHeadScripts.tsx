'use client';

import { useEffect } from 'react';
import { useSiteSettings } from '@/lib/settings-store';

interface CustomHeadScriptsProps {
  initialCode?: string;
}

const ALLOWED_TAGS = new Set(['META', 'LINK', 'SCRIPT']);

function isSafeAttribute(name: string, value: string): boolean {
  const lower = name.toLowerCase();
  if (lower.startsWith('on')) return false;
  if ((lower === 'href' || lower === 'src') && /^\s*javascript:/i.test(value)) {
    return false;
  }
  return true;
}

export default function CustomHeadScripts({
  initialCode = '',
}: CustomHeadScriptsProps) {
  const [settings] = useSiteSettings();
  const activeCode = (settings.customHeadCode || initialCode || '').trim();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const existing = document.head.querySelectorAll('[data-tpv-custom-head="true"]');
    existing.forEach((node) => node.remove());

    if (!activeCode) return;

    const parser = new DOMParser();
    const parsed = parser.parseFromString(activeCode, 'text/html');
    const candidates = [
      ...Array.from(parsed.head.children),
      ...Array.from(parsed.body.children),
    ];

    const appended: HTMLElement[] = [];

    for (const el of candidates) {
      if (!ALLOWED_TAGS.has(el.tagName)) continue;

      const tagName = el.tagName.toLowerCase() as 'meta' | 'link' | 'script';
      const clone = document.createElement(tagName);
      clone.setAttribute('data-tpv-custom-head', 'true');

      for (const attr of Array.from(el.attributes)) {
        if (isSafeAttribute(attr.name, attr.value)) {
          clone.setAttribute(attr.name, attr.value);
        }
      }

      if (tagName === 'script' && el.textContent) {
        clone.textContent = el.textContent;
      }

      document.head.appendChild(clone);
      appended.push(clone);
    }

    return () => {
      appended.forEach((node) => node.remove());
    };
  }, [activeCode]);

  return null;
}