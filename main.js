async function fetchData() {
    const url = ``;

    try {
        const response = await fetch(url);
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const items = xmlDoc.getElementsByTagName("item");
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = ''; // 기존 내용을 지우고 새로 추가
        if(items.length == 0) dataContainer.innerHTML += '노선 정보 없음';
        const nodenm = items[0].getElementsByTagName('nodenm')[0].textContent;
        dataContainer.innerHTML += `<h2>${nodenm}</h2>`;
        dataContainer.innerHTML += '<div id="data">';
        const dataDiv = document.createElement('div');
        dataDiv.id = 'data';
        dataContainer.appendChild(dataDiv);

        for (let i = 0; i < items.length; i++) {
            const routeno = items[i].getElementsByTagName('routeno')[0].textContent;
            const routetp = items[i].getElementsByTagName('routetp')[0].textContent;
            const arrtime = items[i].getElementsByTagName('arrtime')[0].textContent;
            const arrprevstationcnt = items[i].getElementsByTagName('arrprevstationcnt')[0].textContent;
            
            const busInfo = `
                <div class="bus-info">
                    <h3>버스 번호: ${routeno}</h3>
                    <p>노선 종류: ${routetp}</p>
                    <p>도착 예정 시간: ${Math.floor(arrtime / 60)}분 ${arrtime % 60}초</p>
                    <p>남은 정류장 수: ${arrprevstationcnt}번째 전</p>
                </div>
            `;
            dataDiv.innerHTML += busInfo;
        }
    } catch (error) {
        console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
    }
}

// 일정 간격으로 데이터를 업데이트
setInterval(fetchData, 1000); // 1초마다 데이터 업데이트

// 페이지가 로드되면 초기 데이터를 가져옴
fetchData();
