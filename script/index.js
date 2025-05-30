function loadCategories(){
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then((res)=>res.json())
   .then((data)=>displayCategories(data.categories))
}

function removeActiveClass(){
    const activeButtons=document.getElementsByClassName("active");
    for(let btn of activeButtons){
       btn.classList.remove("active"); 
    }
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response)=>response.json())
    .then((data)=>{
        removeActiveClass();
    document.getElementById("btn-all").classList.add("active");
    displayVideos(data.videos);
    })
}

const loadCategoriesVideos=(id)=>{

  const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass();
    const clickedButton=document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active")
    displayVideos(data.category)
  })
}

const loadVideoDetails=(videoId)=>{
   console.log(videoId)
   const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
   fetch(url)
   .then((res)=>res.json())
   .then((data)=>displayVideoDetails(data.video));
}

const displayVideoDetails=(video)=>{
   console.log(video);
   document.getElementById("video_details").showModal();
   const detailsContainer=document.getElementById("details-container");
   detailsContainer.innerHTML=`
   <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">  
    </div>
  </div>
</div>
   `
}

const displayVideos=(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML=" ";
    if(videos.length==0){
        videoContainer.innerHTML=`
        <div class="col-span-full text-center flex flex-col justify-center items-center py-25">
            <img class="w-[120px]" src="images/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>`;
        return;
    }
    videos.forEach(video=>{
        const videoCard=document.createElement("div");
        videoCard.innerHTML=`
         <div class="card bg-base-100 shadow-sm">
            <figure class="relative">
                <img class="w-full h-[250px] object-cover"
                src="${video.thumbnail}">
                <span class="absolute bottom-2 right-2 text-white bg-black p-1 text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5 ml-4">
              
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
              
                <div class="intro">
                   <h2 class="font-semibold">${video.title}</h2>
                   <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>

            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>

        `;
        videoContainer.appendChild(videoCard)
    })
}

function displayCategories(categories){
   const categoryContainer=document.getElementById("category-container");
   for(let cat of categories){
    const categoryDiv=document.createElement("div");
    categoryDiv.innerHTML=`
    <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.append(categoryDiv)
   } 
}

loadCategories();
