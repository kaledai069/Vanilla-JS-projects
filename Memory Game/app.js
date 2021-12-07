document.addEventListener('DOMContentLoaded', ()=>
{
    //create cards
    const cards_array = 
    [
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png' 

        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png' 

        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png' 
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png' 
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
    ]

    cards_array.sort(()=> 0.5 - Math.random());
    const grid = document.querySelector('.grid');
    const result_display = document.querySelector('#result');
    var score = parseInt(result_display.innerHTML);

    var cards_chosen = [];
    var cards_chosen_id = [];
    var cards_won = []
    var cards;
    const create_board = ()=>
    {
        for(let i = 0; i < cards_array.length; i++)
        {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flip_card)
            grid.appendChild(card);
        }   
        cards = document.querySelectorAll('img');
    }

    const check_for_match = ()=>
    {
        const card_first = cards_chosen[0];
        const card_second = cards_chosen[1];
        console.log('CARD first: ', card_first);
        console.log('CARD second: ', card_second);
        if(card_first == card_second)
        {
            cards[cards_chosen_id[0]].setAttribute('src', 'images/white.png');
            cards[cards_chosen_id[1]].setAttribute('src', 'images/white.png');
            result_display.innerHTML = ++score;
        }
        else
        {
            cards[cards_chosen_id[0]].setAttribute('src', 'images/blank.png');
            cards[cards_chosen_id[1]].setAttribute('src', 'images/blank.png');
        }
        cards_chosen.splice(0, cards_chosen.length);
        cards_chosen_id.splice(0, cards_chosen_id.length);
    }

    function flip_card()
    {
        var card_id = this.getAttribute('data-id');
        cards_chosen.push(cards_array[card_id].name);
        cards_chosen_id.push(card_id);
        this.setAttribute('src', cards_array[card_id].img);
        if(cards_chosen.length == 2)
        {
            setTimeout(check_for_match, 500);
        }

    }

    create_board();
})