document.addEventListener('DOMContentLoaded', ()=>
{
    "use strict"
    const all_squares = document.querySelectorAll(".grid div");

    // shapes representation
    const tetris_shapes = 
    [
        {
            name: 'Z',
            type: '_CBR',
            structure: [
                [
                    [false, true],
                    [true, true],
                    [true, false]
                ],
                [
                    [true, true, false],
                    [false, true, true]
                ]
            ],
            color: 'red'
        },
        {
            name: 'L',
            type: '_CNBR',
            structure: [
                [
                    [true, false],
                    [true, false], 
                    [true, true]
                ],
                [
                    [true, true, true],
                    [true, false, false]
                ],
                [
                    [true, true],
                    [false, true], 
                    [false, true]
                ],
                [
                    [false, false, true],
                    [true, true, true]
                ]
            ],
            color: 'yellow'
        },
        {
            name: 'Pole',
            type: '_CBR',
            structure:[
                [
                    [true, true, true, true]
                ], 
                [
                    [true],
                    [true],
                    [true],
                    [true]
                ]
            ],
            color: 'blue'
        },
        {
            name: 'Square',
            type: '_SNR',
            structure: [
                [
                    [true, true],
                    [true, true]
                ]
            ],
            color: 'sky'
        },
        {
            name: 'T',
            type: '_CNBR',
            structure:[
                [
                    [false, true, false],
                    [true, true, true]
                ],
                [
                    [true, false],
                    [true, true],
                    [true, false]
                ],
                [
                    [true, true, true],
                    [false, true, false]
                ],
                [
                    [false, true],
                    [true, true],
                    [false, true]
                ]
            ],
            color: 'white'
        }
    ];
    
    const mask_resolver = (start_pos) =>
    {
        for(let i = 0; i < active_shape.length; i++)
        {
            let mask_row_len = active_shape[i].length;
            for(let j = 0; j < mask_row_len; j++)
            {
                if(start_pos >= 0 && start_pos != 200)
                {
                    if(active_shape_bool_copy[i][j])
                    {
                       active_shape[i][j] = start_pos;
                    }
                }
                start_pos++;
            }
            start_pos = start_pos + 10 - mask_row_len;
        }
    }

    const mask_mapper = (color, mask)=>
    {
        for(let i = 0; i < active_shape.length; i++)
        {
            let mask_row_len = active_shape[i].length;
            for(let j = 0; j < mask_row_len; j++)
            {
                if(typeof(active_shape[i][j]) == 'number')
                {
                    mask ? all_squares[active_shape[i][j]].classList.add(color) :
                    all_squares[active_shape[i][j]].classList.remove(color);
                }
            }
        }
    }

    let active_shape;
    let active_shape_color;
    let actual_start_pos;
    let active_shape_bool_copy = new Array;
    let rand_tetris_obj;
    let present_selected_obj;
    let ran_active_shape;

    function initializers()
    {
        rand_tetris_obj = Math.floor(Math.random()*tetris_shapes.length);
        present_selected_obj = tetris_shapes[rand_tetris_obj];
        ran_active_shape = Math.floor(Math.random() * present_selected_obj['structure'].length)
        active_shape = present_selected_obj['structure'][ran_active_shape].map(x => x.slice());
        active_shape_bool_copy = active_shape.map(x => x.slice());
        active_shape_color = present_selected_obj['color'];
        let random_start_pos = Math.floor(Math.random() * (11 - active_shape[0].length));
        actual_start_pos = random_start_pos;
        if(active_shape.length > 1)
        {
            actual_start_pos = random_start_pos - 10 * (active_shape.length - 1);
        }
        mask_resolver(actual_start_pos);
        mask_mapper(active_shape_color, true);
    }

    initializers();

    function down_boundary_checker()
    {
        let last_row = active_shape[active_shape.length - 1];
        let last_row_pos = 0;

        for(let i = 0; i < last_row.length; i++)
        {
            if(typeof(last_row[i]) == 'number')
            {
                last_row_pos = last_row[i];
            }
        }
        if((last_row_pos+10) >= 200)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function edge_boundary_checker()
    {
        for(let i = 0; i < active_shape.length; i++)
        {
            for(let j = 0; j < active_shape[i].length; j++)
            {
                if(typeof(active_shape[i][j]) == 'number')
                {
                    let temp_box_no = active_shape[i][j] + 10;
                    if(all_squares[temp_box_no].classList.contains('taken'))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function clear_n_shift_block(start_value, row_value)
    {
        // clear all the block
        for(let i = start_value; i < start_value + 10; i++)
        {
            all_squares[i].classList.remove('taken');
            let color_list = ['red', 'sky', 'blue', 'yellow', 'white'];

            color_list.forEach( color => {
                if(all_squares[i].classList.contains(color))
                    all_squares[i].classList.remove(color)
            });
        }

        start_value -= 10;
        // shift the blocks
        for(let i = row_value - 1; i >= 0; i--)
        {
            for(let j = start_value; j < start_value + 10; j++)
            {
                if(all_squares[j].classList.contains('taken'))
                {
                    let color = all_squares[j].classList[1];
                    console.log(color);
                    all_squares[j].classList.remove('taken');
                    all_squares[j].classList.remove(color);
                    all_squares[j+10].classList.add('taken', color);
                }
            }
            start_value -= 10;
        }

    }

    function check_for_points()
    {
        let starting_value = 190;
        let block_count = 0;

        for(let i = 19; i >= 0; i--)
        {
            for(let j = starting_value; j < starting_value + 10; j++)
            {
                if(all_squares[j].classList.contains('taken'))
                {
                    block_count++;
                }
            }
            if(block_count == 10)
            {
                clear_n_shift_block(starting_value, i);
            }
            block_count = 0;
            starting_value -= 10;
        }
    }

    function re_mapper(value)
    {
        if(!down_boundary_checker() && !edge_boundary_checker())
        {
            mask_mapper(active_shape_color, false);
            actual_start_pos += value;
            mask_resolver(actual_start_pos);
            mask_mapper(active_shape_color, true);
        }
        else
        {
            for(let i = 0; i < active_shape.length; i++)
            {
                for(let j = 0; j < active_shape[i].length; j++)
                {
                    if(typeof(active_shape[i][j]) == 'number')
                    {
                        all_squares[active_shape[i][j]].classList.add('taken');
                    }
                }
            }
           
            initializers();
        }
        check_for_points();
    }

    function left_movement_possible()
    {
        for(let i = 0; i < active_shape.length; i++)
        {
            if(typeof(active_shape[i][0]) == 'number')
            {
                if(active_shape[i][0] % 10 == 0 || all_squares[active_shape[i][0] - 1].classList.contains('taken'))
                {
                    return false;
                }
            }
        }
        return true;
    }

    function right_movement_possible()
    {
        for(let i = 0; i < active_shape.length; i++)
        {
            if(typeof(active_shape[i][active_shape[i].length-1]) == 'number')
            {
                if((active_shape[i][active_shape[i].length-1]) % 10 == 9 || all_squares[active_shape[i][active_shape[i].length-1] + 1].classList.contains('taken'))
                {
                    return false;
                }
            }
        }
        return true;
    }

    function rotation_collision()
    {
        let next_shape = present_selected_obj['structure'][(ran_active_shape + 1) % present_selected_obj['structure'].length]; 
        let temp_next_shape = next_shape.map(x => x.slice());
        let temp_start_pos = actual_start_pos;
        for(let i = 0; i < temp_next_shape.length; i++)
        {
            let row_len = temp_next_shape[i].length;
            for(let j = 0; j < row_len; j++)
            {
                if(temp_start_pos >= 0 && temp_start_pos != 200)
                {
                    temp_next_shape[i][j] = temp_start_pos; 
                }
                temp_start_pos++;
            }
            temp_start_pos = temp_start_pos + 10 - row_len;
        }
        for(let i = 0; i < temp_next_shape.length; i++)
        {
            for(let j = 0; j < temp_next_shape[i].length; j++)
            {
                if(typeof(temp_next_shape[i][j]) == 'number')
                {
                    if(all_squares[temp_next_shape[i][j]].classList.contains('taken'))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function shift_boundary_collision()
    {
        let next_shape = present_selected_obj['structure'][(ran_active_shape + 1) % present_selected_obj['structure'].length]; 
        let temp_start_pos = actual_start_pos;
        return temp_start_pos % 10 + next_shape[0].length > 10;
    }

    function rotate_shape()
    {
        if(!rotation_collision() && !shift_boundary_collision() && actual_start_pos >= 0)
        {
            mask_mapper(active_shape_color, false);
            ran_active_shape = (ran_active_shape + 1) % present_selected_obj['structure'].length;
            let next_shape = present_selected_obj['structure'][ran_active_shape]; 
            active_shape = next_shape.map(x => x.slice());
            active_shape_bool_copy = next_shape.map(x => x.slice());
            mask_resolver(actual_start_pos);
            mask_mapper(active_shape_color, true);
        }
    }

    function all_the_way_down()
    {
        while(!down_boundary_checker() && !edge_boundary_checker())
        {
            mask_mapper(active_shape_color, false);
            actual_start_pos += 10;
            mask_resolver(actual_start_pos);
            mask_mapper(active_shape_color, true);
        }
    }

    document.addEventListener('keyup', (e)=>
    {
        switch(e.key)
        {
            case 'a':
                if(left_movement_possible())
                    re_mapper(-1);                
                break;
            case 'd':
                if(right_movement_possible())
                    re_mapper(1);   
                break;
            case ' ':
                rotate_shape();
                break;
            case 's':
                all_the_way_down();
                break;
        }
    })

    setInterval(()=>
    {
        re_mapper(10);
    }, 300)
})