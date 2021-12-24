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
    let present_selected_obj = -1;
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
        console.log(active_shape);
        mask_resolver(actual_start_pos);
        mask_mapper(active_shape_color, true);
    }

    initializers();

    function down_bounday_checker()
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
        else if(typeof(last_row_pos) == 'undefined' || last_row == 0)
        {
            return false;
        }
        else
        {
            return false;
        }
    }

    function re_mapper(value)
    {
        if(!down_bounday_checker())
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
    }

    document.addEventListener('keyup', (e)=>
    {
        switch(e.key)
        {
            case 'a':
                re_mapper(-1);                
                break;
            case 'd':
                re_mapper(1);   
                break;
        }
    })

    setInterval(()=>
    {
        re_mapper(10);
    }, 200)
})