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

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var vm = new Vue({
  el: '#app',
  data: {
    favourites: [],
    searchString: '',
    lastSearchString: '',
    definition: '',
    searchSuggestions: [],
    screen: 'welcome'
  },
  methods: {
    lookupDictionary() {
      this.searchSuggestions = []

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
      this.searchSuggestions = dictionaryWordSuggestions(this.searchString).map(toTitleCase)
    },

    loadWord(suggestion) {
      this.searchString = suggestion
      this.lookupDictionary()
    },

    toggleFavouriteStatus() {
      var word = this.lastSearchString
      var index = this.favourites.indexOf(word)
      if (index > -1) {
        this.favourites.splice(index, 1)
      } else {
        this.favourites.push(word)
      }

      localStorage.setItem("favouriteWords", JSON.stringify(this.favourites))
    }
  },
  computed: {
    isFavourite() {
      return this.favourites.indexOf(this.lastSearchString) > -1
    },
  },
  created() {
    var dbResult = localStorage.getItem("favouriteWords")
    if (dbResult !== null) {
      this.favourites = JSON.parse(dbResult)
    }
  },
})
