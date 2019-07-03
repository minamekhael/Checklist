document.addEventListener("turbolinks:load", function() {


    const bindClickHandlers = () => {
      $('#1').on('click', (e) => {
        e.preventDefault()
        history.pushState(null, null, "items")
          fetch('/items.json')
            .then(res => res.json())
            .then (items => {
              $('#body').html('')
              items.forEach(item => {
                let newItem = new Item(item)
                let itemHtml = newItem.formatIndex()
                $('#body').append(itemHtml)
              })
         })
    })
  }
  bindClickHandlers()

  $('#new_item').on("submit", function(e) {
    e.preventDefault()

    const values = $(this).serialize()

    $.post('/items', values).done(function(data) {
      $('#body').html("")
      const newItem = new Item(data)
      const htmlToAdd = newItem.formatShow()

      $('#body').html(htmlToAdd)
    })
  })

  $(document).on('click'), ".item-title", function(e){
     e.preventDefault()
     console.log(this)
     fetch("/items.json")
   }

  function Item(item){
    this.id = item.id
    this.title = item.title
    this.description = item.description
    this.category = item.category.name
    this.user = item.user.email
  }

  Item.prototype.formatShow = function(){
    let itemHtml = `
    <h3>${this.title}</h3>
    <p>${this.description}</p>
    <p>${this.category}</p>
    `
    return itemHtml
  }

  Item.prototype.formatIndex = function(){
    let itemHtml = `
    <div class="col-md-6 col-md-offset-3">
    <a href="/items/${this.id}">
    <h2>${this.title}</h2></a>
    <p>${this.description}</p>
    </div>
    `
    return itemHtml
  }
})
