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
  <div class="gt-wrapper">
    <div id="google_translate_element"></div>
  </div>
</template>

<style>
.gt-wrapper {
  display: flex;
  align-items: center;
  margin: 0 12px;
}

/* Hide the "Powered by Google" text and the dropdown arrow icon row */
.gt-wrapper .goog-te-gadget {
  font-size: 0 !important;
  color: transparent !important;
}
.gt-wrapper .goog-te-gadget > span {
  display: none !important;
}
.gt-wrapper .goog-te-gadget .goog-te-combo {
  margin: 0 !important;
  font-size: 13px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 8px;
  outline: none;
  cursor: pointer;
}
.gt-wrapper .goog-te-gadget .goog-te-combo:hover {
  border-color: var(--vp-c-brand-1);
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
