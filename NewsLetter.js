const API_KEY="6852d40d733442a480d393a3b58c396f";
const url="https://newsapi.org/v2/everything?q";


window.addEventListener("load", ()=> fetchNews("India"));

async function fetchNews(query){
    const res= await fetch(`${url}=${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindNews(data.articles);
}


function bindNews(articles){
    let cardContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    
    cardContainer.innerHTML=" ";
   

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const newsCardColone=newsCardTemplate.content.cloneNode(true);


        // here newsCard is a document is used to colone the template and that is further append int the cardContainer
        fillDataInNewsCard(newsCardColone,article);

        cardContainer.appendChild(newsCardColone);

  });
}


function fillDataInNewsCard(newsCardColone,article){
  const newsImg=newsCardColone.querySelector("#news-image")
  const newstitle=newsCardColone.querySelector("#news-title");
   const newsDisc= newsCardColone.querySelector("#news-dis");
   const newsSource=newsCardColone.querySelector("#news-source");

    newsImg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsDisc.innerHTML=article.description;

    const date=new Date(article.publishedAt);
       date.toLocaleDateString("en-US", { timeZone: 'Asia/Kolkata' 
    });

       newsSource.innerHTML=`${article.source.name} | ${date}`;

       newsCardColone.firstElementChild.addEventListener("click",()=>{
              window.open(article.url,"_blank");
       }
         );
}

let prevItems=null; 

function navChangeFun(id){
       fetchNews(id);     
     const newItem=document.getElementById(id);
     
      prevItems?.classList.remove("active");
      prevItems=newItem;
      prevItems.classList.add("active");

}

function newsSearch(){
    const searchQuery=document.getElementById("search-input").value;
    if (!searchQuery) return;
    fetchNews(searchQuery);
   
    if (prevItems !== null) {
      prevItems.classList.remove("active");
    }
    prevItems=null;
}

function reload(){
    window.location.reload();
}



