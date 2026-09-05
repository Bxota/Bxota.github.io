export function trapDialogFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !(event.currentTarget instanceof HTMLDialogElement)) return
  const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')).filter(element => element.tabIndex >= 0 && !element.closest('[inert]') && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden')
  if (!targets.length) return
  const index = targets.indexOf(document.activeElement as HTMLElement)
  if (index < 0 || (!event.shiftKey && index === targets.length - 1) || (event.shiftKey && index === 0)) {
    event.preventDefault()
    targets[event.shiftKey ? targets.length - 1 : 0]?.focus()
  }
}
