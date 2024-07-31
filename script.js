const containerVideos = document.querySelector(".videos__container");

async function buscarMostrarVideos(){
    try{
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        videos.forEach((video) => {
            //Exemplo de forma que podemos tratar erros específicos 
            if(video.categoria == ""){
                throw new Error('Vídeo não tem categoria');
            }
            containerVideos.innerHTML += `
            <li class="videos__item" data-categoria="${video.categoria}">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                </div>
            </li>
            `;
        })
    }catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    } finally {
        //alert("Isso sempre acontece!")
    }
}

buscarMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa (){
    const videos = document.querySelectorAll(".videos__item");

    //Refatoração diminuindo estruturas if-else
    videos.forEach((video) => {
        let valorFiltro = barraDePesquisa.value.toLowerCase();
        let tituloVideo = video.querySelector(".titulo-video").textContent.toLowerCase();

        video.style.display = valorFiltro ? tituloVideo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    })
    /* Estrutura original com if-elses
    if(barraDePesquisa.value != ""){
         for (let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }       
        
    } else {
        video.style.display = "block"
    }
    */
}

const botoesCategoria = document.querySelectorAll(".superior__item");

botoesCategoria.forEach ((botao) => {
    let categoriaClickada = botao.name;
    botao.addEventListener ("click", () => filtrarCategoria(categoriaClickada))
})

function filtrarCategoria (categoriaClickada) {
    const videos = document.querySelectorAll(".videos__item");
    videos.forEach((video) => {
        if (categoriaClickada != "Tudo") {
            video.style.display = categoriaClickada == video.dataset.categoria ? 'block' : 'none';
        }
        else video.style.display = 'block';
    })
}