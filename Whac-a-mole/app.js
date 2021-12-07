const squares = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole')
const time_left = document.querySelector('#time-left')
let score = document.querySelector('#score');
var hit_square_pos;
let result = 0;
let current_time = time_left.textContent;

const random_square = ()=>
{
    squares.forEach( class_name => 
        {
            class_name.classList.remove('mole');
        })
    let random_square_pos = squares[Math.floor(Math.random()*9)];
    random_square_pos.classList.add('mole');
    hit_square_pos = random_square_pos.id;
}

squares.forEach( id => 
{
    id.addEventListener('mouseup', ()=>
    {
        if(id.id == hit_square_pos)
        {
            result++;
            score.textContent = result;
        }
    })
})

function move_mole()
{
    timer = null;
    timer = setInterval(() => {
        random_square();
    }, 1000);
}

function count_down()
{
    current_time--;
    time_left.textContent = current_time;
    if(current_time == 0)
    {
        clearInterval(timer);
    }
}
move_mole();
setInterval(() => {
    count_down();
}, 1000);

function hello()
{
    let something = 69;
    console.log(something);
}