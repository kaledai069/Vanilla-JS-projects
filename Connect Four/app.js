document.addEventListener('DOMContentLoaded', ()=>
{
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const display_current_player = document.querySelector('#current-player');
   current_player = 1;

    for(var i = 0, len = squares.length; i < len; i++)
    (function(index)
        {
            console.log(index, i);
            squares[i].onclick = function()
            {
                if(squares[index+7].classList.contains('taken'))
                {
                    if(current_player === 1)
                    {
                        squares[index].classList.add('taken');
                        squares[index].classList.add('player-one');
                        current_player = 2;
                        display_current_player.textContent = current_player;
                        console.log(current_player)
                    }
                    else if(current_player === 2)
                    {
                        squares[index].classList.add('taken');
                        squares[index].classList.add('player-two');
                        current_player = 1;
                        display_current_player.textContent = current_player;
                    }
                }
                else alert('cant go here')
            }
        }
    )(i)

})