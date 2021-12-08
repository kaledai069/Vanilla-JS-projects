document.addEventListener('DOMContentLoaded', ()=>
{
    const squares = document.querySelectorAll('.grid div');
    const score_board = document.querySelector('.score span');
    const rand_num = Math.floor(Math.random() * squares.length);
    squares[rand_num].classList.add('snake');

    let snake_initial_pos = rand_num;
    let snake_dir = [0, 1];
    let snake_body = [];
    let apple_pos = [];
    let score = 0;
    let apple_present = false;
    let dir_locs = [];
    let dir_change = false;

    snake_body.push([snake_initial_pos, snake_dir]);

    const add_snake_block = ()=>
    {
        if(JSON.stringify(snake_body[snake_body.length - 1][1]) == JSON.stringify([1,0]))
        {
            snake_body.push([snake_body[snake_body.length-1][0], [1,0]]);
        }
        else if(JSON.stringify(snake_body[snake_body.length - 1][1]) == JSON.stringify([0, 1]))
        {
            snake_body.push([snake_body[snake_body.length-1][0], [0,1]]);
        }
        else if(JSON.stringify(snake_body[snake_body.length - 1][1]) == JSON.stringify([-1, 0]))
        {
            snake_body.push([snake_body[snake_body.length-1][0], [-1, 0]]);
        }
        else if(JSON.stringify(snake_body[snake_body.length - 1][1]) == JSON.stringify([0, -1]))
        {
            snake_body.push([snake_body[snake_body.length-1][0], [0, -1]]);
        }
    }

    const fruit_catch = ()=>
    {
        if(apple_present)
        {
            if(apple_pos.includes(snake_body[0][0]))
            {
                let apple_index = apple_pos.findIndex((item)=> snake_body[0][0] == item);
                squares[apple_pos[apple_index]].classList.remove('apple');
                apple_pos.splice(apple_index, 1);
                score++;
                score_board.textContent = score;
                add_snake_block();
                apple_present = false;
            }
        }
    }

    const remove_snake_shade = (snake_block_index) =>
    {
        squares[snake_block_index].classList.remove('snake');
    }

    const append_snake_shade = (snake_block_index)=>
    {
        squares[snake_block_index].classList.add('snake');
    }

    const snake_movement_key_logger = ( snake_block_index, movement_style )=>
    {
        
        switch(movement_style)
        {
            case 'left':
                remove_snake_shade(snake_body[snake_block_index][0]);
                if(snake_block_index == 0)
                {
                    fruit_catch();
                }
                snake_body[snake_block_index][0]%10 == 0? snake_body[snake_block_index][0] += 9 : snake_body[snake_block_index][0]--;
                append_snake_shade(snake_body[snake_block_index][0]);
                break;

            case 'right':
                remove_snake_shade(snake_body[snake_block_index][0]);
                if(snake_block_index == 0)
                {
                    fruit_catch();
                }
                snake_body[snake_block_index][0] % 10 == 9 ? snake_body[snake_block_index][0] -= 9 : snake_body[snake_block_index][0]++;
                append_snake_shade(snake_body[snake_block_index][0]);
                break;

            case 'up':
                remove_snake_shade(snake_body[snake_block_index][0]);
                if(snake_block_index == 0)
                {
                    fruit_catch();
                }
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some(item => item == snake_body[snake_block_index][0]) ? snake_body[snake_block_index][0] += 90 : snake_body[snake_block_index][0] -=10;
                append_snake_shade(snake_body[snake_block_index][0]);
                break;

            case 'down':
                remove_snake_shade(snake_body[snake_block_index][0]);
                if(snake_block_index == 0)
                {
                    fruit_catch();
                }
                [90, 91, 92, 93, 94, 95, 96, 97, 98, 99].some(item => item == snake_body[snake_block_index][0]) ? snake_body[snake_block_index][0] -= 90 : snake_body[snake_block_index][0] +=10;
                append_snake_shade(snake_body[snake_block_index][0]);
                break;
        }
    }

    const check_for_direction = ()=>
    {
        let del_dir = false;
        if(dir_locs.length > 0)
        {
            for(let i = 0; i < dir_locs.length; i++)
            {
                for(let j = 0; j < snake_body.length; j++)
                {
                    if(snake_body[j][0] == dir_locs[i][0])
                    {
                        snake_body[j][1] = dir_locs[i][1];
                        if(j == snake_body.length-1) del_dir = true;
                    }
                }
            }
            if(del_dir) dir_locs.shift();
            
        }
    }

    document.addEventListener('keydown', (e)=>
    {
        switch(e.key)
        {
            case 'a':
                snake_dir = [-1, 0];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 'd':
                snake_dir = [1, 0];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 'w':
                snake_dir = [0, 1];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 's':
                snake_dir = [0, -1];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
        }
    })

    document.addEventListener('swiped', (e)=>
    {
        switch(e.detail.dir)
        {
            case 'left':
                snake_dir = [-1, 0];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 'right':
                snake_dir = [1, 0];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 'up':
                snake_dir = [0, 1];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
            case 'down':
                snake_dir = [0, -1];
                dir_locs.push([snake_body[0][0], snake_dir]);
                break;
        }
    })

    const snake_move = () =>
    {
        check_for_direction();
        for(let i = 0, len = snake_body.length; i < len; i++)
        {
            if(JSON.stringify(snake_body[i][1]) == JSON.stringify([1,0]))
            {
                snake_movement_key_logger(i, 'right');
            }
            else if(JSON.stringify(snake_body[i][1]) == JSON.stringify([0, 1]))
            {
                snake_movement_key_logger(i, 'up');
            }
            else if(JSON.stringify(snake_body[i][1]) == JSON.stringify([-1, 0]))
            {
                snake_movement_key_logger(i, 'left');
            }
            else if(JSON.stringify(snake_body[i][1]) == JSON.stringify([0, -1]))
            {
                snake_movement_key_logger(i, 'down');
            }
        } 
    }

    const random_apple_generator = ()=>
    {
        if(!apple_present)
        {
            do
            {
                temp_pos = Math.floor(Math.random() * 100);
            }while(snake_body.map(item => item[0]).includes(temp_pos));
            apple_pos.push(temp_pos);
            squares[temp_pos].classList.add('apple');
            apple_present = true;
        }
    }

    setInterval(function(){snake_move()}, 100);
    setInterval(function(){random_apple_generator()}, 500)
})