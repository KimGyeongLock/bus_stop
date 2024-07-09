require("request");
var parseString = require("xml2js").parseString; 

const url = ``;

async function fetchData() {

    try {
        const response = await fetch(url);
        const body = await response.text();

        parseString(body, function(err, result) {
            if (err) {
                console.error("XML 파싱 오류:", err);
                return;
            }
            
            // JSON 구조를 확인하기 위해 출력
            console.log(JSON.stringify(result, null, 2));
            
            // 여기서 JSON 구조를 기반으로 원하는 데이터에 접근
            const items = result.response.body[0].items[0].item;
            
            items.forEach(item => {
                console.log(`버스 번호: ${item.routeno[0]}`);
                console.log(`도착 예정 시간: ${item.arrtime[0]}초`);
                console.log(`남은 정류장 수: ${item.arrprevstationcnt[0]}`);
                console.log('-----------------------');
            });

            // const dataContainer = document.getElementById('data-container');
            // dataContainer.innerHTML = ''; // 기존 내용을 지우고 새로 추가
            // items.forEach(item => {
            //     console.log("-");
            //     const busInfo = `
            //         <div>
            //             <h3>버스 번호: ${item.routeno[0]}</h3>
            //             <p>노선 종류: ${item.routetp[0]}</p>
            //             <p>도착 예정 시간: ${item.arrtime[0]}초</p>
            //             <p>남은 정류장 수: ${item.arrprevstationcnt[0]}</p>
            //         </div>
            //     `;
            //     dataContainer.innerHTML += busInfo;
            // });
        });
    } catch (error) {
        console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
    }
}

fetchData();
