alert("Hello, World")

fetch("data/dictionary.json")
  .then(function (response) {
    // no var qualifier means dictionary is a global variable
    dictionary = response.json()
    alert("diction successsful")
  })
  .catch(function (error) {
    alert("oh noes, an error while fetching dictionary")
  })

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
