document.addEventListener("turbolinks:load", function() {

    const categoryIndex = () => {
      $('#2').on('click', (e) => {
        e.preventDefault()
        history.pushState(null, null, "categories")
          $('#body').html('<h1>Category List</h1>')
          fetch('/categories.json')
          .then(res => res.json())
          .then (categories => {
              $('#body').append(categoryTypes)
              })
            })
          }
    categoryIndex()

    const bindClickHandlers = () => {
      $('.category').on('click', (e) => {
        e.preventDefault()
        let id = parseInt(e.target.href.split('/') [4])
          fetch(`/categories.json`)
            .then(res => res.json())
            .then (categories => {
              console.log(categories)
              $('#body').html('')
              categories.forEach(category =>{
                let newCategory = new Category(category)
                if(newCategory.id===id){
                  let categoryHtml = newCategory.formatIndex()
                  $('#body').append(categoryHtml)
                  $('#body').append(newCategory.renderItems())
                }
              })
            })
         })
}

  var categoryTypes =['Travel ',
    'Finance ',
    'Home ',
    'Shopping ',
    'Favors ',
    'Other ']

  categoryTypes.sort()
  console.log(categoryTypes)

  bindClickHandlers()

  function Category(category){
    this.id = category.id
    this.name = category.name
    this.items = category.items
  }

  Category.prototype.formatIndex = function(){
    let categoryHtml =`

    `
    return categoryHtml
  }

  Category.prototype.renderItems = function(){
    let itemHtml = ''
    this.items.forEach(item => {
      itemHtml += `<p> ${item.title} </p>`
    })
    return itemHtml
  }





})
