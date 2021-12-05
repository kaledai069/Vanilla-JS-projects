const count_value = document.getElementById('value')
const btnColor = ['green', 'red']
const buttons = document.querySelectorAll('.btn')
let count = 0;

buttons.forEach( btn =>
{
    btn.addEventListener('click', (e)=>
    {
        const styles = e.currentTarget.classList;
        if(styles.contains("decrease"))
        {
            count--;
        }
        else if(styles.contains("increase"))
        {
            count++;
        }
        else 
        {
            count = 0;
        }
        count_value.textContent = count;
        const parsed_int = parseInt(count_value.innerHTML);
        if(parsed_int == 0)
        {
            count_value.style.color = 'hsl(209, 61%, 16%)';
        }
        else if(parsed_int > 0)
        {
            count_value.style.color = btnColor[0];
        }
        else
        {
            count_value.style.color = btnColor[1];
        }
    })
})