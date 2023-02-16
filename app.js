const container = document.getElementById('container');
const btnBefore = document.getElementById('btnBefore');
const btnAfter = document.getElementById('btnAfter');

let page = 1;

btnAfter.addEventListener('click', () => {
    if(page<1000){
        page++;
        loadMovies();
    }
});

btnBefore.addEventListener('click', () => {
    if(page>1){
        page--;
        loadMovies();
    }
});

/* 
    Esta función se conecta a la API obtiene las peliculas 
    y las carga dentro del contenedor en el HTML 
*/

const loadMovies = async() =>{
    /* 
        Cuando trabajamos con funciones asincronas
        deberíamos de usar try y catch
    */
    try{
        /* 
            fetch es una función que permite poner 
            una cadena de texto que es donde vamos a 
            hacer la petición, fetch nos devuelve una promesa
            una promesa es una petición que hasta que no termine no 
            podemos hacer nada con ella.
            guardo en una variable la respuesta.
            await es una palabra reservada que lo que hace es que 
            cuando finaliza la promesa de fetch pasa a la siguiente línea.
            
            Si queremos utilizar await es convertir la función loadMovies
            en asincrona con la palabra reservada async
        */
        const reply = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=027e7ef0279686df57f40f2f7bf4c813&language=es-Es&page=${page}`)

        // Es muy importante comprobar el código de respuesta de la petición antes de ejecutar código

        if(reply.status === 200){
            /* 
                La respuesta nos devuelve un objeto con varías propiedades
            */
            console.log(reply)

            /* 
                Para acceder a la información usamos el metodo json()
                sirve para poder acceder a la información json, este metodo
                es asincrono por lo que tenemos que esperar a que acabe 
                usando la palabra reservada await y tenemos que guardar el 
                resultado
            */
            const data = await reply.json();

            let films='';
            data.results.forEach(film =>{
                // cada pelicula accedo a la variable films sumandole el siguiente html
                films += `
                    <div class='film'>
                        <a href='https://www.google.com/search?q=${film.title}%20pelicula' target='_blank'>
                            <img class='poster' src='https://image.tmdb.org/t/p/w500/${film.poster_path}'>
                        </a>
                        <h3 class='header'>${film.title}</h3>
                    </div>
                    `;
            });
            
            container.innerHTML = films;

        } else if(reply.status === 401){
            console.log('Pusiste API Key mal')
        } else if (reply.status === 404){
            console.log('La pelicula que buscas no existe')
        }else{
            console.log('Hubo un error y no sabemos que paso')
        }
        
        

    } catch(error){
        /* 
            Catch nos permite capturar el error que nos haya dado 
            IMPORTANTE: este catch no tiene nada que ver con la petición
            este catch solo se muestra en caso de que haya un error al 
            intentar ejecutarla.
            Si el servidor recibe nuestra petición y ve que hay algun problema nos respondera con un mensaje de error con status 
        */
        console.log(error)
    }
    
}

loadMovies();