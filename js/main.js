fetch("data/dictionary.json")
  .then(function (response) {
    // no var qualifier means dictionary is a global variable
    response.json().then((jsonObject) => dictionary = jsonObject)
  })
  .catch(function (error) {
    alert("oh noes, an error while fetching dictionary")
  })

var vm = new Vue({
  el: '#app',
  data: {
    searchString: '',
    lastSearchString: '',
    definition: '',
    screen: 'welcome'
  },
  methods: {
    lookupDictionary() {
      this.lastSearchString = this.searchString
      var word = this.lastSearchString.toUpperCase()
      console.log(word, dictionary, dictionary[word])
      if (dictionary[word] !== undefined) {
        this.definition = dictionary[word]
        this.screen = 'word'
      } else {
        this.screen = 'error'
      }
    }
  }
})
