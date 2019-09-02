import Cookies from 'js-cookie'

export default{
  bind(el, binding) {
    let id=binding.value || parseInt(el.dataset.id)
    // console.log("========:",id)
    let btnMenu=JSON.parse(Cookies.get('buttonMenu'))
    if (btnMenu.indexOf(id) <= -1) {
     el.remove();
    }
  }
}

