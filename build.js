import axios from 'axios'
import { writeFileSync } from 'fs'
import { Window } from 'happy-dom'

// Configuration

const VERSION = '2.5.0'

// Setup

build()

async function build() {
  const { document } = new Window()

  let data
  try {
    const response = await axios.get(
      `https://cdn.jsdelivr.net/npm/remixicon@${VERSION}/fonts/remixicon.symbol.svg`
    )
    data = response.data
  } catch (err) {
    return console.error('Failed to fetch SVG:', err)
  }

  document.body.innerHTML = data

  const svg = document.querySelector('svg')
  if (!svg) {
    return console.error('Could not find root SVG element')
  }

  const symbols = svg.querySelectorAll('symbol')
  if (!symbols.length) {
    return console.error('SVG is missing symbols')
  }

  const symbolData = symbols.map(symbol => {
    let element = symbol

    // Ensure container group elements are ignored

    while (
      element.firstElementChild.tagName === 'G' &&
      element.childElementCount === 1
    ) {
      element = element.firstElementChild
    }

    return {
      id: symbol.id,
      html: element.innerHTML,
    }
  })

  // Contruct JS const definitions from data

  const symbolConsts = symbolData.map(datum => {
    const jsSafeName = datum.id.replaceAll('-', '_')
    const trimmedHtml = datum.html.trim()

    return `const ${jsSafeName} = \`${trimmedHtml}\``
  })

  const jsString = symbolConsts.join('\n\n')

  try {
    writeFileSync('./out.js', jsString)
  } catch (err) {
    return console.error('Failed to write file:', err)
  }
}