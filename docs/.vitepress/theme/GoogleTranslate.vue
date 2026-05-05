<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window === 'undefined') return
  if (document.getElementById('google-translate-script')) return

  ;(window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'zh-CN,zh-TW,en,ja,ko,fr,es,de,ru',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      },
      'google_translate_element'
    )
  }

  const s = document.createElement('script')
  s.id = 'google-translate-script'
  s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  s.async = true
  document.body.appendChild(s)
})
</script>

<template>
  <div class="gt-wrapper" aria-label="Translate page">
    <svg class="gt-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17A15.5 15.5 0 0 1 9 11.21A15.5 15.5 0 0 1 6.79 8H4.79A17.5 17.5 0 0 0 7.73 12.5L2.66 17.5l1.41 1.42L9 14l3.07 3.07l.8-2zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7L17.5 12.67L19.12 17h-3.24z"/>
    </svg>
    <div id="google_translate_element"></div>
  </div>
</template>

<style>
.gt-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0 6px;
  padding: 4px 6px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  transition: background 0.2s, color 0.2s;
}
.gt-wrapper:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.gt-icon {
  display: block;
  flex-shrink: 0;
  opacity: 0.85;
}

/* Hide the "Powered by Google" text and the dropdown arrow icon row */
.gt-wrapper .goog-te-gadget {
  font-size: 0 !important;
  color: transparent !important;
  line-height: 1 !important;
}
.gt-wrapper .goog-te-gadget > span {
  display: none !important;
}
.gt-wrapper .goog-te-gadget .goog-te-combo {
  margin: 0 !important;
  font-size: 12px;
  background: transparent;
  color: inherit;
  border: none;
  border-radius: 4px;
  padding: 2px 4px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  max-width: 90px;
}
.gt-wrapper .goog-te-gadget .goog-te-combo option {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

/* Kill the giant Google translate banner that pushes the page down */
.goog-te-banner-frame.skiptranslate,
.goog-te-banner-frame {
  display: none !important;
}
body {
  top: 0 !important;
  position: static !important;
}

/* Hide the hover tooltip Google injects */
.goog-tooltip,
.goog-tooltip:hover,
.goog-text-highlight {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
</style>
