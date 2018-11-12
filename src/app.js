/**
 * Created by ZLY on 2018/11/7.
 */
import $ from 'jquery'

import './style/index.scss'

import img_src from 'images/bg.png'


(() => {
    let app = document.querySelector('#app')
    app.classList.add('content')

    let input = document.createElement('INPUT')
    app.appendChild(input)

    let img = document.createElement('IMG')
    img.src = img_src
    $(img).css({width: '100px', height: '100px;'})
    app.appendChild(img)

    let icon = document.createElement('I')
    icon.innerHTML = '文档'
    icon.className = 'iconfont icon-daiwoqian'
    app.appendChild(icon)
})()
