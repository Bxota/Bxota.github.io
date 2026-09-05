import { ref } from 'vue'
import { english } from './translations.en'
export type Locale = 'fr' | 'en'
export const locale = ref<Locale>('fr')
export function t(text: string, values: Record<string, string | number> = {}): string {
  const translated = locale.value === 'en' ? english[text] ?? text : text
  return translated.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match))
}
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(date))
}
