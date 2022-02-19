document.addEventListener('DOMContentLoaded', ()=>
{
    const squares = document.querySelectorAll('.grid div');
    const score_board = document.querySelector('.score span');
    const game_over_ele = document.getElementById('game_over');
    const grid_area = document.getElementById('grid')

    const rand_num = Math.floor(Math.random() * squares.length);
    squares[rand_num].classList.add('snake');

    let snake_initial_pos = rand_num;
    let snake_dir = [0, 1];
    let snake_body = [];
    let apple_pos = [];
    let score = 0;
    let apple_present = false;
    let dir_locs = [];
    var snake_speed = 200;

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

    const speed_increment_test = ()=>
    {
        if(score % 5 == 0)
        {
            console.log(snake_speed);
            snake_speed -= 15;
            clearInterval(timer);
            start_snake_move_timer(snake_speed);
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
                speed_increment_test();
                score_board.textContent = score;
                add_snake_block();
                apple_present = false;
            }
        }
    }

    const remove_snake_shade = (snake_block_index) =>{squares[snake_block_index].classList.remove('snake');}
    const append_snake_shade = (snake_block_index) =>{squares[snake_block_index].classList.add('snake');}
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

    const key_dir_handler = (opp_dir, right_dir)=>
    {
        if(snake_body.length > 1)
        {
            if(JSON.stringify(snake_body[0][1]) != JSON.stringify(opp_dir))
            {
                snake_dir = right_dir;
                dir_locs.push([snake_body[0][0], snake_dir]);
            }
        }
        else 
        {
            snake_dir = right_dir;
            dir_locs.push([snake_body[0][0], snake_dir]);
        }
    }

    key_strokes = 
    {
        left_key: ()=> {key_dir_handler([1, 0], [-1, 0]);},
        right_key:()=> {key_dir_handler([-1, 0], [1, 0]);},
        up_key:   ()=> {key_dir_handler([0, -1], [0, 1]);},
        down_key: ()=>{key_dir_handler([0, 1], [0, -1]);}
    }

    const event_handler = (key_data, swipe_type)=>
    {
        let key_data_map =
        {
            left: 'a',
            right: 'd',
            up: 'w',
            down: 's'
        }
        let key_str_value = swipe_type ? key_data_map[key_data] : key_data;
        switch(key_str_value)
        {
            case 'a':
                key_strokes['left_key']();
                break;
            case 'd':
                key_strokes['right_key']();
                break;
            case 'w':
                key_strokes['up_key']();
                break;
            case 's':
                key_strokes['down_key']();
                break;
        }
    }
    document.addEventListener('keydown', (e)=>
    {
        event_handler(e.key, false);
    })

    grid_area.addEventListener('swiped', (e)=>
    {
        event_handler(e.detail.dir, true);
    })

    const change_snake_shade = ()=>
    {
        snake_body.forEach( snake_block => 
            {
                squares[snake_block[0]].classList.add('orange');
            })
    }

    const check_for_collision = ()=>
    {
        let snake_head_pos = snake_body[0][0];
        for(let i = 1; i < snake_body.length; i++)
        {
            if(snake_body[i][0] == snake_head_pos)
            {
                clearInterval(timer);
                game_over_ele.textContent = 'Game Over';
                change_snake_shade();
            }
        }
    }
    const snake_move = () =>
    {
        check_for_direction();
        check_for_collision();
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

    const start_snake_move_timer = (speed)=>
    {
        timer = setInterval(function(){snake_move()}, speed);
    }
    start_snake_move_timer(snake_speed);
    setInterval(function(){random_apple_generator()}, 500)
})