const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(html) {
  return html.replace(/[&<>"']/g, (chr) => htmlEscapes[chr])
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

/**
 * Translate the "1,2,6-8" into an array of numbers to be like: 1,2,6,7,8
 */
function getHighlightLinesConfig(linesConfig = '') {
  if (!linesConfig) {
    return;
  }

  let linesToHighlight = [];
  const linesGroups = linesConfig.split(',')
  linesGroups.forEach(group => {
    const rangeParts = group.split('-')
    if (rangeParts.length === 1) {
      linesToHighlight.push(parseInt(rangeParts[0]))
    } else {
      const start = parseInt(rangeParts[0])
      const end = parseInt(rangeParts[1])
      linesToHighlight = linesToHighlight.concat(range(end - start + 1, start))
    }
  })

  return linesToHighlight;
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

/**
 * Translate the "1,2,6-8" into an array of numbers to be like: 1,2,6,7,8
 */
function getHighlightLinesConfig(linesConfig = '') {
  if (!linesConfig) {
    return;
  }

  let linesToHighlight = [];
  const linesGroups = linesConfig.split(',')
  linesGroups.forEach(group => {
    const rangeParts = group.split('-')
    if (rangeParts.length === 1) {
      linesToHighlight.push(parseInt(rangeParts[0]))
    } else {
      const start = parseInt(rangeParts[0])
      const end = parseInt(rangeParts[1])
      linesToHighlight = linesToHighlight.concat(range(end - start + 1, start))
    }
  })

  return linesToHighlight;
}

module.exports = async (theme = 'material-palenight') => {
  const highlighter = await require('shiki').getHighlighter({
    theme
  })

  return (code, lang, attrs) => {
    if (!lang || lang === 'text') {
      return `<pre v-pre><code>${escapeHtml(code)}</code></pre>`
    }
    const linesConfig = getHighlightLinesConfig(attrs);
    return highlighter.codeToHtml(code, {lang, lineOptions: linesConfig?.map(line => ({line, classes: ["highlighted"]}))} ).replace(/^<pre.*?>/, '<pre v-pre>')

  }
}
