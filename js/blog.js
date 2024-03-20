const NUMBER_OF_POSTS = 5;
const NUMBER_OF_EARTH_PHOTOS = 3;
const DAY_IN_MS = 86400000;
const NASA_API_KEY = 'adHEDAmwqb9e2ddBokWToP8RhqukIYE7HHTD6OG9'; // very bad practice
let EARTH_PICTURE_DATES;

document.addEventListener("DOMContentLoaded", function() {
    loadPosts();
    createEarthCalendar();    
});

const loadPosts = async () => {
    const articlesList = document.getElementById("posts-ul");
    postTimeMs = Date.parse('2023-09-01');
    const postIds = new Set();

    for (let i = 0; i < NUMBER_OF_POSTS; i++) {
        const postId = (Date.now() + i) % (NUMBER_OF_POSTS + i) + 34;
        if (postIds.has(postId)) {
            i--;
            continue;
        }
        postIds.add(postId);
        postTimeMs = postTimeMs - DAY_IN_MS * 3 * Math.random();
        const postTimeFormated = (new Date(postTimeMs)).toLocaleString();        
        var post = document.createElement("li");
        post.innerHTML = `
        <article>
            <h4 id="post-${postId}-header"></h4>
            <div id="post-${postId}-content"></div>
            <img class="loading-gif" id="post-${postId}-loading-gif" src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/images/loading.gif"></src>
        </article>
        `
        
        articlesList.appendChild(post);

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(async (response) => {         
                const postHeader = document.getElementById(`post-${postId}-header`);
                const postContent = document.getElementById(`post-${postId}-content`);
                const postData = await response.json();
                postHeader.innerHTML = postTimeFormated;
                postContent.innerHTML = postData.body;
            })            
            .catch((error) => {
                console.log(error);
                document.getElementById(`post-${postId}-content`).innerHTML = "Oops...";
            })
            .finally(() => {
                document.getElementById(`post-${postId}-loading-gif`).hidden = true;
            })
    }
}

// Use case: создание календаря-галереи
const createEarthCalendar = async () => {
    await loadEarthPictureDates();
    let earthesShowed = 0; // захватывается колбеком

    const calendarElem = document.getElementById('earth-pictures-calendar');
    const calendar = new FullCalendar.Calendar(calendarElem, { // Создание календаря
        initialView: 'dayGridMonth', // Показать календарь дней месяца
        datesSet: async function(info) { // колбек, который вызывается при создании календаря и при его листании
            const startDate = info.start;
            const endDate = info.end;
            startDate.setDate(startDate.getDate() + 1);
            for (let date = startDate; date <= endDate && earthesShowed < NUMBER_OF_EARTH_PHOTOS; date.setDate(date.getDate() + 1)) {
                const dateStr = date.toISOString().split('T')[0];

                if (EARTH_PICTURE_DATES && EARTH_PICTURE_DATES.has(dateStr)) {
                    const dayCell = document.querySelector(`[role="gridcell"][data-date="${dateStr}"]`);
                    if (!dayCell) {
                        continue;
                    }
                    const dayCellContent = dayCell.querySelector('.fc-daygrid-day-frame');

                    const imageName = await getFirstEarthPictureNameByDate(dateStr);
                    if (!imageName) {
                        console.log(`image for ${dateStr} not found`);
                        continue;
                    }

                    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateStr.replaceAll('-', '/')}/png/${imageName}.png?api_key=${NASA_API_KEY}`;
                    dayCellContent.style.backgroundImage = `url("${imageUrl}")`;;
                    dayCellContent.style.backgroundSize = 'cover';
                    dayCellContent.style.backgroundPosition = 'center';
                    dayCellContent.style.backgroundRepeat = 'no-repeat';

                    const dateLabel = dayCellContent.querySelector('.fc-daygrid-day-top .fc-daygrid-day-number');
                    dateLabel.style.setProperty('color', 'white', 'important');

                    dayCell.onclick = () => {
                        window.open(imageUrl, '_blank').focus();
                    }

                    earthesShowed++;
                }
            }
        },
    })
    calendar.render(); // добавить календарь в DOM
}

const loadEarthPictureDates = async () => {
    if (EARTH_PICTURE_DATES !== undefined) {
        return;
    }

    EARTH_PICTURE_DATES = new Set();
    await (fetch(`https://api.nasa.gov/EPIC/api/natural/all?api_key=${NASA_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            for (date of data) {
                EARTH_PICTURE_DATES.add(date.date);
            }            
        })
        .catch(error => console.error(error)));
}

const getFirstEarthPictureNameByDate = async (dateStr) => {
    const result = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${dateStr}?api_key=${NASA_API_KEY}`);
    if (result.status != 200) {
        return null
    }
    picturesMetadata = await result.json();
    if (picturesMetadata.length == 0) {
        return null
    }

    return picturesMetadata[0].image;
}