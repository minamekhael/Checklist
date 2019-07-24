document.addEventListener("turbolinks:load", function() {

    const categoryIndex = () => {
      $('#2').on('click', (e) => {
        e.preventDefault()
        history.pushState(null, null, "categories")
        fetch(`/items.json`)
        .then(res => res.json())
        .then (items =>{
          $('#body').html('<h1>Categories List</h1>')
          items.sort((a, b) => (a.category.name > b.category.name) ? 1 : -1)
          items.forEach(item => {
            let itemHtml = `<p>${item.category.name}</p>`
            $('#body').append(itemHtml)
            })
          })
        })
    }


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

  categoryIndex()

  bindClickHandlers()

  function Category(category){
    this.id = category.id
    this.name = category.name
    this.items = category.items
  }

  Category.prototype.formatIndex = function(){
    let categoryHtml =`
      <p>${this.name}</p>
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
