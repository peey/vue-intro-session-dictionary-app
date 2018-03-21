fetch("data/dictionary.json")
  .then(function (response) {
    // no var qualifier means dictionary is a global variable
    response.json().then((jsonObject) => dictionary = jsonObject)
  })
  .catch(function (error) {
    alert("oh noes, an error while fetching dictionary")
  })


function dictionaryWordSuggestions(partial, howMany = 4) {
  var words = Object.keys(dictionary)
  partial = partial.toUpperCase()
  var result = []
  for (let i = 0; i < words.length; i++) {
    if (new RegExp("^" + partial).test(words[i])) {
      result.push(words[i])
    }    

    if (result.length >= howMany) {
      break
    }
  }

  return result
}

var vm = new Vue({
  el: '#app',
  data: {
    searchString: '',
    lastSearchString: '',
    definition: '',
    searchSuggestions: [],
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
    },

    getSearchSuggestions() {
      this.screen = 'searching'
      this.searchSuggestions = dictionaryWordSuggestions(this.searchString)
    }
  },
})
