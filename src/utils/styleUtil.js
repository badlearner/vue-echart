const THEME_KEY = 'THEME'
const THEME_WHITE = 'white'
const THEME_DARKGRAY = 'darkgray'
const THEME_DARKBLUE = 'darkblue'
const white_theme = {
  textColor: '#4d4d4d',
  lineColor: '#f1f1f1',
  map: {
    geo: {
      color: '#fff'
    }
  },
  mapItemStyle: {
    normal: {
      areaColor: '#458FE8',
      borderColor: '#78B9FF',
    },
    emphasis: {
      areaColor: '#5EB9F9'
    }
  }
}
const darkgray_theme = {
  textColor: '#e4e5e6',
  lineColor: '#646C77',
  map: {
    geo: {
      color: '#ced7dc'
    }
  },
  mapItemStyle: {
    normal: {
      areaColor: '#232a34',
      borderColor: '#60728a',
    },
    emphasis: {
      areaColor: '#434f60'
    }
  }
}
const darkblue_theme = {
  textColor: '#e4e5e6',
  lineColor: '#646C77',
  map: {
    geo: {
      color: '#ced7dc'
    }
  },
  mapItemStyle: {
    normal: {
      areaColor: '#0a3760',
      borderColor: '#5a8ab8'
    },
    emphasis: {
      areaColor: '#1f5484'
    }
  }
}

let currentTheme

export function setTheme (theme) {
  let expDate = new Date()
  expDate.setTime(expDate.getTime() + 24 * 60 * 30 * 60 * 1000);   //时间存30天
  document.cookie = THEME_KEY + '=' + theme + ';expires=' + expDate.toGMTString() + ';path=/';
}

function getTheme () {
  let strArr = document.cookie.split(';')
  let theme
  for (let i = 0; i < strArr.length; i++) {
    let item = strArr[i].split('=')
    let key = item[0].replace(/\s+/g, '')
    if (key === THEME_KEY) {
      theme = item[1]
      break
    }
  }
  return theme
}

export function getCurrentTheme () {
  return currentTheme
}

export default (() => {
  let theme = getTheme() || THEME_WHITE

  currentTheme = theme

  switch (theme) {
    case THEME_DARKGRAY:
      return darkgray_theme

    case THEME_DARKBLUE:
      return darkblue_theme

    case THEME_WHITE:
    default:
      return white_theme
  }
})()
