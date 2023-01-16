// import { imageBase64Generator } from '@/lib/ui/image'
export function slideReplace(markDownText) {
  let text = markDownText

  const slider = []
  // eslint-disable-next-line no-useless-escape
  let match = text.match(/@!slide[\s\S]+?@!end/)
  let count = 0
  while (match) {
    const imageRows = match[0].replace('@!slide', '').replace('@!end', '').split(/\n!/)

    const imageProperty = imageRows[1].split('](')
    imageProperty[1] = imageProperty[1].slice(0, -1)
    const images = `<div class="swiper-slide"><img crossOrigin="anonymous" src="${
      imageProperty[1]
    }" alt="${imageProperty[0].slice(1)}" /></div>\n`

    const slide = `<div class="slide"><div class="swiper">
        <div class="swiper-header"></div>
        <div class="swiper-wrapper">\n${images}</div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-footer"></div>
      </div></div>`

    slider[count] = slide

    text = text.replace(match, '@!BEFOR_SLIDE' + count++ + '@!END')
    match = text.match(/@!slide[\s\S]+?@!end/)
  }
  console.log(text)
  console.log(slider)
  return {
    text,
    slider,
  }
}

export function sliderInjection(htmlText, slider) {
  console.log(htmlText)
  for (let i = 0; i < slider.length; i++) {
    htmlText = htmlText.replace('<p>@!BEFOR_SLIDE' + i + '@!END</p>', slider[i])
    console.log(htmlText)
  }

  return htmlText
}