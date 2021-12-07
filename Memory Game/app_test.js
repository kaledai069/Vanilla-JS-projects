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

// DOM nodes
const grid = document.querySelector('.grid');

// Variables and helpers
let card_pattern = [];

// Helper Functions
const rand_num_generator = () => Math.floor(Math.random() * cards_array.length);

const create_board = ()=>
{
    for(let i = 0; i < cards_array.length; i++)
    {
        card_pattern.push(cards_array[rand_num_generator()]);
        var card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        grid.appendChild(card);
    }   
}

const run_event_logic = ()=>
{
    document.querySelectorAll('.card').forEach( card =>
        {
            card.addEventListener('click', (e)=>
            {
                let card_id = card.getAttribute('data-id');
                card.setAttribute('src', card_pattern[card_id].img);
            })
        })
}

let card_index = 0;
let card_show_running = true;
const show_em_all = ()=>
{
    setInterval( () =>
    {   
        if(card_show_running)
        {
            all_cards[card_index].setAttribute('src', card_pattern[card_index].img);
            card_index++;
            if(card_index == card_pattern.length)
            {
                card_show_running = false;
                card_index--;
            }
        }
        else
        {
            all_cards[card_index].setAttribute('src', 'images/blank.png')
            card_index--;
        }
    }, 400)
}

create_board();
const all_cards = document.querySelectorAll('.card');
show_em_all();
run_event_logic();
})