import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('public copy distinguishes private quiz answers from optional feedback', async () => {
  const [landing, layout, feedback, llms, wellKnownLlms] = await Promise.all([
    read('src/components/Landing.jsx'),
    read('src/components/Layout.jsx'),
    read('src/components/FeedbackWidget.jsx'),
    read('public/llms.txt'),
    read('public/.well-known/llms.txt'),
  ])

  assert.match(landing, /quiz answers stay in\s+your browser/i)
  assert.match(layout, /Quiz answers stay in your browser and are not transmitted/)
  assert.match(feedback, /Optional feedback sends your reaction and message to Netlify Forms/)
  assert.doesNotMatch(`${landing}\n${layout}`, /No data (?:is )?collected or stored/i)
  assert.equal(llms, wellKnownLlms)
  assert.match(llms, /Optional feedback sends a reaction and message to Netlify Forms/)
})

test('feedback reports non-success HTTP responses as failures', async () => {
  const feedback = await read('src/components/FeedbackWidget.jsx')

  assert.match(feedback, /if \(!response\.ok\)/)
  assert.match(feedback, /Feedback request failed with status/)
})

test('the release config applies a restrictive content security policy', async () => {
  const [html, config, acknowledgementScript] = await Promise.all([
    read('index.html'),
    read('netlify.toml'),
    read('public/aoc.js'),
  ])

  assert.match(html, /<script src="\/aoc\.js" defer><\/script>/)
  assert.doesNotMatch(html, /<script>\(function\(\)/)
  assert.match(config, /Content-Security-Policy/)
  assert.match(config, /script-src 'self'/)
  assert.match(config, /object-src 'none'/)
  assert.match(acknowledgementScript, /sessionStorage\.setItem\('aoc-dismissed', '1'\)/)
})
