const banner = document.getElementById('aoc-banner')
const closeButton = document.getElementById('aoc-close')

if (banner && closeButton) {
  if (sessionStorage.getItem('aoc-dismissed')) {
    banner.style.display = 'none'
  }

  closeButton.addEventListener('click', () => {
    banner.style.display = 'none'
    sessionStorage.setItem('aoc-dismissed', '1')
  })
}
