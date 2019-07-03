document.addEventListener("turbolinks:load", function() {

    const bindClickHandlers = () => {
      $('.category').on('click', (e) => {
        e.preventDefault()
        let id = e.target.href.split('/') [4]
          fetch(`/categories.json`)
            .then(res => res.json())
            .then (categories => {
              console.log(categories)
              $('#body').html('')
              categories.forEach(category =>{
                let newCategory = new Category(category)
                if(newCategory.id===parseInt(id) ){
                  let categoryHtml = newCategory.formatIndex()
                  $('#body').append(categoryHtml)
                  $('#body').append(newCategory.renderItems())
                }
              })
            })
         })
}

  bindClickHandlers()

  function Category(category){
    this.id = category.id
    this.name = category.name
    this.items = category.items
  }

  Category.prototype.formatIndex = function(){
    let categoryHtml = `<h1> ${this.name} </h1>`
    return categoryHtml
  }

  Category.prototype.renderItems = function(){
    let itemHtml = ''
    this.items.forEach(item => {
      itemHtml += `<p> ${item.title} </p>`

    })
    console.log('item html stuff', itemHtml)
    return itemHtml
  }





})
