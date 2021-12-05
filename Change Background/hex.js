const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener("click", ()=>
{
    const hex_color_value = hex_generator();
    color.textContent = hex_color_value;
    document.body.style.backgroundColor = hex_color_value;
})

const hex_generator = ()=> `#${ran_num_generator()}${ran_num_generator()}${ran_num_generator()}`
const ran_num_generator = () => (Math.floor(Math.random() * 256)).toString(16).toUpperCase();