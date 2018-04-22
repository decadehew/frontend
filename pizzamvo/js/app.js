const data = {
    lastID: 0,
    pizzas: []
}

const octopus = {
    addPizza: function() {
        let thisID = ++data.lastID;

        data.pizzas.push({
            id: thisID,
            visible: true
        });
        view.render();
    },
    removePizza: function(pizza) {
        let clickedPizza = data.pizzas[ pizza.id - 1 ];
        clickedPizza.visible = false;
        view.render();
    },

    getVisiblePizzas: function() {
        let visiblePizzas = data.pizzas.filter(function(pizza) {
            return pizza.visible;
        })
        return visiblePizzas;
    },

    init: function() {
        view.init();
    }
    

}

const view = {
    init: function() {
        const addPizzaBtn = document.querySelector('.add-pizza');
        addPizzaBtn.addEventListener('click', function() {
            octopus.addPizza();
        });
        // this.$pizzaList = $('.pizza-list');

        this.$pizzaList = document.querySelector('.pizza-list');
        // this.pizzaTemplate = document.querySelector('script[data-template="pizza"]').innerHTML
        const output = document.createElement('li');
        output.classList.add('pizza');
        output.innerHTML = `
        1
        <div class="pizza-controls">
            <a href="#" class="remove-pizza">X</a>
        </div>
    `
        this.pizzaTemplate = output
        
        this.$pizzaList.addEventListener('click', function(e) {
            if(e.target.classList.contains('remove-pizza')) {
                var pizza = e.target.parentElement;
                octopus.removePizza(pizza);
                return false;
            }
        });
        

        this.render();
        
    },

    render: function() {
        const $pizzaList = this.$pizzaList,
            pizzaTemplate = this.pizzaTemplate;

        $pizzaList.innerHTML = " ";
        octopus.getVisiblePizzas().forEach(function(pizza) {
            const thisTemplate = pizzaTemplate
            console.log(thisTemplate)
            $pizzaList.appendChild(thisTemplate);
        })
    }
}

octopus.init();
window.a = data.lastID;
