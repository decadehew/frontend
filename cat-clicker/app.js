const cats = document.querySelectorAll('.cat');
window.buttons = document.getElementsByTagName("button")

function hideAllCats() {
    for(let i=0; i<cats.length; i++) {
        let cat = cats[i];
        cat.style.display = 'none';
    }
}

function bindButtonToCat(num) {
    const btn = document.querySelector(`.btn${num}`);
    const cat = document.querySelector(`#cat${num}`);
    btn.addEventListener('click', function(e) {
        hideAllCats();
        cat.style.display = 'block';
    })
}

function bindCounterToCat(num) {
    let cat = cats[num];
    let count = 0;
    cat.addEventListener('click', function() {
        let counter = cat.querySelector('.count span');
        counter.textContent = ++count;
    })
}
for(let i=0; i<cats.length; i++) {
    bindCounterToCat(i);
}
for(let i=1; i<=buttons.length; i++) {
    bindButtonToCat(i)
}

hideAllCats();
cats[0].style.display = 'block';