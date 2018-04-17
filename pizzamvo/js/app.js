let data = {
    lastID: 0,
    pizzas: []
}

const octopus = {
    addPizza: function() {
        const thisID = ++data.lastID;

        data.pizzas.push({
            id: thisID,
            visible: true
        })
    }
}

const view = {
    init: function() {
        const addPizzaBtn = document.querySelector('.add-pizza');
        addPizzaBtn.addEventListener('click', function() {
            octopus.addPizza();
        });

        this.$pizzaList = document.querySelector('.pizza-list');
        this.pizzaTemplate = document.querySelector('script[data-template="pizza"]')
        
        
    },

    render: function() {
        const $pizzaList = this.$pizzaList,
            pizzaTemplate = this.pizzaTemplate;

        $pizzaList.innerHTML = "";
        
    }
}